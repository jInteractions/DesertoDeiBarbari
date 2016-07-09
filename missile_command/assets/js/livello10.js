var _missiliSparati = [];

var diff = function ( a1, a2 ) {
  var newA = a1.filter( function( x ) {
    return a2.indexOf( x ) < 0;
  } );
  return newA;
}

function Livello10 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello10.prototype = Object.create( CoreLevel.prototype );
Livello10.prototype.constructor = Livello10;

Livello10.prototype.inizializzaLivello = function ( numeroOndata ) {
  var mySelf = this;
  
  this.numeroOndata = numeroOndata;
  
  this.inizializzaMirino();
  this.coreGame = new CoreGame( this.canvas, this.mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'red',
    coloreTestoPrimario: 'blue',
    coloreTestoSecondario: 'red'
  });
  var coeff = this.calcolaCoefficienteOndata();
  this.coreGame.aggiornaCoefficienteOndata( coeff );
  this.inizializzaTorrette();
  
  if( this.numeroOndata === 1 ) {
    this.inizializzaBasi();
  } else {
    $.each( this.basi, function ( indice, base ) {
      base.coreGame = mySelf.coreGame
    } );
    mySelf.coreGame.basi = mySelf.basi;
  }
  
  this.inizializzaArmiNemiche();
  this.inizializzaArmiTerrestri();
}

Livello10.prototype.inizializzaTorrette = function ( ) {
  var coloreMissili = [ 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow' ];
  
  var mySelf = this;
  
  var filtroSx = function ( missile ) {
    return ( missile.y > 10 && missile.x < mySelf.canvas.width/2 && missile instanceof MissileNemico );
  };
  var filtroDx = function ( missile ) {
    return ( missile.y > 10 && missile.x >= mySelf.canvas.width/2 && missile instanceof MissileNemico );
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
    new _TorrettaAutomaticaInterfaccia( 0, opzioniBatteria1, 100, true, filtroSx, true, 15, 10, 'yellow', this.coreGame) );
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
    new _TorrettaAutomaticaInterfaccia( 2, opzioniBatteria2, 100, true, filtroDx, true, 15, 10, 'yellow', this.coreGame ) );  
}

Livello10.prototype.inizializzaArmiTerrestri = function ( ) {
  this.missileNucleare = new MissileNucleare( 255, 410, 255, this.coreGame.minacce[ 0 ].y + 53, this.coreGame );
  this.coreGame.missiliTerrestri.push( this.missileNucleare );
}

Livello10.prototype.inizializzaArmiNemiche = function ( ) {
  var ampiezzaAreaPertenza = 50;
  var ritardoMassimo = 1000;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 100;
    
  for( var i = 0; i < numeroMissili / 2 ; i++ ) {
    xRand = rand( 0, ampiezzaAreaPertenza );
    velRand = rand( 5, 5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 10
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand, this.coreGame) );
  }
  
  for( var i = numeroMissili / 2; i < numeroMissili; i++ ) {
    xRand = rand( this.canvas.width - ampiezzaAreaPertenza, this.canvas.width );
    velRand = rand( 5, 5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 10
    }, bersagli, this.canvas.width, xRand, velRand,  ritardoRand, this.coreGame ) );
  }
  
  var astronaveNemica = new AstronaveNemica( this.ctx, this.coreGame );
  this.coreGame.aggiungiMinaccia( astronaveNemica );
  
  var opzioniBatteria1 = {
    x: astronaveNemica.x + 40, 
    y: astronaveNemica.y + 54, 
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
    new _TorrettaAutomatica( 0, opzioniBatteria1, -10000 + (this.numeroOndata*100), false, filtro, false, 0.5, 10, '#97F52D', this.coreGame) );
  var opzioniBatteria2 = { 
    x: astronaveNemica.x + 260, 
    y: astronaveNemica.y + 54, 
    nMissili: 0, 
    nSoldati: 10, 
    colori: [], 
    Tmin: 50, 
    Tmax: 1000, 
    deltaTempo: 70, 
    deltaRaffreddamento: 3
  };
  this.coreGame.aggiungiBatteriaAntimissile ( 
    new _TorrettaAutomatica( 0, opzioniBatteria2, -10000 + (this.numeroOndata*100), false, filtro, false, 0.5, 10, '#97F52F', this.coreGame) );
}

