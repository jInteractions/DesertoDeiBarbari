function Livello2 ( callbackFineLivello, numeroOndata ) {
  CoreLevel.call( this, callbackFineLivello, numeroOndata );
}

Livello2.prototype.Object.create( CoreLevel.prototype );
Livello2.prototype.constructor = Livello2;

Livello1.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
}

Livello2.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 10;
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, areaPertenza );
    velRand = rand( 1, 1.5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
}

Livello2.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  var raggio = 30;
  var xModificata = x;
  var yModificata = y;
  if ( controlloPermessiCalibrazione() === false && controlloConfigurazioneParametriPianeti() === false ) {
    xModificata += rand( -raggio, raggio );
    yModificata += rand( -raggio, raggio );
  }
  var vel = 7;
  var incrementoTemperatura = 150;
  
  if( indiceTorretta === -1 )
    return;
  
  if ( sbloccaSparo() === false ) {
    console.log("> Sicura attiva!");
    return;
  }
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
    xDiArrivo: xModificata,
    yDiArrivo: yModificata,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: raggio,
    distanzaPerFrame: vel
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;
}

// interfaccia test - codice utente

var controlloPermessiCalibrazione = function () {
  var risultato = sbloccoPermessiCalibrazione();
  if (
    risultato[ 0 ] === true
    && risultato[ 1 ] === true
    && risultato[ 2 ] === 2
  ) {
    console.log("> Permessi di calibrazione mira sbloccati.\n Procedere al sistema di configurazione planetario.\n");
    return true;
  } else {
    console.log(
      "> Sblocco Calibrazione: " + risultato[ 0 ]
      + "\n> Accesso Configurazione Pianeti: " + risultato[ 1 ]
      + "\n> Codice Pianeta: " + risultato[ 2 ]
      + "\n> Informazioni non corrette."
    );
    return false;
  } 
}

var controlloConfigurazioneParametriPianeti = function () {
  var risultato = configurazioneParametriPianeti();
  var nome = risultato[ 0 ];
  var grav = risultato[ 1 ];
  var vento = risultato[ 2 ];
  var atmosfera = risultato[ 3 ];
  var settore = risultato[ 4 ];
  
  if (
    nome === "Bastiani"
    && grav === 4.2
    && vento === 23
    && atmosfera === "respirabile"
    && settore === 7
  ) {
    console.log("> Configurazione sistema antimissile...\n>Pianeta Bastiani.\n>Informazioni aggiornate correttamente.\nBuon proseguimento con il sistema Hob-2000.\n");
    return true;
  } else {
    console.log(
      "> Nome pianeta: " + nome
      + "\n> Forza Gravitazionale: " + grav
      + "\n> Vento: " + vento
      + "\n> Atmosfera: " + atmosfera
      + "\n> Settore Galattico: " + settore
      + "\n> Informazioni non corrette."
    );
    return false;
  }
}

// TAB 1

// ###START_MODIFICABILE###
var sbloccoCalibrazione = false;
// ###END_MODIFICABILE###
var accessoConfigurazionePianeti = false;
var codicePianeta;


var sbloccoPermessiCalibrazione = function () {
  var codiceDefault = 3;
  var codiceBastiani = 2;
  
  if ( sbloccoCalibrazione === true ) {
    accessoConfigurazionePianeti = true;
  }
  // ###START_MODIFICABILE###
  if ( accessoConfigurazionePianeti === true ) {
    // ###END_MODIFICABILE###
    codicePianeta = codiceDefault;
  } else {
    codicePianeta = codiceBastiani;
  }
  
  return [sbloccoCalibrazione, accessoConfigurazionePianeti, codicePianeta]
}

// test

/* (function () {
  var risultato = sbloccoPermessiCalibrazione();
  if (
    risultato[ 0 ] === true
    && risultato[ 1 ] === true
    && risultato[ 2 ] === 2
  ) {
    return true;
  } else {
    return false;
  }
}) (); */


// TAB 2

var configurazioneParametriPianeti = function () {
  var nomePianeta;
  var forzaGravitazionale;
  var vento;
  var atmosfera;
  var settoreGalattico;
  
  // ###START_MODIFICABILE###
  if ( codicePianeta === 1 ) {
    nomePianeta = "Terra";
    forzaGravitazionale = 1;
    vento = 1;
    atmosfera = "respirabile";
    settoreGalattico = 0;
  } else if ( codicePianeta === 2 ) {
    nomePianeta = "Buzzati";
    forzaGravitazionale = 2;
    vento = 19.06;
    atmosfera = "respirabile";
    settoreGalattico = 5;
  } else if ( codicePianeta === 3 ) {
    nomePianeta = "Colombre";
    forzaGravitazionale = 0.5;
    vento = 0.7;
    atmosfera = "non_respirabile";
    settoreGalattico = 6;
  } else if ( codicePianeta === 4 ) {
    nomePianeta = "Buttafuoco";
    forzaGravitazionale = 4.5;
    vento = 80;
    atmosfera = "non_respirabile";
    settoreGalattico = 3;
  } else if ( codicePianeta === 5 ) {
    nomePianeta = "Barnabo";
    forzaGravitazionale = 13;
    vento = 0;
    atmosfera = "parzialmente_respirabile";
    settoreGalattico = 1;
  } else if ( codicePianeta === 6 ) {
    nomePianeta = "Bastiani";
    forzaGravitazionale = 4.2;
    vento = 23;
    atmosfera = "respirabile";
    settoreGalattico = 7;
    // ###END_MODIFICABILE###
  } else if ( codicePianeta === "00110111" ) {
    nomePianeta = "01000001 01101110 01100111 01110101 01110011 01110100 01101001 01101110 01100001";
    forzaGravitazionale = "00110010 00101110 00110011";
    vento = "01101110 01101111 01101110 01011111 01110000 01110010 01100101 01110011 01100101 01101110 01110100 01100101";
    atmosfera = "01110010 01100101 01110011 01110000 01101001 01110010 01100001 01100010 01101001 01101100 01100101";
    settoreGalattico = "00111000";
  }
  
  return [nomePianeta, forzaGravitazionale, vento, atmosfera, settoreGalattico];
}

// test

/* (function () {
  var risultato = configurazioneParametriPianeti();
  if (
    risultato[ 0 ] === "Bastiani"
    && risultato[ 1 ] === 4.2
    && risultato[ 2 ] === 23
    && risultato[ 3 ] === "respirabile"
    && risultato[ 4 ] === 7
  ) {
    return true;
  } else {
    return false;
  }
}) (); */