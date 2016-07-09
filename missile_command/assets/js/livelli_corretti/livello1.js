function Livello1 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello1.prototype = Object.create( CoreLevel.prototype );
Livello1.prototype.constructor = Livello1;

Livello1.prototype.inizializzaMirino = function ( ) {
  if ( controlloAccesso() === true ) {
    this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
  } else {
    this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 0 );
  }
}

Livello1.prototype.inizializzaLivello = function ( ) {
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

Livello1.prototype.inizializzaTorrette = function () {
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

Livello1.prototype.inizializzaArmiNemiche = function () {    
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100 + this.numeroOndata * 0.05;
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

Livello1.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  var raggio = 30;
  var xModificata = x + rand( -raggio, raggio );
  var yModificata = y + rand( -raggio, raggio );
  
  var vel = 0;
  var incrementoTemperatura = 150;
  var coloreScia = 'blue';
  var raggioEsplosione = 2;
  
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
    
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === 'blue' ) { 
    vel = 7; coloreScia = 'blue'; raggioEsplosione = 20;
  }
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === 'red' ) { 
    vel = 8; coloreScia = 'red'; raggioEsplosione = 2;
  }
  if( torretta.tipoMunizioni[ torretta.numeroMissili - 1 ] === '#33CCFF' ) { 
    vel = 0.5; coloreScia = '#33CCFF'; raggioEsplosione = 30;
  }
    
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
    coloreScia: coloreScia,
    massimoRaggioEsplosione: raggio,
    distanzaPerFrame: vel
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;
}

Livello1.prototype.calcolaCoefficienteOndata = function () {
  return this.numeroOndata * 1.2;
}

// interfaccia test - codice utente
var controlloAccesso = function () {
  var risultato = autenticazioneManuale();
  var nome = risultato[ 0 ];
  var matricola = risultato[ 1 ];
  var password = risultato[ 2 ];
  var stringa = risultato[ 3 ];
  
  if (
    nome === "Cpt Simeoni"
    && matricola === 150716
    && password === "utf-8_tuono"
    && stringa === risultato[ 0 ] + "%" + risultato[ 1 ] + "<" + risultato[ 2 ] + ">"
  ) {
    console.log("> Informazioni inserite correttamente.\nBuon proseguimento con il sistema Hob-2000.\n");
    return true;
  } else {
    console.log(
      "> Nome: " + nome
      + "\n> Matricola: " + matricola
      + "\n> Password: " + Array(password.length + 1).join("*")
      + "\n> Stringa: " + stringa
      + "\n> Informazioni non corrette."
    );
    return false;
  }
}

// interfaccia test - codice utente
var sbloccaSparo = function ( ) {
  var base = rand(1, Math.sqrt(Number.MAX_VALUE));
  var altezza = rand(1, Math.sqrt(Number.MAX_VALUE));
  if( base * altezza === verificaPresenzaCervelloOperatore( base, altezza ) ) {
    console.log("> Formula corretta, verifica completata.");
    return true;
  } else {
    console.log("> Formula errata, forma di vita intelligente non rilevata.");
    return false;
  }
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
Copyright (C) 4096 Orsa Minore Software Inc. - Tutti i diritti riservati
È possibile utilizzare, distribuire o modificare questo file secondo i termini della licenza galattica GGPA-DA1979, che sfortunatamente non verrà scritta se non nel prossimo secolo.
*/

// TAB 2

/**********
Il codice seguente permette l'autenticazione manuale di un operatore, tramite la creazione di una parola di accesso ottenuta dalla concatenazione di più stringhe.
ATTENZIONE! Utilizzare solo in caso di fallimento dell'autenticazione automatica.

Inserire il proprio nome utente nella variabile "nome", la propria matricola nella variabile "matricola" e la propria password nella variabile "password".
**********/
var autenticazioneManuale = function () {
//###START_MODIFICABILE###
  // Ricorda: il simbolo = permette di assegnare il valore alla variabile.
  var nome = "Cpt Simeoni";
  var matricola = 150716;
  var password = "utf-8_tuono";
  // Ricorda: il simbolo + tra due stringhe indica la loro concatenazione.
  var stringaAccesso = nome + "%"+ matricola + "<" + password + ">";
//###END_MODIFICABILE###
  
  return [nome, matricola, password, stringaAccesso];
}

// test
/*
(function () {
  var risultato = autenticazioneManuale();
  if (
    risultato[ 0 ] === "Cpt Simeoni"
    && risultato[ 1 ] === 150716
    && risultato[ 2 ] === "utf-8_tuono"
    && risultato[ 3 ] === risultato[ 0 ] + "%" + risultato[ 1 ] + "<" + risultato[ 2 ] + ">"
  ) {
    return true;
  } else {
    return false;
  }
}) ();*/

// TAB 3
/**********
Il codice che segue è necessario per verificare la presenza di un operatore umano.
Il quesito posto è semplice: la variabile "areaRettangolo" deve contenere la corretta formula per il calcolo dell'area di un rettangolo.
**********/
var verificaPresenzaCervelloOperatore = function ( base, altezza ) {
//###START_MODIFICABILE###
  var areaRettangolo = base * altezza;
//###END_MODIFICABILE###
  return areaRettangolo;
}

// test
/*
( function() {
  var base = rand(1, Math.sqrt(Number.MAX_VALUE));
  var altezza = rand(1, Math.sqrt(Number.MAX_VALUE));
  if( base * altezza === verificaPresenzaCervelloOperatore( base, altezza ) ) {
    return true;
  } else {
    return false;
  }
} ) (); */