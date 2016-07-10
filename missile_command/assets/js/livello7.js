function Livello7 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello7.prototype = Object.create( CoreLevel.prototype );
Livello7.prototype.constructor = Livello7;

Livello7.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 900 * (this.numeroOndata * 0.05);
  var velMin = 1.6 + this.numeroOndata * 0.1;
  var velMax = 1.8 + this.numeroOndata * 0.1;
  var numeroMissili = 20 + Math.floor( this.numeroOndata );
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

Livello7.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.8;
}

Livello7.prototype.setupListeners = function ( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  
  $( '.gameContainer' ).on( 'click', function ( ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, null );
  } );
  
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

Livello7.prototype.scegliTorretta = function ( x, y, tasto ) {
  var nonFunzionante = function ( torretta ) {  
    if( torretta.stato === BatteriaAntimissile.ATTIVA &&
        torretta.numeroMissili > 0 &&
        torretta.blocco === false )
      return false;
    else
      return true;
  }
  
  var torrette = this.coreGame.batterieAntimissile;
  var torrettaSelezionata;
  
  if( 0 <= x && x < 170 ) {
    torrettaSelezionata = 0;
  }
  if( 170 <= x && x < 340 ) {
    torrettaSelezionata = 1;
  }
  if( 340 <= x && x <= 510 ) {
    torrettaSelezionata = 2;
  }
  
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 1;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 0;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 2;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    return -1;
    
  return torrettaSelezionata;
};

Livello7.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  
  var sdoppiabili = this.esaminaMissileSdoppiabile( x, y );
  if( sdoppiabili.missiliFrammenti.length === 0 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
  var x1 = sdoppiabili.x1;
  var x2 = sdoppiabili.x2;
  var y = sdoppiabili.y;
  var ySdoppio = sdoppiabili.ySdoppio;
  var missiliFrammenti = sdoppiabili.missiliFrammenti;
  
  if( sdoppiabili.missiliFrammenti.length === 1 ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x1,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 7
    }, this.coreGame ) );  
  } else {
    
    if( missiliFrammenti.length >= 2  )
      missiliFrammenti.slice(0, 2)
    
    var distanzaX = Math.abs( x - torretta.x );
    var distanzaY = Math.abs( y - torretta.y );

    this.coreGame.missiliTerrestri.push( new _MissileTerrestreDoppio( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 7
    }, this.coreGame, torretta.x - distanzaX/2, ySdoppio, missiliFrammenti.length ) );

  }
  //torretta.y + distanzaY/2
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 100;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello7.prototype.esaminaMissileSdoppiabile = function ( x, y ) {
  var missileUtente = new MissileStandard();
  
  var bersagli = [ { appartieneNemico: true, x: x, y: y} ];
  var ySdoppio = missileUtente.miraBersaglio( bersagli );
  var bersaglio = missileUtente.bersaglioAgganciato;
  var missiliFrammenti = missileUtente.esplodi();
    
  if( missiliFrammenti === undefined )
    return ( {
      x1: undefined,
      x2: undefined,
      y: undefined,
      ySdoppio: undefined,
      missiliFrammenti: [] } );
  
  if( missiliFrammenti.length === 1 ) {
    return ( {
    x1: missiliFrammenti[0].x,
    x2: 0,
    y: missiliFrammenti[0].y,
    ySdoppio: 0,
    missiliFrammenti: missiliFrammenti } );  
  }
  
  return ( {
    x1: missiliFrammenti[0].x,
    x2: missiliFrammenti[1].x,
    y: missiliFrammenti[0].y,
    ySdoppio: ySdoppio,
    missiliFrammenti: missiliFrammenti } );
}

