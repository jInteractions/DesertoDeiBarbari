function Livello3 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello3.prototype = Object.create( CoreLevel.prototype );
Livello3.prototype.constructor = Livello3;

Livello3.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 300 * (this.numeroOndata * 0.05);
  var velMin = 1.1 + this.numeroOndata * 0.05;
  var velMax = 1.3 + this.numeroOndata * 0.05;
  var numeroMissili = 15 + Math.floor( this.numeroOndata );
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

Livello3.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello3.prototype.inizializzaTorrette = function ( ) {
  var coloreMissili = [];
  var nSoldati = 10;
  var Tmin = 50;
  var Tmax = 1000;
  var deltaTempo = 70;
  var deltaRaffreddamento = 3;
  var nMissili = 0;
  
  // Inizializzo munizioni per torrette
  this.munizioni = [];
  this.munizioni[0] = [];
  this.munizioni[1] = [];
  this.munizioni[2] = [];
  
  this.munizioni[0] = meccanismoCaricamento();
  this.munizioni[1] = meccanismoCaricamento();
  this.munizioni[2] = meccanismoCaricamento();
  
  var scegliColoreMissile = function ( tipo ) {
    switch( tipo ) { 
      case 'plutonio': return '#33CCFF';
      case 'plasma': return 'blue';
      case 'sonico': return 'red';
    }
  }
  
  coloreMissili = [];
  nMissili = (this.munizioni[0]).length;
  $.each( this.munizioni[0], function ( i, m ) {
    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );    
  } );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  
  coloreMissili = [];
  nMissili = (this.munizioni[1]).length;
  $.each( this.munizioni[1], function ( i, m ) { 
    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );
  } );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  
  coloreMissili = [];
  nMissili = (this.munizioni[2]).length;
  $.each( this.munizioni[2], function ( i, m ) { 
    coloreMissili[i] = scegliColoreMissile( m.nucleoEsplosivo );
  } );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
};

Livello3.prototype.scegliTorretta = function ( x, y, tasto ) {
  var indiceTorretta = 0;
  switch(tasto) {
    case 49: indiceTorretta = 0; break;
    case 50: indiceTorretta = 1; break;
    case 51: indiceTorretta = 2; break;
    default: return -1;
  }
  
  var torrettaAttuale = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA 
      && torrettaAttuale.numeroMissili > 0 
      && torrettaAttuale.blocco === false )  
    return indiceTorretta;
  
  return -1;
};

Livello3.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];
  var n = torretta.numeroMissili - 1;
  var missile;
  
  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'plutonio' ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: '#33CCFF',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 0.5
    }, this.coreGame ) );
  }
  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'sonico' ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 2,
      distanzaPerFrame: 8
    }, this.coreGame ) );
  }
  if( this.munizioni[indiceTorretta][n].nucleoEsplosivo === 'plasma' ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 20,
      distanzaPerFrame: 7
    }, this.coreGame ) );
  }
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 200;
  var temperaturaMinima = this.calcolaTempMinima( torretta.temperatura );
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  }
}

// interfaccia test - codice TAB 1

var _tipo = ['plasma', 'plutonio', 'sonico'];
var _numeroMunizioni; 
var _munizioni = [];

var prelevaCarico = function( ) {
  var nMunizioniPlutonio = rand( 0, 4 );
  var nMunizioniSoniche = 4 - nMunizioniPlutonio;
  
  _numeroMunizioni = 10 + 4;
  _munizioni = [];
  for( _i = 0; _i < _numeroMunizioni; ++_i ) {
    var t = _tipo[0];
    
    var x = rand(0, 2);
    if ( x === 1 && nMunizioniPlutonio > 0 ) { 
      t = _tipo[x]; nMunizioniPlutonio--; 
    }
    if ( x === 2 && nMunizioniSoniche > 0 ) { 
      t = _tipo[x]; nMunizioniSoniche--; 
    }
    _munizioni[_i] = { id: _i, nucleoEsplosivo: t };
  }
  
  return _munizioni;
}

// interfaccia test - codice TAB 2

