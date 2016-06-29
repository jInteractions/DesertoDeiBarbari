function Livello1 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello1.prototype = Object.create( CoreLevel.prototype );
Livello1.prototype.constructor = Livello1;

Livello1.prototype.inizializzaMirino = function ( ) {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 10.0 );
}

Livello1.prototype.inizializzaLivello = function ( numeroOndata ) {
  this.numeroOndata = numeroOndata;
  
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
  var ritardoMassimo = 200;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 15;
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, this.canvas.width );
    velRand = rand( 1, 1.5 );
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
  var xModificata = x; //+ rand( -raggio, raggio );
  var yModificata = y; //+ rand( -raggio, raggio );
  var vel = 7;
  var incrementoTemperatura = 20;
  
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
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += incrementoTemperatura;
}

Livello1.prototype.calcolaCoefficienteOndata = function () {
  return this.numeroOndata * 1.2;
}