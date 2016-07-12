function Livello8 ( callbackFineLivello ) {
  CoreLevel.call( this, callbackFineLivello );
}

Livello8.prototype = Object.create( CoreLevel.prototype );
Livello8.prototype.constructor = Livello8;

Livello8.prototype.inizializzaBasi = function ( ) {
  this.coreGame.aggiungiBase( new BaseMilitare( 80,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 130,  430, true, 100, 'cyan', this.coreGame ) );  
  this.coreGame.aggiungiBase( new BaseMilitare( 180,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 300,  430, true, 100, 'cyan', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 350,  430, false, 100, 'red', this.coreGame ) );
  this.coreGame.aggiungiBase( new BaseMilitare( 400,  430, true, 100, 'cyan', this.coreGame ) );
}

Livello8.prototype.inizializzaArmiNemiche = function () {
  var areaPertenza = this.coreGame.canvas.width;
  var ritardoMassimo = 900 * (this.numeroOndata * 0.05);
  var velMin = 1.5 + this.numeroOndata * 0.1;
  var velMax = 1.6 + this.numeroOndata * 0.1;
  var numeroMissili = 25 + Math.floor( this.numeroOndata );
  var numeroMissiliSdoppiabili = rand( 0, numeroMissili );
  var ritardoRand;
  var bersagli = this.coreGame.bersagliAttaccabili();
  
  var bersagliPrioritari = [];
  $.each( this.esaminaCanaliRadio(), function ( i, b ) {
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
  
  if( bersagliPrioritariEsauriti === true ) {
    var bersagli = this.coreGame.bersagliAttaccabili();
  } else {
    var bersagli = bersagliNonBasi.concat( bersagliPrioritari );   
  }
  
  for( var i = 0; i < numeroMissili ; i++ ) {
    var xRand = rand( 0, areaPertenza );
    var velRand = rand( velMin, velMax );
    ritardoRand = rand( 0, ritardoMassimo );
    this.coreGame.missiliNemici.push( new MissileNemico( {
      coloreTestata: 'yellow',
      coloreScia: 'red',
      massimoRaggioEsplosione: 30
    }, bersagli, areaPertenza, xRand, velRand,  ritardoRand, this.coreGame) );
  }
}

Livello8.prototype.calcolaCoefficienteOndata = function ( ) {
  return this.numeroOndata * 2.5;
}

Livello8.prototype.setupListeners = function ( ) { 
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

Livello8.prototype.scegliTorretta = function ( x, y, tasto ) {
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

Livello8.prototype.sparo = function ( x, y, tasto ) {
  var indiceTorretta = this.scegliTorretta( x, y, tasto );
  if( indiceTorretta === -1 )
    return;
  
  var torretta = this.coreGame.batterieAntimissile[indiceTorretta];
  var x1 = x + 10;
  var x2 = x - 10;
  var ySdoppio = (Math.abs(430 - y) / 2) + y;
  
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
  }, this.coreGame, torretta.x - distanzaX/2, ySdoppio, 2 ) );
  
  this.coreGame.aggiornaPunteggioMissiliSparati();
  torretta.numeroMissili--;
  torretta.temperatura += 100;
  var temperaturaMinima = 500
  torretta.temperaturaSblocco = temperaturaMinima;
  if( torretta.temperatura >= 799 ) {
    torretta.blocco = true;
  };
}

Livello8.prototype.mostraSchermataIniziale = function ( punteggio ) {
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

Livello8.prototype.esaminaCanaliRadio = function ( ) {
  var basi = this.coreGame.basi;
  var messaggi = [];
  messaggi[0] = "[21:06] Parla base BX0, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[1] = "[21:04] Parla base AX1, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[2] = "[21:02] Parla base BX2, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[3] = "[21:08] Parla base AX3, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[4] = "[21:01] Parla base BX4, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[5] = "[21:02] Parla base AX5, ci serve immediato aiuto, siamo sotto attacco!";
  var canale = [];
  canale[0] = { idRadio: "BX0", messaggio: messaggi[0] };
  canale[1] = { idRadio: "AX1", messaggio: messaggi[1] };
  canale[2] = { idRadio: "BX2", messaggio: messaggi[2] };
  canale[3] = { idRadio: "AX3", messaggio: messaggi[3] };
  canale[4] = { idRadio: "BX4", messaggio: messaggi[4] };
  canale[5] = { idRadio: "AX5", messaggio: messaggi[5] };
  
  var canaleMescolato = spedisciMessaggiBasi( );
  
  var bersagliPrioritari = [];
  $.each( canaleMescolato, function( i, c ) {
    if( c.idRadio.indexOf("AX") >= 0)
      bersagliPrioritari.push( basi[i] );
  } );
  
  messaggi = riceviMessaggiBasi( canaleMescolato );

  return bersagliPrioritari;
}

// TAB 1

/**********
Funzione che invia i messaggi da parte delle basi sul mezzo di comunicazione.
Il mezzo di comunicazione è un array di 6 elementi chiamato "canaliTrasmissione" aventi struttura: { idRadio: "AX1", messaggio: "[00:12] Questo è un messaggio di prova" }.
I messaggi provenienti dalla base numero 0, ossia quella più a destra, vengono inseriti nel canaliTrasmissione[0] e così via...

Questa funzione ritorna i "canaliTrasmissione" caricati con messaggi e identificatori radio opportunatamente mescolati per confondere il nemico tramite "mescolaCanali()".
**********/
function spedisciMessaggiBasi ( ) {  
  var messaggi = [];
  messaggi[0] = "[21:06] Parla base BX0, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[1] = "[21:04] Parla base AX1, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[2] = "[21:02] Parla base BX2, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[3] = "[21:08] Parla base AX3, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[4] = "[21:01] Parla base BX4, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[5] = "[21:02] Parla base AX5, ci serve immediato aiuto, siamo sotto attacco!";
  
  var canaliTrasmissione = [];
  canaliTrasmissione[0] = { idRadio: "BX0", messaggio: messaggi[0] };
  canaliTrasmissione[1] = { idRadio: "AX1", messaggio: messaggi[1] };
  canaliTrasmissione[2] = { idRadio: "BX2", messaggio: messaggi[2] };
  canaliTrasmissione[3] = { idRadio: "AX3", messaggio: messaggi[3] };
  canaliTrasmissione[4] = { idRadio: "BX4", messaggio: messaggi[4] };
  canaliTrasmissione[5] = { idRadio: "AX5", messaggio: messaggi[5] };
  
  // I canali di trasmissione vengono mescolati per confondere il nemico.
  mescolaCanali( canaliTrasmissione );
  
  return canaliTrasmissione;
}

/**********
Funzione che riceve i messaggi dai canali di tramissione e li smista alle relative basi.
"canaliTrasmissione" è un array di 6 elementi aventi struttura: { idRadio: "AX1", messaggio: "[00:12] Questo è un messaggio di prova" }.

Ecco la mappatura tra canali radio e id

**********/
function riceviMessaggiBasi ( canaliTrasmissione ) { 
  // Vengono riordinati i canali di trasmissione per consentire la corretta ricezione
  riordinaCanali( canaliTrasmissione );
    
  var messaggiRicevuti = [];
  messaggiRicevuti[0] = canaliTrasmissione[0].messaggio;
  messaggiRicevuti[1] = canaliTrasmissione[1].messaggio;
  messaggiRicevuti[2] = canaliTrasmissione[2].messaggio;
  messaggiRicevuti[3] = canaliTrasmissione[3].messaggio;
  messaggiRicevuti[4] = canaliTrasmissione[4].messaggio;
  messaggiRicevuti[5] = canaliTrasmissione[5].messaggio;
  return messaggiRicevuti;
}

// TAB 2

/**********
********/
var determinaBersagliDaColpire = function ( canaleTrasmissione ) {
  var bersagliPrioritari = [];
  
  // Ecco come vengono identificate le basi vitali dal nemico
  for( var i = 0; i < canaleTrasmissione.length; ++i ) {
    if( c.idRadio[0] === "A" && c.idRadio[1] === "X" )
      bersagliPrioritari.push( basi[i] );
  }
  
  return bersagliPrioritari;
}

// TAB 3

/**********
Questo è il file per scrivere il codice delle funzioni di codifica e decodifica.
Fanne buon uso.
/\/\/\ Gen. Ortiz /\/\/\
**********/

/**********
Funzione per il mescolamento dei canali di trasmissione per confondere il nemico.
Prende come input un array di 6 elementi chiamato "canaliTrasmissione" aventi struttura: { idRadio: "AX1", messaggio: "[00:12] Questo è un messaggio di prova" }.

Questa funzione deve mescolare i canali di trasmissione in modo tale che ad una base vitale sia associato il canale di tramissione di una base non vitale. Il nemico colpirà con priorità quest'ultima ignorando l'altra.
Esempio:
  base in posizione 0 (non vitale) ---> canale 0
  base in posizione 1 (vitale)     ---> canale 1
  
  Invertendo il canale 0 con il canale 1 il nemico crederà che la base non vitale occupi la posizione 1 mentre quella vitale la 0.
**********/
var mescolaCanali = function ( canaleTrasmissione ) {
//###START_MODIFICABILE###
  // Funzione da implementare!
//###END_MODIFICABILE###
}


/**********
Funzione per il riordinamento dei canali di tramissione a seguito del mescolamento per confondere il nemico.
Prende come input un array di 6 elementi chiamato "canaliTrasmissione" aventi struttura: { idRadio: "AX1", messaggio: "[00:12] Questo è un messaggio di prova" }.
**********/
var riordinaCanali = function ( canaleTrasmissione ) {
//###START_MODIFICABILE###
  // Funzione da implementare!
//###END_MODIFICABILE###
}

// test
var t1 = 
//( 
  function () {
  var basi = [ 
    new BaseMilitare( 80,  430, false, 100, 'red', null ),
    new BaseMilitare( 130,  430, true, 100, 'cyan', null ),
    new BaseMilitare( 180,  430, false, 100, 'red', null ),
    new BaseMilitare( 300,  430, true, 100, 'cyan', null ),
    new BaseMilitare( 350,  430, false, 100, 'red', null ),
    new BaseMilitare( 400,  430, true, 100, 'cyan', null ) 
  ];
  
  var messaggi = [];
  messaggi[0] = "[21:06] Parla base BX0, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[1] = "[21:04] Parla base AX1, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[2] = "[21:02] Parla base BX2, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[3] = "[21:08] Parla base AX3, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[4] = "[21:01] Parla base BX4, ci serve immediato aiuto, siamo sotto attacco!";
  messaggi[5] = "[21:02] Parla base AX5, ci serve immediato aiuto, siamo sotto attacco!";
  var canale = [];
  canale[0] = { idRadio: "BX0", messaggio: messaggi[0] };
  canale[1] = { idRadio: "AX1", messaggio: messaggi[1] };
  canale[2] = { idRadio: "BX2", messaggio: messaggi[2] };
  canale[3] = { idRadio: "AX3", messaggio: messaggi[3] };
  canale[4] = { idRadio: "BX4", messaggio: messaggi[4] };
  canale[5] = { idRadio: "AX5", messaggio: messaggi[5] };
  
  var canaleMescolato = spedisciMessaggiBasi( );
    
  var bersagliPrioritari = [];
  $.each( canaleMescolato, function( i, c ) {
    if( c.idRadio.indexOf("AX") >= 0 )
      bersagliPrioritari.push( basi[i] );
  } ); 
    
  var esito = true;
  var cause = [];
  $.each( bersagliPrioritari, function( i, b ) {
    if( b.vitale === true ) {
      cause.push("Una base vitale viene ancora bersagliata!");
      esito = false;
    }
  } );
        
  var messaggiRicevuti = riceviMessaggiBasi( canaleMescolato );
      
  $.each( canale, function( i, m ) {
    if( m.messaggio !== messaggiRicevuti[i] ) {
      cause.push("Le trasmissioni non sono riordinate per bene, alcune basi ricevono messaggi sbagliati!");
      esito = false;
    }
  } );
  
  //return esito;
  //return {esito: esito, cause: cause};  
}
//) ();




/* SOLUZIONE
  var temp;
  temp = canaleTrasmissione[0]
  canaleTrasmissione[0] = canaleTrasmissione[1]
  canaleTrasmissione[1] = temp;
  
  temp = canaleTrasmissione[2];
  canaleTrasmissione[2] = canaleTrasmissione[3];
  canaleTrasmissione[3] = temp;
  
  temp = canaleTrasmissione[4];
  canaleTrasmissione[4] = canaleTrasmissione[5];
  canaleTrasmissione[5] = temp; 
  
  var temp;
  temp = canaleTrasmissione[1];
  canaleTrasmissione[1] = canaleTrasmissione[0];
  canaleTrasmissione[0] = temp;
  
  temp = canaleTrasmissione[3];
  canaleTrasmissione[3] = canaleTrasmissione[2];
  canaleTrasmissione[2] = temp;
  
  temp = canaleTrasmissione[5];
  canaleTrasmissione[5] = canaleTrasmissione[4];
  canaleTrasmissione[4] = temp;
  */
  
  