Livello3.prototype.calcolaTempMinima = function ( T ) {
  _temperatura = T
  _deltaTemperatura = 1;
  _contatoreCicli = 0;
  sistemaRaffreddamento();
  return _temperatura;
}

var _temperatura;
var _contatoreCicli;
var _deltaTemperatura;
var rilevaTemperatura = function ( ) {
  return _temperatura;
}

var azionaPompeRaffreddamento = function ( ) {
  _temperatura -= _deltaTemperatura;
  _contatoreCicli++;
}

// TAB 1

/**********
Benvenuto nel file di caricamento delle torrette del sistema Hob-2000.
Ogni torretta preleva dal magazzino i missili, uno ad uno,
per inserirli automaticamente nel caricatore della torretta.
Se sono presenti tipologie di proiettili difettose,
modificare il codice seguente.
**********/

// Questo codice viene ripetuto per ogni torretta automaticamente.
var meccanismoCaricamento = function ( ) {
  // Variabile contenente il carico del magazzino.
  var magazzino = prelevaCarico();
  // Array vuoti per il caricatore della torretta e
  // per il deposito dei missili difettosi.
  var caricatoreTorretta = [];
  var proiettiliScartati = [];
  
//###START_MODIFICABILE###
  for( i = 0; i < magazzino.length; ++i ) {
    // Variabile contenente il proiettile i-esimo del magazzino.
    var proiettile = magazzino[i];
    // Se i missili al plutonio sono difettosi,
    // inserirli nell'array dei missili scartati.
    if( proiettile.nucleoEsplosivo === 'plutonio' ) {
      proiettiliScartati.push( proiettile );
    }
    // Se i missili al plasma sono difettosi,
    // inserirli nell'array dei missili scartati.
    if( proiettile.nucleoEsplosivo === 'plasma' ) {
      caricatoreTorretta.push( proiettile  );
    }
    // Se i missili sonici sono difettosi,
    // inserirli nell'array dei missili scartati.
    if( proiettile.nucleoEsplosivo === 'sonico' ) {
      proiettiliScartati.push( proiettile );
    }
    
    if( caricatoreTorretta.length >= 10 )
      break;
  }
//###END_MODIFICABILE###
  
  return caricatoreTorretta;
}

// test
/*
(
function () {
  
  var munizioni = meccanismoCaricamento();
  var unici = [];
  var esito = true;

  $.each( munizioni, function ( i, m ) {
    if( _munizioni.indexOf( m ) < 0 ) { esito = false; }
    if( m.nucleoEsplosivo !== 'plasma') { esito = false; }
    if( unici[m.id] !== undefined ) { esito = false; }
    
    unici[m.id] = true;
  });
  return esito;
} ) ();
*/


// TAB 2

/**********
Benvenuto nel file di raffreddamento torrette del sistema Hob-2000.
Il codice seguente permette di modificare la soglia di temperatura minima,
cioè la soglia di temperatura dalla quale è possibile ricominciare
a sparare in caso di surriscaldamento della torretta.

Questo codice vale per tutte le torrette.
**********/

var sistemaRaffreddamento = function ( ) {
  T = rilevaTemperatura();
//###START_MODIFICABILE###
  // Variabile contenente la soglia di temperatura minima.
  var sogliaTemperaturaMinima = 500;
//###END_MODIFICABILE###
  
  if( T >= 799 ) {
//###START_MODIFICABILE###
    // Ciclo per la gestione delle pompe di raffreddamento.
    // Deve rimanere attivo finché la temperatura T non è
    // uguale o superiore alla soglia.
    while( T >= sogliaTemperaturaMinima ) {
      azionaPompeRaffreddamento();
      T = rilevaTemperatura();
    }
//###END_MODIFICABILE###
  }
}

// test
/* 
( function () {
  var esito = true;
  
  _deltaTemperatura = 1;
  _temperatura = 799;
  _contatoreCicli = 0;
  sistemaRaffreddamento();
  if( _temperatura + _contatoreCicli !== 799 ) {
    esito = false;
  }
    
  if( _contatoreCicli <= 0 ) {
    esito = false;
  }
  
  return esito; 
}
) ();
*/