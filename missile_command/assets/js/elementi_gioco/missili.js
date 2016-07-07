function Missile ( parametri, coreGame ) {
  this.coreGame = coreGame;
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
Missile.COLORI = ['red', 'red', 
                  'yellow', 'yellow', 
                  'white', 'white', 
                  'blue', 'blue',
                  'purple', 'purple', 
                 ];

Missile.prototype.esplosioneAltriMissili = function ( ctx, coreGame ) {
  var missiliInGioco = coreGame.missiliNemici.concat( coreGame.missiliTerrestri );
  
  if( !this.esplosioneATerra ){
      $.each( missiliInGioco, function( indice, altroMissile ) {
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
    ctx.closePath();
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
      if ( this.bersaglio.tipo instanceof BaseMilitare ) {
        if ( this.bersaglio.tipo.attiva === true ) {
          this.bersaglio.tipo.attiva = false;
          this.bersaglio.tipo.distruggiti();
        }
      } else {
        if ( this.bersaglio.tipo.stato === BatteriaAntimissile.ATTIVA ) {
          this.bersaglio.tipo.stato = BatteriaAntimissile.ESPLOSIONE;
          this.bersaglio.tipo.distruggiti();
        }
      }
    }
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = Missile.ESPLOSO;
  }
};

function MissileNemico ( parametri, bersagli, canvasWidth, xDiPartenza, velCaduta, ritardoPartenza, coreGame ) {
  var yDiPartenza = 0;
  
  this.bersaglio = bersagli[ rand( 0, bersagli.length - 1 ) ];
  
  Missile.call( this, {
    xDiPartenza: xDiPartenza,
    yDiPartenza: yDiPartenza,
    xDiArrivo: this.bersaglio.x,
    yDiArrivo: this.bersaglio.y,
    coloreTestata: parametri.coloreTestata,
    coloreScia: parametri.coloreScia,
    massimoRaggioEsplosione: parametri.massimoRaggioEsplosione
  }, coreGame );
  
  this.velCaduta = velCaduta;
  
  var distanzaX = this.xDiArrivo - this.xDiPartenza;
  var distanzaY = this.yDiArrivo - this.yDiPartenza;
  var scala = ( function ( d ) {
    var distanza = Math.sqrt( Math.pow( distanzaX, 2 ) + Math.pow( distanzaY, 2 ) );
    return distanza / d;
  })( velCaduta );
  this.dx = distanzaX / scala;
  this.dy = distanzaY / scala;
  
  this.ritardoPartenza = ritardoPartenza;
  this.esplosioneATerra = false;
};

MissileNemico.prototype = Object.create( Missile.prototype );
MissileNemico.prototype.constructor = MissileNemico;

MissileNemico.prototype.update = function () {
  if( this.ritardoPartenza !== 0 ) {
    this.ritardoPartenza--;
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

function MissileTerrestre ( parametri, coreGame ) {
  Missile.call( this, {
    xDiPartenza: parametri.xDiPartenza,
    yDiPartenza: parametri.yDiPartenza,
    xDiArrivo: parametri.xDiArrivo,
    yDiArrivo: parametri.yDiArrivo,
    coloreTestata: parametri.coloreTestata,
    coloreScia: parametri.coloreScia,
    massimoRaggioEsplosione: parametri.massimoRaggioEsplosione
  }, coreGame );
  
  this.velCaduta = parametri.distanzaPerFrame;
  
  var distanzaX = this.xDiArrivo - this.xDiPartenza;
  var distanzaY = this.yDiArrivo - this.yDiPartenza;
  var scala = ( function ( d ) {
    var distanza = Math.sqrt( Math.pow( distanzaX, 2 ) + Math.pow( distanzaY, 2 ) );
    return distanza / d;
  })( parametri.distanzaPerFrame );
  this.dx = distanzaX / scala;
  this.dy = distanzaY / scala;  
};

MissileTerrestre.prototype = Object.create( Missile.prototype );
MissileTerrestre.prototype.constructor = MissileTerrestre;

MissileTerrestre.prototype.update = function () {
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

MissileTerrestre.prototype.disegna = function ( ctx, coreGame ) {
  Missile.prototype.disegna.call( this, ctx, coreGame );
  
  if ( this.stato === Missile.ATTIVO ) {
    ctx.strokeStyle = Missile.COLORI[this.animazioneColore];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo - 5);
    ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo + 5);
    ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo + 5);
    ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo - 5);
    ctx.closePath();
    ctx.stroke();
  }
};


function MissileNemicoDoppio ( parametri, bersagli, canvasWidth, 
                               xDiPartenza, velCaduta, ritardoPartenza, maxSdoppio, coreGame ) {
  
  MissileNemico.call( this, parametri, bersagli, canvasWidth, 
                      xDiPartenza, velCaduta, ritardoPartenza, coreGame );

  this.parametri = parametri;
  this.maxSdoppio = maxSdoppio;
  
  var distanza = Math.sqrt( Math.pow(this.xDiArrivo - this.xDiPartenza, 2) + 
      Math.pow(this.xDiArrivo - this.xDiPartenza, 2) );
  var frameAlTarget = distanza / velCaduta;
  
  this.ritardoSuddivisione = rand(0, frameAlTarget/2);
  this.suddivisioneAvvenuta = false;
}

// Make MissileNemicoDoppio inherit from MissileNemico
MissileNemicoDoppio.prototype = Object.create( MissileNemico.prototype );
MissileNemicoDoppio.prototype.constructor = MissileNemicoDoppio;

// Suddivide il missile aggiungendone un altro con un obiettivo differente
MissileNemicoDoppio.prototype.sdoppiati = function ( ) {
  var nuoviBersagli = this.coreGame.bersagliAttaccabili();

  // Escludo il bersaglio del missile "padre"
  nuoviBersagli.filter( function(bersaglio) {
    return bersaglio !== this.bersaglio;
  } );

  var nuovoBersaglio;
  var nMissili = rand(1, this.maxSdoppio);
  for(i = 0; i < nMissili; ++i) {
    nuovoBersaglio = nuoviBersagli[ rand(0, nuoviBersagli.length - 1) ];

    // Rimuovo il bersaglio dalla lista di quelli disponibili
    nuoviBersagli.filter( function(bersaglio) {
      return bersaglio !== nuovoBersaglio    
    } );
    
    // console.log( nuovoBersaglio )
    var m = new MissileNemicoFrammento( this.parametri, nuovoBersaglio, this.x, this.y, this.velCaduta,       this.coreGame);
    this.coreGame.missiliNemici.push( m );
  }
  this.suddivisioneAvvenuta = true;
};

MissileNemicoDoppio.prototype.update = function( ) {
  if( this.ritardoPartenza !== 0 ) {
    this.ritardoPartenza--;
    return;
  }
  
  if( this.ritardoSuddivisione !== 0 )
    this.ritardoSuddivisione--;			
  else
    if( this.suddivisioneAvvenuta == false )
      this.sdoppiati();

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

function MissileNemicoFrammento( parametri, bersaglio, xDiPartenza, 
                                  yDiPartenza, velCaduta, coreGame ) {
  this.xDiPartenza = xDiPartenza;
  this.yDiPartenza = yDiPartenza;

  Missile.call( this, {
    xDiPartenza: xDiPartenza,
    yDiPartenza: yDiPartenza,
    xDiArrivo: bersaglio.x,
    yDiArrivo: bersaglio.y,
    coloreTestata: parametri.coloreTestata,
    coloreScia: parametri.coloreScia,
    massimoRaggioEsplosione: parametri.massimoRaggioEsplosione
  }, coreGame );

  this.velCaduta = velCaduta;
  this.bersaglio = bersaglio;
  
  var distanzaX = this.xDiArrivo - this.xDiPartenza;
  var distanzaY = this.yDiArrivo - this.yDiPartenza;
  var scala = ( function ( d ) {
    var distanza = Math.sqrt( Math.pow( distanzaX, 2 ) + Math.pow( distanzaY, 2 ) );
    return distanza / d;
  })( velCaduta );
  this.dx = distanzaX / scala;
  this.dy = distanzaY / scala;
  
  
  this.ritardoPartenza = 0;
  this.esplosioneATerra = false;
};

MissileNemicoFrammento.prototype = Object.create( Missile.prototype );
MissileNemicoFrammento.prototype.constructor = MissileNemicoFrammento;


MissileNemicoFrammento.prototype.update = function () {
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