function Livello6 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello6.prototype = Object.create( CoreLevel.prototype );
Livello6.prototype.constructor = Livello6;

Livello6.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 800 * (this.numeroOndata * 0.05);
  var velMin = 1.3 + this.numeroOndata * 0.08;
  var velMax = 1.4 + this.numeroOndata * 0.08;
  var numeroMissili = 15 + Math.floor( this.numeroOndata );
  var numeroMissiliSdoppiabili = rand( 0, numeroMissili );
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    var xRand = rand( 0, areaPertenza );
    var velRand = rand( velMin, velMax );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
  
  for( var i = 0; i < numeroMissiliSdoppiabili ; i++ ) {
    var xRand = rand( 0, areaPertenza );
    var velRand = rand( velMin, velMax );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemicoDoppio( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand, ritardoRand, 3, this.coreGame) );
  }
}

Livello6.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello6.prototype.setupListeners = function( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  
  /*
  $( '.gameContainer' ).bind( 'keyup', function( event ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, event.which );
  });
  */
  azionamentoComandiPlancia( '.gameContainer', this.coreGame.batterieAntimissile,     this.coreGame.mirino, mySelf );
  
  $( '.gameContainer' ).on( 'mouseover', function( event ) {
    mySelf.coreGame.mirino.stato = Mirino.TRACCIAMENTO;
  });
  $( '.gameContainer' ).on( 'mouseout', function( ) {
    mySelf.coreGame.mirino.stato = Mirino.SPENTO;
  });
  $( '.gameContainer' ).on( 'mousemove', function( event ) {
    var offset = $(".gameContainer").offset();
    mySelf.coreGame.mirino.inseguiX = event.pageX - offset.left;
    mySelf.coreGame.mirino.inseguiY = event.pageY - offset.top;
    mySelf.coreGame.mirino.cambiaMira();
  });
}

Livello6.prototype.scegliTorretta = function ( x, y, tasto ) {
  var indiceTorretta = 0;
  switch(tasto) {
    case 49: indiceTorretta = 0; break;
    case 50: indiceTorretta = 1; break;
    case 51: indiceTorretta = 2; break;
    default: return -1;
  }
  
  var torrettaAttuale = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA 
      && torrettaAttuale.numeroMissili > 0 
      && torrettaAttuale.blocco === false )  
    return indiceTorretta;
  
  return -1;
};

Livello6.prototype.sparo = function ( x, y, torretta ) {
  if( torretta === undefined )
    return;
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: torretta.x,
    yDiPartenza: torretta.y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 30,
    distanzaPerFrame: 7
  }, this.coreGame ) );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 50;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello6.prototype.mostraSchermataIniziale = function ( punteggio ) {
  var mySelf = this;
  mySelf.coreGame.disegnaStatoGioco();
  mySelf.coreGame.disegnaBatterieAntimissile();
  var ctx = mySelf.ctx;
  
  this.intervalloSchermata = setInterval( function () {
    mySelf.coreGame.disegnaStatoGioco();
    mySelf.coreGame.disegnaBatterieAntimissile();
    if( mySelf.numeroSchermata === 0 ) {
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( "Punteggio: " + punteggio, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 120 );
      ctx.textAlign = "start";
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoPrimario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( 'CLICK PER INIZIARE A GIOCARE', 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 50 );
      ctx.textAlign = "start";
      
      // parte fissa
      ctx.textAlign = "center";
      ctx.font = 'bold 20px arial';
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 - 50);
      ctx.textAlign = "start";
      var img = document.getElementById("source-mouse-click");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 100, mySelf.canvas.height/2 + 40, 30, 80);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Fare click sinistro", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";
    } else {
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( "Punteggio: " + punteggio, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 120 );
      ctx.textAlign = "start";
      
      ctx.textAlign = "center";
      ctx.font = 'bold 20px arial';
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 - 50);
      ctx.textAlign = "start";
      var img = document.getElementById("source-mouse-click");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 100, mySelf.canvas.height/2 + 40, 30, 80);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Fare click sinistro", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";    
    }
    mySelf.numeroSchermata = (mySelf.numeroSchermata + 1) % 2;
  }, 500 );
  
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    clearInterval( mySelf.intervalloSchermata );
    mySelf.preparazioneAvvio();
  } );                     
}

var _x;
var _y;
var _tSelezionata;

function _SistemaFinto () { }
_SistemaFinto.prototype.sparo = function ( x, y, torrettaSelezionata ) {
  this._x = x;
  this._y = y;
  this._tSelezionata = torrettaSelezionata;
}

var azionaComandoSparo = function ( torrettaSelezionata, sistema, x, y ) {
  sistema.sparo( x, y, torrettaSelezionata );
}

// TAB 1

/**********
Funzione che abilita il click del mouse per azionare la macchinetta del caffè.
Questa funzione potrebbe essere d'ispirazione per altri scopi...
**********/
var azionaMacchinaCaffeConClick = function ( pulsantieraMacchinaCaffe ) {
  // Comandi plancia azionati da click del mouse, notare il 'click'
  $( pulsantieraMacchinaCaffe ).bind( 'click', function ( eventoClick ) {
    // Questa parte di codice si attiva quando si clicca
    macchinaCaffe.faiIlCaffe();
  } );
}

