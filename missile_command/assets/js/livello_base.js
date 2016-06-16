function CoreLevel () {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
};

CoreLevel.prototype.creaMinacce = function () {
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 40;
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
  $( '.container' ).off();
  $( '.container' ).one( 'click', function() {
    startLivello();
    $( '.container' ).on( 'click', function( event ) {
      sparoDelGiocatore( coreGame.mirino.x, coreGame.mirino.y );
    });
    $( '.container' ).on( 'mouseover', function( event ) {
      coreGame.mirino.stato = Mirino.TRACCIAMENTO;
    });
    $( '.container' ).on( 'mouseout', function( ) {
      coreGame.mirino.stato = Mirino.SPENTO;
    });
    $( '.container' ).on( 'mousemove', function( event ) {
      coreGame.mirino.inseguiX = event.pageX - this.offsetLeft;
      coreGame.mirino.inseguiY = event.pageY - this.offsetTop;
      coreGame.mirino.cambiaMira();
    });
  });
};

CoreLevel.prototype.sparo = function ( x, y, indiceTorretta ) {
  this.coreGame.aggiornaMissiliTerrestri( new MissileTerrestre( {
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
    coreGame.aggiungiBase( new Base( xIniziale,  430, true, 100, 'cyan' ) );
    xIniziale += 50;
  }
  xIniziale = 300;
  for (var j = 0; j < 3; j++){
    coreGame.aggiungiBase( new Base( xIniziale, 430, true, 100, 'cyan' ) );
    xIniziale += 50;
  }
  
  var colori = [ 'red', 'blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red' ];
  
  coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 35, 410, 10, 10 colori ) );
  coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 255, 410, 10, 10 colori ) );
  coreGame.aggiungiBatteriaAntimissile ( new BatteriaAntimissile( 475, 410, 10, 10 colori ) );
  this.creaMinacce();
  this.setupListeners();
  this.startLivello();
};

CoreLevel.prototype.startLivello = function () {
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop, 1000 / fps );
};

CoreLevel.prototype.stopLivello = function () {
  clearInterval( this.timerProssimoFrame );
};

CoreLevel.prototype.mainLoop = function () {
  this.coreGame.prossimoFrame();
};