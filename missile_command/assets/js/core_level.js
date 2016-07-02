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
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
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
  ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  ctx.textAlign = "center"; 
  ctx.font = 'bold 30px arial';
  ctx.fillText( 'HAI PERSO', this.canvas.width/2, this.canvas.height/2 );
  //ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  //ctx.fillText( 'Ondata ' + mySelf.numeroOndata, this.canvas.width/2, this.canvas.height/2 + 20 );
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
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA 
      && torrettaAttuale.numeroMissili > 0 
      && torrettaAttuale.blocco === false )  
    return indiceTorretta;
  
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

    "codiceLivello": "function Livello4 ( callbackFineLivello ) {\n  CoreLevel.call( this, callbackFineLivello );\n}\n\nLivello4.prototype = Object.create( CoreLevel.prototype );\nLivello4.prototype.constructor = Livello4;\n\nLivello4.prototype.inizializzaMirino = function () {\n  this.mirino = new Mirino( this.canvas.width \/ 2, this.canvas.height \/ 2, 10.0 );\n}\n\nLivello4.prototype.inizializzaArmiNemiche = function () {\n  var batteria;\n  \n  hackingPassword();\n  \n  if ( _login === false ) {\n    console.log(\"\\n> Autenticazione per salvataggio modifiche al sistema Ibrido non riuscita.\");\n  } else {\n    console.log(\"\\n> Autenticazione per il salvataggio modifiche al sistema Ibrido riuscita.\")\n  }\n  \n  if ( controlloArmaNemicaSabotata() === true && _login === true ) {\n    batteria = controlloInizializzazioneBatteriaAntiterrestri();\n  } else {\n    batteria = new BatteriaAntiterrestre();\n  } \n  \n  var areaPertenza = this.coreGame.canvas.width;\n  var ritardoMassimo = batteria.tempoRicaricaMassimo;\n  var xRand;\n  var velRand;\n  var ritardoRand;\n  var bersagli = this.coreGame.bersagliAttaccabili();\n  var numeroMissili = batteria.numeroMissili;\n  \n  var raggio = 10;\n  \n  if ( batteria.tipoMunizione === \"massima_esplosione\" ) {\n    raggio = 30;\n  }\n  \n  for( var i = 0; i < numeroMissili ; i++ ) {\n    xRand = rand( 0, areaPertenza );\n    velRand = rand( 1, batteria.propellente );\n    ritardoRand = rand( 0, ritardoMassimo );\n    this.coreGame.missiliNemici.push( new MissileNemico( {\n      coloreTestata: 'yellow',\n      coloreScia: 'red',\n      massimoRaggioEsplosione: raggio\n    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );\n  }\n}\n\nLivello4.prototype.sparo = function ( x, y, tasto ) {\n  var indiceTorretta = this.scegliTorretta( x, y, tasto);\n  var raggio = 30;\n  var vel = 7;\n  var incrementoTemperatura = 150;\n  \n  if( indiceTorretta === -1 ) {\n    return;\n  }\n  \n  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,\n    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,\n    xDiArrivo: x,\n    yDiArrivo: y,\n    coloreTestata: 'yellow',\n    coloreScia: 'blue',\n    massimoRaggioEsplosione: raggio,\n    distanzaPerFrame: vel\n  }, this.coreGame ) );\n  this.coreGame.aggiornaPunteggioMissiliSparati();\n  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;\n  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;\n}\n\nLivello4.prototype.calcolaCoefficienteOndata = function () {\n  return this.numeroOndata * 1.2;\n}\n\n\/\/ interfaccia test - codice utente\nfunction BatteriaAntiterrestre () {\n  this.tempoRicaricaMassimo = 100;\n  this.propellente = 5;\n  this.numeroMissili = 20;\n  this.tipoMunizione = \"massima_efficacia\";\n}\n\nvar controlloArmaNemicaSabotata = function () {\n  var arma = new ArmaNemicaSabotata();\n  var risultato = true;\n  if ( arma.tempoRicaricaMassimo < 150 ) {\n    console.log( \"\\n> Attenzione: tempo di ricarica troppo basso!\" );\n    risultato = false;\n  }\n  if ( arma.tempoRicaricaMassimo > 200 ) {\n    console.log( \"\\n> Attenzione: tempo di ricarica troppo alto!\" );\n    risultato = false;\n  }\n  if ( arma.propellente < 3 ) {\n    console.log( \"\\n> Attenzione: propellente obsoleto!\" );\n    risultato = false;\n  }\n  if ( arma.propellente > 3.5 ) {\n    console.log( \"\\n> Attenzione: propellente troppo potente!\" );\n    risultato = false;\n  }\n  if ( arma.numeroMissili > 15 ) {\n    console.log( \"\\n> Attenzione: troppi missili caricati!\" );\n    risultato = false;\n  }\n  if ( arma.numeroMissili < 10 ) {\n    console.log( \"\\n> Attenzione: numero missili insufficiente!\" );\n    risultato = false;\n  }\n  if ( arma.tipoMunizione !== \"massima_esplosione\" ) {\n    console.log( \"\\n> Attenzione: tipologia di munizioni inesistente!\" );\n    risultato = false;\n  }\n  return risultato;\n}\n\nvar controlloInizializzazioneBatteriaAntiterrestri = function () {\n  var batteria = inizializzaBatteriaAntiterrestri();\n  if ( batteria instanceof ArmaNemicaSabotata ) {\n    console.log(\"\\n> Arma nemica sabotata correttamente.\");\n  } else {\n    console.log(\"\\n> Arma nemica non sabotata!\");\n  }\n  return batteria;\n}\n\nvar _simboli = ['0', '1', '2'];\n\nvar _password = [\n  _simboli[ rand( 0, 2 ) ],\n  _simboli[ rand( 0, 2 ) ],\n  _simboli[ rand( 1, 2 ) ]\n];\n\nvar _login = false;\n\nvar autenticazioneOperatoreIbrido = function ( tentativo ) {\n  if (\n    tentativo[0] === _password[0]\n    && tentativo[1] === _password[1]\n    && tentativo[2] === _password[2]\n  ) {\n    console.log(\"\\n> Password trovata.\");\n    _login = true;\n    return true;\n  } else {\n    _login = false;\n    return false;\n  }\n}",

    "manuale": "",

    "fileVirtuali": [
      { "nomeFile": "ArmaNemicaSabotata.js",
        "consultazione": false,
        "codice": "function ArmaNemicaSabotata () {\n  \/\/ ###START_MODIFICABILE###\n  this.tempoRicaricaMassimo = 100;\n  this.propellente = 5;\n  this.numeroMissili = 20;\n  this.tipoMunizione = \"massima_efficacia\";\n  \/\/ ###END_MODIFICABILE###\n}",
        "test": "(function () {\n  var arma = new ArmaNemicaSabotata;\n  if (\n    arma.tempoRicaricaMassimo >= 150\n    && arma.tempoRicaricaMassimo <= 200\n    && arma.propellente >= 3\n    && arma.propellente <= 3.5\n    && arma.numeroMissili <= 15\n    && arma.numeroMissili >= 10\n    && arma.tipoMunizione === \"massima_esplosione\"\n  ) {\n    return true;\n  } else {\n    return false;\n  }\n}) ();",
        "descrizione": "Il sistema di caricamento dei missili dal magazzino al caricatore della torretta ha un problema: la partita di missili con nucleo esplosivo sonico o a base di plutonio è difettosa. Queste munizioni non devono essere assolutamente caricarate!",
        "aiuto": "",
        "messaggioFallimento": ""
      },

      { "nomeFile": "InizializzaArmiAntiterrestri.js",
        "consultazione": false,
        "codice": "var inizializzaBatteriaAntiterrestri = function () {\n  var batteria = new BatteriaAntiterrestre();\n  return batteria;\n}",
        "test": "(function () {\n  var risultato = inizializzaBatteriaAntiterrestri();\n  if ( risultato instanceof ArmaNemicaSabotata ) {\n    return true;\n  } else {\n    return false;\n  }\n}) ();",
        "descrizione": "Bisogna ripristinare il sistema di refrigerazione sulle torrette. Appena queste superano un soglia di temperatura è necessario bloccarle per poter attivare il meccanismo in grado di raffreddarle rapidamente.",
        "aiuto": "",
        "messaggioFallimento": ""
      },
      
      { "nomeFile": "Hacking.js",
        "consultazione": false,
        "codice": "var _simboli = ['0', '1', '2'];\n\nvar generaPassword = function ( combinazioniPossibili, combinazione, k ) {\n  \/\/ ###START_MODIFICABILE###\n  if (k === 2)\n    combinazioniPossibili.push( combinazione.slice( 0 ) );\n  else {\n  \tvar i = 0;\n    for( i; i < 3; ++i ) {\n      combinazione[ k ] = _simboli[ i ];\n      generaPassword( combinazioniPossibili, combinazione, k + 1 );\n    }\n  }\n  \/\/ ###END_MODIFICABILE###\n}\n\nvar hackingPassword = function () {\n  var combinazioniPossibili = [];\n  var combinazione = ['0', '0', '0'];\n  generaPassword( combinazioniPossibili, combinazione, 0 );\n  \n  var hacking = false;\n  \n  for ( var i = 0; i < combinazioniPossibili.length; ++i ) {\n    hacking = autenticazioneOperatoreIbrido( combinazioniPossibili[ i ] );\n    if ( hacking === true ) {\n      break;\n    }\n  }\n  return hacking;\n}",
        "test": "(function () {\n  var risultato = _login;\n  return risultato;\n}) ();",
        "descrizione": "Bisogna ripristinare il sistema di refrigerazione sulle torrette. Appena queste superano un soglia di temperatura è necessario bloccarle per poter attivare il meccanismo in grado di raffreddarle rapidamente.",
        "aiuto": "",
        "messaggioFallimento": ""
      }
    ]
  }
  
  //window.eval( jsonLivello.codiceLivello );
  
  //var caricaCodice = new CaricaCodice( jsonLivello.fileVirtuali );
  //caricaCodice.aggiornaCodiceUtente();
  //var e = caricaCodice.validazioneCodiceUtente();
  //console.log(e);
  
  nOndata = 1;
  //if(e.erroriCiclo.length === 0 
  //  && e.erroriSintassi.length === 0
  //  && e.erroriParole.length === 0 ) {
  //  esiti = caricaCodice.esecuzioneTest();
  //  console.log( esiti );
    var coreLevel = new Livello5( callback );
    coreLevel.inizializzaLivello( nOndata );
    coreLevel.mostraSchermataIniziale();
  //}
} );