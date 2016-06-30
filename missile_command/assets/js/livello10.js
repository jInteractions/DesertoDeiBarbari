var diff = function ( a1, a2 ) {
  var newA = a1.filter( function( x ) {
    return a2.indexOf( x ) < 0;
  } );
  return newA;
};

function Livello10 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
  this.missileNucleare;
}

Livello10.prototype = Object.create( CoreLevel.prototype );
Livello10.prototype.constructor = Livello10;

Livello10.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue' ];
  
  var filtro = function ( missile ) {
    return ( missile.y > 10 && missile instanceof MissileNemico);
  };
  
  var opzioniBatteria1 = { 
    x: 35, 
    y: 410, 
    nMissili: 0, 
    nSoldati: 10, 
    colori: coloreMissili, 
    Tmin: 50, 
    Tmax: 1000, 
    deltaTempo: 70, 
    deltaRaffreddamento: 3
  };
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new TorrettaAutomatica( 0, opzioniBatteria1, 100, true, filtro, true, 15, 10, 'blue', this.coreGame) );
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new BatteriaAntimissile( 255, 410, 10, 10, coloreMissili, 50, 1000, 70, 10, this.coreGame ) );
  var opzioniBatteria2 = { 
    x: 475, 
    y: 410, 
    nMissili: 0, 
    nSoldati: 10, 
    colori: coloreMissili, 
    Tmin: 50, 
    Tmax: 1000, 
    deltaTempo: 70, 
    deltaRaffreddamento: 3
  };
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new TorrettaAutomatica( 475, opzioniBatteria2, 100, true, filtro, true, 15, 10, 'blue', this.coreGame ) );  
}

Livello10.prototype.inizializzaArmiTerrestri = function () {
  this.missileNucleare = new MissileNucleare( 255, 410, 255, this.coreGame.minacce[ 0 ].y + 53, this.coreGame );
  this.coreGame.missiliTerrestri.push( this.missileNucleare );
}

Livello10.prototype.inizializzaArmiNemiche = function () {
  var ampiezzaAreaPertenza = 50;
  var ritardoMassimo = 1000;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 10;
  
  for( var i = 0; i < numeroMissili / 2 ; i++ ) {
    xRand = rand( 0, ampiezzaAreaPertenza );
    velRand = rand( 2, 2 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand, this.coreGame) );
  }
  
  for( var i = numeroMissili / 2; i < numeroMissili; i++ ) {
    xRand = rand( this.canvas.width - ampiezzaAreaPertenza, this.canvas.width );
    velRand = rand( 2, 2 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand, this.coreGame ) );
  }
  
  var astronaveNemica = new AstronaveNemica( this.ctx, this.coreGame );
  this.coreGame.aggiungiMinaccia( astronaveNemica );
  
  var opzioniBatteria1 = {
    x: astronaveNemica.x + 40, 
    y: astronaveNemica.y + 53, 
    nMissili: 0, 
    nSoldati: 10, 
    colori: [], 
    Tmin: 50, 
    Tmax: 1000, 
    deltaTempo: 70, 
    deltaRaffreddamento: 3
  };
  
  var filtro = function ( missile ) {
    return ( missile.y < 500 && missile.y > astronaveNemica.y && missile instanceof MissileNucleare );
  };
  
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new TorrettaAutomatica( 0, opzioniBatteria1, 1500000, false, filtro, false, 1, 10, 'green', this.coreGame) );
  var opzioniBatteria2 = { 
    x: astronaveNemica.x + 260, 
    y: astronaveNemica.y + 53, 
    nMissili: 0, 
    nSoldati: 10, 
    colori: [], 
    Tmin: 50, 
    Tmax: 1000, 
    deltaTempo: 70, 
    deltaRaffreddamento: 3
  };
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new TorrettaAutomatica( 0, opzioniBatteria2, 1500000, false, filtro, false, 1, 10, 'green', this.coreGame) );
}