Livello10.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 3.0;
}

Livello10.prototype.setupListeners = function ( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  
  $( '.gameContainer' ).on( 'click', function ( ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, null );
  } );
  
  $( '.gameContainer' ).on( 'mouseover', function( event ) {
    mySelf.coreGame.mirino.stato = Mirino.TRACCIAMENTO;
  });
  $( '.gameContainer' ).on( 'mouseout', function( ) {
    mySelf.coreGame.mirino.stato = Mirino.SPENTO;
  });
  $( '.gameContainer' ).on( 'mousemove', function( event ) {
    var offset = $(".gameContainer").offset();
    mySelf.coreGame.mirino.inseguiX = event.pageX - offset.left;
    mySelf.coreGame.mirino.inseguiY = event.pageY - offset.top;
    mySelf.coreGame.mirino.cambiaMira();
  });
}

Livello10.prototype.scegliTorretta = function ( x, y, tasto ) {
  var nonFunzionante = function ( torretta ) {  
    if( torretta.stato === BatteriaAntimissile.ATTIVA &&
        torretta.numeroMissili > 0 &&
        torretta.blocco === false )
      return false;
    else
      return true;
  }
  
  var torrette = this.coreGame.batterieAntimissile;
  var torrettaSelezionata = 1;
  
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    return -1;
    
  return torrettaSelezionata;
}

Livello10.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
  
  this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
    xDiPartenza: torretta.x,
    yDiPartenza: torretta.y,
    xDiArrivo: x,
    yDiArrivo: y,
    coloreTestata: 'yellow',
    coloreScia: 'blue',
    massimoRaggioEsplosione: 30,
    distanzaPerFrame: 7
  }, this.coreGame ) );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 100;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello10.prototype.verificaFineLivello = function ( ) {
  if( this.coreGame.minacce.length === 0 ) {
    return true;  
  }
  
  
  var indice = this.coreGame.missiliTerrestri.indexOf( this.missileNucleare );
  if( indice < 0 && this.missileNucleare.y > this.coreGame.minacce[0].y + 53 ) {
    return false;
  }
  
  if( this.coreGame.basi.filter( function ( base ) { return base.attiva === true } ).length === 0 )  {
    return false;
  }
  return undefined;
}

Livello10.prototype.mostraSchermataIniziale = function ( punteggio ) {
  var mySelf = this;
  mySelf.coreGame.disegnaStatoGioco();
  mySelf.coreGame.disegnaBatterieAntimissile();
  var ctx = mySelf.ctx;
  
  this.intervalloSchermata = setInterval( function () {
    mySelf.coreGame.disegnaStatoGioco();
    mySelf.coreGame.disegnaBatterieAntimissile();
    if( mySelf.numeroSchermata === 0 ) {
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( "Punteggio: " + punteggio, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 120 );
      ctx.textAlign = "start";
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoPrimario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( 'CLICK PER INIZIARE A GIOCARE', 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 50 );
      ctx.textAlign = "start";
      
      // parte fissa
      ctx.textAlign = "center";
      ctx.font = 'bold 20px arial';
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 - 50);
      ctx.textAlign = "start";
      var img = document.getElementById("source-mouse-click");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 100, mySelf.canvas.height/2 + 40, 30, 80);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Fare click sinistro", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";
    } else {
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( "Punteggio: " + punteggio, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 120 );
      ctx.textAlign = "start";
      
      ctx.textAlign = "center";
      ctx.font = 'bold 20px arial';
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 - 50);
      ctx.textAlign = "start";
      var img = document.getElementById("source-mouse-click");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 100, mySelf.canvas.height/2 + 40, 30, 80);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Fare click sinistro", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";    
    }
    mySelf.numeroSchermata = (mySelf.numeroSchermata + 1) % 2;
  }, 500 );
  
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    clearInterval( mySelf.intervalloSchermata );
    mySelf.preparazioneAvvio();
  } );                     
}

