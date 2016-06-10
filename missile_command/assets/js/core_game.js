var rand = function ( min, max ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
};

function CoreGame ( canvas ) {
  this.canvas = canvas;
  this.ctx = canvas.getContext ( '2d' );
  this.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];
  this.punteggio;
  this.morti;
  this.basi = [];
  this.batterieAntimissili = [];
  this.missiliTerrestri = [];
  this.missiliNemici = [];
  this.minacceNemiche = [];
  this.timerProssimoFrame;
  this.mirino;
};

CoreGame.prototype.aggiungiBase = function ( base ) {
  this.basi.push( base );
};

CoreGame.prototype.aggiungiBatteriaAntimissile ( batteria ) {
  this.batterieAntimissili.push( batteria );
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
  $.each( this.batterieAntimissili, function( indice, batteria ) {
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
  $.each ( this.batterieAntimissili, function( indice, batteria ) {
    tot += batteria.missiliRimanenti;
  } );
  return tot;
};

CoreGame.prototype.calcoloBatterieSalvate () {
  var tot = 0;
  $.each( this.batterieAntimissili, function( indice, batteria ) {
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

CoreGame.prototype.aggiornaMirino () {
  mirino.update();
};