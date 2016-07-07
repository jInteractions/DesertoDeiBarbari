function Livello8 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello8.prototype = Object.create( CoreLevel.prototype );
Livello8.prototype.constructor = Livello8;

Livello8.prototype.inizializzaBasi = function ( ) {
  this.coreGame.aggiungiBase( new BaseMilitare( 80,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new BaseMilitare( 180,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 350,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) );
}

Livello8.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  
  var bersagliPrioritari = [];
  $.each( this.esaminaCanaliRadio(), function ( i, b ) {
    bersagliPrioritari.push( {x: b.x + 15, y: b.y - 10, tipo: b} )
  } );

  var bersagliNonBasi = this.coreGame.bersagliAttaccabili().filter( function( b ) {
    if( b.tipo instanceof BaseMilitare )
      return false;
    return true;
  } );
  
  var bersagliPrioritariEsauriti = true;
  $.each( bersagliPrioritari, function( i, b ) {
    if( b.tipo.attiva === true )
      bersagliPrioritariEsauriti = false;
  } )
  
  if( bersagliPrioritariEsauriti === true ) {
    var bersagli = this.coreGame.bersagliAttaccabili();
  } else {
    var bersagli = bersagliNonBasi.concat( bersagliPrioritari );   
  }
  
  var numeroMissili = 50;
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

Livello8.prototype.setupListeners = function ( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  
  $( '.gameContainer' ).on( 'click', function ( ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, null );
  } );
  
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
}

Livello8.prototype.scegliTorretta = function ( x, y, tasto ) {
  var nonFunzionante = function ( torretta ) {  
    if( torretta.stato === BatteriaAntimissile.ATTIVA &&
        torretta.numeroMissili > 0 &&
        torretta.blocco === false )
      return false;
    else
      return true;
  }
  
  var torrette = this.coreGame.batterieAntimissile;
  var torrettaSelezionata;
  
  if( 0 <= x && x < 170 ) {
    torrettaSelezionata = 0;
  }
  if( 170 <= x && x < 340 ) {
    torrettaSelezionata = 1;
  }
  if( 340 <= x && x <= 510 ) {
    torrettaSelezionata = 2;
  }
  
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 1;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 0;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 2;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    return -1;
    
  return torrettaSelezionata;
}

Livello8.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: torretta.x,
    yDiPartenza: torretta.y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 30,
    distanzaPerFrame: 7
  }, this.coreGame ) );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 100;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello8.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

// interfaccia codice utente - livello

var canaleTrasmissione = [
  { radioIdentificatore: "BX1", 
    testo: "[21:05] Non possiamo fare nulla! dovete contattare BX5 solo loro hanno i mezzi per aiutarvi!"},
  { radioIdentificatore: "AX2", 
    testo: "[21:02] Parla base AX2, ci serve immediato aiuto, siamo sotto attacco!"},
  { radioIdentificatore: "BX3", 
    testo: "[21:08] Non possiamo fare nulla! dovete contattare BX5 solo loro hanno i mezzi per aiutarvi!"},
  { radioIdentificatore: "AX4", 
    testo: "[21:12] Non possiamo fare nulla! dovete contattare BX5 solo loro hanno i mezzi per aiutarvi!"},
  { radioIdentificatore: "BX5", 
   testo: "[21:20] Ricevuto! Accorriamo immediatamente!"},
  { radioIdentificatore: "AX6", 
   testo: "[21:06] Non possiamo fare nulla! dovete contattare BX5 solo loro hanno i mezzi per aiutarvi!"},
]

Livello8.prototype.esaminaCanaliRadio = function ( ) {
  var lettere = ["a","b","c","d","e","f","g","h","i","l","m","n","o","p","q","r","s","t","u","v","z"];
  var canale = [];
  var tx = new Trasmettitore( canale );
  var basi = this.coreGame.basi
  $.each( basi, function ( i, b ) {
    var id = "";
    if( b.vitale === true ) {
      id += "AX" + i; 
    } else {
      id += "BX" + i;
    }
    var messaggio = ""; 
    for( var j = 0; j < rand(10, 20); ++j )
      messaggio += lettere[rand(0, lettere.length-1)];
    
    tx.inviaMessaggio( id, messaggio, i );
  } );
  codificaSegnale( canale );
  
  var bersagliPrioritari = [];
  $.each( canale, function( i, c ) {
    if( c.radioIdentificatore.indexOf("AX") >= 0)
      bersagliPrioritari.push( basi[i] );
  } );
  
  trasmissione( canaleTrasmissione );
    
  return bersagliPrioritari;
}

