function Livello6 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello6.prototype = Object.create( CoreLevel.prototype );
Livello6.prototype.constructor = Livello6;

Livello6.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 1;
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, areaPertenza );
    velRand = rand( 1, 1.5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
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
  azionamentoComandiPlancia( '.gameContainer', this.coreGame.batterieAntimissile, this.coreGame.mirino,
                           this );
  
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
  torretta.munizioni--;
  torretta.temperatura += 50;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 899 ) {
    torretta.blocco = true;
  };
}

var azionaComandoSparo = function ( chiamante, torrettaSelezionata, sistema, x, y ) {
  sistema.sparo( x, y, torrettaSelezionata );
}
  
// TAB 1

var azionamentoComandiPlancia = function ( planciaComanda, torrette, mirino, sistema ) {
  // Comandi plancia azionati da tastiera
  $( planciaComanda ).bind( 'keyup', function ( tastoPremuto ) {
    var torrettaSelezionata;
    if( tastoPremuto.which === 49 ) // tasto 1
      torrettaSelezionata = torrette[0];
    if( tastoPremuto.which === 50 ) // tasto 2
      torrettaSelezionata = torrette[1];
    if( tastoPremuto.which === 51 ) // tasto 3
      torrettaSelezionata = torrette[2];
    
    var x = mirino.x;
    var y = mirino.y;
    
    azionaComandoSparo( 'keyup', torrettaSelezionata, sistema, x, y );
  } );
  
  //###START_MODIFICABILE###
  // Comandi plancia azionati da click del mouse
  $( planciaComanda ).on( 'click', function ( ) {

  } );
  //###END_MODIFICABILE###
}

// test

/*( 
  function () {
    return true;
  }
) ();*/

// TAB 2

var torrettaVicina = function ( torrette, x, y ) {
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
  
  if( nonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[1];
  if( nonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[0];
  if( nonFunzionante(torrettaSelezionata) )
    torrettaSelezionata = torrette[2];
  
  return torrettaSelezionata;
}

var nonFunzionante = function ( torretta ) {
  if( torretta.stato === BatteriaAntimissile.ATTIVA &&
      torretta.munizioni > 0 &&
      torretta.blocco === false )
    return true;
  else
    return false;
}


/*
var torrettaSelezionata;
var x = mirino.x;
var y = mirino.y;

torrettaSelezionata = torrettaVicina( torrette, x, y )
azionaComandoSparo( 'click', torrettaSelezionata, sistema, x, y );
*/