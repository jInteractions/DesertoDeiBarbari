function Livello1 ( callbackFineLivello, numeroOndata ) {
  CoreLevel.call( this, callbackFineLivello, numeroOndata );
}

Livello1.prototype = Object.create( CoreLevel.prototype );
Livello1.prototype.constructor = Livello1();

Livello1.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
}

Livello1.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue'];
  var nMissili = coloreMissili.length;
  var nSoldati = 10;
  var Tmin = 50;
  var Tmax = 1000;
  var deltaTempo = 70;
  var deltaRaffreddamento = 3;
  
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento )
  );
}

Livello1.prototype.inizializzaLivello = function () {
  this.inizializzaMirino();
  this.coreGame = new CoreGame( this.canvas, this.mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'yellow',
    coloreTestoPrimario: 'blue',
    coloreTestoSecondario: 'red'
  });
  this.inizializzaTorrette();
  this.inizializzaBasi();
  this.inizializzaArmiNemiche();
  this.inizializzaArmiTerrestri();
  // chiamata alla funzione di autenticazione manuale
  this.setupListeners();
}

Livello1.prototype.inizializzaArmiNemiche = function () {
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
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand) );
  }
}

Livello1.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  var raggio = 30;
  var xModificata = x + rand( -raggio, raggio );
  var yModificata = y + rand( -raggio, raggio );
  var vel = 7;
  var incrementoTemperatura = 150;
  
  if( indiceTorretta === -1 )
    return;
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
    xDiArrivo: xModificata,
    yDiArrivo: yModificata,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: raggio,
    distanzaPerFrame: vel
  } ) );
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;
}

Livello1.prototype.calcolaCoefficienteOndata = function () {
  return this.numeroOndata * 1.2;
}

// TAB 1
/*
 __   __  _______  _______         _______  _______  _______  _______ 
|  | |  ||       ||  _    |       |       ||  _    ||  _    ||  _    |
|  |_|  ||   _   || |_|   | ____  |____   || | |   || | |   || | |   |
|       ||  | |  ||       ||____|  ____|  || | |   || | |   || | |   |
|       ||  |_|  ||  _   |        | ______|| |_|   || |_|   || |_|   |
|   _   ||       || |_|   |       | |_____ |       ||       ||       |
|__| |__||_______||_______|       |_______||_______||_______||_______|
Questo file è stato generato automaticamente dal sistema antimissilistico
HOB-2000.


Buongiorno, sono il sistema antimissilistico HOB-2000, per comunicarvi che
l'autenticazione automatica è fallita. Se proprio desiderate procedere, avete la
possibilità di utilizzare l'autenticazione manuale.

Grazie per aver scelto HOB-2000.
*/

// TAB 2

function autenticazioneManuale () {
  // ###START_MODIFICABILE###
  var nome = "";
  var matricola = 0;
  var password = "*****";
  var stringaAccesso = "UTF-8" + nome + "&&--"+ password + "%" + matricola;
  // ###END_MODIFICABILE###
  
  return [nome, matricola, password, stringaAccesso];
}

// test
(function () {
  var risultato = autenticazioneManuale();
  if (
    risultato[ 0 ] === "Cpt Simeoni"
    && risultato[ 1 ] === "150716"
    && risultato[ 2 ] === "utf-8_tuono"
    && risultato[ 3 ] === risultato[ 0 ] + "%" + risultato[ 1 ] + "<" + risultato[ 2 ] + ">"
  ) {
    return true;
  } else {
    return false;
  }
}) ();

// interfaccia test - codice utente
function controlloAccesso () {
  var risultato = autenticazioneManuale();
  var nome = risultato[ 0 ];
  var matricola = risultato[ 1 ];
  var password = risultato[ 2 ];
  var stringa = risultato[ 3 ];
  
  if (
    risultato[ 0 ] === "Cpt Simeoni"
    && risultato[ 1 ] === "150716"
    && risultato[ 2 ] === "utf-8_tuono"
    && risultato[ 3 ] === risultato[ 0 ] + "%" + risultato[ 1 ] + "<" + risultato[ 2 ] + ">"
  ) {
    console.log("> Informazioni inserite correttamente.\nBuon proseguimento con il sistema Hob-2000.\n");
    return true;
  } else {
    return false;
  }
}


// TAB 3

function PlanciaComandi () {}