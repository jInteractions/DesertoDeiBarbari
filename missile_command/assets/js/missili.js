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

MissileNemico.prototype.update () {
  if( this.ritardoPartenza === 0 ) {
    --this.ritardoPartenza;
    return;
  }
  if( this.stato === Missile.ATTIVO && this.y >= this.yDiArrivo ) {
    this.x = this.xDiArrivo;
    this.y = this.yDiArrivo;
    this.stato = Missile.ESPLOSIONE;
    this.esplosioneATerra = true;
  }
  if( this.stato === Missile.ATTIVO ) {
    this.x += this.dx;
    this.y += this.dy;
  } else {
    this.esplodi();
  }
};

function MissileTerrestre ( parametri ) {
  Missile.call( this, {
    xDiPartenza: parametri.xDiPartenza,
    yDiPartenza: parametri.yDiPartenza,
    xDiArrivo: parametri.xDiArrivo,
    yDiArrivo: parametri.yDiArrivo,
    coloreTestata: parametri.coloreTestata,
    coloreScia: parametri.coloreScia,
    massimoRaggioEsplosione: parametri.massimoRaggioEsplosione
  } );
  var distanzaX = this.xDiArrivo - this.xDiPartenza;
  var distanzaY = this.yDiArrivo - this.yDiPartenza;
  var scala = ( function () {
    var distanza = Math.sqrt( Math.pow( distanzaX, 2 ) + Math.pow( distanzaY, 2 ) );
    var distanzaPerFrame = parametri.distanzaPerFrame;
    return distanza / distanzaPerFrame;
  })();
  this.dx = distanzaX / scala;
  this.dy = distanzaY / scala;  
};

MissileTerrestre.prototype = Object.create( Missile.prototype );
MissileTerrestre.prototype.constructor = MissileTerrestre;

MissileTerrestre.prototype.update () {
  if( this.stato === Missile.ATTIVO && this.y <= this.yDiArrivo ) {
    this.x = this.xDiArrivo;
    this.y = this.yDiArrivo;
    this.stato = Missile.ESPLOSIONE;
  }
  if( this.stato === Missile.ATTIVO ) {
    this.x += this.dx;
    this.y += this.dy;
  } else {
    this.esplodi();
  }
};