Livello10.prototype.scegliTorretta = function ( x, y, tasto ) {
  var indiceTorretta = 0;
  switch(tasto) {
    case 50: indiceTorretta = 1; break;
    default: return -1;
  }
  
  if ( this.coreGame.batterieAntimissile[ indiceTorretta ].stato === BatteriaAntimissile.ATTIVA ) {
    return indiceTorretta;
  }
  
  return -1;
};

Livello10.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto);
  
  if( indiceTorretta === -1 )
    return;
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].x,
    yDiPartenza: this.coreGame.batterieAntimissile[ indiceTorretta ].y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 30,
    distanzaPerFrame: 7
  }, this.coreGame ) );
  this.coreGame.aggiornaPunteggioMissiliSparati();
  this.coreGame.batterieAntimissile[ indiceTorretta ].numeroMissili--;
  this.coreGame.batterieAntimissile[ indiceTorretta ].temperatura += 150;
}

Livello10.prototype.verificaFineLivello = function ( ) {
  if( this.coreGame.minacce.length === 0 ) {
    return true;  
  }
  
  if( this.coreGame.missiliTerrestri.indexOf ( this.missileNucleare ) < 0 ) {
    return false;
  }
  
  if( this.coreGame.basi.filter( function ( base ) { return base.attiva === true } ).length === 0 )  {
    console.log("basi morte");
    return false;
  }
  return undefined;
}

function MissileTorretta ( parametri, torretta, coreGame ) {
  this.torretta = torretta;
  this.coreGame = coreGame;
  MissileTerrestre.call( this, parametri, coreGame );
};

MissileTorretta.prototype = Object.create( MissileTerrestre.prototype );
MissileTorretta.prototype.constructor = MissileTorretta;

MissileTorretta.prototype.update = function () {
  if(this.yDiPartenza <= this.yDiArrivo) {
    if( this.stato === Missile.ATTIVO && this.y >= this.yDiArrivo  ) {
      this.x = this.xDiArrivo;
      this.y = this.yDiArrivo;
      this.stato = Missile.ESPLOSIONE;
    }
  }
  else {
    if( this.stato === Missile.ATTIVO && this.y <= this.yDiArrivo ) {
      this.x = this.xDiArrivo;
      this.y = this.yDiArrivo;
      this.stato = Missile.ESPLOSIONE;
    } 
  }
  
  if( this.stato === Missile.ATTIVO ) {
    this.x += this.dx;
    this.y += this.dy;
  } else {
    this.esplodi();
  }
};

MissileTorretta.prototype.disegna = function ( ctx, coreGame ) {
  Missile.prototype.disegna.call( this, ctx, coreGame );
};

function MissileNucleare ( xDiPartenza, yDiPartenza, xDiArrivo, yDiArrivo, coreGame ) {
  MissileTerrestre.call( this, {
    xDiPartenza: xDiPartenza,
    yDiPartenza: yDiPartenza,
    xDiArrivo: xDiArrivo,
    yDiArrivo: yDiArrivo,
    coloreTestata: 'white',
    coloreScia: 'white',//'yellow',
    massimoRaggioEsplosione: 50,
    distanzaPerFrame: 0.3
  }, coreGame );
  this.coloreCorpo = 'white' //#FF00FF';
};

MissileNucleare.prototype = Object.create( MissileTerrestre.prototype );
MissileNucleare.prototype.constructor = MissileNucleare;

MissileNucleare.prototype.disegna = function ( ctx, coreGame ) {
  this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === Missile.ATTIVO ) {
    var n = 40;
    
    ctx.strokeStyle = this.coloreScia;
    //ctx.fillStyle = this.coloreScia;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo( this.xDiPartenza, this.yDiPartenza );
    ctx.lineTo( this.x, this.y );
    ctx.closePath();
    ctx.stroke();
    
    //console.log( this.animazioneColore );
    //ctx.strokeStyle = this.animazioneColore;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc( this.x + this.dx*n, this.y + this.dy*2.1*n, 2, 0, 2 * Math.PI );
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = this.coloreCorpo;
    ctx.fillStyle = this.coloreCorpo;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo( this.x + this.dx*n, this.y + this.dy*2*n );
    ctx.lineTo( this.x - this.dx*n, this.y /*+ this.dy*n*/ );
    ctx.closePath();
    ctx.stroke(); 
  }
  else if ( this.stato === Missile.ESPLOSIONE || 
            this.stato === Missile.IMPLOSIONE ) {
    
    ctx.fillStyle = 'red';//Missile.COLORI[this.animazioneColore];
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
    ctx.closePath();
    // this.esplosioneAltriMissili( ctx, coreGame );
    if ( coreGame.minacce[ 0 ].stato === AstronaveNemica.ATTIVO && this.y <= coreGame.minacce[ 0 ].y + 53 ) {
      coreGame.minacce[ 0 ].distruggiti();
    }
    ctx.fill();
  }
};

