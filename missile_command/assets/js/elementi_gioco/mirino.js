function Mirino ( xIniziale, yIniziale, vel ) {
  this.x = xIniziale;
  this.y = yIniziale;
  this.stato = Mirino.TRACCIAMENTO;
  this.inseguiX = 0;
  this.inseguiY = 0;
  this.dx = 0;
  this.dy = 0;
  this.distanzaPerFrame = vel;
};

// Costanti
Mirino.SPENTO = 0;
Mirino.TRACCIAMENTO = 1;

// Metodi

Mirino.prototype.disegna = function ( ctx ) {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo( this.x - 5, this.y - 5 );
  ctx.lineTo( this.x + 5, this.y + 5 );
  ctx.moveTo( this.x - 5, this.y + 5 );
  ctx.lineTo( this.x + 5, this.y - 5 );
  ctx.closePath();
  ctx.stroke();
}

Mirino.prototype.cambiaMira = function () {
  var xDistanza = this.inseguiX - this.x;
  var yDistanza = this.inseguiY - this.y;
  var rapporto = ( function( d ) {
    var distanza = Math.sqrt( Math.pow(xDistanza, 2) + 
                              Math.pow(yDistanza, 2) );
    return distanza / d;
  }) ( this.distanzaPerFrame );
  this.dx = xDistanza / rapporto;
  this.dy = yDistanza / rapporto;
}

Mirino.prototype.update = function () {
  if ( this.stato != Mirino.TRACCIAMENTO )
    return;
  var xDistanza = this.inseguiX - this.x;
  var yDistanza = this.inseguiY - this.y;
  var distanzaObiettivo = Math.sqrt( Math.pow(xDistanza, 2) + 
                                     Math.pow(yDistanza, 2) );
  var spostamentoMirino = Math.sqrt( Math.pow(this.dx, 2) + 
                                     Math.pow(this.dy, 2) );
  if ( distanzaObiettivo <= spostamentoMirino ) {
    this.x = this.inseguiX;
    this.y = this.inseguiY;
    return;
  }
  if ( distanzaObiettivo >= 1.0 ) {
    this.x += this.dx;
    this.y += this.dy;
  }
}