function _MissileTorretta ( parametri, torretta, coreGame ) {
  this.torretta = torretta;
  this.coreGame = coreGame;
  MissileTerrestre.call( this, parametri, coreGame );
}

_MissileTorretta.prototype = Object.create( MissileTerrestre.prototype );
_MissileTorretta.prototype.constructor = _MissileTorretta;

_MissileTorretta.prototype.update = function () {
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
}

_MissileTorretta.prototype.disegna = function ( ctx, coreGame ) {
  Missile.prototype.disegna.call( this, ctx, coreGame );
}

function MissileNucleare ( xDiPartenza, yDiPartenza, xDiArrivo, yDiArrivo, coreGame ) {
  MissileTerrestre.call( this, {
    xDiPartenza: xDiPartenza,
    yDiPartenza: yDiPartenza,
    xDiArrivo: xDiArrivo,
    yDiArrivo: yDiArrivo,
    coloreTestata: 'white',
    coloreScia: 'white',//'yellow',
    massimoRaggioEsplosione: 50,
    distanzaPerFrame: 0.4
  }, coreGame );
  this.coloreCorpo = 'white' //#FF00FF';
}

MissileNucleare.prototype = Object.create( MissileTerrestre.prototype );
MissileNucleare.prototype.constructor = MissileNucleare;

MissileNucleare.prototype.disegna = function ( ctx, coreGame ) {
  this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === Missile.ATTIVO ) {
    var n = 20;
    
    ctx.strokeStyle = this.coloreScia;
    //ctx.fillStyle = this.coloreScia;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo( this.xDiPartenza, this.yDiPartenza );
    ctx.lineTo( this.x, this.y );
    ctx.closePath();
    ctx.stroke();
    
    //ctx.strokeStyle = this.animazioneColore;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc( this.x + this.dx*n, this.y + this.dy*2.2*n, 2, 0, 2 * Math.PI );
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
}

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
}

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
}

function _TorrettaAutomatica ( indice, opzioniBatteria, tempoRicarica, disegnaScritte, funzioneDiFiltroMissili, aggancio, velMissili, raggioEsplosione, coloreScia, coreGame ) {
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
  
  if( this.tempoRicarica < 0 )
    this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), rand(0, Math.abs( this.tempoRicarica )) );
  else
     this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), this.tempoRicarica );
  };

// Ereditarietà da BatteriaAntimissile
_TorrettaAutomatica.prototype = Object.create( BatteriaAntimissile.prototype );
_TorrettaAutomatica.prototype.constructor = _TorrettaAutomatica;

_TorrettaAutomatica.prototype.avvia = function ( ) {
  if( this.tempoRicarica < 0 )
    this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), rand(0, Math.abs( this.tempoRicarica )) );
  else
     this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), this.tempoRicarica );
  }

_TorrettaAutomatica.prototype.stop = function ( ) {
  clearTimeout(this.timerRicarica);
}

_TorrettaAutomatica.prototype.ricarica = function ( mySelf ) {
  mySelf.missilePronto = true;
}

_TorrettaAutomatica.prototype.update = function ( ) {
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
}

_TorrettaAutomatica.prototype.identificaBersaglio = function ( ) {
  var mySelf = this;
  var missiliInGioco = this.coreGame.missiliNemici.concat(
    this.coreGame.missiliTerrestri );
  
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    return m.stato === Missile.ATTIVO;
  } );
  
  // Escludo i missili lanciati da me
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    if( m instanceof _MissileTorretta )
      if ( m.torretta === mySelf )
        return false;
    return true;
  } );
  
  if( this.aggancio === true ) {
    // Esludo i missili già agganciati
    missiliInGioco = diff(missiliInGioco, this.bersagliAgganciati); 
  }
    
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
}

