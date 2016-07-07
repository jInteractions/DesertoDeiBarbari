function Livello4 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello4.prototype = Object.create( CoreLevel.prototype );
Livello4.prototype.constructor = Livello4;

Livello4.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
}

Livello4.prototype.inizializzaArmiNemiche = function () {
  var batteria;
  
  hackingPassword();
  
  if ( _login === false ) {
    console.log("\n> Autenticazione per salvataggio modifiche al sistema Ibrido non riuscita.");
  } else {
    console.log("\n> Autenticazione per il salvataggio modifiche al sistema Ibrido riuscita.")
  }
  
  if ( controlloArmaNemicaSabotata() === true && _login === true ) {
    batteria = controlloInizializzazioneBatteriaAntiterrestri();
  } else {
    batteria = new BatteriaAntiterrestre();
  } 
  
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = batteria.tempoRicaricaMassimo;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = batteria.numeroMissili;
  
  var raggio = 10;
  
  if ( batteria.tipoMunizione === "massima_esplosione" ) {
    raggio = 30;
  }
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, areaPertenza );
    velRand = rand( 1, batteria.propellente );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: raggio
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
}

Livello4.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  if( indiceTorretta === -1 ) {
    return;
  }
  
  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  var raggio = 30;
  var vel = 7;
  var incrementoTemperatura = 0;
  var velMirino = 16;
  
  if( indiceTorretta === 0 ) { incrementoTemperatura = 200; vel = 10; velMirino = 30; }
  if( indiceTorretta === 1 ) { incrementoTemperatura = 200; vel = 2.5; velMirino = 3; }
  if( indiceTorretta === 2 ) { incrementoTemperatura = 200; vel = 5; velMirino = 30; }
  
  this.coreGame.mirino.distanzaPerFrame = velMirino;
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: torretta.x,
    yDiPartenza: torretta.y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: raggio,
    distanzaPerFrame: vel
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += incrementoTemperatura;
  
  torretta.temperaturaSblocco = 500;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  }
}

Livello4.prototype.calcolaCoefficienteOndata = function () {
  return this.numeroOndata * 1.2;
}

// interfaccia test - codice utente
function BatteriaAntiterrestre () {
  this.tempoRicaricaMassimo = 100;
  this.propellente = 5;
  this.numeroMissili = 20;
  this.tipoMunizione = "massima_efficacia";
}

var controlloArmaNemicaSabotata = function () {
  var arma = new ArmaNemicaSabotata();
  var risultato = true;
  if ( arma.tempoRicaricaMassimo < 150 ) {
    console.log( "\n> Attenzione: tempo di ricarica troppo basso!" );
    risultato = false;
  }
  if ( arma.tempoRicaricaMassimo > 200 ) {
    console.log( "\n> Attenzione: tempo di ricarica troppo alto!" );
    risultato = false;
  }
  if ( arma.propellente < 3 ) {
    console.log( "\n> Attenzione: propellente obsoleto!" );
    risultato = false;
  }
  if ( arma.propellente > 3.5 ) {
    console.log( "\n> Attenzione: propellente troppo potente!" );
    risultato = false;
  }
  if ( arma.numeroMissili > 15 ) {
    console.log( "\n> Attenzione: troppi missili caricati!" );
    risultato = false;
  }
  if ( arma.numeroMissili < 10 ) {
    console.log( "\n> Attenzione: numero missili insufficiente!" );
    risultato = false;
  }
  if ( arma.tipoMunizione !== "massima_esplosione" ) {
    console.log( "\n> Attenzione: tipologia di munizioni inesistente!" );
    risultato = false;
  }
  return risultato;
}

var controlloInizializzazioneBatteriaAntiterrestri = function () {
  var batteria = inizializzaBatteriaAntiterrestri();
  if ( batteria instanceof ArmaNemicaSabotata ) {
    console.log("\n> Arma nemica sabotata correttamente.");
  } else {
    console.log("\n> Arma nemica non sabotata!");
  }
  return batteria;
}

var _simboli = ['0', '1', '2'];

var _password = [
  _simboli[ rand( 0, 2 ) ],
  _simboli[ rand( 0, 2 ) ],
  _simboli[ rand( 1, 2 ) ]
];

var _login = false;

