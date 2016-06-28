function CoreLevel ( callbackFineLivello, numeroOndata ) {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = this.canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
  this.mirino;
  this.callbackFineLivello = callbackFineLivello;
  this.numeroOndata = numeroOndata;
};

// Funzioni base di CoreLevel

CoreLevel.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
};

CoreLevel.prototype.inizializzaTorrette = function () {};

CoreLevel.prototype.inizializzaBasi = function () {
  this.coreGame.aggiungiBase( new Base( 80,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 130,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 180,  430, true, 100, 'cyan' ) );  
  this.coreGame.aggiungiBase( new Base( 300,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 350,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 400,  430, true, 100, 'cyan' ) );
};

CoreLevel.prototype.inizializzaLivello = function () { 
  this.inizializzaMirino();
  this.coreGame = new CoreGame( this.canvas, this.mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'yellow',
    coloreTestoPrimario: 'blue',
    coloreTestoSecondario: 'red'
  });
  var coeff = this.calcolaCoefficienteOndata();
  this.coreGame.aggiornaCoefficienteOndata( coeff );
  this.inizializzaTorrette();
  this.inizializzaBasi();
  this.inizializzaArmiNemiche();
  this.inizializzaArmiTerrestri();
  this.setupListeners();
};

CoreLevel.prototype.inizializzaArmiTerrestri = function () {}

CoreLevel.prototype.inizializzaArmiNemiche = function () {}

CoreLevel.prototype.startLivello = function ( ) {
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop.bind( this, this.coreGame ), 1000 / fps );
};

CoreLevel.prototype.stopLivello = function ( ) {
  clearInterval( this.timerProssimoFrame );
};

CoreLevel.prototype.mainLoop = function ( cg ) {
  cg.prossimoFrame();
  if( this.verificaFineLivello( ) !== undefined ) {
    this.stopLivello();
    this.schermataFineLivello();
    this.callbackFineLivello( esito );
  }
};

CoreLevel.prototype.setupListeners = function( ) {
  var mySelf = this;
  $( '.container' ).off();
  $( '.container' ).one( 'click', function() {
    mySelf.startLivello();
    $('.container').focus();
    $( '.container' ).bind( 'keyup', function( event ) {
      mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, event.which );
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

CoreLevel.prototype.scegliTorretta = function ( x, y, tasto ) {
  var indiceTorretta = 0;
  switch(tasto) {
    case 49: indiceTorretta = 0; break;
    case 50: indiceTorretta = 1; break;
    case 51: indiceTorretta = 2; break;
    default: return -1;
  }
  
  var torrettaAttuale = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA && torrettaAttuale.numeroMissili > 0 ) {
    return indiceTorretta;
  }
  
  return -1;
};

CoreLevel.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  
  if( indiceTorretta === -1 )
    return;
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 30,
    distanzaPerFrame: 7
  } ) );
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += 150;
};

CoreLevel.prototype.verificaFineLivello = function () {}

CoreLevel.prototype.calcolaCoefficienteOndata = function () {
  return 1; // default
}

// Il codice sottostante dovrà essere spostato
var oldConsole = console;

var console = {};
console.log = function ( stringa ) {
  oldConsole.log(stringa);
  // Qui ci sarà la "append" di codice html al terminale
}

$(document).ready( function () {
  var livello = jsonLivello;
  var caricaCodice = new CaricaCodice( [ {
      nomeFile: "Autenticazione.js",
      codiceUtente: "function Autenticazione () {\n\t\n}\n\nAutenticazione.prototype.autenticati = function ( username, password ) {\n\tif(username == \"SWAG\" && password == \"bellofigo\")\n\t\treturn true;\n\telse\n\t\treturn false;\n}",
      test: "(function () {\n\tvar a = new Autenticazione();\n\treturn a.autenticati(\"SWAX\", \"bellogianda\");\n}) ();",
    }, {
      nomeFile: "Autenticazione.js",
      codiceUtente: "var x = function () {for (var i = 0; i < 10; i++) { i++; } };",
      test: "x();",
  } ] );
  caricaCodice.aggiornaCodiceUtente();
  var e = caricaCodice.validazioneCodiceUtente();
  console.log(e);
  
  if(e.erroriCiclo.length === 0) {
    esiti = caricaCodice.esecuzioneTest();
    var coreLevel = new Livello1();
    coreLevel.inizializzaLivello();
  }
} );