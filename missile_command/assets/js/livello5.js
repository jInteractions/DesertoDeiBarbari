function Livello5 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
  
  var _magazzino = [
    { combustibile: 'O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' },
    { combustibile: 'H2' }, { combustibile: 'O2' }, { combustibile: 'H2' },
    { combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' },
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' }
  ];
  
  this.torretta = [];
  this.torretta[0] = new TorrettaDestra( _magazzino, new _Caricatore( ), new _Compressore( ), new _Generatore( ), new _Mirino( ));
  this.torretta[1] = new TorrettaCentrale( _magazzino, new _Caricatore( ), new _Compressore( ), new _Generatore( ), new _Mirino( ));
  this.torretta[2] = new TorrettaSinistra( _magazzino, new _Caricatore( ), new _Compressore( ), new _Generatore( ), new _Mirino( ));
  
  this.torretta[0].caricaMissile(); 
  this.torretta[1].caricaMissile();
  this.torretta[2].caricaMissile();
}

Livello5.prototype = Object.create( CoreLevel.prototype );
Livello5.prototype.constructor = Livello5;

Livello5.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 500 * (this.numeroOndata * 0.05);
  var velMin = 1.3 + this.numeroOndata * 0.05;
  var velMax = 1.4 + this.numeroOndata * 0.05;
  var numeroMissili = 18 + Math.floor( this.numeroOndata );
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

Livello5.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello5.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];
  var torrettaVirtuale = this.torretta[ indiceTorretta ];
  
  torrettaVirtuale.generatore._capacita = 100;
  torrettaVirtuale.spara( x, y );
  
  this.coreGame.mirino.distanzaPerFrame = torrettaVirtuale.mirino._velocita;
  
  this.opzioniMissili = {
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 20,
    distanzaPerFrame: torrettaVirtuale.compressore._pressione
  }
  
  this.opzioniMissili.xDiPartenza = torretta.x;
  this.opzioniMissili.yDiPartenza = torretta.y;
  this.opzioniMissili.xDiArrivo = x;
  this.opzioniMissili.yDiArrivo = y;
  this.coreGame.missiliTerrestri.push( 
    new MissileTerrestre( this.opzioniMissili, this.coreGame ) 
  );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += ((100 - torrettaVirtuale.generatore._capacita) / 100) * 200;
  torretta.temperaturaSblocco = 500;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  }
}

function _Caricatore ( ) { this._missili = []; this._i = 0; this._missileSparato; }
_Caricatore.prototype.getParametri = function () {  return this._missili; }
_Caricatore.prototype.immagazzinaMissile = function ( missile, generatore ) {
  this._i++;
  this._missili.push( missile );
}
_Caricatore.prototype.caricaProiettile = function ( generatore ) {
  var energiaErogata = generatore.prelevaEnergia( 5 );
  if( energiaErogata > 0 ) {
    this._i--;
    return this._missili[this._i];
  } else {
    return null;
  }
}
_Caricatore.prototype.innescaFuoco = function ( missile, compressore, generatore ) {
  var energiaErogata = generatore.prelevaEnergia( 5 );
  if( energiaErogata > 0 ) {
    this._missileSparato = missile;
  } else {
    return null;
  }
}

function _Generatore ( ) { this._capacita = 100; }
_Generatore.prototype.getParametri = function () {  return this._capacita; }
_Generatore.prototype.prelevaEnergia = function ( energia ) {
  if( this._capacita - energia < 0 ) {
    var capacitaMassima = this._capacita;
    this._capacita = 0;
    return capacitaMassima;
  }
  this._capacita -= energia;
  return energia;
}

function _Mirino ( ) { this._velocita = 10.0; }
_Mirino.prototype.getParametri = function () { return this._velocita; }
_Mirino.prototype.spostaMirino = function ( x, y, energia, generatore ) {
  var energiaErogata = generatore.prelevaEnergia( energia );
  
  if( energiaErogata > 10 )
    energiaErogata = 10;
  this._velocita = (energiaErogata / 10.0) * 30.0;
}

