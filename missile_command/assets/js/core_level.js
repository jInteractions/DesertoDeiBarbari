function CoreLevel ( callbackFineLivello ) {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = this.canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
  this.mirino;
  this.callbackFineLivello = callbackFineLivello;

  this.numeroOndata = 1;

  // Parametri di disegno schermata iniziale
  this.numeroSchermata = 0;  
};

CoreLevel.prototype.inizializzaLivello = function ( numeroOndata ) {
  var mySelf = this;
  
  this.numeroOndata = numeroOndata;
  
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
  
  if( this.numeroOndata === 1 ) {
    this.inizializzaBasi();
  } else {
    $.each( this.basi, function ( indice, base ) {
      base.coreGame = mySelf.coreGame
    } );
    mySelf.coreGame.basi = mySelf.basi;
  }
  
  this.inizializzaArmiNemiche();
  this.inizializzaArmiTerrestri();
}

// Funzioni base di CoreLevel

CoreLevel.prototype.inizializzaBasi = function () {
  this.coreGame.aggiungiBase( new Base( 80,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 180,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new Base( 130,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 350,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 400,  430, true, 100, 'cyan', this.coreGame ) );
};

CoreLevel.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
};

CoreLevel.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue'];
  var nMissili = coloreMissili.length;
  var nSoldati = 10;
  var Tmin = 50;
  var Tmax = 1000;
  var deltaTempo = 70;
  var deltaRaffreddamento = 3;
  
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
};

CoreLevel.prototype.preparazioneAvvio = function () {
  this.startLivello();
}

CoreLevel.prototype.mostraSchermataIniziale = function () {
  var mySelf = this;
  mySelf.coreGame.disegnaStatoGioco();
  mySelf.coreGame.disegnaBatterieAntimissile();
  this.intervalloSchermata = setInterval( function () {
    mySelf.coreGame.disegnaStatoGioco();
    mySelf.coreGame.disegnaBatterieAntimissile();
    if( mySelf.numeroSchermata === 0 ) {
      var ctx = mySelf.ctx;
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoPrimario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( 'CLICK PER INIZIARE A GIOCARE', 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 );
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 );
      ctx.textAlign = "start";
    } else {
            
    }
    mySelf.numeroSchermata = (mySelf.numeroSchermata + 1) % 2;
  }, 500 );
  
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    clearInterval( mySelf.intervalloSchermata );
    mySelf.preparazioneAvvio();
  } );                     
}

CoreLevel.prototype.mostraSchermataGameOver = function () {
  var ctx = this.ctx;
  var mySelf = this;
  ctx.fillStyle = this.coreGame.coloreTestoPrimario;
  ctx.textAlign = "center"; 
  ctx.font = 'bold 20px arial';
  ctx.fillText( 'HAI PERSO', this.canvas.width/2, this.canvas.height/2 - 20 );
  ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  console.log( this.numeroOndata );
  ctx.fillText( 'Ondata ' + this.numeroOndata, this.canvas.width/2, this.canvas.height/2 + 20 );
  ctx.textAlign = "start";
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    console.log( "click" );
    mySelf.mostraSchermataIniziale();
  } );
}

CoreLevel.prototype.inizializzaArmiTerrestri = function () {}

CoreLevel.prototype.inizializzaArmiNemiche = function () {}

CoreLevel.prototype.startLivello = function ( ) {
  this.setupListeners();
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop.bind( this ), 1000 / fps );
};

CoreLevel.prototype.stopLivello = function ( ) {
  clearInterval( this.timerProssimoFrame );
  $( '.gameContainer' ).off();
};

CoreLevel.prototype.proceduraFineOndata = function () {
  var cg = this.coreGame;
  
  this.basi = this.coreGame.basi;
  
  cg.calcoloMissiliRimasti();
  cg.calcoloBatterieSalvate( 2 );
  
  var risultatoOndata = {
    esito: this.verificaFineLivello(),
    punteggio: cg.punteggio,
    missiliAbbattuti: cg.punteggioMissiliAbbattuti,
    missiliRimasti: cg.punteggioMissiliRimasti,
    minacceAbbattute: cg.punteggioMinacceAbbattute,
    torretteSalvate: cg.punteggioTorretteSalvate,
    missiliSparati: cg.punteggioMissiliSparati,
    morti: cg.punteggioMorti
  };
  
  this.callbackFineLivello( risultatoOndata );
}

