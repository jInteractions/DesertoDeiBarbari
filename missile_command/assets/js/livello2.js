function Livello2 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );  
}

Livello2.prototype = Object.create( CoreLevel.prototype );
Livello2.prototype.constructor = Livello2;

Livello2.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
}

Livello2.prototype.inizializzaArmiNemiche = function () {  
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100 * (this.numeroOndata * 0.05);
  var velMin = 1.0 + this.numeroOndata * 0.05;
  var velMax = 1.2 + this.numeroOndata * 0.05;
  var numeroMissili = 10 + Math.floor( this.numeroOndata );
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    var xRand = rand( 0, areaPertenza );
    var velRand = rand( velMin, velMax );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
}

Livello2.prototype.inizializzaTorrette = function () {
  var nMissili = 10;
  var nSoldati = 10;
  var Tmin = 50;
  var Tmax = 1000;
  var deltaTempo = 70;
  var deltaRaffreddamento = 3;
  
  var coloreMissili0 = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
  coloreMissili0[ rand( 0, 9 ) ] = 'red';
  coloreMissili0[ rand( 0, 9 ) ] = '#33CCFF';
  coloreMissili0[ rand( 0, 9 ) ] = 'red';
  coloreMissili0[ rand( 0, 9 ) ] = '#33CCFF';       
  coloreMissili0[ rand( 0, 9 ) ] = 'red';
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili0, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  
  coloreMissili1 = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
  coloreMissili1[ rand( 0, 9 ) ] = 'red';
  coloreMissili1[ rand( 0, 9 ) ] = '#33CCFF';
  coloreMissili1[ rand( 0, 9 ) ] = 'red';
  coloreMissili1[ rand( 0, 9 ) ] = '#33CCFF';       
  coloreMissili1[ rand( 0, 9 ) ] = 'red';
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili1, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  
  var coloreMissili2 = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
  coloreMissili2[ rand( 0, 9 ) ] = 'red';
  coloreMissili2[ rand( 0, 9 ) ] = '#33CCFF';
  coloreMissili2[ rand( 0, 9 ) ] = 'red';
  coloreMissili2[ rand( 0, 9 ) ] = '#33CCFF';       
  coloreMissili2[ rand( 0, 9 ) ] = 'red';
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili2, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
};

Livello2.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
   if( indiceTorretta === -1 )
    return;
  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  var raggio = 30;
  var xModificata = x;
  var yModificata = y;
  if ( controlloPermessiCalibrazione() === false || controlloConfigurazioneParametriPianeti() === false ) {
    xModificata += rand( -raggio, raggio );
    yModificata += rand( -raggio, raggio );
  }
  
  var vel = 0;
  var incrementoTemperatura = 150;
  var coloreScia = 'blue';
  var raggioEsplosione = 2;
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === 'blue' ) { 
    vel = 7; coloreScia = 'blue'; raggioEsplosione = 20; 
  }
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === 'red' ) { 
    vel = 8; coloreScia = 'red'; raggioEsplosione = 2; 
  }
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === '#33CCFF' ) { 
    vel = 0.5; coloreScia = '#33CCFF'; raggioEsplosione = 30; 
  }
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: torretta.x,
    yDiPartenza: torretta.y,
    xDiArrivo: xModificata,
    yDiArrivo: yModificata,
    coloreTestata: 'yellow',
    coloreScia: coloreScia,
    massimoRaggioEsplosione: raggioEsplosione,
    distanzaPerFrame: vel
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += incrementoTemperatura;
}

Livello2.prototype.calcolaCoefficienteOndata = function () {
  return this.numeroOndata * 1.2;
}

// interfaccia test - codice utente

