function Livello9 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
  
  console.log( t1() );
}

Livello9.prototype = Object.create( CoreLevel.prototype );
Livello9.prototype.constructor = Livello9;

Livello9.prototype.inizializzaBasi = function ( ) {
  this.coreGame.aggiungiBase( new BaseMilitare( 80,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new BaseMilitare( 180,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 350,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) );
}

Livello9.prototype.inizializzaArmiNemiche = function ( ) {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 100;
  var xRand;
  var velRand;
  var ritardoRand;
  
  var bersagliPrioritari = [];
  $.each( this.coreGame.basi, function ( i, b ) {
    if( b.vitale === false )
      bersagliPrioritari.push( {x: b.x + 15, y: b.y - 10, tipo: b} )
  } );
  var bersagliNonBasi = this.coreGame.bersagliAttaccabili().filter( function( b ) {
    if( b.tipo instanceof BaseMilitare )
      return false;
    return true;
  } );
  var bersagliPrioritariEsauriti = true;
  $.each( bersagliPrioritari, function( i, b ) {
    if( b.tipo.attiva === true )
      bersagliPrioritariEsauriti = false;
  } )
  if( bersagliPrioritariEsauriti === true )
    var bersagli = this.coreGame.bersagliAttaccabili();
  else
    var bersagli = bersagliNonBasi.concat( bersagliPrioritari );
  
  var numeroMissili = 50;
  for( var i = 0; i < numeroMissili ; i++ ) {
    xRand = rand( 0, areaPertenza );
    velRand = rand( 1, 1.5 );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
}

Livello9.prototype.setupListeners = function ( ) { 
  var mySelf = this;
  $( '.gameContainer' ).off();
  $( '.gameContainer' ).focus();
  
  $( '.gameContainer' ).on( 'click', function ( ) {
    mySelf.sparo( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y, null );
  } );
  $( '.gameContainer' ).bind( 'keyup', function( event ) {
    if( event.which === 32)
      mySelf.sparoSpeciale( mySelf.coreGame.mirino.x, mySelf.coreGame.mirino.y );
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
}

Livello9.prototype.scegliTorretta = function ( x, y, tasto ) {
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
}

Livello9.prototype.sparo = function ( x, y, tasto ) {
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

Livello9.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 1.2;
}

Livello9.prototype.mostraSchermataIniziale = function ( punteggio ) {
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

Livello9.prototype.sparoSpeciale = function ( x, y ) {  
  var munizioniDaUtilizzare = function ( base ) {
    var n = base.numeroMissili;
    if ( n > 6 )
      return n - 6;
    if ( n > 3 )
      return n - 3;
    if ( n > 1 )
      return n - 1;
    if ( n === 1 )
      return 1;
    return 0;
  }
  var munizioniUtilizzabili = [];
  var sommaMunizioniUtilizzabili = 0;
  $.each( this.coreGame.batterieAntimissile, function ( i, b ) {
    if( b.stato === BatteriaAntimissile.ATTIVA ) {
      munizioniUtilizzabili[i] = munizioniDaUtilizzare( b );
      sommaMunizioniUtilizzabili += munizioniDaUtilizzare( b );
    }
  } );
  
  var area = 30 * sommaMunizioniUtilizzabili;
  var inizio = x - area/2;
  var fine = x + area/2;
  var contatore = 0;
  
  var ordineDiFuoco = [];
  while( sommaMunizioniUtilizzabili > 0 ) {
    $.each( this.coreGame.batterieAntimissile, function ( i, b ) {
      if( b.stato === BatteriaAntimissile.ATTIVA 
         && munizioniUtilizzabili[i] > 0) {
        
        --munizioniUtilizzabili[i];
        --sommaMunizioniUtilizzabili;
        
        var torretta = b;
        
        var xSparo = inizio + (contatore * 30);
        var ySparo = y;
        ordineDiFuoco.push ({ x: xSparo, y: ySparo, numeroTorretta: i });
        
        ++contatore;
      }
    } );
  }
    
  var torrette = [];
  torrette[0] = new _TorrettaVirtuale ( 0 );
  torrette[1] = new _TorrettaVirtuale ( 1 );
  torrette[2] = new _TorrettaVirtuale ( 2 );

  comandoSparoMultiplo( ordineDiFuoco, torrette );

  var mySelf = this;
  $.each( torrette, function ( i, t ) {
    $.each( t._ordineSparo, function ( j, o ) {
      var torretta = mySelf.coreGame.batterieAntimissile[i];
      mySelf.coreGame.missiliTerrestri.push( new MissileTerrestre( {
        xDiPartenza: torretta.x,
        yDiPartenza: torretta.y,
        xDiArrivo: o.x,
        yDiArrivo: o.y,
        coloreTestata: 'yellow',
        coloreScia: 'blue',
        massimoRaggioEsplosione: 30,
        distanzaPerFrame: 10
      }, mySelf.coreGame ) );
      mySelf.coreGame.aggiornaPunteggioMissiliSparati();
      torretta.numeroMissili--;
    } );
  } );
    
  //torretta.temperatura += 100;
  //var temperaturaMinima = 500
  //torretta.temperaturaSblocco = temperaturaMinima;
  //if( torretta.temperatura >= 799 ) {
  //  torretta.blocco = true;
  //};
}

function _TorrettaVirtuale ( indice ) {
  this.indice = indice;
  this._ordineSparo = [];
}

_TorrettaVirtuale.prototype.cicloSparo = function ( x, y ) {
  this._ordineSparo.push( { x: x, y: y } );
}

var sceltaTorrettaMigliore = function ( x, y, _torrette ) {
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
    return undefined;
    
  return torrettaSelezionata;
}

// TAB 1

var comandoSparoSingolo = function ( x, y, torrette ) {
  var indiceTorretta = sceltaTorrettaMigliore( x, y, torrette );
  
  if( indiceTorretta !== undefined ) {
    var torretta = torrette[indiceTorretta];
    torretta.cicloSparo( x, y );
  }
} 

// TAB 2

var comandoSparoMultiplo = function ( ordiniDiFuoco, torrette ) {
  var l = ordiniDiFuoco.length;
  for( var i = 0; i < l; ++i ) {
    var ordine = ordiniDiFuoco[i];
    
    var indiceTorretta = ordine.numeroTorretta;
    var x = ordine.x;
    var y = ordine.y;
    var torretta = torrette[indiceTorretta];
    torretta.cicloSparo( x, y );
  }
}
 
// test

var t1 = 
function () {
  var esito = true;

  var torrette = [];
  torrette[0] = new _TorrettaVirtuale ( 0 );
  torrette[1] = new _TorrettaVirtuale ( 1 );
  torrette[2] = new _TorrettaVirtuale ( 2 );

  var ordiniDiFuoco = [];
  for( var i = 0; i < rand(4, 4); ++i ) {
    ordiniDiFuoco[i] = {
      numeroTorretta: rand(0, 2),
      x: rand(0, 510),
      y: rand(0, 300)
    }
  }

  var ordiniPerTorretta = [];
  $.each( ordiniDiFuoco, function ( i, o ) {
    ordiniPerTorretta[o.numeroTorretta] = [];
  } );
  $.each( ordiniDiFuoco, function ( i, o ) {
    ordiniPerTorretta[o.numeroTorretta].push( {x: o.x, y: o.y} );
  } );

  comandoSparoMultiplo( ordiniDiFuoco, torrette );

  $.each( torrette, function ( i, t ) {
    if( ordiniPerTorretta[t.indice] === undefined )
      return;

    var ordineTest = ordiniPerTorretta[t.indice];
    var ordineUtente = t._ordineSparo;

    ordineTest.sort( function( a, b ) { return a.x < b.x; } );
    ordineUtente.sort( function( a, b ) { return a.x < b.x; } );

    if( ordineTest.length !== ordineUtente.length )
      esito = false;
    else {
      $.each( ordineTest, function ( j, o1 ) {
        var o2 = ordineUtente[j];
        if( o1.x !== o2.x || o1.y != o2.y )
          esito = false;  
      } );
    }
  } );

  return esito;
}
      
      


