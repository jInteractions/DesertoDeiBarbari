function Livello9 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello9.prototype = Object.create( CoreLevel.prototype );
Livello9.prototype.constructor = Livello9;

Livello9.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 1;
  
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

function Trasmettitore ( canaleTrasmissione ) {
  this.canaleTrasmissione = canaleTrasmissione;
}

TrasmettitoreBaseTerrestre.prototype.inviaMessaggio = function ( messaggio, numeroCanale ) {
  var messaggioRadio = {
    radioIdentificatore: "AX4567",
    testo: messaggio
  }
  
  this.canaleTrasmissione[ numeroCanale ].trasmetti( messaggio );
}

function TrasmettitoreModificato ( canaleTrasmissione ) {
  Trasmettitore.call( canaleTrasmissione );
}

TrasmettitoreModificato.prototype = Object.create( Trasmettitore.prototype );
TrasmettitoreModificato.prototype.constructor = Trasmettitore;