var controlloPermessiCalibrazione = function () {
  var risultato = sbloccoPermessiCalibrazione();
  if (
    risultato[ 0 ] === true
    && risultato[ 1 ] === true
    && risultato[ 2 ] === 2
  ) {
    console.log("Permessi di calibrazione mira sbloccati.\n Procedere al sistema di configurazione planetario.");
    return true;
  } else {
    console.log(
      "Sblocco Calibrazione: " + risultato[ 0 ]
      + "\nAccesso Configurazione Pianeti: " + risultato[ 1 ]
      + "\nCodice Pianeta: " + risultato[ 2 ]
      + "\nInformazioni non corrette."
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
    console.log("Configurazione sistema antimissile... Pianeta Bastiani. Informazioni aggiornate correttamente.\nBuon proseguimento con il sistema Hob-2000.");
    return true;
  } else {
    console.log(
      "Nome pianeta: " + nome
      + "\nForza Gravitazionale: " + grav
      + "\nVento: " + vento
      + "\nAtmosfera: " + atmosfera
      + "\nSettore Galattico: " + settore
      + "\nInformazioni non corrette."
    );
    return false;
  }
}

// TAB 1

/**********
Benvenuto nel file di sblocco dei permessi di calibrazione.
Il seguente file permette di sbloccare ed accedere alle funzionalità di configurazione planetaria, fondamentali per la corretta impostazione delle armi.
**********/

// Variabile contenente il codice del pianeta su cui si trovano le armi.
var _codicePianeta;

// Codice per lo sblocco dei permessi di calibrazione,
// contenente anche lo sblocco di configurazione planetaria.
// Attenzione! Senza lo sblocco della calibrazione attiva,
// non sarà possibile attivare la configurazione planetaria.
var sbloccoPermessiCalibrazione = function () {
//###START_MODIFICABILE###
  // Variabile di sblocco del sistema di calibrazione.
  var sbloccoCalibrazione = false;
//###END_MODIFICABILE###
  var accessoConfigurazionePianeti = false;
  // Variabili contenenti i codici planetari.
  var codiceTerra = 1;
  var codiceBastiani = 2;
  var codiceColombre = 3;
  var codiceButtafuoco = 4;
  var codiceBarnabo = 5;
  var codiceBuzzati = 6;
  
  if ( sbloccoCalibrazione === true ) {
    accessoConfigurazionePianeti = true;
  }
//###START_MODIFICABILE###
  // Attenzione! Modificare solo se il pianeta desiderato non è quello di default.
  if ( accessoConfigurazionePianeti === true ) {
//###END_MODIFICABILE###
    _codicePianeta = codiceTerra;
  } else {
    // Assegnare alla variabile il codice del pianeta desiderato.
    _codicePianeta = codiceBastiani;
  }
  
  return [sbloccoCalibrazione, accessoConfigurazionePianeti, _codicePianeta]
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

/**********
Benvenuto nel file di configurazione planetaria del sistema Hob-2000.
Troverai in elenco le caratteristiche di ogni pianeta, necessarie per il corretto funzionamento del sistema stesso.
Ogni pianeta ha cinque caratteristiche: il nome, la forza gravitazionale, il vento, l'atmosfera e il settore galattico.
Tali caratteristiche influiscono pesantemente sulle capacità di sparo, rendendo potenzialmente inutilizzabili le armi se configurate per il pianeta errato.
**********/

var configurazioneParametriPianeti = function () {
  var nomePianeta;
  var forzaGravitazionale;
  var vento;
  var atmosfera;
  var settoreGalattico;
  console.log("Il codice del pianeta selezionato è: " + _codicePianeta);  
//###START_MODIFICABILE###
  if ( _codicePianeta === 1 ) {
//###END_MODIFICABILE###
    nomePianeta = "Terra";
    forzaGravitazionale = 1;
    vento = 1;
    atmosfera = "respirabile";
    settoreGalattico = 0;
//###START_MODIFICABILE###
  } else if ( _codicePianeta === 2 ) {
//###END_MODIFICABILE###
    nomePianeta = "Buzzati";
    forzaGravitazionale = 2;
    vento = 19.06;
    atmosfera = "respirabile";
    settoreGalattico = 5;
//###START_MODIFICABILE###
  } else if ( _codicePianeta === 3 ) {
//###END_MODIFICABILE###
    nomePianeta = "Colombre";
    forzaGravitazionale = 0.5;
    vento = 0.7;
    atmosfera = "non_respirabile";
    settoreGalattico = 6;
//###START_MODIFICABILE###
  } else if ( _codicePianeta === 4 ) {
//###END_MODIFICABILE###
    nomePianeta = "Buttafuoco";
    forzaGravitazionale = 4.5;
    vento = 80;
    atmosfera = "non_respirabile";
    settoreGalattico = 3;
//###START_MODIFICABILE###
  } else if ( _codicePianeta === 5 ) {
//###END_MODIFICABILE###
    nomePianeta = "Barnabo";
    forzaGravitazionale = 13;
    vento = 0;
    atmosfera = "parzialmente_respirabile";
    settoreGalattico = 1;
//###START_MODIFICABILE###
  } else if ( _codicePianeta === 6 ) {
//###END_MODIFICABILE###
    nomePianeta = "Bastiani";
    forzaGravitazionale = 4.2;
    vento = 23;
    atmosfera = "respirabile";
    settoreGalattico = 7;
    // /\/\/\ £Nos****Kn£$%BsorJOJSONHbooooooLK666dbw**
    // **&fgHJS666&78765&4%4$$L£sC&GSTntadjr /\/\/\
  } else if ( _codicePianeta === "00110111" ) {
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