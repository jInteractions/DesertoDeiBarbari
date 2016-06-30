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

    "codiceLivello": "function Livello2 ( callbackFineLivello, numeroOndata ) {\n  CoreLevel.call( this, callbackFineLivello, numeroOndata );\n}\n\nLivello2.prototype.Object.create( CoreLevel.prototype );\nLivello2.prototype.constructor = Livello2;\n\nLivello1.prototype.inizializzaMirino = function () {\n  this.mirino = new Mirino( this.canvas.width \/ 2, this.canvas.height \/ 2, 10.0 );\n}\n\nLivello2.prototype.inizializzaArmiNemiche = function () {\n  var areaPertenza = this.coreGame.canvas.width;\n  var ritardoMassimo = 100;\n  var xRand;\n  var velRand;\n  var ritardoRand;\n  var bersagli = this.coreGame.bersagliAttaccabili();\n  var numeroMissili = 10;\n  \n  for( var i = 0; i < numeroMissili ; i++ ) {\n    xRand = rand( 0, areaPertenza );\n    velRand = rand( 1, 1.5 );\n    ritardoRand = rand( 0, ritardoMassimo );\n    this.coreGame.missiliNemici.push( new MissileNemico( {\n      coloreTestata: 'yellow',\n      coloreScia: 'red',\n      massimoRaggioEsplosione: 30\n    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );\n  }\n}\n\nLivello2.prototype.sparo = function ( x, y, tasto ) {\n  var indiceTorretta = this.scegliTorretta( x, y, tasto);\n  var raggio = 30;\n  var xModificata = x;\n  var yModificata = y;\n  if ( controlloPermessiCalibrazione() === false && controlloConfigurazioneParametriPianeti() === false ) {\n    xModificata += rand( -raggio, raggio );\n    yModificata += rand( -raggio, raggio );\n  }\n  var vel = 7;\n  var incrementoTemperatura = 150;\n  \n  if( indiceTorretta === -1 )\n    return;\n  \n  if ( sbloccaSparo() === false ) {\n    console.log(\"> Sicura attiva!\");\n    return;\n  }\n  \n  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,\n    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,\n    xDiArrivo: xModificata,\n    yDiArrivo: yModificata,\n    coloreTestata: 'yellow',\n    coloreScia: 'blue',\n    massimoRaggioEsplosione: raggio,\n    distanzaPerFrame: vel\n  }, this.coreGame ) );\n  this.coreGame.aggiornaPunteggioMissiliSparati();\n  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;\n  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;\n}\n\n\/\/ interfaccia test - codice utente\n\nvar controlloPermessiCalibrazione = function () {\n  var risultato = sbloccoPermessiCalibrazione();\n  if (\n    risultato[ 0 ] === true\n    && risultato[ 1 ] === true\n    && risultato[ 2 ] === 2\n  ) {\n    console.log(\"> Permessi di calibrazione mira sbloccati.\\n Procedere al sistema di configurazione planetario.\\n\");\n    return true;\n  } else {\n    console.log(\n      \"> Sblocco Calibrazione: \" + risultato[ 0 ]\n      + \"\\n> Accesso Configurazione Pianeti: \" + risultato[ 1 ]\n      + \"\\n> Codice Pianeta: \" + risultato[ 2 ]\n      + \"\\n> Informazioni non corrette.\"\n    );\n    return false;\n  } \n}\n\nvar controlloConfigurazioneParametriPianeti = function () {\n  var risultato = configurazioneParametriPianeti();\n  var nome = risultato[ 0 ];\n  var grav = risultato[ 1 ];\n  var vento = risultato[ 2 ];\n  var atmosfera = risultato[ 3 ];\n  var settore = risultato[ 4 ];\n  \n  if (\n    nome === \"Bastiani\"\n    && grav === 4.2\n    && vento === 23\n    && atmosfera === \"respirabile\"\n    && settore === 7\n  ) {\n    console.log(\"> Configurazione sistema antimissile...\\n>Pianeta Bastiani.\\n>Informazioni aggiornate correttamente.\\nBuon proseguimento con il sistema Hob-2000.\\n\");\n    return true;\n  } else {\n    console.log(\n      \"> Nome pianeta: \" + nome\n      + \"\\n> Forza Gravitazionale: \" + grav\n      + \"\\n> Vento: \" + vento\n      + \"\\n> Atmosfera: \" + atmosfera\n      + \"\\n> Settore Galattico: \" + settore\n      + \"\\n> Informazioni non corrette.\"\n    );\n    return false;\n  }\n}",

    "manuale": "",

    "fileVirtuali": [
      { "nomeFile": "SbloccoPermessi.js",
        "consultazione": false,
        "codice":"\/\/ ###START_MODIFICABILE###\nvar sbloccoCalibrazione = true;\n\/\/ ###END_MODIFICABILE###\nvar accessoConfigurazionePianeti = false;\nvar codicePianeta;\n\n\nvar sbloccoPermessiCalibrazione = function () {\n  var codiceDefault = 3;\n  var codiceBastiani = 2;\n  \n  if ( sbloccoCalibrazione === true ) {\n    accessoConfigurazionePianeti = true;\n  }\n  \/\/ ###START_MODIFICABILE###\n  if ( accessoConfigurazionePianeti === false ) {\n    \/\/ ###END_MODIFICABILE###\n    codicePianeta = codiceDefault;\n  } else {\n    codicePianeta = codiceBastiani;\n  }\n  \n  return [sbloccoCalibrazione, accessoConfigurazionePianeti, codicePianeta]\n}",
        "test": "(function () {\n  var risultato = sbloccoPermessiCalibrazione();\n  if (\n    risultato[ 0 ] === true\n    && risultato[ 1 ] === true\n    && risultato[ 2 ] === 2\n  ) {\n    return true;\n  } else {\n    return false;\n  }\n}) ();",
        "descrizione": "L''accesso alla strumentazione di puntamento è bloccata, è necessario autenticarsi nel sistema manualmente impostando le variabili correttamente nella funzione di autenticazione.",
        "aiuto": "",
        "messaggioFallimento": "<b></b>"
      },

      { "nomeFile": "SbloccoConfigurazionePianeti.js",
        "consultazione": false,
        "codice":"var configurazioneParametriPianeti = function () {\n  var nomePianeta;\n  var forzaGravitazionale;\n  var vento;\n  var atmosfera;\n  var settoreGalattico;\n  \n  \/\/ ###START_MODIFICABILE###\n  if ( codicePianeta === 1 ) {\n    nomePianeta = \"Terra\";\n    forzaGravitazionale = 1;\n    vento = 1;\n    atmosfera = \"respirabile\";\n    settoreGalattico = 0;\n  } else if ( codicePianeta === 6 ) {\n    nomePianeta = \"Buzzati\";\n    forzaGravitazionale = 2;\n    vento = 19.06;\n    atmosfera = \"respirabile\";\n    settoreGalattico = 5;\n  } else if ( codicePianeta === 3 ) {\n    nomePianeta = \"Colombre\";\n    forzaGravitazionale = 0.5;\n    vento = 0.7;\n    atmosfera = \"non_respirabile\";\n    settoreGalattico = 6;\n  } else if ( codicePianeta === 4 ) {\n    nomePianeta = \"Buttafuoco\";\n    forzaGravitazionale = 4.5;\n    vento = 80;\n    atmosfera = \"non_respirabile\";\n    settoreGalattico = 3;\n  } else if ( codicePianeta === 5 ) {\n    nomePianeta = \"Barnabo\";\n    forzaGravitazionale = 13;\n    vento = 0;\n    atmosfera = \"parzialmente_respirabile\";\n    settoreGalattico = 1;\n  } else if ( codicePianeta === 2 ) {\n    nomePianeta = \"Bastiani\";\n    forzaGravitazionale = 4.2;\n    vento = 23;\n    atmosfera = \"respirabile\";\n    settoreGalattico = 7;\n    \/\/ ###END_MODIFICABILE###\n  } else if ( codicePianeta === \"00110111\" ) {\n    nomePianeta = \"01000001 01101110 01100111 01110101 01110011 01110100 01101001 01101110 01100001\";\n    forzaGravitazionale = \"00110010 00101110 00110011\";\n    vento = \"01101110 01101111 01101110 01011111 01110000 01110010 01100101 01110011 01100101 01101110 01110100 01100101\";\n    atmosfera = \"01110010 01100101 01110011 01110000 01101001 01110010 01100001 01100010 01101001 01101100 01100101\";\n    settoreGalattico = \"00111000\";\n  }\n  \n  return [nomePianeta, forzaGravitazionale, vento, atmosfera, settoreGalattico];\n}",
        "test": "(function () {\n  var risultato = configurazioneParametriPianeti();\n  if (\n    risultato[ 0 ] === \"Bastiani\"\n    && risultato[ 1 ] === 4.2\n    && risultato[ 2 ] === 23\n    && risultato[ 3 ] === \"respirabile\"\n    && risultato[ 4 ] === 7\n  ) {\n    return true;\n  } else {\n    return false;\n  }\n}) ();",
        "descrizione": "L''accesso alla strumentazione di puntamento è bloccata, è necessario autenticarsi nel sistema manualmente impostando le variabili correttamente nella funzione di autenticazione.",
        "aiuto": "",
        "messaggioFallimento": "<b></b>"
      },
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
    var coreLevel = new Livello2( callback );
    coreLevel.inizializzaLivello(nOndata);
    coreLevel.mostraSchermataIniziale();
  }
} );