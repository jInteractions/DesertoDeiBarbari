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
    "nomeLivello": "",
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

    "codiceLivello": "function Livello1 ( callbackFineLivello, numeroOndata ) {\n  CoreLevel.call( this, callbackFineLivello, numeroOndata );\n}\n\nLivello1.prototype = Object.create( CoreLevel.prototype );\nLivello1.prototype.constructor = Livello1;\n\nLivello1.prototype.inizializzaMirino = function ( ) {\n  if ( controlloAccesso() === true ) {\n    this.mirino = new Mirino( this.canvas.width \/ 2, this.canvas.height \/ 2, 10.0 );\n  } else {\n    this.mirino = new Mirino( this.canvas.width \/ 2, this.canvas.height \/ 2, 0 );\n  }\n}\n\nLivello1.prototype.inizializzaLivello = function ( ) {\n  this.inizializzaMirino();\n  this.coreGame = new CoreGame( this.canvas, this.mirino, {\n    coloreSfondo: 'black',\n    coloreTerreno: 'yellow',\n    coloreTestoPrimario: 'blue',\n    coloreTestoSecondario: 'red'\n  });\n  this.inizializzaTorrette();\n  this.inizializzaBasi();\n  this.inizializzaArmiNemiche();\n  this.inizializzaArmiTerrestri();\n  \/\/ chiamata alla funzione di autenticazione manuale\n  this.setupListeners();\n}\n\nLivello1.prototype.inizializzaArmiNemiche = function () {\n  var areaPertenza = this.coreGame.canvas.width;\n  var ritardoMassimo = 100;\n  var xRand;\n  var velRand;\n  var ritardoRand;\n  var bersagli = this.coreGame.bersagliAttaccabili();\n  var numeroMissili = 10;\n  \n  for( var i = 0; i < numeroMissili ; i++ ) {\n    xRand = rand( 0, areaPertenza );\n    velRand = rand( 1, 1.5 );\n    ritardoRand = rand( 0, ritardoMassimo );\n    this.coreGame.missiliNemici.push( new MissileNemico( {\n      coloreTestata: 'yellow',\n      coloreScia: 'red',\n      massimoRaggioEsplosione: 30\n    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand) );\n  }\n}\n\nLivello1.prototype.sparo = function ( x, y, tasto ) {\n  var indiceTorretta = this.scegliTorretta( x, y, tasto);\n  var raggio = 30;\n  var xModificata = x + rand( -raggio, raggio );\n  var yModificata = y + rand( -raggio, raggio );\n  var vel = 7;\n  var incrementoTemperatura = 150;\n  \n  if( indiceTorretta === -1 )\n    return;\n  \n  if ( sbloccaSparo() === false ) {\n    console.log(\"> Sicura attiva!\");\n    return;\n  }\n  \n  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,\n    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,\n    xDiArrivo: xModificata,\n    yDiArrivo: yModificata,\n    coloreTestata: 'yellow',\n    coloreScia: 'blue',\n    massimoRaggioEsplosione: raggio,\n    distanzaPerFrame: vel\n  } ) );\n  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;\n  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;\n}\n\nLivello1.prototype.calcolaCoefficienteOndata = function () {\n  return this.numeroOndata * 1.2;\n}\n\n\/\/ interfaccia test - codice utente\nvar controlloAccesso = function () {\n  var risultato = autenticazioneManuale();\n  var nome = risultato[ 0 ];\n  var matricola = risultato[ 1 ];\n  var password = risultato[ 2 ];\n  var stringa = risultato[ 3 ];\n  \n  if (\n    nome === \"Cpt Simeoni\"\n    && matricola === \"150716\"\n    && password === \"utf-8_tuono\"\n    && stringa === risultato[ 0 ] + \"%\" + risultato[ 1 ] + \"<\" + risultato[ 2 ] + \">\"\n  ) {\n    console.log(\"> Informazioni inserite correttamente.\\nBuon proseguimento con il sistema Hob-2000.\\n\");\n    return true;\n  } else {\n    console.log(\n      \"> Nome: \" + nome\n      + \"\\n> Matricola: \" + matricola\n      + \"\\n> Password: \" + Array(password.length + 1).join(\"*\")\n      + \"\\n> Stringa: \" + stringa\n      + \"\\n> Informazioni non corrette.\"\n    );\n    return false;\n  }\n}\n\n\/\/ interfaccia test - codice utente\nvar sbloccaSparo = function ( ) {\n  var base = rand(1, Math.sqrt(Number.MAX_VALUE));\n  var altezza = rand(1, Math.sqrt(Number.MAX_VALUE));\n  if( base * altezza === verificaPresenzaCervelloOperatore( base, altezza ) ) {\n    console.log(\"> Formula corretta, verifica completata.\");\n    return true;\n  } else {\n    console.log(\"> Formula errata, forma di vita intelligente non rilevata.\");\n    return false;\n  }\n}",

    "manuale": "",

    "fileVirtuali": [
      { "nomeFile": "ResponsoAutenticazione.out",
        "consultazione": true,
        "codice":"\/*\n __   __  _______  _______         _______  _______  _______  _______ \n|  | |  ||       ||  _    |       |       ||  _    ||  _    ||  _    |\n|  |_|  ||   _   || |_|   | ____  |____   || | |   || | |   || | |   |\n|       ||  | |  ||       ||____|  ____|  || | |   || | |   || | |   |\n|       ||  |_|  ||  _   |        | ______|| |_|   || |_|   || |_|   |\n|   _   ||       || |_|   |       | |_____ |       ||       ||       |\n|__| |__||_______||_______|       |_______||_______||_______||_______|\nQuesto file \u00e8 stato generato automaticamente dal sistema antimissilistico\nHOB-2000.\n\n\nBuongiorno, sono il sistema antimissilistico HOB-2000, per comunicarvi che\nl'autenticazione automatica \u00e8 fallita. Se proprio desiderate procedere, avete la\npossibilit\u00e0 di utilizzare l'autenticazione manuale.\n\nGrazie per aver scelto HOB-2000.\n*\/"
      },

      { "nomeFile": "Autenticazione.js",
        "consultazione": false,
        "codice":"\/*\n\nQuesto codice permette l'autenticazione manuale di un operatore.\n\nATTENZIONE! Utilizzare solo in caso di fallimento dell'autenticazione\n            automatica.\n*\/\nvar autenticazioneManuale = function () {\n  \/\/ ###START_MODIFICABILE###\n  var nome = \"captano\";\n  var matricola = \"0\";\n  var password = \"utf\";\n  var stringaAccesso = \"UTF-8\" + nome + \"&&--\"+ password + \"%\" + matricola;\n  \/\/ ###END_MODIFICABILE###\n  \n  return [nome, matricola, password, stringaAccesso];\n}",
        "test": "(function () {\n  var risultato = autenticazioneManuale();\n  if (\n    risultato[ 0 ] === \"Cpt Simeoni\"\n    && risultato[ 1 ] === \"150716\"\n    && risultato[ 2 ] === \"utf-8_tuono\"\n    && risultato[ 3 ] === risultato[ 0 ] + \"%\" + risultato[ 1 ] + \"<\" + risultato[ 2 ] + \">\"\n  ) {\n    return true;\n  } else {\n    return false;\n  }\n}) ();",
        "descrizione": "L''accesso alla strumentazione di puntamento è bloccata, è necessario autenticarsi nel sistema manualmente impostando le variabili correttamente nella funzione di autenticazione.",
        "aiuto": "",
        "messaggioFallimento": "<b></b>"
      },

      { "nomeFile": "SbloccoComandoSparo.js",
        "consultazione": false,
        "codice": "var verificaPresenzaCervelloOperatore = function ( base, altezza ) {\n  \/\/ ###START_MODIFICABILE###\n  var area = base + altezza;\n  \/\/ ###END_MODIFICABILE###\n  return area;\n}",
        "test": "( function() {\n  var base = rand(1, Math.sqrt(Number.MAX_VALUE));\n  var altezza = rand(1, Math.sqrt(Number.MAX_VALUE));\n  if( base * altezza === verificaPresenzaCervelloOperatore( base, altezza ) ) {\n    return true;\n  } else {\n    return false;\n  }\n} ) ();",
        "descrizione": "Il comando di sparo è disattivato, il sistema richieda la verifica della presenza di un operatore umano. Per verificare ciò viene posto un questito a cui rispondere correttamente.",
        "aiuto": "",
        "messaggioFallimento": "<b></b>"
      }
    ]
  }
  
  //window.eval( jsonLivello.codiceLivello );
  
  var caricaCodice = new CaricaCodice( jsonLivello.fileVirtuali );
  //caricaCodice.aggiornaCodiceUtente();
  var e = caricaCodice.validazioneCodiceUtente();
  console.log(e);
  
  nOndata = 1;
  
  if(e.erroriCiclo.length === 0) {
    esiti = caricaCodice.esecuzioneTest();
    console.log( esiti );
    var coreLevel = new Livello10( callback );
    coreLevel.inizializzaLivello(nOndata);
    coreLevel.mostraSchermataIniziale();
  }
} );