// TAB 1

/**********
Benvenuto nel file di configurazione delle trasmissioni del sistema Hob-2000.
Questo codice permette di impostare correttamente la trasmissione radio
tra le diverse basi del fronte.
È inoltre possibile modificare tale file per aggiungere funzioni di
codifica e decodifica delle trasmissioni, semplicemente scrivendo
il codice per le funzioni codificaSegnale() e decodificaSegnale().
**********/

// Classe del trasmettitore.
function Trasmettitore ( canaleTrasmissione ) {
  this.canaleTrasmissione = canaleTrasmissione;
}

// Funzione di invio del messaggio.
// Dato un identificatore del mittente, un messaggio ed un canale radio,
// il testo viene inviato sul canale corretto.
Trasmettitore.prototype.inviaMessaggio = function ( identificatoreRadio, messaggio, numeroCanale ) {
  var messaggioRadio = {
    radioIdentificatore: identificatoreRadio,
    testo: messaggio
  }  
  this.canaleTrasmissione[ numeroCanale ] = messaggioRadio;
}

// Funzione di ricezione del messaggio.
Trasmettitore.prototype.riceviMessaggio = function ( identificatoreRadio, numeroCanale ) {
  return this.canaleTrasmissione[numeroCanale].testo;
}

// Funzione di trasmissione.
var trasmissione = function ( canaleTrasmissione ) {
  var identificatoreRadio = "AX2";
  var messaggio = "[21:02] Parla base AX2, ci serve immediato aiuto, siamo sotto attacco!"
  var numeroCanale = 1;
  
  trasmettitore = new Trasmettitore( canaleTrasmissione );
  
  console.log( messaggio );
  trasmettitore.inviaMessaggio( identificatoreRadio, messaggio, numeroCanale );
  
  // Le funzioni seguenti devi scriverle tu!
  // /\/\/\ Gen. Ortiz /\/\/\
  codificaSegnale( canaleTrasmissione );
  decodificaSegnale( canaleTrasmissione );
  
  var messaggioRicevuto = trasmettitore.riceviMessaggio( "BX5", 4 );
  console.log( messaggioRicevuto );
}

// TAB 2

/**********
Questo è il file per scrivere il codice delle funzioni di
codifica e decodifica.
Fanne buon uso.
/\/\/\ Gen. Ortiz /\/\/\
**********/

// Funzione per la codifica del segnale radio.
var codificaSegnale = function ( canaleTrasmissione ) {
//###START_MODIFICABILE###
  // Codice da scrivere
//###END_MODIFICABILE###
}

// Funzione per la decodifica del segnale radio.
var decodificaSegnale = function ( canaleTrasmissione ) {
//###START_MODIFICABILE###
  // Codice da scrivere
//###END_MODIFICABILE###
}

// test

/*( function () {
  var lettere = ["a","b","c","d","e","f","g","h","i","l","m","n","o","p","q","r","s","t","u","v","z"];
  var canale = [];
  var tx = new Trasmettitore( canale );
  var basi = [ new BaseMilitare( 80,  430, false, 100, 'red', this.coreGame ),
    new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ),
    new BaseMilitare( 180,  430, false, 100, 'red', this.coreGame ),
    new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ),
    new BaseMilitare( 350,  430, false, 100, 'red', this.coreGame ),
    new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) ];
  $.each( basi, function ( i, b ) {
    var id = "";
    if( b.vitale === true ) {
      id += "AX" + i; 
    } else {
      id += "BX" + i;
    }
    var messaggio = ""; 
    for( var j = 0; j < rand(10, 20); ++j )
      messaggio += lettere[rand(0, lettere.length-1)];
    
    tx.inviaMessaggio( id, messaggio, i );
  } );
  var backupCanale = canale.slice(0);
  codificaSegnale( canale );  
  
  var bersagliPrioritari = [];
  $.each( canale, function( i, c ) {
    if( c.radioIdentificatore.indexOf("AX") >= 0)
      bersagliPrioritari.push( basi[i] );
  } );
  
  var esito = true;
  $.each( bersagliPrioritari, function( i, b ) {
    esito = esito && ( b.vitale === false );
  } )
  
  decodificaSegnale( canale );
  $.each( canale, function( i, c ) {
    esito = esito && ( c.radioIdentificatore === backupCanale[i].radioIdentificatore &&
      c.testo === backupCanale[i].testo )
  } )
  
  return esito;  
}) ();