function _Compressore ( ) { this._pressione = 0.0; } 
_Compressore.prototype.getParametri = function () { return this._pressione; }
_Compressore.prototype.aumentaPressione = function ( combustibile, pressione, energia, generatore ) {
  var energiaErogata = generatore.prelevaEnergia( energia );
  var coefficientePressione = 0.0;
  
  if( pressione > 30 )
    pressione = 30;
  
  coefficientePressione = 1 - (Math.abs(15 - pressione) / (30 - 15));
  
  if( energiaErogata > 30 )
    energiaErogata = 30;
  this._pressione = (energiaErogata / 30.0) * 15.0 * coefficientePressione;
}

// TAB 1

/**********
Benvenuto nel file di configurazione della torretta centrale del sistema Hob-2000.
Ogni torretta contiene tre variabili fondamentali: l'energia per il compressore del gas di propulsione, l'energia per lo spostamento del cannone e la pressione del carburante del missile.
Cambiare queste configurazioni solo se si notano malfunzionamenti nel meccanismo di sparo delle torrette.
**********/

// Classe della torretta centrale.
function TorrettaCentrale ( magazzino, caricatore, compressore, generatore, mirino ) {
  this.magazzino = magazzino;
  this.mirino = mirino;
  this.generatore = generatore;
  this.caricatore = caricatore;
  this.compressore = compressore;
}

// Funzione per il caricamento del missile.
TorrettaCentrale.prototype.caricaMissile = function () {
  for ( i = 0; i < this.magazzino.length; ++i ) {
    this.caricatore.immagazzinaMissile( this.magazzino[i], this.generatore );
  }
}

// Funzione per lo spostamento del cannone.
TorrettaCentrale.prototype.mira = function ( x, y, energiaFornita ) {
  this.mirino.spostaMirino( x, y, energiaFornita, this.generatore );
}

// Funzione per lo sparo.
TorrettaCentrale.prototype.spara = function ( x, y ) {
//###START_MODIFICABILE###
  // Variabile contenente l'energia del compressore del gas di propulsione.
  var energiaCompressore = 5;
  // Variabile contenente l'energia per lo spostamento del cannone.
  var energiaMirino = 1;
  // Variabile contenente la pressione del carburante del missile.
  var pressioneCarburante = 15;
//###END_MODIFICABILE###
  var missile = this.caricatore.caricaProiettile( this.generatore );
  this.compressore.aumentaPressione( missile.combustibile, pressioneCarburante, 
    energiaCompressore, this.generatore );
  this.mira( x, y, energiaMirino );
  this.caricatore.innescaFuoco( missile, this.compressore, this.generatore );
}

// test
/*
( function () {
  var esito = true;
  
  var magazzino = [{ combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' }]
  var torretta = new TorrettaDestra( magazzino, new _Caricatore( ), 
                                    new _Compressore( ), new _Generatore( ), 
                                    new _Mirino( ));
  torretta.caricaMissile();
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.generatore._capacita !== 100 - (5 + 5 + 10 + 30)) esito = false;
  if( torretta.mirino._velocita !== 30.0) esito = false;
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  return esito;
}
) (); */

// TAB 2

/**********
Benvenuto nel file di configurazione della torretta sinistra del sistema Hob-2000.
Ogni torretta contiene tre variabili fondamentali: l'energia per il compressore del gas di propulsione, l'energia per lo spostamento del cannone e la pressione del carburante del missile.
Cambiare queste configurazioni solo se si notano malfunzionamenti nel meccanismo di sparo delle torrette.
**********/

// Classe della torretta sinistra
function TorrettaSinistra ( magazzino, caricatore, compressore, generatore, mirino ) {
  this.magazzino = magazzino;
  this.mirino = mirino;
  this.generatore = generatore;
  this.caricatore = caricatore;
  this.compressore = compressore;
}

// Funzione per il caricamento del missile.
TorrettaSinistra.prototype.caricaMissile = function () {
  for ( i = 0; i < this.magazzino.length; ++i ) {
    this.caricatore.immagazzinaMissile( this.magazzino[i], this.generatore );
  }
}

// Funzione per lo spostamento del cannone.
TorrettaSinistra.prototype.mira = function ( x, y, energiaFornita ) {
  this.mirino.spostaMirino( x, y, energiaFornita, this.generatore );
}