MissileNucleare.prototype.update = function () {
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

MissileNucleare.prototype.esplodi = function () {  
  if( this.stato === Missile.ESPLOSIONE ) {
    this.raggioDiEsplosione += 2;
  }
  if( this.raggioDiEsplosione > this.massimoRaggioEsplosione ) {
    this.stato = Missile.IMPLOSIONE;
  }  
  if( this.stato === Missile.IMPLOSIONE ) {
    this.raggioDiEsplosione -= 1;
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = Missile.ESPLOSO;
  }
};

function TorrettaAutomatica ( indice, opzioniBatteria, tempoRicarica, disegnaScritte, funzioneDiFiltroMissili, aggancio, velMissili, raggioEsplosione, coloreScia, coreGame ) {
  this.indice = indice;
  
  // Chiamata al costruttore della classe base
  BatteriaAntimissile.call(
    this, 
    opzioniBatteria.x, 
    opzioniBatteria.y, 
    opzioniBatteria.nMissili, 
    opzioniBatteria.nSoldati, 
    opzioniBatteria.colori, 
    opzioniBatteria.Tmin, 
    opzioniBatteria.Tmax, 
    opzioniBatteria.deltaTempo, 
    opzioniBatteria.deltaRaffreddamento,
    coreGame
  );
  
  // Impostazioni torretta
  this.tempoRicarica = tempoRicarica;
  this.disegnaScritte = disegnaScritte;
  this.coreGame = coreGame;
  this.funzioneDiFiltroMissili = funzioneDiFiltroMissili;
  this.aggancio = aggancio;
  
  // Impostazione missili sparati
  this.velMissili = velMissili;
  this.raggioDiEsplosione = raggioEsplosione;
  this.coloreScia = coloreScia;
  
  // Stato interno
  this.bersagliAgganciati = [];
  this.missilePronto = true;
  this.timerRicarica = setTimeout( this.ricarica.bind( this, this ), this.tempoRicarica );
};

// Ereditarietà da BatteriaAntimissile
TorrettaAutomatica.prototype = Object.create( BatteriaAntimissile.prototype );
TorrettaAutomatica.prototype.constructor = TorrettaAutomatica;

TorrettaAutomatica.prototype.avvia = function ( ) {
  this.timerRicarica = setTimeout( this.ricarica.bind( this, this ),  this.tempoRicarica );
};

TorrettaAutomatica.prototype.stop = function ( ) {
  clearTimeout(this.timerRicarica);
};

TorrettaAutomatica.prototype.ricarica = function ( mySelf ) {
  mySelf.missilePronto = true;
};

TorrettaAutomatica.prototype.update = function ( ) {
  // Chiamo update classe base
  BatteriaAntimissile.prototype.update.call( this );
  
  if( this.stato !== BatteriaAntimissile.ATTIVA )
    return;
  if( this.missilePronto !== true )
    return;    
    
  var bersaglio = this.identificaBersaglio();
  if( bersaglio !== undefined ) {
    var coordinate = this.mira( bersaglio );
    if( coordinate.status === true ) {
      var missileSparato = this.spara( coordinate );
      this.bersagliAgganciati.push( bersaglio );
    }
  }
};

TorrettaAutomatica.prototype.identificaBersaglio = function ( ) {
  var mySelf = this;
  var missiliInGioco = this.coreGame.missiliNemici.concat(
    this.coreGame.missiliTerrestri );
  
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    return m.stato === Missile.ATTIVO;
  } );
  
  // Escludo i missili lanciati da me
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    if( m instanceof MissileTorretta )
      if ( m.torretta === mySelf )
        return false;
    return true;
  } );
  
  if( this.aggangio === true )
    // Esludo i missili già agganciati
    missiliInGioco = diff(missiliInGioco, this.bersagliAgganciati); 
  
  // Applico un filtro proprio della torretta
  missiliInGioco = missiliInGioco.filter( this.funzioneDiFiltroMissili );
  // Ordino per altezza
  missiliInGioco.sort( function ( a, b ) {
    var distanzaA = Math.sqrt(Math.pow(a.x - mySelf.x, 2) + Math.pow(a.y - mySelf.y, 2));
    var distanzaB = Math.sqrt(Math.pow(b.x - mySelf.x, 2) + Math.pow(b.y - mySelf.y, 2));
    return distanzaA <= distanzaB;    
  } );    
  // Prelevo il primo
  return missiliInGioco.pop();
};