// TAB 2

/**********
Funzione che date le coordinate del bersaglio determina la torretta migliore, e funzionante,
per colpire il bersaglio.

Questa funzione prende come parametri:
  - torretta: un array di torrette;
  - x: un intero che rappresenta la coordinata x;
  - y: un intero che rappresenta la coordinata y;
Questa funzione restituisce la torretta migliore.
**********/
var torrettaPiuVicina = function ( torrette, x, y ) {
  /** Funzione che restituisce true (vero) o false (falso)
  nel caso in cui la torretta sia o meno funzionante. */
  var torrettaNonFunzionante = function ( torretta ) {
    if( torretta.stato === BatteriaAntimissile.ATTIVA &&
        torretta.numeroMissili > 0 &&
        torretta.blocco === false )
      return false;
    else
      return true;
  } 
  
  var torrettaSelezionata;
  if( 0 <= x && x < 170 ) {
    torrettaSelezionata = torrette[0];
  }
  if( 170 <= x && x < 340 ) {
    torrettaSelezionata = torrette[1];
  }
  if( 340 <= x && x <= 510 ) {
    torrettaSelezionata = torrette[2];
  }
  
  if( torrettaNonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[1];
  if( torrettaNonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[0];
  if( torrettaNonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[2];
  
  return torrettaSelezionata;
}
 
// TAB 3
 
/**********
Funzione che abilita i comandi della plancia. Attualmente prendo i tasti 1, 2, 3 sulla tastiera si fa fuoco con la torretta rispettivamente sinistra, centrale e destra.
Il comando click è abilitato ma non funzionante.

La funzione prende come parametri:
  - planciaComandi: classe che legge i comandi attivati;
  - torrette: array di torrette controllate;
  - mirino: classe che rappresenta il sistema di puntamento, restituisce
    le coordinate in cui è attualmente tramite mirino.x() e mirino.y();
  - sistema: è il sistema missilistico a cui sono rivolti i comandi.
**********/
var azionamentoComandiPlancia = function ( planciaComandi, torrette, mirino, sistema ) {
  // Comandi plancia azionati da tastiera, sostituire con click mouse ed inserire selezione automatica torretta.
//###START_MODIFICABILE###
  $( planciaComandi ).bind( 'keyup', function ( tastoPremuto ) {
    // Selezione coordinate a cui sparare
    var x = mirino.x;
    var y = mirino.y;
  
    // Selezione della torretta corrispondente, "which" significa "quale" in inglese
    var torrettaSelezionata;
    if( tastoPremuto.which === 49 ) // Pressione tasto "1"
      torrettaSelezionata = torrette[0];
    if( tastoPremuto.which === 50 ) // Pressione tasto "2"
      torrettaSelezionata = torrette[1];
    if( tastoPremuto.which === 51 ) // Pressione tasto "3"
      torrettaSelezionata = torrette[2];
    
    // Lancio del missile
    azionaComandoSparo( torrettaSelezionata, sistema, x, y );
  } );
//###END_MODIFICABILE###
}

// test
    
var t1 =
//(
  function () {
    var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
    var nMissili = coloreMissili.length;
    var nSoldati = 10;
    var Tmin = 50;
    var Tmax = 1000;
    var deltaTempo = 70;
    var deltaRaffreddamento = 3;
    var _torrette = [];
    
    _torrette.push (
      new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, null )
    );
    _torrette.push (
      new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, null )
    );
    _torrette.push (
      new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, null )
    );
    var _mirino = new Mirino( rand(0, 510), rand(0, 460));

    var _s = new _SistemaFinto();
    azionamentoComandiPlancia( $("#dummy-div"), _torrette, _mirino, _s );
    var t = torrettaPiuVicina ( _torrette, _mirino.x, _mirino.y );
    $("#dummy-div").click();
    $("#dummy-div").off();
    //console.log( _mirino );
    //console.log( t )
    //console.log( _s )
    
    var esito = true;
    if( _s._x !== _mirino.x ) 
      esito = false;
    if( _s._y !== _mirino.y )
       esito = false;
    if( _s._tSelezionata !== t) 
       esito = false;
    
    return esito;
  }
//) ();

/*
var torrettaSelezionata;
var x = mirino.x;
var y = mirino.y;

torrettaSelezionata = torrettaVicina( torrette, x, y )
azionaComandoSparo( 'click', torrettaSelezionata, sistema, x, y );
*/

/* SOLUZIONE
$( planciaComandi ).bind( 'click', function ( eventoClick ) {  
    
    // Selezione coordinate a cui sparare
    var x = mirino.x;
    var y = mirino.y;
    
    // Selezione della torretta corrispondente
    var torrettaSelezionata = torrettaPiuVicina( torrette, x, y );
    
    // Lancio del missile
    azionaComandoSparo( torrettaSelezionata, sistema, x, y );
  } );
  */