// Funzione per lo sparo.
TorrettaSinistra.prototype.spara = function ( x, y ) {
//###START_MODIFICABILE###
  // Variabile contenente l'energia del compressore del gas di propulsione.
  var energiaCompressore = 30;
  // Variabile contenente l'energia per lo spostamento del cannone.
  var energiaMirino = 10;
  // Variabile contenente la pressione del carburante del missile.
  var pressioneCarburante = 5;
//###END_MODIFICABILE###
  var missile = this.caricatore.caricaProiettile( this.generatore );  
  this.compressore.aumentaPressione( missile.combustibile, pressioneCarburante, 
    energiaCompressore, this.generatore );
  this.mira( x, y, energiaMirino );
  this.caricatore.innescaFuoco( missile, this.compressore, this.generatore );
}

// test
/*
( function () {
  var esito = true;
  
  var magazzino = [{ combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' }]
  var torretta = new TorrettaCentrale( magazzino, new _Caricatore( ), 
                                    new _Compressore( ), new _Generatore( ), 
                                    new _Mirino( ));
  torretta.caricaMissile();
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.generatore._capacita !== 100 - (5 + 5 + 10 + 30)) esito = false;
  if( torretta.mirino._velocita !== 30.0) esito = false;
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  return esito;
} ) (); */

// TAB 3

/**********
Benvenuto nel file di configurazione della torretta destra del sistema Hob-2000.
Ogni torretta contiene tre variabili fondamentali: l'energia per il compressore del gas di propulsione, l'energia per lo spostamento del cannone e la pressione del carburante del missile.
Cambiare queste configurazioni solo se si notano malfunzionamenti nel meccanismo di sparo delle torrette.
**********/

// Classe della torretta destra
function TorrettaDestra ( magazzino, caricatore, compressore, generatore, mirino ) {
  this.magazzino = magazzino;
  this.mirino = mirino;
  this.generatore = generatore;
  this.caricatore = caricatore;
  this.compressore = compressore;
}

// Funzione per il caricamento del missile.
TorrettaDestra.prototype.caricaMissile = function () {
  for ( i = 0; i < this.magazzino.length; ++i ) {
    this.caricatore.immagazzinaMissile( this.magazzino[i], this.generatore );
  }
}

// Funzione per lo spostamento del cannone.
TorrettaDestra.prototype.mira = function ( x, y, energiaFornita ) {
  this.mirino.spostaMirino( x, y, energiaFornita, this.generatore );
}

// Funzione per lo sparo.
TorrettaDestra.prototype.spara = function ( x, y ) {
//###START_MODIFICABILE###
  // Variabile contenente l'energia del compressore del gas di propulsione.
  var energiaCompressore = 80;
  // Variabile contenente l'energia per lo spostamento del cannone.
  var energiaMirino = 50;
  // Variabile contenente la pressione del carburante del missile.
  var pressioneCarburante = 20;
//###END_MODIFICABILE###
  var missile = this.caricatore.caricaProiettile( this.generatore );
  this.compressore.aumentaPressione( missile.combustibile, pressioneCarburante, 
    energiaCompressore, this.generatore );
  this.mira( x, y, energiaMirino );
  this.caricatore.innescaFuoco( missile, this.compressore, this.generatore );
}

// test
/*
( function () {
  var esito = true;
  
  var magazzino = [{ combustibile: 'O2' }, { combustibile: 'H2' }, { combustibile: 'H2O2' }]
  var torretta = new TorrettaSinistra( magazzino, new _Caricatore( ), 
                                    new _Compressore( ), new _Generatore( ), 
                                    new _Mirino( ));
  torretta.caricaMissile();
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.generatore._capacita !== 100 - (5 + 5 + 10 + 30)) esito = false;
  if( torretta.mirino._velocita !== 30.0) esito = false;
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  torretta.generatore._capacita = 100;
  torretta.spara( 0, 0 );
  if( torretta.compressore._pressione !== 15) esito = false;
  
  return esito;
} ) (); */

// SOLUZIONE
/*
var energiaCompressore = 30;
var energiaMirino = 10;
var pressioneCarburante = 0;
var missile = this.caricatore.caricaProiettile( this.generatore );
  pressioneCarburante = 15;
this.compressore.aumentaPressione( missile.combustibile, pressioneCarburante, 
  energiaCompressore, this.generatore );
this.mira( x, y, energiaMirino );
this.caricatore.innescaFuoco( missile, this.compressore, this.generatore );
  */