TorrettaAutomatica.prototype.mira = function ( bersaglio ) {
  var xi1 = bersaglio.x, 
      yi1 = bersaglio.y, 
      xf1 = bersaglio.xDiArrivo, 
      yf1 = bersaglio.yDiArrivo, 
      speed1 = bersaglio.velCaduta, 
      dx1 = bersaglio.dx, 
      dy1 = bersaglio.dy, 
      xi2 = this.x, 
      yi2 = this.y,
      speed2 = this.velMissili;
  
  //console.log( bersaglio );
  var distance1 = Math.sqrt(Math.pow(xf1 - xi1, 2) + 
			Math.pow(yf1 - yi1, 2));
  var distanceX1 = xf1 - xi1;
  var distanceY1 = yf1 - yi1;
  var time1 = distance1 / speed1;
    
  for(var t1 = 0.0; t1 < time1; t1 += 1) {
    var x1 = xi1 + dx1 * t1;
    var y1 = yi1 + dy1 * t1;

    var distanceX2 = x1 - xi2;
    var distanceY2 = y1 - yi2;
    var distance2 = Math.sqrt(Math.pow(distanceX2, 2) 
      + Math.pow(distanceY2, 2));
    var t2 = distance2 / speed2;
    var time2 = Math.ceil(distance2 / speed2);
        
    if( t1 - time2 === 0 ) { 
      var anticipoX = 2;
      var anticipoY = 2;
      return { status: true, x: x1 + anticipoX*dx1, y: y1 + anticipoY*dy1 };
    }
  }
  return {status: false, x: 0, y: 0};
};

TorrettaAutomatica.prototype.spara = function ( coordinate ) {
  --this.nMissili;
  this.temperatura += 5; //this.aumentoTemperatura;
  
  var missile = new MissileTorretta( {
    xDiPartenza: this.x,
    yDiPartenza: this.y,
    xDiArrivo: coordinate.x,
    yDiArrivo: coordinate.y,
    coloreTestata: 'yellow',
    coloreScia: this.coloreScia,
    massimoRaggioEsplosione: this.raggioDiEsplosione,
    distanzaPerFrame: this.velMissili }, this, this.coreGame );
  this.coreGame.missiliTerrestri.push(missile);
  
  clearTimeout(this.timerRicarica);
  this.timerRicarica = setTimeout( this.ricarica.bind( this, this ), this.tempoRicarica );
  this.missilePronto = false;
  
  return missile;
};

TorrettaAutomatica.prototype.disegna = function ( ctx ) {
this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === BatteriaAntimissile.ATTIVA && this.disegnaScritte === true ) {
    var txt = "[AUTO]";
    // Scrivi temperatura
    var coloreTesto = 'black';    
    ctx.fillStyle = coloreTesto;
    ctx.font = 'bold 12px arial';
    var dx = ctx.measureText(txt).width;
    var dy = ctx.measureText(txt).height;
    ctx.fillText( txt, this.x - dx/2, this.y + 45 );
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
}
TorrettaAutomatica.prototype.distruggiti = function ( ) {
  // Chiamo distruggiti classe base
  this.stop();
  BatteriaAntimissile.prototype.distruggiti.call( this );
};