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

CoreLevel.prototype.setupListeners = function( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  $( '.gameContainer' ).bind( 'keyup', function( event ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, event.which );
  });
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

CoreLevel.prototype.scegliTorretta = function ( x, y, tasto ) {
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



var x = function ( torrette ) {
  $( planciaComanda ).bind( 'keyup', function ( ) {
    var torrettaSelezionata;
    if( tastoPremuto === '1' )
      torrettaSelezionata = torrette[0];
    if( tastoPremuto === '2' )
      torrettaSelezionata = torrette[1];
    if( tastoPremuto === '3' )
      torrettaSelezionata = torrette[2];
    
    var x = mirino.x;
    var y = mirino.y;
    
    azionaComandoSparo( torrettaSelezionata, x, y );
  } );
  
  $( planciaComanda ).on( 'click', function ( ) {
    // Non fa nulla
  } )  
}

var torrettaVicina = function ( torrette, x, y ) {
  var torrettaSelezionata;
  
  if( 0 <= x && x <= 170 )
    torrettaSelezionata = torrette[0];
  if( 0 <= x && x <= 170 )
    torrettaSelezionata = torrette[1];
  if( 0 <= x && x <= 170 )
    torrettaSelezionata = torrette[2];  
}