_TorrettaAutomatica.prototype.mira = function ( bersaglio ) {
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
  
  var distance1 = Math.sqrt(Math.pow(xf1 - xi1, 2) + 
			Math.pow(yf1 - yi1, 2));
  var distanceX1 = xf1 - xi1;
  var distanceY1 = yf1 - yi1;
  var time1 = distance1 / speed1;
  /*
  console.log("originale:")
  console.log(
    xi1,
    yi1,
    xf1,
    yf1,
    speed1,
    dx1,
    dy1,
    xi2,
    yi2  
  );
  console.log("----------------")*/
    
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
}

_TorrettaAutomatica.prototype.spara = function ( coordinate ) {
  --this.nMissili;
  this.temperatura += 5; //this.aumentoTemperatura;
  
  var missile = new _MissileTorretta( {
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
  if( this.tempoRicarica < 0 )
    this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), rand(0, Math.abs( this.tempoRicarica )) );
  else
     this.timerRicarica = setTimeout( 
      this.ricarica.bind( this, this ), this.tempoRicarica );
  this.missilePronto = false;
  
  return missile;
}

_TorrettaAutomatica.prototype.disegna = function ( ctx ) {
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

_TorrettaAutomatica.prototype.distruggiti = function ( ) {
  // Chiamo distruggiti classe base
  this.stop();
  BatteriaAntimissile.prototype.distruggiti.call( this );
}

function _TorrettaAutomaticaInterfaccia ( indice, opzioniBatteria, tempoRicarica, disegnaScritte, funzioneDiFiltroMissili, aggancio, velMissili, raggioEsplosione, coloreScia, coreGame ) {
   _TorrettaAutomatica.call( this, indice, opzioniBatteria, tempoRicarica, disegnaScritte,
    funzioneDiFiltroMissili, aggancio, velMissili, raggioEsplosione, coloreScia, coreGame );
};

_TorrettaAutomaticaInterfaccia.prototype = Object.create( _TorrettaAutomatica.prototype );
_TorrettaAutomaticaInterfaccia.prototype.constructor = _TorrettaAutomaticaInterfaccia;

_TorrettaAutomaticaInterfaccia.prototype.update = function ( ) {
  // Chiamo update classe base
  BatteriaAntimissile.prototype.update.call( this );

  if( this.stato !== BatteriaAntimissile.ATTIVA )
    return;
  if( this.missilePronto !== true )
    return; 
  
  
  var torrettaFittizia = new TorrettaAutomatica( this.indice, { x: this.x, y: this.y }, this.velMissili );
  

  var mySelf = this;
  var missiliInGioco = this.coreGame.missiliNemici.concat(
    this.coreGame.missiliTerrestri );
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    return m.stato === Missile.ATTIVO;
  } );
  // Escludo i missili lanciati da me
  missiliInGioco = missiliInGioco.filter( function ( m ) { 
    if( m instanceof _MissileTorretta )
      if ( m.torretta === mySelf )
        return false;
    return true;
  } );
  if( this.aggancio === true ) {
    // Esludo i missili già agganciati
    missiliInGioco = diff(missiliInGioco, this.bersagliAgganciati); 
  }
  // Applico un filtro proprio della torretta
  missiliInGioco = missiliInGioco.filter( this.funzioneDiFiltroMissili );
  //console.log(missiliInGioco)
  var bersagli = [];
  $.each( missiliInGioco, function ( i, m ) {
    var ogg = { 
      x: m.x, 
      y: m.y, 
      xArrivo: m.xDiArrivo, 
      yArrivo: m.yDiArrivo, 
      velocita: m.velCaduta, 
      tipo: m }
    bersagli.push( ogg );
  } );
  
  //console.log( bersagli )
  
  var bersaglio = torrettaFittizia.identificaBersaglio( bersagli );
  
  if( bersaglio !== undefined ) {
    
    var coordinate = torrettaFittizia.mira( bersaglio );
    //console.log(this.mira( bersaglio.tipo ));
    //console.log( coordinate );
    
    if( coordinate.status === true ) {
      _missiliSparati = [];
      torrettaFittizia.sparo( coordinate.x, coordinate.y );
      
      if( _missiliSparati.length !== 1 )
        return;
      
      var missileSparato = this.spara( { status: null, x: _missiliSparati[0].x, y: _missiliSparati[0].y } );
      this.bersagliAgganciati.push( bersaglio.tipo );
    }
  }
}

