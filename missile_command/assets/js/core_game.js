var rand = function ( min, max ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
};

function CoreGame ( canvas, mirino, palette ) {
  this.canvas = canvas;
  this.ctx = canvas.getContext ( '2d' );
  this.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];
  this.punteggio;
  this.morti;
  this.basi = [];
  this.batterieAntimissile = [];
  this.missiliNemici = [];
  this.missiliTerrestri = [];
  this.minacce = [];
  this.timerProssimoFrame;
  this.mirino = mirino;
  this.coloreSfondo = palette.coloreSfondo;
  this.coloreTerreno = palette.coloreTerreno;
  this.coloreTestoPrimario = palette.coloreTestoPrimario;
  this.coloreTestoSecondario = palette.coloreTestoSecondario;
};

CoreGame.prototype.prossimoFrame = function () {
  this.disegnaStatoGioco();
  this.aggiornaMissiliNemici();
  this.disegnaMissiliNemici();
  this.aggiornaMissiliTerrestri();
  this.disegnaMissiliTerrestri();
  this.aggiornaMinacce();
  this.disegnaMinacce();
  this.aggiornaMirino();
  this.disegnaMirino();
};

CoreGame.prototype.aggiungiBase = function ( base ) {
  this.basi.push( base );
};

CoreGame.prototype.aggiungiBatteriaAntimissile = function ( batteria ) {
  this.batterieAntimissile.push( batteria );
};

CoreGame.prototype.aggiungiMinaccia = function ( minaccia ) {
  this.minacce.push( minaccia );
};

CoreGame.prototype.bersagliAttaccabili = function () {
  var bersagli = [];
  $.each( this.basi, function( indice, base ) {
    if ( base.attiva ) {
      bersagli.push( {x: base.x + 15, y: base.y - 10, base: base} );
    }
  } );
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    bersagli.push( {x: batteria.x, y: batteria.y, batteria: batteria} )
  } );
  return bersagli;
};

CoreGame.prototype.calcoloMissiliRimanenti = function () {
  var tot = 0;
  $.each ( this.batterieAntimissile, function( indice, batteria ) {
    tot += batteria.missiliRimanenti;
  } );
  return tot;
};

CoreGame.prototype.calcoloBatterieSalvate = function () {
  var tot = 0;
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    if ( batteria.missiliRimanenti != 0 )
      ++tot;
  } );
  return tot;
};

CoreGame.prototype.calcoloBasiSalvate = function () {
  var tot = 0;
  $.each( this.basi, function( indice, base ) {
    if ( base.attiva )
      ++tot;
  } );
  return tot;
};

CoreGame.prototype.aggiornaMissiliNemici = function () {
  $.each( this.missiliNemici, function( indice, missile ) {
    missile.update();
  });
  this.missiliNemici = this.missiliNemici.filter(
    function( missile ) {
      return missile.stato !== Missile.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMissiliTerrestri = function () {
  $.each( this.missiliTerrestri, function( indice, missile ) {
    missile.update();
  });
  this.missiliTerrestri = this.missiliTerrestri.filter(
    function( missile ) {
      return missile.stato !== Missile.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMinacce = function () {
  $.each( this.minacce, function( indice, minaccia ) {
    minaccia.update();
  });
  this.minacce = this.minacce.filter(
    function( minacce ) {
      return minacce.stato !== Minaccia.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMirino = function () {
  this.mirino.update();
};

// Funzioni di disegno

CoreGame.prototype.disegnaInizioGioco = function () {
  this.disegnaStatoGioco();
  this.disegnaMessaggioInizio();
};

CoreGame.prototype.disegnaStatoGioco = function () {
  this.disegnaSfondo();
  this.disegnaBasi();
  this.disegnaBatterieAntimissile();
};

CoreGame.prototype.disegnaSfondo = function () {
  this.ctx.fillStyle = this.coloreSfondo;
  this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
  this.ctx.fillStyle = this.coloreTerreno;
  this.ctx.beginPath();
  this.ctx.moveTo( 0, 460 );
  this.ctx.lineTo( 0,  430 );
  this.ctx.lineTo( 25, 410 );
  this.ctx.lineTo( 45, 410 );
  this.ctx.lineTo( 70, 430 );
  this.ctx.lineTo( 220, 430 );
  this.ctx.lineTo( 245, 410 );
  this.ctx.lineTo( 265, 410 );
  this.ctx.lineTo( 290, 430 );
  this.ctx.lineTo( 440, 430 );
  this.ctx.lineTo( 465, 410 );
  this.ctx.lineTo( 485, 410 );
  this.ctx.lineTo( 510, 430 );
  this.ctx.lineTo( 510, 460 );
  this.ctx.closePath();
  this.ctx.fill();  
};

CoreGame.prototype.disegnaBasi = function () {
  var mySelf = this;
  $.each( this.basi, function( indice, base ) {
    if( base.attiva ) {
      base.disegna( mySelf.ctx );
    }
  });
};

CoreGame.prototype.disegnaBatterieAntimissile = function () {
  var c = this.ctx;
  $.each( this.batterieAntimissile, function( indice, batteriaAntimissile ) {
      batteriaAntimissile.disegna( c );
  });
};

CoreGame.prototype.disegnaMessaggioInizio = function () {
  this.ctx.fillStyle = this.coloreTestoPrimario;
  this.ctx.font = 'bold 20px arial';
  this.ctx.fillText( 'ATTACCO IMMINENTE', 130, 180 );
  this.ctx.fillText( 'CLICK PER ATTIVARE DIFESE', 195, 245 );
};

CoreGame.prototype.disegnaMissiliNemici = function () {
  var mySelf = this;
  $.each( this.missiliNemici, function( indice, missile ) {
    if( missile.stato === Missile.ATTIVO ) {
      missile.disegna( mySelf.ctx, mySelf );
    }
  });
};

CoreGame.prototype.disegnaMissiliTerrestri = function () {
  var mySelf = this;
  $.each( this.missiliTerrestri, function( indice, missile ) {
    if( missile.stato === Missile.ATTIVO ) {
      missile.disegna( mySelf.ctx, mySelf );
    }
  });
};

CoreGame.prototype.disegnaMinacce = function () {
  $.each( this.minacce, function( indice, minaccia ) {
      minaccia.disegna();
  });
};

CoreGame.prototype.disegnaMirino = function () {
  this.mirino.disegna( this.ctx );
};