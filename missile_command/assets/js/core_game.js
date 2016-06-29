var rand = function ( min, max ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
};

function CoreGame ( canvas, mirino, palette ) {
  this.canvas = canvas;
  this.ctx = canvas.getContext ( '2d' );
  this.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];
  
  this.coloreSfondo = palette.coloreSfondo;
  this.coloreTerreno = palette.coloreTerreno;
  this.coloreTestoPrimario = palette.coloreTestoPrimario;
  this.coloreTestoSecondario = palette.coloreTestoSecondario;
  
  this.basi = [];
  this.batterieAntimissile = [];
  this.missiliNemici = [];
  this.missiliTerrestri = [];
  this.minacce = [];
  this.mirino = mirino;
  
  this.timerProssimoFrame;
  
  this.punteggio = 0;
  this.coefficienteOndata = 1.0;
  this.punteggioMissiliAbbattuti = 0;
  this.punteggioMissiliRimasti = 0;
  this.punteggioMinacceAbbattute = 0;
  this.punteggioTorretteSalvate = 0;
  this.punteggioMissiliSparati = 0;
  this.punteggioNumeroOndate = 0;
  this.punteggioMorti = 0;
};

// Constanti 

CoreGame.PUNTI_MISSILE_ABBATTUTO = 50;
CoreGame.PUNTI_MISSILE_RIMASTO = 50;
CoreGame.PUNTI_MINACCIA_ABBATTUTA = 50;
CoreGame.PUNTI_TORRETTA_SALVATA = 50;

// Funzioni di base

CoreGame.prototype.prossimoFrame = function () {
  this.disegnaStatoGioco();
  this.aggiornaBatterieAntimissile();
  this.disegnaBatterieAntimissile();
  this.aggiornaMinacce();
  this.disegnaMinacce();
  this.aggiornaMissiliNemici();
  this.disegnaMissiliNemici();
  this.aggiornaMissiliTerrestri();
  this.disegnaMissiliTerrestri();
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
      bersagli.push( {x: base.x + 15, y: base.y - 10, tipo: base} );
    }
  } );
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    bersagli.push( {x: batteria.x, y: batteria.y, tipo: batteria} )
  } );
  return bersagli;
};

CoreGame.prototype.aggiornaBatterieAntimissile = function () {
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    batteria.update();
  });
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
      return minacce.stato !== AstronaveNemica.ESPLOSO;
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
    if( batteriaAntimissile.stato !== BatteriaAntimissile.DISTRUTTA)
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
    missile.disegna( mySelf.ctx, mySelf );
  });
};

CoreGame.prototype.disegnaMissiliTerrestri = function () {
  var mySelf = this;
  $.each( this.missiliTerrestri, function( indice, missile ) {
    missile.disegna( mySelf.ctx, mySelf );
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

// funzioni di calcolo del punteggio

CoreGame.prototype.aggiornaPunteggio = function ( punti ) {
  this.punteggio += punti;
  console.log(this.punteggio);
};

CoreGame.prototype.aggiornaPunteggioMissiliAbbattuti = function () {
  ++this.punteggioMissiliAbbattuti;
  this.aggiornaPunteggio( CoreGame.PUNTI_MISSILE_ABBATTUTO * this.coefficienteOndata );
};

CoreGame.prototype.aggiornaPunteggioMissiliRimasti = function ( numeroMissili ) {
  this.punteggioMissiliRimasti += numeroMissili;
  this.aggiornaPunteggio( CoreGame.PUNTI_MISSILE_RIMASTO * this.punteggioMissiliRimasti * this.coefficienteOndata );
};

CoreGame.prototype.aggiornaPunteggioMinacceAbbattute = function () {
  ++this.punteggioMinacceAbbattute;
  this.aggiornaPunteggio( CoreGame.PUNTI_MINACCIA_ABBATTUTA * this.coefficienteOndata );
};

CoreGame.prototype.aggiornaPunteggioTorretteSalvate = function ( numeroTorrette ) {
  this.punteggioTorretteSalvate += numeroTorrette;
  this.aggiornaPunteggio( CoreGame.PUNTI_TORRETTA_SALVATA * this.punteggioTorretteSalvate * this.coefficienteOndata );
};

CoreGame.prototype.aggiornaCoefficienteOndata = function ( nuovoCoefficiente ) {
  this.coefficiente = nuovoCoefficiente;
};

CoreGame.prototype.aggiornaPunteggioMissiliSparati = function () {
  ++this.punteggioMissiliSparati;
};

CoreGame.prototype.aggiornaPunteggioNumeroOndate = function () {
  ++this.punteggioNumeroOndate;
};

CoreGame.prototype.aggiornaPunteggioMorti = function ( morti ) {
  this.punteggioMorti += morti;
  console.log("morti: " + this.punteggioMorti);
}

CoreGame.prototype.calcoloMissiliRimasti = function () {
  var tot = 0;
  $.each ( this.batterieAntimissile, function( indice, batteria ) {
    tot += batteria.numeroMissili;
  } );
  this.aggiornaPunteggioMissiliRimasti( tot );
};

CoreGame.prototype.calcoloBatterieSalvate = function () {
  var tot = 0;
  $.each( this.batterieAntimissile, function( indice, batteria ) {
    if ( batteria.missiliRimanenti != 0 && batteria instanceof BatteriaAntimissile )
      ++tot;
  } );
  this.aggiornaPunteggioTorretteSalvate( tot );
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
  var mySelf = this;
  $.each( this.missiliNemici, function( indice, missile ) {
    if ( missile.stato === Missile.ESPLOSO ) {
      mySelf.aggiornaPunteggioMissiliAbbattuti();
    }
  });
  
  this.missiliNemici = this.missiliNemici.filter(
    function( missile ) {
      return missile.stato !== Missile.ESPLOSO;
    }
  );
};