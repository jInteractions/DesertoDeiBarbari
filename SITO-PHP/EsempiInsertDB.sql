INSERT INTO livello (numero, nome, json) 
VALUES (0, '{
  "nomeLivello": "L'avventura Comincia",
  "numeroLivello": 0,

  "dialogoIniziale": [
    { "nome": "Ortiz",
      "testo": "Ciao a tutti!" },
    { "nome": "Simeoni",
      "testo": "Ciao come va?" }
  ],

  "dialogoFinale": [
    { "nome": "Prosdocimo",
      "testo": "Hai completato il livello!" },
    { "nome": "Ortiz",
      "testo": "Bravo!" }
  ],

  "codiceLivello": 
    "LivelloProva ( ) {\n  CoreLevel.call( this );\n  \n  \/\/ Variabile controllo obiettivo\n  this.accesso = false;\n  \n  \/\/ Chiamare i test\n  \n}\n\n\/\/ Ereditariet\u00e0\nLivelloProva.prototype = Object.create( Missile.prototype );\nLivelloProva.prototype.constructor = CoreLevel;\n\n\/\/ Ridefinizione della funzione sparo\nCoreLevel.prototype.sparo = function ( x, y, tasto ) {\n  if ( this.accesso === false ) {\n    console.log(\"Accesso non eseguito! Prego autenticarsi...\");\n    return;\n  }\n  \n  var indiceTorretta = this.scegliTorretta( x, y, tasto);\n  \n  if ( indiceTorretta === -1 )\n    return;\n  \n  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {\n    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,\n    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,\n    xDiArrivo: x,\n    yDiArrivo: y,\n    coloreTestata: 'yellow',\n    coloreScia: 'blue',\n    massimoRaggioEsplosione: 30,\n    distanzaPerFrame: 12\n  } ) );\n  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;\n  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += 150;\n}\n",
   
  "manuale": "<h3> Il comando IF </h3> <p> Il comando if consente di alterare il percorso di esecuzione del codice... </p> <h3> Il comando IF </h3> <p> Il   comando if consente di alterare il percorso di esecuzione del codice... </p> <h3> Il comando IF </h3> <p> Il comando if consente di alterare il           percorso di esecuzione del codice... </p> <h3> Il comando IF </h3> <p> Il    comando if consente di alterare il percorso di esecuzione del codice...     </p>",
  
  "fileVirtuali": [
    { "nomeFile": "Autorizzazione.js",
      "consultazione": false,
      "codice":
        "function Autenticazione () {\n\t\n}\n\nAutenticazione.prototype.autenticati = function ( username, password ) {\n\tif(username == \"SWAG\" && password == \"bellofigo\")\n\t\treturn true;\n\telse\n\t\treturn false;\n}",
      "test": 
        "(function () {\n\tvar a = new Autenticazione();\n\treturn a.autenticati(\"SWAX\", \"bellogianda\");\n}) ();",
      "descrizione": "Devi forzare il sistema per accedere...",
      "aiuto": "Guarda che <b>dovresti</b>... ",
      "messaggioFallimento": "L'Autenticazione e fallita..."
    },

    { "nomeFile": "AltriCodice.js",
      "consultazione": true,
      "codice":
        "function Autenticazione () {\n\t\n}\n\nAutenticazione.prototype.autenticati = function ( username, password ) {\n\tif(username == \"SWAG\" && password == \"bellofigo\")\n\t\treturn true;\n\telse\n\t\treturn false;\n}",
      "test": 
        "(function () {\n\tvar a = new Autenticazione();\n\treturn a.autenticati(\"SWAX\", \"bellogianda\");\n}) ();",
      "descrizione": "Devi forzare il sistema per accedere...",
      "aiuto": "Guarda che <b>dovresti</b>... ",
      "messaggioFallimento": "L'Autenticazione e fallita..."
    }
  ]
}');
INSERT INTO utente (email, password, tutorial, alias) 
VALUES ('sdavrieux@gmail.com', 'password', 0, 'Angus');
INSERT INTO livello_eseguito (email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti) 
VALUES ('sdavrieux@gmail.com', 1, 0, 90, 80, 70, 60, 50, 40, 30, 1000);