function Base ( x, y, vitale, numeroSoldati, colore, coreGame ) {
  this.coreGame = coreGame;
  this.vitale = vitale; // booleano
  this.x = x;
  this.y = y;
  this.numeroSoldati = numeroSoldati;
  this.colore = colore;
  this.attiva = true;
};

Base.prototype.disegna = function ( ctx ) {
  var x = this.x;
  var y = this.y;
  ctx.fillStyle = this.colore;
  ctx.beginPath();
  ctx.moveTo( x, y );
  ctx.lineTo( x, y - 10 );
  ctx.lineTo( x + 10, y - 10 );
  ctx.lineTo( x + 15, y - 15 );
  ctx.lineTo( x + 20, y - 10 );
  ctx.lineTo( x + 30, y - 10 );
  ctx.lineTo( x + 30, y );
  ctx.closePath();
  ctx.fill();
};

Base.prototype.distruggiti = function () {
  this.coreGame.aggiornaPunteggioMorti( this.numeroSoldati );
};