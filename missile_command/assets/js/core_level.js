function CoreLevel ( ) {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = this.canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
};

// Funzioni base di CoreLevel
CoreLevel.prototype.inizializzaLivello = function ( ) { 
  var mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
  this.coreGame = new CoreGame( this.canvas, mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'yellow',
    coloreTestoPrimario: 'blue',
    coloreTestoSecondario: 'red'
  });
  this.coreGame.aggiungiBase( new Base( 80,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 130,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 180,  430, true, 100, 'cyan' ) );  
  this.coreGame.aggiungiBase( new Base( 300,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 350,  430, true, 100, 'cyan' ) );
  this.coreGame.aggiungiBase( new Base( 400,  430, true, 100, 'cyan' ) );
    
  var coloreMissili = [ 'red', 'blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red' ];
  
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new BatteriaAntimissile( 35, 410, 10, 10, coloreMissili, 50, 1000, 70, 10 ) );  
  
  
  var opzioniBatteria = { x: 255, 
                          y: 410, 
                          nMissili: 10, 
                          nSoldati: 10, 
                          colori: coloreMissili, 
                          Tmin: 50, 
                          Tmax: 1000, 
                          deltaTempo: 70, 
                          deltaRaffreddamento: 3};
  var filtro = function ( missile ) {
    return ( missile.y > 10 && missile instanceof MissileNemico);
  };
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new TorrettaAutomatica( 0, opzioniBatteria, 500, false, filtro, 15, 10, 'blue', this.coreGame) );
    
  //this.coreGame.aggiungiBatteriaAntimissile ( 
  //  new BatteriaAntimissile( 255, 410, 10, 10, coloreMissili, 50, 1000, 70, 10 ) );
  
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new BatteriaAntimissile( 475, 410, 10, 10, coloreMissili, 50, 1000, 70, 10 ) );
  this.creaMinacce();
  this.setupListeners();
};

CoreLevel.prototype.startLivello = function ( ) {
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop.bind( this, this.coreGame ), 1000 / fps );
  
  this.coreGame.missiliTerrestri.push( new MissileNucleare( 255, 410, 255, this.coreGame.minacce[ 0 ].y + 53 ) );
};

CoreLevel.prototype.stopLivello = function ( ) {
  clearInterval( this.timerProssimoFrame );
};

CoreLevel.prototype.mainLoop = function ( cg ) {
  cg.prossimoFrame();
};

// Funzioni proprie del livello
CoreLevel.prototype.creaMinacce = function ( ) {
  var ampiezzaAreaPertenza = 50;
  var ritardoMassimo = 0;
  var xRand;
  var velRand;
  var ritardoRand;
  
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 10;
  for( var i = 0; i < numeroMissili / 2 ; i++ ) {
    xRand = rand( 0, ampiezzaAreaPertenza );
    velRand = rand( 2, 2 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand) );
  }
  
  for( var i = numeroMissili / 2; i < numeroMissili; i++ ) {
    xRand = rand( this.canvas.width - ampiezzaAreaPertenza, this.canvas.width );
    velRand = rand( 2, 2 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand) );
  }
  
  // aggiunta astronave nemica
  var astronaveNemica = new AstronaveNemica( this.ctx );
  this.coreGame.aggiungiMinaccia( astronaveNemica ); 
  
  
  var opzioniBatteria = { x: astronaveNemica.x + 40, 
                          y: astronaveNemica.y + 53, 
                          nMissili: 10, 
                          nSoldati: 10, 
                          colori: [], 
                          Tmin: 50, 
                          Tmax: 1000, 
                          deltaTempo: 70, 
                          deltaRaffreddamento: 3};
  var filtro = function ( missile ) {
    return ( missile.y < 500 && missile.y > astronaveNemica.y && missile instanceof MissileTerrestre );
  };
  //this.coreGame.aggiungiBatteriaAntimissile ( 
  //  new TorrettaAutomatica( 0, opzioniBatteria, 100, false, filtro, 5, 15, 'red', this.coreGame) );
  
  var opzioniBatteria = { x: astronaveNemica.x + 260, 
                          y: astronaveNemica.y + 53, 
                          nMissili: 10, 
                          nSoldati: 10, 
                          colori: [], 
                          Tmin: 50, 
                          Tmax: 1000, 
                          deltaTempo: 70, 
                          deltaRaffreddamento: 3};
  //this.coreGame.aggiungiBatteriaAntimissile ( 
  //  new TorrettaAutomatica( 0, opzioniBatteria, 300, false, filtro, 5, 15, 'red', this.coreGame) );
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
  
  if ( this.coreGame.batterieAntimissile[ indiceTorretta ].stato === BatteriaAntimissile.ATTIVA ) {
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

// Il codice sottostante dovrà essere spostato
$(document).ready( function () {
  
  var livello = jsonLivello;
  
  var caricaCodice = new CaricaCodice( [ {
                                          nomeFile:
                                            "Autenticazione.js",
                                          codiceUtente:
                                            "function Autenticazione () {\n\t\n}\n\nAutenticazione.prototype.autenticati = function ( username, password ) {\n\tif(username == \"SWAG\" && password == \"bellofigo\")\n\t\treturn true;\n\telse\n\t\treturn false;\n}",
                                          test:
                                            "(function () {\n\tvar a = new Autenticazione();\n\treturn a.autenticati(\"SWAX\", \"bellogianda\");\n}) ();",
                                        }, {
                                          nomeFile:
                                            "Autenticazione.js",
                                          codiceUtente:
                                            "var x = function () {for (var i = 0; i < 10; i++) { i++; } };",
                                          test:
                                            "x();",
                                        } ] );
  caricaCodice.aggiornaCodiceUtente();
  var e = caricaCodice.validazioneCodiceUtente();
  console.log(e);
  
  if(e.erroriCiclo.length === 0) {
    esiti = caricaCodice.esecuzioneTest();
    var coreLevel = new CoreLevel();
    coreLevel.inizializzaLivello();
  }
  
} );