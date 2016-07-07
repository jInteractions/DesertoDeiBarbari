function Livello7 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello7.prototype = Object.create( CoreLevel.prototype );
Livello7.prototype.constructor = Livello7;

Livello7.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPartenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  var numeroMissili = 10;
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, areaPartenza );
    velRand = rand( 1, 1.5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemicoDoppio( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPartenza, xRand, velRand, ritardoRand, 3, this.coreGame) );
  }
}

Livello7.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello7.prototype.setupListeners = function ( ) { 
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

Livello7.prototype.scegliTorretta = function ( x, y, tasto ) {
  var nonFunzionante = function ( torretta ) {  
    if( torretta.stato === BatteriaAntimissile.ATTIVA &&
        torretta.numeroMissili > 0 &&
        torretta.blocco === false )
      return false;
    else
      return true;
  }
  
  var torrette = this.coreGame.batterieAntimissile;
  var torrettaSelezionata;
  
  if( 0 <= x && x < 170 ) {
    torrettaSelezionata = 0;
  }
  if( 170 <= x && x < 340 ) {
    torrettaSelezionata = 1;
  }
  if( 340 <= x && x <= 510 ) {
    torrettaSelezionata = 2;
  }
  
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 1;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 0;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    torrettaSelezionata = 2;
  if( nonFunzionante(torrette[torrettaSelezionata]) === true )
    return -1;
    
  return torrettaSelezionata;
};

Livello7.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  
  var sdoppiabili = this.esaminaMissileSdoppiabile( x, y );
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
  var x1 = sdoppiabili.x1;
  var x2 = sdoppiabili.x2;
  var y = sdoppiabili.y;
  var ySdoppio = sdoppiabili.ySdoppio;
  var missiliFrammenti = sdoppiabili.missiliFrammenti;
  
  if( sdoppiabili.missiliFrammenti.length === 1 ) {
    this.coreGame.missiliTerrestri.push( new MissileTerrestre( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x1,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 7
    }, this.coreGame ) );  
  } else {
    
    if( missiliFrammenti.length >= 2  )
      missiliFrammenti.slice(0, 2)
    
    var distanzaX = Math.abs( x - torretta.x );
    var distanzaY = Math.abs( y - torretta.y );

    this.coreGame.missiliTerrestri.push( new _MissileTerrestreDoppio( {
      xDiPartenza: torretta.x,
      yDiPartenza: torretta.y,
      xDiArrivo: x,
      yDiArrivo: y,
      coloreTestata: 'yellow',
      coloreScia: 'blue',
      massimoRaggioEsplosione: 30,
      distanzaPerFrame: 7
    }, this.coreGame, torretta.x - distanzaX/2, ySdoppio, missiliFrammenti.length ) );

  }
  //torretta.y + distanzaY/2
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 100;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello7.prototype.esaminaMissileSdoppiabile = function ( x, y ) {
  var missileUtente = new MissileStandard();
  
  var bersagli = [ { appartieneNemico: true, x: x, y: y} ];
  var ySdoppio = missileUtente.miraBersaglio( bersagli );
  var bersaglio = missileUtente.bersaglioAgganciato;
  var missiliFrammenti = missileUtente.esplodi();
    
  if( missiliFrammenti.length === 1 ) {
    return ( {
    x1: missiliFrammenti[0].x,
    x2: 0,
    y: missiliFrammenti[0].y,
    ySdoppio: 0,
    missiliFrammenti: missiliFrammenti } );  
  }
  
  return ( {
    x1: missiliFrammenti[0].x,
    x2: missiliFrammenti[1].x,
    y: missiliFrammenti[0].y,
    ySdoppio: ySdoppio,
    missiliFrammenti: missiliFrammenti } );
}

function _MissileTerrestreDoppio ( parametri, coreGame, xSdoppio, ySdoppio, missili ) {
  MissileTerrestre.call( this, parametri, coreGame );

  this.xSdoppio = xSdoppio;
  this.ySdoppio = ySdoppio;
  this.missiliFrammenti = missili;
  
  var distanza = Math.sqrt( Math.pow(this.xSdoppio - this.xDiPartenza, 2) + 
      Math.pow(this.ySdoppio - this.yDiPartenza, 2) );
  
  this.ritardoSuddivisione = Math.floor(distanza / parametri.distanzaPerFrame);
  this.suddivisioneAvvenuta = false;
}

_MissileTerrestreDoppio.prototype = Object.create( MissileTerrestre.prototype );
_MissileTerrestreDoppio.prototype.constructor = _MissileTerrestreDoppio;

