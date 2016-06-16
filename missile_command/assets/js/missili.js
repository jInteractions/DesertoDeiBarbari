function MissileNemico ( parametri, bersagli, canvasWidth ) {
  var xDiPartenza = rand( 0, canvasWidth );
  var yDiPartenza = 0;
  var bersaglio = bersagli[ rand( 0, bersagli.length - 1 ) ];
  
  Missile.call( this, {
    xDiPartenza: xDiPartenza,
    yDiPartenza: yDiPartenza,
    xDiArrivo: bersaglio[ 0 ],
    yDiArrivo: bersagli[ 1 ],
    coloreTestata: parametri.coloreTestata,
    coloreScia: parametri.coloreScia,
    massimoRaggioEsplosione: parametri.massimoRaggioEsplosione
  } );
  
  this.velCaduta = parametri.vel;
  this.frameDistanzaBersaglio = ( 650 - 30 ) / this.velCaduta;
  
  if ( this.frameDistanzaBersaglio < 20 ) {
    this.frameDistanzaBersaglio = 20;
  }
  
  this.dx = ( this.xDiArrivo - this.xDiPartenza ) / this.frameDistanzaBersaglio;
  this.dy = ( this.yDiArrivo - this.yDiPartenza ) / this.frameDistanzaBersaglio;
  this.ritardoPartenza = rand( 0, parametri.ritardoMassimo );
  this.esplosioneATerra = false;
};

MissileNemico.prototype = Object.create( Missile.prototype );
MissileNemico.prototype.constructor = MissileNemico;