Livello7.prototype.mostraSchermataIniziale = function ( punteggio ) {
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

function _MissileTerrestreDoppio ( parametri, coreGame, xSdoppio, ySdoppio, missili ) {
  MissileTerrestre.call( this, parametri, coreGame );

  this.xSdoppio = xSdoppio;
  this.ySdoppio = ySdoppio;
  this.missiliFrammenti = missili;
  
  var distanza = Math.sqrt( Math.pow(this.xSdoppio - this.xDiPartenza, 2) + 
      Math.pow(this.ySdoppio - this.yDiPartenza, 2) );
  
  this.ritardoSuddivisione = Math.floor(distanza / parametri.distanzaPerFrame);
  this.suddivisioneAvvenuta = false;
}

_MissileTerrestreDoppio.prototype = Object.create( MissileTerrestre.prototype );
_MissileTerrestreDoppio.prototype.constructor = _MissileTerrestreDoppio;

_MissileTerrestreDoppio.prototype.sdoppiati = function () {
  for( var i = 0; i < this.missiliFrammenti; ++i ) {
    this.coreGame.missiliTerrestri.push(
      new MissileTerrestre( {
        xDiPartenza: this.x,
        yDiPartenza: this.y,
        xDiArrivo: this.xDiArrivo + 40,
        yDiArrivo: this.yDiArrivo,
        coloreTestata: 'yellow',
        coloreScia: 'blue',
        massimoRaggioEsplosione: 30,
        distanzaPerFrame: 7
      }, this.coreGame ) );
  }
  this.suddivisioneAvvenuta = true;
}

_MissileTerrestreDoppio.prototype.update = function () {
  //console.log( this.ritardoSuddivisione );
  
  if( this.ritardoSuddivisione !== 0 )
    this.ritardoSuddivisione--;			
  else {
    if( this.suddivisioneAvvenuta === false ) {
      this.sdoppiati();
    }
  }
  
  if( this.stato === Missile.ATTIVO && this.y <= this.yDiArrivo ) {
    this.x = this.xDiArrivo;
    this.y = this.yDiArrivo;
    this.stato = Missile.ESPLOSIONE;
  }
  if( this.stato === Missile.ATTIVO ) {
    this.x += this.dx;
    this.y += this.dy;
  } else {
    this.esplodi();
  }
};

function FrammentoMissile ( x, y ) {
  this.x = x;
  this.y = y;
}

// TAB 1

/**********
Ciao, caro.
Questo è un esempio di come è implementato il missile a testata multipla.
Usalo pure per migliorare i missili standard terrestri.
Saluti,
Zurlin
**********/

// Classe esempio di missili sdoppiabili 
function MissileTestataMultipla ( ) {
  this.obiettivoAgganciato;
} 

// Funzione per identificare l'obiettivo del missile.
// Assomiglia alla funzione miraBersaglio() del missile standard!
MissileTestataMultipla.prototype.identificaObiettivo = function ( obiettivi ) {
  // Esempio obiettivo = { x: 315, y: 145, tipo: "terrestre" }
  for( var i = 0; i < obiettivi.length; ++i ) {
    var obiettivo = obiettivi[i];
    if( obiettivo.tipo === "terrestre" ) {
      var x = obiettivo.x;
      var y = obiettivo.y;
      // Variabile contenente la quota a cui il missile si sdoppia.
      var altezza = this.calcolaAltezzaSdoppiamento( x, y );
      this.agganciaBersaglio( obiettivo );
      return altezza;
    }
  }
}

// Funzione per il calcolo della quota di sdoppiamento del missile.
MissileTestataMultipla.prototype.calcolaAltezzaSdoppiamento = function ( x, y ) {
  return (Math.abs(430 - y) / 2) + y;
}

// Funzione per agganciare l'obiettivo del missile.
MissileTestataMultipla.prototype.agganciaObiettivo = function ( obiettivo ) {
  this.obiettivoAgganciato = obiettivo;
}

// Funzione di detonazione del missile doppio.
// Come puoi notare il missile si divide in due frammenti.
// Assomiglia alla funzione esplodi() del missile standard!
MissileTestataMultipla.prototype.detonazione = function ( ) {
  // this.obiettivo.x + 10 e this.obiettivo.x - 10
  // permette di indirizzare il missile in due punti diversi,
  // uno a 10 unità a destra del bersaglio del missile originale
  // ed uno a 10 unità a sinistra del bersaglio del missile originale.
  var frammentoMissile1 = new FrammentoMissile( this.obiettivo.x + 10, this.obiettivo.y );
  var frammentoMissile2 = new FrammentoMissile( this.obiettivo.x - 10, this.obiettivo.y );
  // Variabile che contiene i frammenti del missile.
  var frammentiMissile = [];
  frammentiMissile.push( frammentoMissile1 );
  frammentiMissile.push( frammentoMissile2 );
  
  return frammentiMissile;
}

// TAB 2

/**********
Benvenuto nel file di configurazione missili standard del sistema Hob-2000.
In questo codice è possibile modificare diverse proprietà dei missili,
in particolare i bersagli mirati, gli obiettivi agganciati e l'esplosione.
**********/

// Classe che identifica il missile standard terrestre.
function MissileStandard ( ) { 
  this.bersaglioAgganciato;
}

// Funzione di identificazione del bersaglio
MissileStandard.prototype.miraBersaglio = function ( listaBersagli ) {
  // bersaglio = { appartieneNemico: true, x: 530, y: 95 }
  
  var numeroBersagli = listaBersagli.length;
  var i = 0;
  // Ciclo per la selezione dei bersagli di sparo.
  while( i <  numeroBersagli ) {
//###START_MODIFICABILE###
    var bersaglio = listaBersagli[i];
    if( bersaglio.appartieneNemico === true ) {
      var x = bersaglio.x;
      var y = bersaglio.y;
    
      var coordinateEsplosione = { esplosioneX: x, esplosioneY: y };
      this.agganciaObiettivo( bersaglio );
      
      return coordinateEsplosione.esplosioneY;
//###END_MODIFICABILE###
    }
    ++i;
  }
}

// Funzione di aggancio del bersaglio.
MissileStandard.prototype.agganciaObiettivo = function ( bersaglio ) {
  this.bersaglioAgganciato = bersaglio;
}

// Funzione di esplosione del missile standard.
MissileStandard.prototype.esplodi = function ( ) {
//###START_MODIFICABILE###
  var x = this.bersaglioAgganciato.x;
  var y = this.bersaglioAgganciato.y;
  return ( [ new FrammentoMissile( x, y ) ] );
//###END_MODIFICABILE###
}

// test
//var t1 =
/*
(
function ( ) {
  
  var esito = true;
  
  var missileUtente = new MissileStandard();
  x = rand(0, 200);
  y = rand(0, 100);
  var bersagli = [ { appartieneNemico: true, x: x, y: y} ];
  var ySdoppio = missileUtente.miraBersaglio( bersagli );
  var bersaglio = missileUtente.bersaglioAgganciato;
  var missiliFrammenti = missileUtente.esplodi();
  
  if( missiliFrammenti.length !== 2 ) {
    esito = false;
  }
  
  $.each( missiliFrammenti, function( i, m ) {
    if( ! m instanceof MissileNemicoFrammento )
      esito = false;
    
    if( ySdoppio !== (Math.abs(430 - y) / 2) + y)
      esito = false;
    
  } );

  return esito;
}
) ();*/