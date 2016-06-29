function CoreLevel ( callbackFineLivello ) {
  this.canvas = document.querySelector( 'canvas' );
  this.ctx = this.canvas.getContext( '2d' );
  this.coreGame;
  this.timerProssimoFrame;
  this.mirino;
  this.callbackFineLivello = callbackFineLivello;

  this.numeroOndata = 1;

  // Parametri di disegno schermata iniziale
  this.numeroSchermata = 0;  
};

/*
CoreLevel.prototype.inizializzaLivello = function () { 
  
};*/

CoreLevel.prototype.inizializzaOndata = function ( numeroOndata ) {
  var mySelf = this;
  
  this.numeroOndata = numeroOndata;
  
  this.inizializzaMirino();
  this.coreGame = new CoreGame( this.canvas, this.mirino, {
    coloreSfondo: 'black',
    coloreTerreno: 'yellow',
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

// Funzioni base di CoreLevel

CoreLevel.prototype.inizializzaBasi = function () {
  this.coreGame.aggiungiBase( new Base( 80,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 180,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new Base( 130,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 350,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new Base( 400,  430, true, 100, 'cyan', this.coreGame ) );
};

CoreLevel.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
};

CoreLevel.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue'];
  var nMissili = coloreMissili.length;
  var nSoldati = 10;
  var Tmin = 50;
  var Tmax = 1000;
  var deltaTempo = 70;
  var deltaRaffreddamento = 3;
  
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 35, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 255, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile ( 475, 410, nMissili, nSoldati, coloreMissili, Tmin, Tmax, deltaTempo, deltaRaffreddamento, this.coreGame )
  );
};

CoreLevel.prototype.preparazioneAvvio = function () {
  this.startLivello();
}

CoreLevel.prototype.mostraSchermataIniziale = function () {
  var mySelf = this;
  mySelf.coreGame.disegnaStatoGioco();
  mySelf.coreGame.disegnaBatterieAntimissile();
  this.intervalloSchermata = setInterval( function () {
    mySelf.coreGame.disegnaStatoGioco();
    mySelf.coreGame.disegnaBatterieAntimissile();
    if( mySelf.numeroSchermata === 0 ) {
      var ctx = mySelf.ctx;
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoPrimario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( 'CLICK PER INIZIARE A GIOCARE', 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 );
      
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 );
      ctx.textAlign = "start";
    } else {
            
    }
    mySelf.numeroSchermata = (mySelf.numeroSchermata + 1) % 2;
  }, 500 );
  
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    clearInterval( mySelf.intervalloSchermata );
    mySelf.preparazioneAvvio();
  } );                     
}

CoreLevel.prototype.mostraSchermataGameOver = function () {
  var ctx = this.ctx;
  ctx.fillStyle = this.coreGame.coloreTestoPrimario;
  ctx.textAlign = "center"; 
  ctx.font = 'bold 20px arial';
  ctx.fillText( 'HAI PERSO', this.canvas.width/2, this.canvas.height/2 - 20 );
  ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  console.log( this.numeroOndata );
  ctx.fillText( 'Ondata ' + this.numeroOndata, this.canvas.width/2, this.canvas.height/2 + 20 );
  ctx.textAlign = "start";
  $( '.gameContainer' ).off();                    
}

CoreLevel.prototype.inizializzaArmiTerrestri = function () {}

CoreLevel.prototype.inizializzaArmiNemiche = function () {}

CoreLevel.prototype.startLivello = function ( ) {
  this.setupListeners();
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.mainLoop.bind( this ), 1000 / fps );
};

CoreLevel.prototype.stopLivello = function ( ) {
  clearInterval( this.timerProssimoFrame );
  $( '.gameContainer' ).off();
};

CoreLevel.prototype.proceduraFineOndata = function () {
  var cg = this.coreGame;
  
  this.basi = this.coreGame.basi;
  
  cg.calcoloMissiliRimasti();
  cg.calcoloBatterieSalvate( 2 );
  
  var risultatoOndata = {
    esito: this.verificaFineLivello(),
    punteggio: cg.punteggio,
    missiliAbbattuti: cg.punteggioMissiliAbbattuti,
    missiliRimasti: cg.punteggioMissiliRimasti,
    minacceAbbattute: cg.punteggioMinacceAbbattute,
    torretteSalvate: cg.punteggioTorretteSalvate,
    missiliSparati: cg.punteggioMissiliSparati,
    morti: cg.punteggioMorti
  };
  
  this.callbackFineLivello( risultatoOndata );
}

CoreLevel.prototype.mainLoop = function () { 
  var esito = this.verificaFineLivello();
  if ( esito === false ) {
    this.stopLivello();
    this.mostraSchermataGameOver();
    this.proceduraFineOndata();
  } else if ( esito === true ) {
    this.stopLivello();
    this.proceduraFineOndata();
  }
  
  if ( esito === undefined ) {
    this.coreGame.prossimoFrame();
  }
};

CoreLevel.prototype.setupListeners = function( ) {
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  $( '.gameContainer' ).bind( 'keyup', function( event ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, event.which );
  });
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
};

CoreLevel.prototype.scegliTorretta = function ( x, y, tasto ) {
  var indiceTorretta = 0;
  switch(tasto) {
    case 49: indiceTorretta = 0; break;
    case 50: indiceTorretta = 1; break;
    case 51: indiceTorretta = 2; break;
    default: return -1;
  }
  
  var torrettaAttuale = this.coreGame.batterieAntimissile[ indiceTorretta ];
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA && torrettaAttuale.numeroMissili > 0 ) {
    return indiceTorretta;
  }
  
  return -1;
};

CoreLevel.prototype.sparo = function ( x, y, tasto ) {
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
};

CoreLevel.prototype.verificaFineLivello = function ( ) {
  if ( this.coreGame.missiliNemici.length === 0 ) {
    var basiAttive = this.coreGame.basi.filter( function ( base ) {
      return base.attiva === true 
    } );
    if( basiAttive.length === 0 )  {
      return false;
    } else {
      return true;
    }
  }
  return undefined;
}

CoreLevel.prototype.calcolaCoefficienteOndata = function () {
  return 1.0; // default
}

// Il codice sottostante dovrà essere spostato
/*
var oldConsole = console;

var console = {};
console.log = function ( stringa ) {
  oldConsole.log(stringa);
  // Qui ci sarà la "append" di codice html al terminale
}
*/