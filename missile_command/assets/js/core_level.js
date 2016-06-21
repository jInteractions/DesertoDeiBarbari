function CoreLevel () {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = this.canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
};

CoreLevel.prototype.creaMinacce = function () {  
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 10;
  for( var i = 0; i < numeroMissili; i++ ) {
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30,
      vel: rand( 80, 120 ) / 50,
      ritardoMassimo: 50
    }, bersagli, this.canvas.width ) );
  }
};

CoreLevel.prototype.setupListeners = function() {
  var mySelf = this;
  $( '.container' ).off();
  $( '.container' ).one( 'click', function() {
    mySelf.startLivello();
    $( '.container' ).on( 'click', function( event ) {
      mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, 1 );
    });
    $( '.container' ).on( 'mouseover', function( event ) {
      mySelf.coreGame.mirino.stato = Mirino.TRACCIAMENTO;
    });
    $( '.container' ).on( 'mouseout', function( ) {
      mySelf.coreGame.mirino.stato = Mirino.SPENTO;
    });
    $( '.container' ).on( 'mousemove', function( event ) {
      mySelf.coreGame.mirino.inseguiX = event.pageX - this.offsetLeft;
      mySelf.coreGame.mirino.inseguiY = event.pageY - this.offsetTop;
      mySelf.coreGame.mirino.cambiaMira();
    });
  });
};

CoreLevel.prototype.sparo = function ( x, y, indiceTorretta ) {
  if ( this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili !== 0 ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
      yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 12
    } ) );
    this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  }
};

CoreLevel.prototype.inizializzaLivello = function () { 
  var mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
  
  this.coreGame = new CoreGame( this.canvas, mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'yellow',
    coloreTestoPrimario: 'blue',
    coloreTestoSecondario: 'red'
  });
  
  var xIniziale = 80;
  for (var j = 0; j < 3; j++){
    this.coreGame.aggiungiBase( new Base( xIniziale,  430, true, 100, 'cyan' ) );
    xIniziale += 50;
  }
  xIniziale = 300;
  for (var j = 0; j < 3; j++){
    this.coreGame.aggiungiBase( new Base( xIniziale, 430, true, 100, 'cyan' ) );
    xIniziale += 50;
  }
  
  var colori = [ 'red', 'blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red' ];
  
  this.coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 35, 410, 10, 10, colori ) );
  this.coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 255, 410, 10, 10, colori ) );
  this.coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 475, 410, 10, 10, colori ) );
  this.creaMinacce();
  this.setupListeners();
};

CoreLevel.prototype.startLivello = function () {
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop.bind( this, this.coreGame ), 1000 / fps );
};

CoreLevel.prototype.stopLivello = function () {
  clearInterval( this.timerProssimoFrame );
};

CoreLevel.prototype.mainLoop = function ( cg ) {
  cg.prossimoFrame();
};

$(document).ready( function () {
  var coreLevel = new CoreLevel();
  coreLevel.inizializzaLivello();
} )