var autenticazioneOperatoreIbrido = function ( tentativo ) {
  if (
    tentativo[0] === _password[0]
    && tentativo[1] === _password[1]
    && tentativo[2] === _password[2]
  ) {
    console.log("\n> Password trovata.");
    _login = true;
    return true;
  } else {
    _login = false;
    return false;
  }
}

// TAB 1

/**********
Ciao, caro. Il codice che vedi di seguito è una mia idea
su come potrebbe essere un'arma sabotata da caricare
al posto di quelle standard all'interno del codice del
Nemico. Aggiusta i parametri della classe per rendere
l'arma più consona alle tue esigenze.
Tua,
Zurlin
**********/
  
function ArmaNemicaSabotata () {
//###START_MODIFICABILE###
  // Campo per il tempo di ricarica massimo delle torrette antiterrestri.
  this.tempoRicaricaMassimo = 100;
  // Campo per la tipologia di propellente.
  // Più è alto il numero, migliore è il propellente.
  this.propellente = 5;
  // Campo per il numero di missili della torretta antiterrestre.
  this.numeroMissili = 20;
  // Tipologia di munizione.
  // Può essere "massima_efficacia" oppure "massima_esplosione".
  this.tipoMunizione = "massima_efficacia";
//###END_MODIFICABILE###
}

// test

/* (function () {
  var arma = new ArmaNemicaSabotata;
  if (
    arma.tempoRicaricaMassimo >= 150
    && arma.tempoRicaricaMassimo <= 200
    && arma.propellente >= 3
    && arma.propellente <= 3.5
    && arma.numeroMissili <= 15
    && arma.numeroMissili >= 10
    && arma.tipoMunizione === "massima_esplosione"
  ) {
    return true;
  } else {
    return false;
  }
}) (); */

// TAB 2

/**********
File di creazione delle batterie antiterrestri.
Ricordiamo che è necessario autenticarsi in seguito a
qualunque modifica.
**********/

var inizializzaBatteriaAntiterrestri = function () {
//###START_MODIFICABILE###
  // Variabile contenente la batteria antiterrestre
  // di tipo standard.
  var batteria = new BatteriaAntiterrestre();
  return batteria;
//###END_MODIFICABILE###
}

// test

/* (function () {
  var risultato = inizializzaBatteriaAntiterrestri();
  if ( risultato instanceof ArmaNemicaSabotata ) {
    return true;
  } else {
    return false;
  }
}) (); */

// TAB 3

/**********
Ciao, caro.
Nella funzione generaPassword() hai esempio di funzione ricorsiva
per il calcolo della password necessaria per salvare le modifiche.
Questo codice prova ad indivinare la password generando tutte le combinazioni
possibili dei caratteri '0', '1' e '2'.
Nella funzione hackingPassword() queste combinazioni vengono mandate
al server centrale del Nemico, continuando finché non viene approvata una
delle combinazioni.
Spero di non aver fatto errori.
Tua,
Zurlin
**********/

// Simboli utilizzati per la password.
var _simboli = ['0', '1', '2'];

// Funzione per la generazione di tutte le password possibili.
var generaPassword = function ( combinazioniPossibili, combinazione, k ) {
//###START_MODIFICABILE###
  if (k === 2)
    combinazioniPossibili.push( combinazione.slice( 0 ) );
  else {
  	var i = 0;
    for( i; i < 3; ++i ) {
      combinazione[ k ] = _simboli[ i ];
      generaPassword( combinazioniPossibili, combinazione, k + 1 );
    }
  }
//###END_MODIFICABILE###
}

// Funzione per il test delle combinazioni.
var hackingPassword = function () {
  var combinazioniPossibili = [];
  // Variabile con la combinazione di partenza.
  var combinazione = ['0', '0', '0'];
  // Chiamata alla funzione di generazione delle password,
  // che inserisce tutte quelle possibili nella variabile
  // combinazioniPossibili.
  generaPassword( combinazioniPossibili, combinazione, 0 );
  
  var hacking = false;
  // Questo ciclo scorre tutte le combinazioni
  // e le manda una ad una al server del Nemico.
  for ( var i = 0; i < combinazioniPossibili.length; ++i ) {
    // Qui viene chiamata la funzione per il test della password.
    hacking = autenticazioneOperatoreNonTerrestre( combinazioniPossibili[ i ] );
    // Se la password è corretta, usciamo dal ciclo.
    if ( hacking === true ) {
      break;
    }
  }
  return hacking;
}

// test
/* (function () {
  var risultato = _login;
  return risultato;
}) (); */
