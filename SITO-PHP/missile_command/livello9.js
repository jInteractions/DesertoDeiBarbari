function Livello9 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello9.prototype = Object.create( CoreLevel.prototype );
Livello9.prototype.constructor = Livello9;

CoreLevel.prototype.inizializzaBasi = function () {
  this.coreGame.aggiungiBase( new BaseMilitare( 80,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new BaseMilitare( 180,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 350,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) );
};

Livello9.prototype.inizializzaArmiNemiche = function ( ) {
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

Livello9.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

// interfaccia codice utente - livello

Livello9.prototype.esaminaCanaliRadio = function ( ) {
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
  
  var bersagliPrioritari = [];
  
  $.each( canale, function( i, c ) {
    if( c.radioIdentificatore.indexOf("AX") >= 0)
      bersagliPrioritari.push( basi[i] );
  } );
    
  return bersagliPrioritari;
}

// TAB 1

function Trasmettitore ( canaleTrasmissione ) {
  this.canaleTrasmissione = canaleTrasmissione;
}

Trasmettitore.prototype.inviaMessaggio = function ( identificatoreRadio, messaggio, numeroCanale ) {
  var messaggioRadio = {
    radioIdentificatore: identificatoreRadio,
    testo: messaggio
  }
  
  this.canaleTrasmissione[ numeroCanale ] = messaggioRadio;
}

var codificaSegnale = function ( canaleTrasmissione ) {
  
}

var decodificaSegnale = function () {
  
}