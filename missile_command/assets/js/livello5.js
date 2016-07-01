function Livello5 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
  
  this._caricatore = new _Caricatore( );
  this._generatore = new _Generatore( );
  this._compressore = new _Compressore( );
  this._mirino = new _Mirino( );
  this._magazzino = [
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
    { combustibile: 'H2O2' }, { combustibile: 'H2O2' }, { combustibile: 'O2' }
  ];
  this.torretta = new Torretta( this._magazzino, this._caricatore, this._compressore,
                                this._generatore, this._mirino );
  this.torretta.caricaMissile();  
}

Livello5.prototype = Object.create( CoreLevel.prototype );
Livello5.prototype.constructor = Livello5;

Livello5.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 15;
  
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

Livello5.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello5.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  this._generatore._capacita = 100;
  this.torretta.spara( rand(0, this.canvas.width), rand(this.canvas.height) );
  console.log( "================================================== "); 
  //console.log( this._caricatore._missileSparato );
  //console.log( this._generatore._capacita );
  //console.log( this._mirino._velocita );
  //console.log( this._compressore._pressione );
  
  //console.log( this._compressore._pressione );
  
  this.coreGame.mirino.distanzaPerFrame = this._mirino._velocita;
  
  this.opzioniMissili = {
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 20,
    distanzaPerFrame: this._compressore._pressione
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
  torretta.temperatura += ((100 - this._generatore._capacita) / 100) * 200;
  torretta.temperaturaSblocco = 500;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  }
}

Livello5.prototype.calcolaParametriMissili = function () {
  
}

function _Caricatore ( ) { this._missili = []; this._i = 0; this._missileSparato; }
_Caricatore.prototype.getParametri = function () {  return this._missili; }
_Caricatore.prototype.immagazzinaMissile = function ( missile, generatore ) {
  this._i++;
  this._missili.push( missile );
}
_Caricatore.prototype.caricaProiettile = function ( generatore ) {
  var energiaErogata = generatore.prelevaEnergia( 10 );
  if( energiaErogata > 0 ) {
    this._i--;
    return this._missili[this._i];
  } else {
    return null;
  }
}
_Caricatore.prototype.innescaFuoco = function ( missile, compressore, generatore ) {
  var energiaErogata = generatore.prelevaEnergia( 10 );
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
  
  if( energiaErogata > 20 )
    energiaErogata = 20;
  this._velocita = (energiaErogata / 20.0) * 30.0;
}

function _Compressore ( ) { this._pressione = 0.0; } 
_Compressore.prototype.getParametri = function () { return this._pressione; }
_Compressore.prototype.aumentaPressione = function ( combustibile, pressione, energia, generatore ) {
  var energiaErogata = generatore.prelevaEnergia( energia );
  var coefficientePressione = 0.0;
  
  if( pressione > 30 )
    pressione = 30;
  
  if( combustibile === 'O2' ) coefficientePressione = 1 - (Math.abs(1 - pressione) / (30 - 1));
  if( combustibile === 'H2' ) coefficientePressione = 1 - (Math.abs(15 - pressione) / (30 - 15));
  if( combustibile === 'H2O2' ) coefficientePressione = 1 - (Math.abs(7 - pressione) / (30 - 7));
  
  if( energiaErogata > 60 )
    energiaErogata = 60;
  this._pressione = (energiaErogata / 60.0) * 15.0 * coefficientePressione;
}

function Torretta ( magazzino, caricatore, compressore, generatore, mirino ) {
  this.magazzino = magazzino;
  this.mirino = mirino;
  this.generatore = generatore;
  this.caricatore = caricatore;
  this.compressore = compressore;
}

Torretta.prototype.caricaMissile = function () {
  for ( i = 0; i < this.magazzino.length; ++i ) {
    this.caricatore.immagazzinaMissile( this.magazzino[i], this.generatore );
  }
}

Torretta.prototype.mira = function ( x, y, energiaFornita ) {
  this.mirino.spostaMirino( x, y, energiaFornita, this.generatore );
}

Torretta.prototype.spara = function ( x, y ) {
  var energiaCompressore = 60;
  var energiaMirino = 20;
  var pressioneCarburante = 0;
  
  var missile = this.caricatore.caricaProiettile( this.generatore );
  
  if( missile.combustibile === 'O2' )
    pressioneCarburante = 1;
  if( missile.combustibile === 'H2' )
    pressioneCarburante = 15;
  if( missile.combustibile === 'H2O2' )
    pressioneCarburante = 7;
  
  this.compressore.aumentaPressione( missile.combustibile, pressioneCarburante, 
                                    energiaCompressore, this.generatore );
  
  this.mira( x, y, energiaMirino );
  
  this.caricatore.innescaFuoco( missile, this.compressore, this.generatore );
}

function TorrettaLaterale ( magazzino ) {
  Torretta.call( magazzino );
}