function MissileTorrettaAutomatica ( x, y ) {
  this.x = x;
  this.y = y;
  
  this.velocita = 10;
  this.raggioEsplosione = 10;
} 

MissileTorrettaAutomatica.prototype.lancia = function ( ) {
  _missiliSparati.push( this );
}

var coordinateIntercettaBersaglio = function ( 
    xBersaglio, yBersaglio, 
    xArrivo, yArrivo,
    velocitaMissili, velocitaBersaglio, 
    posizioneTorretta ) {
      
  var distanzaX = xArrivo - xBersaglio;
  var distanzaY = yArrivo - yBersaglio;
  var scala = ( function ( d ) {
    var distanza = Math.sqrt( Math.pow( distanzaX, 2 ) + Math.pow( distanzaY, 2 ) );
    return distanza / d;
  })( velocitaBersaglio );
  
      
  var xi1 = xBersaglio; 
  var yi1 = yBersaglio;
  var xf1 = xArrivo;
  var yf1 = yArrivo; 
  var speed1 = velocitaBersaglio;
  var dx1 = distanzaX / scala;
  var dy1 = distanzaY / scala;
  var xi2 = posizioneTorretta.x;
  var yi2 = posizioneTorretta.y;
  var speed2 = velocitaMissili;
      
  /*
  console.log("nuovo:")
  console.log(
    xi1,
    yi1,
    xf1,
    yf1,
    speed1,
    dx1,
    dy1,
    xi2,
    yi2  
  );
  console.log("----------------")*/
      
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
} 

// TAB 1

/**********
Funzione che ordina i bersagliNonOrdinati in ordine di altezza:
i bersagli piu' vicini al suolo sono quelli piu' pericolosi.

Questa funzione prende come parametro:
  - bersagliNonOrdinati: array di oggetti con struttura 
    { x: 157, y: 597, tipo: tipologia };
Questa funzione modifica permanentemente l'array passato, riordinandolo.
**********/
var ordinamentoBersagliPerAltezza = function ( bersagliNonOrdinati ) {
  bersagliNonOrdinati.sort( function( bersaglio1, bersaglio2 ) {
    return bersaglio1.y >= bersaglio2.y; 
  } );
}

// TAB 2

/**********
Classe che implementa le torrette automatiche in grado 
di intercettare con un missile le minacce individuate.
 
La torretta automatica viene costruita con:
  - numeroTorretta: intero che identifica la torretta (0 sinistra, 2 destra);
  - posizione: struttura del tipo { x: 50, y: 430 } che identifica la posizione della torretta;
  - velocitaMissili: intero che descrive la velocita dei missili sparati.
**********/
function TorrettaAutomatica ( numeroTorretta, posizione, velocitaMissili ) {
  this.numeroTorretta = numeroTorretta;
  this.posizioneTorretta = posizione;
  this.velocitaMissili = velocitaMissili;
}

/**********
Funzione che identifica il missile che sara' intercettato.

Prende come parametro:
  - bersagli: array di oggetti con struttura { x: 157, y: 597, tipo: tipologia }.
    tipo e' a sua volta un oggetto di classe MissileNemico o MissileTerreste.
Restituisce come valore:
  - un oggetto di con struttura bersaglio { x: 157, y: 597, tipo: tipologia } 
**********/
TorrettaAutomatica.prototype.identificaBersaglio = function ( bersagli ) {
  var lunghezzaAreaPortata = 510;
  var altezzaAreaPortata = 460;
  var bersagliCandidati = [];
  var candidato = undefined;
//###START_MODIFICABILE###
  
  // Implementare individuazione bersaglio tra i bersagli
  
//###END_MODIFICABILE###
  return candidato;
}

