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

CoreLevel.prototype.inizializzaLivello = function ( numeroOndata ) {
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
  this.coreGame.aggiungiBase( new BaseMilitare( 80,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 180,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 350,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) );
};

CoreLevel.prototype.inizializzaMirino = function () {
  this.mirino = new Mirino( this.canvas.width / 2, this.canvas.height / 2, 16.0 );
};

CoreLevel.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'];
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

CoreLevel.prototype.mostraSchermataIniziale = function ( punteggio ) {
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
      var img = document.getElementById("source-tasti-123");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 190, mySelf.canvas.height/2 + 50, 134, 73);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Premere '1', '2', '3'", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";
    } else {
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.textAlign = "center"; 
      ctx.font = 'bold 20px arial';
      ctx.fillText( "Punteggio: " + punteggio , 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 - 20 - 120 );
      ctx.textAlign = "start";
      
      ctx.textAlign = "center";
      ctx.font = 'bold 20px arial';
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText( 'Ondata ' + mySelf.numeroOndata, 
                   mySelf.canvas.width/2, mySelf.canvas.height/2 + 20 - 50);
      ctx.textAlign = "start";
      var img = document.getElementById("source-tasti-123");
      ctx.drawImage(img, 
                    mySelf.canvas.width/2 - 190, mySelf.canvas.height/2 + 50, 134, 73);
      ctx.textAlign = "left";
      ctx.fillStyle = mySelf.coreGame.coloreTestoSecondario;
      ctx.fillText("Premere '1', '2', '3'", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40);
      ctx.fillText("per sparare", 
                   mySelf.canvas.width/2 - 40, mySelf.canvas.height/2 + 40 + 40 + 20);
      ctx.textAlign = "start";
            
    }
    mySelf.numeroSchermata = (mySelf.numeroSchermata + 1) % 2;
  }, 1000 );
  
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    clearInterval( mySelf.intervalloSchermata );
    mySelf.preparazioneAvvio();
  } );                     
}

CoreLevel.prototype.mostraSchermataGameOver = function ( punteggio ) {
  var ctx = this.ctx;
  var mySelf = this;
  ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  ctx.textAlign = "center"; 
  ctx.font = 'bold 30px arial';
  ctx.fillText( 'HAI PERSO', this.canvas.width/2, this.canvas.height/2 );
  //ctx.fillStyle = this.coreGame.coloreTestoSecondario;
  //ctx.fillText( 'Ondata ' + mySelf.numeroOndata, this.canvas.width/2, this.canvas.height/2 + 20 );
  ctx.textAlign = "start";
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).one( 'click', function() {
    mySelf.mostraSchermataIniziale( punteggio );
  } );
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
  
  if ( torrettaAttuale.stato === BatteriaAntimissile.ATTIVA 
      && torrettaAttuale.numeroMissili > 0 
      && torrettaAttuale.blocco === false )  
    return indiceTorretta;
  
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
      return base.attiva === true && base.vitale === true;
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