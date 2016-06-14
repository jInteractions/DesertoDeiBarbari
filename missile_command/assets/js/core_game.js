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

CoreGame.prototype.prossimoFrame () {
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

CoreGame.prototype.aggiungiBatteriaAntimissile ( batteria ) {
  this.batterieAntimissile.push( batteria );
};

CoreGame.prototype.aggiungiMinaccia ( minaccia ) {
  this.minacce.push( minaccia );
};

CoreGame.prototype.esplosioneAltriMissili ( missile, ctx ) {
  if ( !missile.esplosioneATerra ) {
    $.each( this.missiliNemici, function( indice, altroMissile ) {
      if ( ctx.isPointInPath( altroMissile.x, altromissile.y )
          && altroMissile.stato === Missile.attivo ) {
        this.punteggio += altroMissile.punteggio;
        altroMissile.stato = Missile.esplosione;
      }
    } );
  }
};

CoreGame.prototype.bersagliAttaccabili () {
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

CoreGame.prototype.startLivello () {
  var fps = 30;
  this.timerProssimoFrame = setInterval( this.prossimoFrame, 1000 / fps );
};

CoreGame.prototype.stopLivello () {
  clearInterval( this.timerProssimoFrame );
};

CoreGame.prototype.calcoloMissiliRimanenti () {
  var tot = 0;
  $.each ( this.batterieAntimissile, function( indice, batteria ) {
    tot += batteria.missiliRimanenti;
  } );
  return tot;
};

CoreGame.prototype.calcoloBatterieSalvate () {
  var tot = 0;
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    if ( batteria.missiliRimanenti != 0 )
      ++tot;
  } );
  return tot;
};

CoreGame.prototype.calcoloBasiSalvate () {
  var tot = 0;
  $.each( this.basi, function( indice, base ) {
    if ( base.attivo )
      ++tot;
  } );
  return tot;
};

CoreGame.prototype.aggiornaMissiliNemici () {
  $.each( this.missiliNemici, function( indice, missile ) {
    missile.update();
  });
  this.missiliNemici = this.missiliNemici.filter(
    function( missile ) {
      return missile.stato !== Missile.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMissiliTerrestri () {
  $.each( this.missiliTerrestri, function( indice, missile ) {
    missile.update();
  });
  this.missiliTerrestri = this.missiliTerrestri.filter(
    function( missile ) {
      return missile.stato !== Missile.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMinacce () {
  $.each( this.minacce, function( indice, minaccia ) {
    minaccia.update();
  });
  this.minacce = this.minacce.filter(
    function( minacce ) {
      return minacce.stato !== Minaccia.ESPLOSO;
    }
  );
};

CoreGame.prototype.aggiornaMirino () {
  mirino.update();
};

// Funzioni di disegno

CoreGame.prototype.disegnaInizioGioco () {
  this.disegnaStatoGioco();
  this.disegnaMessaggioInizio();
};

CoreGame.prototype.disegnaStatoGioco () {
  this.disegnaSfondo();
  this.disegnaBasi();
  this.disegnaBatterieAntimissile();
};

CoreGame.prototype.disegnaSfondo () {
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

CoreGame.prototype.disegnaBasi () {
  $.each( this.basi, function( indice, base ) {
    if( base.attivo ) {
      base.disegna();
    }
  });
};

CoreGame.prototype.disegnaBatterieAntimissile () {
  $.each( this.batterieAntimissile, function( indice, batteriaAntiMissile ) {
      batteriaAntimissile.disegna();
  });
};

CoreGame.prototype.disegnaMessaggioInizio () {
  this.ctx.fillStyle = this.coloreTestoPrimario;
  this.ctx.font = 'bold 20px arial';
  this.ctx.fillText( 'ATTACCO IMMINENTE', 130, 180 );
  this.ctx.fillText( 'CLICK PER ATTIVARE DIFESE' 195, 245 );
};

CoreGame.prototype.disegnaMissiliNemici () {
  $.each( this.missiliNemici, function( indice, missile ) {
    if( missile.attivo ) {
      missile.disegna();
    }
  });
};

CoreGame.prototype.disegnaMissiliTerrestri () {
  $.each( this.missiliTerrestri, function( indice, missile ) {
    if( missile.attivo ) {
      missile.disegna();
    }
  });
};

CoreGame.prototype.disegnaMinacce () {
  $.each( this.minacce, function( indice, minaccia ) {
      minaccia.disegna();
  });
};

CoreGame.prototype.disegnaMirino () {
  this.mirino.disegna();
};