/**********
Funzione che dato un bersaglio ricava le coordinate dove sparare il
missile in grado di intercettarlo.

Prende come parametro:
  - bersaglio: oggetto con struttura { x: 157, y: 597, tipo: tipologia }
Restituisce come valore:
  - un oggetto coordinata di struttura { x: 130, y: 657 }
**********/
TorrettaAutomatica.prototype.mira = function ( bersaglio ) {
  var xBersaglio = bersaglio.x;
  var yBersaglio = bersaglio.y;
  var xImpattoBersaglio = bersaglio.xArrivo;
  var yImpattoBersaglio = bersaglio.yArrivo;
  
  var velocitaBersaglio = bersaglio.velocita;
  
  var coordinate = coordinateIntercettaBersaglio( 
    xBersaglio, yBersaglio, 
    xImpattoBersaglio, yImpattoBersaglio,
    this.velocitaMissili, velocitaBersaglio, 
    this.posizioneTorretta ); 
  
  return coordinate;
}

/**********
Funzione che effettua il lancio di un missile verso
le coordinate, passate come parametro.
**********/
TorrettaAutomatica.prototype.sparo = function ( x, y ) {
  var missile = new MissileTorrettaAutomatica( x, y );
  missile.lancia();
}

/**********
Funzione che descrive il processo di identificazione, mira e sparo
necessari ad ogni missile per intercettare una minaccia.
Questa funzione prende come parametro:
  - bersagliPossibili: un array di oggetti con 
    struttura { x: 157, y: 597, tipo: tipologia } che rappresentano
    tutti i missili (amici e non) in volo in quel momento.    
Obiettivo di questa funzione è permettere l'indentificazione di
un bersaglio tra quelli possibili, ricavare le coordinate per
intercettarlo ed infine sparare un missile.
**********/
TorrettaAutomatica.prototype.cicloSparoAutomatico = function ( bersagliPossibili ) {
//###START_MODIFICABILE###
  
  // Implementare il ciclo di sparo utilizzando le funzionalità
  // già implementate nella TorrettaAutomatica.
  // Ciclo sparo: 
  //  1) identificare bersaglio;
  //  2) mirare;
  //  3) fare fuoco.
  
//###END_MODIFICABILE###  
}

// test

var t1 = 
    function ( ) {
      var esito = true;
      
      var numeroTorretta = 0;
      var x = rand( 0, 100 );
      var y = 430;
      var torretta = new TorrettaAutomatica( numeroTorretta, {x: x, y: y}, 2 );
      var bersagli = [];
      var tipiBersagli = [ new MissileTerrestre( { xDiPartenza: 0,
                            yDiPartenza: 0,
                            xDiArrivo: 100,
                            yDiArrivo: 100,
                            coloreTestata: 'yellow',
                            coloreScia: 'blue',
                            massimoRaggioEsplosione: 30,
                            distanzaPerFrame: 7
                           }, null ),
                           new MissileNemico( {
                            coloreTestata: 'yellow',
                            coloreScia: 'red',
                            massimoRaggioEsplosione: 10
                           }, [ {x: 200, y: 200} ], 0, 0, 1,  1, null ) ];
      
      for( var i = 0; i < rand(20, 20); ++i ) {
        bersagli.push ( { x: rand(0, 510/2), y: rand(0, 100), 
          xArrivo: rand(0, 510), yArrivo: 430, 
          velocita: rand(5, 5), tipo: tipiBersagli[rand(1, 1)] } );
      }
      
      _missiliSparati = []; 
      var candidati = bersagli.filter( function ( b ) {
        if( numeroTorretta === 0 )
          return (b.tipo instanceof MissileNemico && b.x < 510/2);
        else
          return (b.tipo instanceof MissileNemico && b.x >= 510/2);
      } );
      ordinamentoBersagliPerAltezza( candidati );
      var bersaglio = candidati.pop();
   
      var coordinate = coordinateIntercettaBersaglio( bersaglio.x, bersaglio.y, 
        bersaglio.xArrivo, bersaglio.yArrivo,
        2, bersaglio.velocita, torretta.posizioneTorretta );

      torretta.cicloSparoAutomatico( bersagli );
      
      if( _missiliSparati.length !== 1 ) {
        esito = false;
        return esito;
      }
      
      var missile = _missiliSparati[0];
      if( missile.x !== coordinate.x || missile.y !== coordinate.y )
        esito = false;
      
      return esito;
    }