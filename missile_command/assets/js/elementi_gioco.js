function Mirino ( xIniziale, yIniziale ) {
  this.x = xIniziale;
  this.y = yIniziale;
  this.stato = Mirino.TRACCIAMENTO;
  this.inseguiX = 0;
  this.inseguiY = 0;
  this.dx = 0;
  this.dy = 0;
};

Mirino.SPENTO = 0;
Mirino.TRACCIAMENTO = 1;

Mirino.prototype.disegna = function ( ctx ) {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo( this.x - 5, this.y - 5 );
  ctx.lineTo( this.x + 5, this.y + 5 );
  ctx.moveTo( this.x - 5, this.y + 5 );
  ctx.lineTo( this.x + 5, this.y - 5 );
  ctx.stroke();
}

Mirino.prototype.cambiaMira = function () {
  var xDistanza = this.inseguiX - this.x;
  var yDistanza = this.inseguiY - this.y;
  var distanzaPerFrame = 16.0;

  var rapporto = (function() {
    var distanza = Math.sqrt( Math.pow(xDistanza, 2) + 
                              Math.pow(yDistanza, 2) );
    return distanza / distanzaPerFrame;
  }) ();

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

function Base ( x, y, vitale, numeroSoldati ) {
  this.vitale = vitale; // booleano
  this.x = x;
  this.y = y;
  this.numeroSoldati = numeroSoldati;
};

function BatteriaAntimissile ( x, y, numeroMissili, numeroSoldati ) {
  this.x = x;
  this.y = y;
  this.numeroMissili = numeroMissili;
  this.numeroSoldati = numeroSoldati;
};