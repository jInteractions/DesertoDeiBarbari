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
  var raggio = 30;
  var vel = 7;
  var incrementoTemperatura = 150;
  
  if( indiceTorretta === -1 ) {
    return;
  }
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: raggio,
    distanzaPerFrame: vel
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;
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
  
function ArmaNemicaSabotata () {
  // ###START_MODIFICABILE###
  this.tempoRicaricaMassimo = 100;
  this.propellente = 5;
  this.numeroMissili = 20;
  this.tipoMunizione = "massima_efficacia";
  // ###END_MODIFICABILE###
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

var inizializzaBatteriaAntiterrestri = function () {
  var batteria = new BatteriaAntiterrestre();
  return batteria;
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

var _simboli = ['0', '1', '2'];

var generaPassword = function ( combinazioniPossibili, combinazione, k ) {
  //###START_MODIFICABILE###
  if (k === 2)
  //###END_MODIFICABILE###
    combinazioniPossibili.push( combinazione.slice( 0 ) );
  //###START_MODIFICABILE###
  else {
  	var i = 0;
    for( i; i < 3; ++i ) {
      combinazione[ k ] = _simboli[ i ];
      generaPassword( combinazioniPossibili, combinazione, k + 1 );
    }
  }
  //###END_MODIFICABILE###
}

var hackingPassword = function () {
  var combinazioniPossibili = [];
  var combinazione = ['0', '0', '0'];
  generaPassword( combinazioniPossibili, combinazione, 0 );
  
  var hacking = false;
  
  for ( var i = 0; i < combinazioniPossibili.length; ++i ) {
    hacking = autenticazioneOperatoreIbrido( combinazioniPossibili[ i ] );
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