CoreLevel.prototype.mainLoop = function () { 
  var esito = this.verificaFineLivello();
  if ( esito === false ) {
    this.stopLivello();
    this.mostraSchermataGameOver();
    this.proceduraFineOndata();
  } else if ( esito === true ) {
    this.stopLivello();
    this.proceduraFineOndata();
  }
  
  if ( esito === undefined ) {
    this.coreGame.prossimoFrame();
  }
};

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
  }, this.coreGame ) );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += 150;
};

CoreLevel.prototype.verificaFineLivello = function ( ) {
  if ( this.coreGame.missiliNemici.length === 0 ) {
    var basiAttive = this.coreGame.basi.filter( function ( base ) {
      return base.attiva === true 
    } );
    if( basiAttive.length === 0 )  {
      return false;
    } else {
      return true;
    }
  }
  return undefined;
}

CoreLevel.prototype.calcolaCoefficienteOndata = function () {
  return 1.0; // default
}

// Il codice sottostante dovrà essere spostato
/*
var oldConsole = console;

var console = {};
console.log = function ( stringa ) {
  oldConsole.log(stringa);
  // Qui ci sarà la "append" di codice html al terminale
}*/

$(document).ready( function () {  
  var callback = function ( risultatoOndata ) {
    if( risultatoOndata.esito === true ) {
      ++nOndata;
      coreLevel.inizializzaLivello(nOndata);
      coreLevel.mostraSchermataIniziale();
    } else {
      coreLevel.inizializzaLivello(1);
      coreLevel.mostraSchermataGameOver();
    }
  }
  
  var livello = jsonLivello;
  
  var jsonLivello = {
    "nomeLivello": "Livello 3",
    "numeroLivello": 0,
    "costoAiuti": 200,

    "dialogoIniziale": [
      { "nome": "",
        "testo": "" },
      { "nome": "",
        "testo": "" }
    ],

    "dialogoFinale": [
      { "nome": "",
        "testo": "" },
      { "nome": "",
        "testo": "" }
    ],

    "codiceLivello": "function Livello3 ( callbackFineLivello ) {\n  CoreLevel.call( this, callbackFineLivello );\n}\n\nLivello3.prototype = Object.create( CoreLevel.prototype );\nLivello3.prototype.constructor = Livello3;\n\nLivello3.prototype.inizializzaArmiNemiche = function ( ) {\n  var areaPertenza = this.coreGame.canvas.width;\n  var ritardoMassimo = 100;\n  var xRand;\n  var velRand;\n  var ritardoRand;\n  var bersagli = this.coreGame.bersagliAttaccabili();\n  var numeroMissili = 1;\n  \n  for( var i = 0; i < numeroMissili ; i++ ) {\n    xRand = rand( 0, areaPertenza );\n    velRand = rand( 1, 1.5 );\n    ritardoRand = rand( 0, ritardoMassimo );\n    this.coreGame.missiliNemici.push( new MissileNemico( {\n      coloreTestata: 'yellow',\n      coloreScia: 'red',\n      massimoRaggioEsplosione: 30\n    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );\n  }\n}\n\nLivello3.prototype.calcolaCoefficienteOndata = function ( ) {\n  return this.numeroOndata * 1.2;\n}\n\nCoreLevel.prototype.inizializzaTorrette = function ( ) {\n  var coloreMissili = [];\n  var nSoldati = 10;\n  var Tmin = 50;\n  var Tmax = 1000;\n  var deltaTempo = 70;\n  var deltaRaffreddamento = 3;\n  var nMissili = 0;\n  \n  \/\/ Inizializzo munizioni per torrette\n  this.munizioni = [];\n  this.munizioni[0] = [];\n  this.munizioni[1] = [];\n  this.munizioni[2] = [];\n  \n  this.munizioni[0] = meccanismoCaricamento();\n  this.munizioni[1] = meccanismoCaricamento();\n  this.munizioni[2] = meccanismoCaricamento();\n  \n  var scegliColoreMissile = function ( tipo ) {\n    switch( tipo ) { \n      case 'plutonio': return '#33CCFF';\n      case 'plasma': return 'blue';\n      case 'sonico': return 'red';\n    }\n  }\n  \n  coloreMissili = [];\n  nMissili = (this.munizioni[0]).length;\n  $.each( this.munizioni[0], function ( i, m ) {\n    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );    \n  } );\n  this.coreGame.aggiungiBatteriaAntimissile(\n    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )\n  );\n  \n  coloreMissili = [];\n  nMissili = (this.munizioni[1]).length;\n  $.each( this.munizioni[1], function ( i, m ) { \n    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );\n  } );\n  this.coreGame.aggiungiBatteriaAntimissile(\n    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )\n  );\n  \n  coloreMissili = [];\n  nMissili = (this.munizioni[2]).length;\n  $.each( this.munizioni[2], function ( i, m ) { \n    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );\n  } );\n  this.coreGame.aggiungiBatteriaAntimissile(\n    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )\n  );\n};\n\nLivello3.prototype.scegliTorretta = function ( x, y, tasto ) {\n  var indiceTorretta = 0;\n  switch(tasto) {\n    case 49: indiceTorretta = 0; break;\n    case 50: indiceTorretta = 1; break;\n    case 51: indiceTorretta = 2; break;\n    default: return -1;\n  }\n  \n  var torrettaAttuale = this.coreGame.batterieAntimissile[ indiceTorretta ];\n  \n  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA \n      && torrettaAttuale.numeroMissili > 0 \n      && torrettaAttuale.blocco === false )  \n    return indiceTorretta;\n  \n  return -1;\n};\n\nLivello3.prototype.sparo = function ( x, y, tasto ) {\n  var indiceTorretta = this.scegliTorretta( x, y, tasto );\n  \n  if( indiceTorretta === -1 )\n    return;\n  \n  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];\n  var n = torretta.numeroMissili - 1;\n  var missile;\n  \n  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'plutonio' ) {\n    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n      xDiPartenza: torretta.x,\n      yDiPartenza: torretta.y,\n      xDiArrivo: x,\n      yDiArrivo: y,\n      coloreTestata: 'yellow',\n      coloreScia: '#33CCFF',\n      massimoRaggioEsplosione: 30,\n      distanzaPerFrame: 0.5\n    }, this.coreGame ) );\n  }\n  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'sonico' ) {\n    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n      xDiPartenza: torretta.x,\n      yDiPartenza: torretta.y,\n      xDiArrivo: x,\n      yDiArrivo: y,\n      coloreTestata: 'yellow',\n      coloreScia: 'red',\n      massimoRaggioEsplosione: 2,\n      distanzaPerFrame: 8\n    }, this.coreGame ) );\n  }\n  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'plasma' ) {\n    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n      xDiPartenza: torretta.x,\n      yDiPartenza: torretta.y,\n      xDiArrivo: x,\n      yDiArrivo: y,\n      coloreTestata: 'yellow',\n      coloreScia: 'blue',\n      massimoRaggioEsplosione: 20,\n      distanzaPerFrame: 7\n    }, this.coreGame ) );\n  }\n  \n  this.coreGame.aggiornaPunteggioMissiliSparati();\n  torretta.numeroMissili--;\n  torretta.temperatura += 200;\n  var temperaturaMinima = this.calcolaTempMinima( torretta.temperatura );\n  torretta.temperaturaSblocco = temperaturaMinima;\n  if( torretta.temperatura >= 799 ) {\n    torretta.blocco = true;\n  }\n}\n\n\/\/ interfaccia test - codice TAB 1\n\nvar _tipo = ['plasma', 'plutonio', 'sonico'];\nvar _numeroMunizioni; \nvar _munizioni = [];\n\nvar prelevaCarico = function( ) {\n  var nMunizioniPlutonio = rand( 0, 3 );\n  var nMunizioniSoniche = 3 - nMunizioniPlutonio;\n  \n  _numeroMunizioni = 10 + 3;\n  _munizioni = [];\n  for( _i = 0; _i < _numeroMunizioni; ++_i ) {\n    var t = _tipo[0];\n    \n    var x = rand(0, 2);\n    if ( x === 1 && nMunizioniPlutonio > 0 ) { \n      t = _tipo[x]; nMunizioniPlutonio--; \n    }\n    if ( x === 2 && nMunizioniSoniche > 0 ) { \n      t = _tipo[x]; nMunizioniSoniche--; \n    }\n    _munizioni[_i] = { id: _i, nucleoEsplosivo: t };\n  }\n  \n  return _munizioni;\n}\n\n\/\/ interfaccia test - codice TAB 2\n\nLivello3.prototype.calcolaTempMinima = function ( T ) {\n  _temperatura = T\n  _deltaTemperatura = 1;\n  _contatoreCicli = 0;\n  sistemaRaffreddamento();\n  return _temperatura;\n}\n\nvar _temperatura;\nvar _contatoreCicli;\nvar _deltaTemperatura;\nvar rilevaTemperatura = function ( ) {\n  return _temperatura;\n}\n\nvar azionaPompeRaffreddamento = function ( ) {\n  _temperatura -= _deltaTemperatura;\n  _contatoreCicli++;\n}",

    "manuale": "",

    "fileVirtuali": [
      { "nomeFile": "MeccanismoCaricamento.js",
        "consultazione": false,
        "codice": "var meccanismoCaricamento = function ( ) {\n  var magazzino = prelevaCarico();\n  var caricatoreTorretta = [];\n  var proiettiliScartati = [];\n  \n  \/\/###START_MODIFICABILE###\n  for( i = 8; i < magazzino.length; ++i ) {\n    var proiettile = magazzino[i];\n    \n    if( proiettile.nucleoEsplosivo === 'plutonio' ) {\n      caricatoreTorretta.push( proiettile );\n    }\n    \n    if( proiettile.nucleoEsplosivo === 'plasma' ) {\n      caricatoreTorretta.push( proiettile  );\n    }\n    \n    if( proiettile.nucleoEsplosivo === 'sonico' ) {\n      caricatoreTorretta.push( proiettile );\n    }\n    \n    if( caricatoreTorretta.length >= 10 )\n      break;\n  }\n  \/\/###END_MODIFICABILE###\n  \n  return caricatoreTorretta;\n}",
        "test": "(\nfunction () {\n  var munizioni = meccanismoCaricamento();\n  var unici = []; \n  var esito = true;\n\n  $.each( munizioni, function ( i, m ) {\n    if( _munizioni.indexOf( m ) < 0 ) { esito = false; }\n    if( m.nucleoEsplosivo !== 'plasma') { esito = false; }\n    if( unici[m.id] !== undefined ) { esito = false; }\n    \n    unici[m.id] = true;\n  });\n  return esito;\n} ) ();",
        "descrizione": "Il sistema di caricamento dei missili dal magazzino al caricatore della torretta ha un problema: la partita di missili con nucleo esplosivo sonico o a base di plutonio è difettosa. Queste munizioni non devono essere assolutamente caricarate!",
        "aiuto": "",
        "messaggioFallimento": ""
      },

      { "nomeFile": "SistemaRaffreddamento.js",
        "consultazione": false,
        "codice": "var sistemaRaffreddamento = function ( ) {\n  T = rilevaTemperatura();\n  \/\/###START_MODIFICABILE###\n  var sogliaTemperaturaMinima = 500;\n  \/\/###END_MODIFICABILE###\n  \n  if( T >= 799 ) {\n    \/\/###START_MODIFICABILE###\n    while( T === sogliaTemperaturaMinima ) {\n      azionaPompeRaffreddamento();\n      T = rilevaTemperatura();\n    }\n    \/\/###END_MODIFICABILE###\n  }\n}",
        "test": "( function () {\n  var esito = true;\n  \n  _deltaTemperatura = 1;\n  _temperatura = 799;\n  _contatoreCicli = 0;\n  sistemaRaffreddamento();\n  if( _temperatura + _contatoreCicli === 799 )\n    esito = true;\n  else\n    esito = false;\n  \n  return esito; }\n) ();",
        "descrizione": "Bisogna ripristinare il sistema di refrigerazione sulle torrette. Appena queste superano un soglia di temperatura è necessario bloccarle per poter attivare il meccanismo in grado di raffreddarle rapidamente.",
        "aiuto": "",
        "messaggioFallimento": ""
      }
    ]
  }
  
  //window.eval( jsonLivello.codiceLivello );
  
  var caricaCodice = new CaricaCodice( jsonLivello.fileVirtuali );
  // caricaCodice.aggiornaCodiceUtente();
  //var e = caricaCodice.validazioneCodiceUtente();
  //console.log(e);
  
  nOndata = 1;
  //if(e.erroriCiclo.length === 0 
    // && e.erroriSintassi.length === 0
     //&& e.erroriParole.length === 0 ) {
    //esiti = caricaCodice.esecuzioneTest();
    //console.log( esiti );
    var coreLevel = new Livello3( callback );
    coreLevel.inizializzaLivello( nOndata );
    coreLevel.mostraSchermataIniziale();
  //}
} );