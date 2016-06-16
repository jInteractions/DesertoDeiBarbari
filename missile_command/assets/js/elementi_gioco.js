/** MIRINO
*/

// Costruttore
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
  ctx.stroke();
}

Mirino.prototype.cambiaMira = function () {
  var xDistanza = this.inseguiX - this.x;
  var yDistanza = this.inseguiY - this.y;
  var rapporto = (function() {
    var distanza = Math.sqrt( Math.pow(xDistanza, 2) + 
                              Math.pow(yDistanza, 2) );
    return distanza / this.distanzaPerFrame;
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

// BASE

function Base ( x, y, vitale, numeroSoldati, colore ) {
  this.vitale = vitale; // booleano
  this.x = x;
  this.y = y;
  this.numeroSoldati = numeroSoldati;
  this.colore;
  this.attiva;
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

Base.prototype.distruggiti = function () {}; // da completare

// BATTERIA ANTIMISSILE

function BatteriaAntimissile ( x, y, nMissili, nSoldati, colori ) {
  this.x = x;
  this.y = y;
  this.numeroMissili = nMissili;
  this.numeroSoldati = nSoldati;
  this.tipoMunizioni = colori;
};

BatteriaAntimissile.prototype.disegna = function ( ctx ) {
  var x, y;
  var delta = [ [0, 0], [-6, 6], [6, 6], [-12, 12], [0, 12],
    [12, 12], [-18, 18], [-6, 18], [6, 18], [18, 18] ];

  for( var i = 0, len = this.numeroMissili; i < len; i++ ) {
    x = this.x + delta[i][0];
    y = this.y + delta[i][1];

    ctx.strokeStyle = this.tipoMunizioni[i];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.lineTo( x, y + 8 );
    ctx.moveTo( x - 2, y + 10 );
    ctx.lineTo( x - 2, y + 6 );
    ctx.moveTo( x + 2, y + 10 );
    ctx.lineTo( x + 2, y + 6 );
    ctx.stroke();
  }
};

BatteriaAntimissile.prototype.controllaMissiliRimanenti = function () {
  return !!this.numeroMissili;
};

BatteriaAntimissile.prototype.distruggiti = function () {}; // da completare

// MISSILE

function Missile ( parametri ) {
  this.xDiPartenza = parametri.xDiPartenza;
  this.yDiPartenza = parametri.yDiPartenza;
  this.xDiArrivo = parametri.xDiArrivo;
  this.yDiArrivo = parametri.yDiArrivo;
  this.coloreTestata = parametri.colore;
  this.coloreScia = parametri.coloreScia;
  this.x = this.xDiPartenza;
  this.y = this.yDiPartenza;
  this.stato = Missile.ATTIVO;
  this.ampiezza = 2;
  this.altezza = 2;
  this.raggioDiEsplosione = 0;
  this.animazioneColore = 0;
  this.massimoRaggioEsplosione = parametri.massimoRaggioEsplosione;
};

Missile.ATTIVO = 0;
Missile.ESPLOSIONE = 2;
Missile.IMPLOSIONE = 3;
Missile.ESPLOSO = 4;
Missile.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];

Missile.prototype.esplosioneAltriMissili = function ( ctx, coreGame ) {
  if( !this.esplosioneATerra ){
      $.each( coreGame.missiliNemici, function( indice, altroMissile ) {
        if( ctx.isPointInPath( altroMissile.x, altroMissile.y ) &&
            altroMissile.stato === Missile.ATTIVO ) {
          altroMissile.stato = Missile.ESPLOSIONE;
        }
      });
    }
};

Missile.prototype.disegna = function ( ctx, coreGame ) {
  this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === Missile.ATTIVO ){
    ctx.strokeStyle = this.coloreScia;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo( this.xDiPartenza, this.yDiPartenza );
    ctx.lineTo( this.x, this.y );
    ctx.stroke();
    
    ctx.strokeStyle = Missile.COLORI[this.animazioneColore];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo - 5);
    ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo + 5);
    ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo + 5);
    ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo - 5);
    ctx.stroke();
    
    ctx.fillStyle = Missile.COLORI[this.animazioneColore];
    ctx.fillRect( this.x - 1, this.y - 1, this.ampiezza, this.altezza );
  }
  else if ( this.stato === Missile.ESPLOSIONE || 
            this.stato === Missile.IMPLOSIONE ) {
    ctx.fillStyle = Missile.COLORI[this.animazioneColore];
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
    ctx.closePath();
    
    this.esplosioneAltriMissili( ctx, coreGame );
    ctx.fill();
  }
};

Missile.prototype.esplodi = function () {
  if( this.stato === MISSILE.esplosione ) {
    ++this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione > this.massimoRaggioEsplosione ) {
    this.stato = Missile.IMPLOSIONE;
  }
  
  if( this.stato === Missile.IMPLOSIONE ) {
    --this.raggioDiEsplosione;
    if( this.esplosioneATerra ) {
      if ( this.bersaglio[2] instanceof Base ) {
        if (this.bersaglio[2].attivo === true) {
          this.bersaglio[2].attivo = false;
          // gestire popolazione morta
        }
      } 
      else { 
        if (this.bersaglio[2].missiliRimanenti != 0){
          this.bersaglio[2].missiliRimanenti = 0;
          // gestire popolazione morta
        }
      }
    }
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = Missile.ESPLOSO;
  }
};