_MissileTerrestreDoppio.prototype.sdoppiati = function () {
  for( var i = 0; i < this.missiliFrammenti; ++i ) {
    this.coreGame.missiliTerrestri.push(
      new MissileTerrestre( {
        xDiPartenza: this.x,
        yDiPartenza: this.y,
        xDiArrivo: this.xDiArrivo + 40,
        yDiArrivo: this.yDiArrivo,
        coloreTestata: 'yellow',
        coloreScia: 'blue',
        massimoRaggioEsplosione: 30,
        distanzaPerFrame: 7
      }, this.coreGame ) );
  }
  this.suddivisioneAvvenuta = true;
}

_MissileTerrestreDoppio.prototype.update = function () {
  //console.log( this.ritardoSuddivisione );
  
  if( this.ritardoSuddivisione !== 0 )
    this.ritardoSuddivisione--;			
  else {
    if( this.suddivisioneAvvenuta === false ) {
      this.sdoppiati();
    }
  }
  
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

function FrammentoMissile ( x, y ) {
  this.x = x;
  this.y = y;
}

// TAB 1

function MissileTestataMultipla ( ) {
  this.obiettivoAgganciato;
} 

MissileTestataMultipla.prototype.identificaObiettivo = function ( obiettivi ) {
  // Esempio obiettivo = { x: 315, y: 145, tipo: "terrestre" }
  
  for( var i = 0; i < obiettivi.length; ++i ) {
    var obiettivo = obiettivi[i];
    if( obiettivo.tipo === "terrestre" ) {
      var x = obiettivo.x;
      var y = obiettivo.y;
      
      var altezza = this.calcolaAltezzaSdoppiamento( x, y );
      this.agganciaBersaglio( obiettivo );
      
      return altezza;
    }
  }
}

MissileTestataMultipla.prototype.calcolaAltezzaSdoppiamento = function ( x, y ) {
  return (Math.abs(430 - y) / 2) + y;
}

MissileTestataMultipla.prototype.agganciaObiettivo = function ( obiettivo ) {
  this.obiettivoAgganciato = obiettivo;
}

MissileTestataMultipla.prototype.detonazione = function ( ) {
  var frammentoMissile1 = new FrammentoMissile( this.obiettivo.x + 10, this.obiettivo.y );
  var frammentoMissile2 = new FrammentoMissile( this.obiettivo.x - 10, this.obiettivo.y );
  
  var frammentiMissile = [];
  frammentiMissile.push( frammentoMissile1 );
  frammentiMissile.push( frammentoMissile2 );
  
  return frammentiMissile;
}

// TAB 2

function MissileStandard ( ) { 
  this.bersaglioAgganciato;
}

MissileStandard.prototype.miraBersaglio = function ( listaBersagli ) {
  // bersaglio = { appartieneNemico: true, x: 530, y: 95 }
  
  var numeroBersagli = listaBersagli.length;
  var i = 0;
  while( i <  numeroBersagli ) {
//###START_MODIFICABILE###
    var bersaglio = listaBersagli[i];
    if( bersaglio.appartieneNemico === true ) {
      var x = bersaglio.x;
      var y = bersaglio.y;
    
      var coordinateEsplosione = { esplosioneX: x, esplosioneY: y };
      this.agganciaObiettivo( bersaglio );
      
      return coordinateEsplosione.esplosioneY;
//###END_MODIFICABILE###
    }
    ++i;
  }
}

MissileStandard.prototype.agganciaObiettivo = function ( bersaglio ) {
  this.bersaglioAgganciato = bersaglio;
}

MissileStandard.prototype.esplodi = function ( ) {
//###START_MODIFICABILE###
  var x = this.bersaglioAgganciato.x;
  var y = this.bersaglioAgganciato.y;
  return ( [ new FrammentoMissile( x, y ) ] );
//###END_MODIFICABILE###
}

// test
//var t1 =
/*
(
function ( ) {
  
  var esito = true;
  
  var missileUtente = new MissileStandard();
  x = rand(0, 200);
  y = rand(0, 100);
  var bersagli = [ { appartieneNemico: true, x: x, y: y} ];
  var ySdoppio = missileUtente.miraBersaglio( bersagli );
  var bersaglio = missileUtente.bersaglioAgganciato;
  var missiliFrammenti = missileUtente.esplodi();
  
  if( missiliFrammenti.length !== 2 ) {
    esito = false;
  }
  
  $.each( missiliFrammenti, function( i, m ) {
    if( ! m instanceof MissileNemicoFrammento )
      esito = false;
    
    if( ySdoppio !== (Math.abs(430 - y) / 2) + y)
      esito = false;
    
  } );

  return esito;
}
) ();*/