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

// BASE

function Base ( x, y, vitale, numeroSoldati, colore ) {
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

Base.prototype.distruggiti = function () {}; // da completare

// BATTERIA ANTIMISSILE

function BatteriaAntimissile ( x, y, nMissili, nSoldati, colori, 
                                Tmin, Tmax, deltaTempo, deltaRaffreddamento ) {
  // Attributi Posizione
  this.x = x;
  this.y = y;
  
  // Attributi stato
  this.stato = BatteriaAntimissile.ATTIVA;
  this.numeroMissili = nMissili;
  this.numeroSoldati = nSoldati;
  this.tipoMunizioni = colori;
  
  // Attributi temperatura
  this.temperatura = Tmin;
  this.temperaturaMassima = Tmax;
  this.temperaturaMinima = Tmin;
  this.deltaTempo = deltaTempo;
  this.deltaRaffreddamento = deltaRaffreddamento;
  
  // Attributi Animazione
  this.animazioneColore = 0;
  this.raggioDiEsplosione = 0;
  
  // Set timer raffreddamento
  this.timerRaffreddamento = 
    setInterval( this.raffreddati.bind( this ), this.deltaTempo );
};

// Costanti
BatteriaAntimissile.ATTIVA = 1;
BatteriaAntimissile.ESPLOSIONE = 2;
BatteriaAntimissile.IMPLOSIONE = 3;
BatteriaAntimissile.DISTRUTTA = 4;
BatteriaAntimissile.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];

BatteriaAntimissile.prototype.update = function ( ) {
  if(this.stato === BatteriaAntimissile.DISTRUTTA) {
    return;
  }
  if(this.stato === BatteriaAntimissile.ESPLOSIONE || 
     this.stato === BatteriaAntimissile.IMPLOSIONE) {
    this.esplodi();
    console.log("esplosione")
    return;
  } 
  if(this.temperatura >= this.temperaturaMassima) {
      this.distruggiti();
      return;
  }
};

BatteriaAntimissile.prototype.raffreddati = function ( ) {
  this.temperatura -= this.deltaRaffreddamento;
  if(this.temperatura <= this.temperaturaMinima)
    this.temperatura = this.temperaturaMinima;
}

BatteriaAntimissile.prototype.controllaMissiliRimanenti = function () {
  return this.numeroMissili === 0;
};

BatteriaAntimissile.prototype.esplodi = function () {
  if( this.stato === BatteriaAntimissile.ESPLOSIONE ) {
    ++this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione > 30 ) {
    this.stato = BatteriaAntimissile.IMPLOSIONE;
  }  
  if( this.stato === BatteriaAntimissile.IMPLOSIONE ) {
    --this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = BatteriaAntimissile.DISTRUTTA;
  }
};

BatteriaAntimissile.prototype.distruggiti = function ( ) {
  clearInterval(this.timerRaffreddamento);
  this.stato = BatteriaAntimissile.ESPLOSIONE;
}

BatteriaAntimissile.prototype.disegna = function ( ctx ) {
  this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === BatteriaAntimissile.ATTIVA ) {
    var x, y;
    
    // Disegna munizioni
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
      ctx.closePath();
      ctx.stroke();
    }

    // Scrivi temperatura
    var coloreTesto = 'blue';
    if(this.temperatura <= 200)
      coloreTesto = 'blue';
    else 
      coloreTesto = 'red';
    
    ctx.fillStyle = coloreTesto;
    ctx.font = 'bold 12px arial';
    ctx.fillText( this.temperatura + " C°", this.x - 10, this.y + 45 );
  }
    
  // Anima esplosione
  if( this.stato === BatteriaAntimissile.ESPLOSIONE || 
     this.stato === BatteriaAntimissile.IMPLOSIONE ) {
    ctx.fillStyle = BatteriaAntimissile.COLORI[this.animazioneColore];
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
    ctx.closePath();
    ctx.fill();
  }
};
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

Missile.ATTIVO = 1;
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
  if( this.stato === Missile.ESPLOSIONE ) {
    ++this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione > this.massimoRaggioEsplosione ) {
    this.stato = Missile.IMPLOSIONE;
  }  
  if( this.stato === Missile.IMPLOSIONE ) {
    --this.raggioDiEsplosione;
    if( this.esplosioneATerra ) {
      if ( this.bersaglio.tipo instanceof Base ) {
        if ( this.bersaglio.tipo.attiva === true ) {
          this.bersaglio.tipo.attiva = false;
          // gestire popolazione morta
        }
      } else {
        if ( this.bersaglio.tipo.stato !== BatteriaAntimissile.DISTRUTTA ) {
          this.bersaglio.tipo.stato = BatteriaAntimissile.DISTRUTTA;
          // gestire popolazione morta
        }
      }
    }
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = Missile.ESPLOSO;
  }
};

// Utility
//
///* funzione di controllo */
//Base.prototype.getName = function() { 
//   var funcNameRegex = /function (.{1,})\(/;
//   var results = (funcNameRegex).exec((this).constructor.toString());
//   return (results && results.length > 1) ? results[1] : "";
//};
///* fine funzione di controllo */