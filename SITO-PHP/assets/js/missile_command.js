// Missile Command
var missileCommand = (function () {
  var canvas = document.querySelector( 'canvas' ),
      ctx = canvas.getContext( '2d' );

// Constants
  var CANVAS_WIDTH  = canvas.width,
      CANVAS_HEIGHT = canvas.height,
      NUMERO_INTEGRANTI_DI_UNA_BASE = 200,
      NUMERO_INTEGRANTI_ANTI_MISSILE = 10,
      INDICE_TORRETTA_CENTRALE = 1,
      MISSILE = {
        attivo: 1,
        esplosione: 2,
        implosione: 3,
        esploso: 4
      },      
      MIRINO = {
        tracciamento: 1,
        spento: 0
      },
      COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];

  // Variables
  var punteggio = 0,
      popolazioneMorta = 0,
      popolazioneSopravvissuta = 0,
      livello = 1,
      basi = [],
      batterieAntiMissile = [],
      missiliGiocatore = [],
      missiliNemico = [],
      identificatoreTimer,
      raggioEsplosioneMissileNemico = 30,
      velMassimaMissiliNemici = 1;

  var aggiuntaDelleBasi = function(){ 
    // Codice corretto
    var xIniziale = 80;
    for (var j = 0; j < 3; j++){
      basi.push( new Base( xIniziale,  430 ) );
      xIniziale += 50;
    }
    xIniziale = 300;
    for (var j = 0; j < 3; j++){
      basi.push( new Base( xIniziale, 430 ) );
      xIniziale += 50;
    }
  }
  
  var aggiuntaDelleBatterieAntiMissile = function(){
    batterieAntiMissile.push( new BatteriaAntiMissile( 35,  410 ) );
  	batterieAntiMissile.push( new BatteriaAntiMissile( 255, 410 ) );
  	batterieAntiMissile.push( new BatteriaAntiMissile( 475, 410 ) );
    caricamentoDeiMissiliNelleBatterieAntiMissile();
  }
  
  var caricamentoDeiMissiliNelleBatterieAntiMissile = function (){
    $.each( batterieAntiMissile, function( indice, batteriaAntiMissile ) {
      batteriaAntiMissile.missiliRimanenti = 10;
    });
  }
  
  // Create cities and anti missile batteries at the start of the game
  var iniziaGioco = function() { 
  	// Mirino
    mirino = new Mirino(CANVAS_WIDTH/2.0, CANVAS_HEIGHT/2.0);   
      
  	aggiuntaDelleBasi();
		
  	aggiuntaDelleBatterieAntiMissile();
    
  	inizializzaLivello();
  };

  // Reset various variables at the start of a new level
  var inizializzaLivello = function() {
    missiliGiocatore = [];
    missiliNemico = [];
    caricamentoDeiMissiliNelleBatterieAntiMissile();
    creazioneMissiliNemico();
    disegnaInizioLivello();
  };

  // Create a certain number of enemy missiles based on the game level
  var creazioneMissiliNemico = function() {
    var options = {speed: velMassimaMissiliNemici};
    var bersagli = bersagliAttaccabili(),
      numeroMissili = ( (livello + 7) < 30 ) ? livello + 7 : 30,
      numeroMissiliSdoppiabili = (( (livello + 7) < 30 ) ? livello + 7 : 30) / 2;
    
    for( var i = 0; i < numeroMissili; i++ ) {
      options.speed = rand(1, velMassimaMissiliNemici);
      missiliNemico.push( new MissileNemico(bersagli, options) );
    }

		for( var i = 0; i < numeroMissiliSdoppiabili; i++) {
      options.speed = rand(1, velMassimaMissiliNemici);
      missiliNemico.push( new MissileNemicoDoppio(bersagli, missiliNemico, options) );
    }
  };
  
  // Get a random number between min and max, inclusive
  var rand = function( min, max ) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  };

  // Show various graphics shown on most game screens
  var disegnaStatoDelGioco = function() {
    disegnaBackground();
    disegnaBasi();
    disegnaBatterieAntiMissile();
    disegnaPunteggio();
  };

  var disegnaInizioLivello = function() {
    disegnaStatoDelGioco();
    disegnaMessaggioLivello();
  };

  // Show current score
  var disegnaPunteggio = function() {
    ctx.fillStyle = 'red';
    ctx.font = 'bold 20px arial';
    ctx.fillText( 'Punteggio ' + punteggio, 15, 25 );
    ctx.fillText( 'Morti ' + popolazioneMorta, 15, 50 );
  };

  // Show message before a level begins
  var disegnaMessaggioLivello = function() {
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 20px arial';
    ctx.fillText( 'CLICK PER INIZIARE LIVELLO', 130, 180 );
    ctx.fillStyle = 'red';
    ctx.fillText( ' ' + livello, 370, 180 );

    ctx.fillText( '' + getMultiplier(), 195, 245 );
    ctx.fillStyle = 'blue';
    ctx.fillText( 'X  PUNTI', 215, 245 );

    ctx.fillText( 'DIFENDI', 100, 355 );
    ctx.fillText( 'BASI', 330, 355 );
  };

  // Show bonus points at end of a level
  var disegnaFineLivello = function( missiliRimanenti, missiliBonus, 
                               basiSalvate, basiBonus ) {
    disegnaStatoDelGioco();
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 20px arial';
    ctx.fillText( 'PUNTI BONUS', 150, 149 );
    ctx.fillStyle = 'red';
    ctx.fillText( '' + missiliBonus, 170, 213 );
    ctx.fillStyle = 'blue';
    ctx.fillText( 'Missili rimanenti: ' + missiliRimanenti, 230, 213 );
    ctx.fillStyle = 'red';
    ctx.fillText( '' + basiBonus, 170, 277 );
    ctx.fillStyle = 'blue';
    ctx.fillText( 'Basi salvate: ' + basiSalvate, 230, 277 );
  };

  // Show simple graphic at end of game
  var disegnaFineDelGioco = function() {
    ctx.fillStyle = 'red';
    ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    // Yellow hexagon
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo( 255, 30  );
    ctx.lineTo( 396, 89  );
    ctx.lineTo( 455, 230 );
    ctx.lineTo( 396, 371 );
    ctx.lineTo( 255, 430 );
    ctx.lineTo( 114, 371 );
    ctx.lineTo( 55,  230 );
    ctx.lineTo( 114, 89  );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.font = 'bold 85px arial';
    ctx.fillText( 'THE END', 70, 260 );

    ctx.fillStyle = 'black';
    ctx.font = 'bold 26px arial';
    ctx.fillText( 'Punteggio finale: ' + punteggio, 15, 25 );
    ctx.fillText( 'Morti: ' + popolazioneMorta, 15, 55 );
    ctx.fillText( 'Sopravvissuti: ' + popolazioneSopravvissuta, 15, 85 );
    ctx.fillText( 'CLICK PER INIZIARE UNA NUOVA PARTITA', 80, 458 );
  };

  // Draw all attivo cities
  var disegnaBasi = function() {
    $.each( basi, function( indice, base ) {
      if( base.attivo ) {
        base.disegna();
      }
    });
  };

  // Draw missiles in all anti missile batteries
  var disegnaBatterieAntiMissile = function() {
    $.each( batterieAntiMissile, function( indice, batteriaAntiMissile ) {
      batteriaAntiMissile.disegna();
    });
  };

  // Get the factor by which the score earned in a level will
  // be multiplied by (maximum factor of 6)
  var getMultiplier = function() {
    return ( livello > 10 ) ? 6 : Math.floor( (livello + 1) / 2 );
  };

  // Show the basic game background
  var disegnaBackground = function() {
    // Black background
    ctx.fillStyle = 'black';
    ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    // Yellow area at bottom of screen for cities and
    // anti missile batteries
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo( 0, 460 );
    ctx.lineTo( 0,  430 );
    ctx.lineTo( 25, 410 );
    ctx.lineTo( 45, 410 );
    ctx.lineTo( 70, 430 );
    ctx.lineTo( 220, 430 );
    ctx.lineTo( 245, 410 );
    ctx.lineTo( 265, 410 );
    ctx.lineTo( 290, 430 );
    ctx.lineTo( 440, 430 );
    ctx.lineTo( 465, 410 );
    ctx.lineTo( 485, 410 );
    ctx.lineTo( 510, 430 );
    ctx.lineTo( 510, 460 );
    ctx.closePath();
    ctx.fill();
  };

	// Costruttore per il mirino
  function Mirino( x, y ) {
    this.x = x;
    this.y = y;
    this.stato = MIRINO.tracciamento;
    this.inseguiX = 0;
    this.inseguiY = 0;
    this.dx = 0;
    this.dy = 0;
  }

  Mirino.prototype.disegna = function() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( this.x - 5, this.y - 5);
    ctx.lineTo( this.x + 5, this.y + 5);
    ctx.moveTo( this.x - 5, this.y + 5);
    ctx.lineTo( this.x + 5, this.y - 5);
    ctx.stroke();
  }

  Mirino.prototype.cambiaMira = function() {
    var xDistanza = this.inseguiX - this.x;
    var yDistanza = this.inseguiY - this.y;
    var distanzaPerFrame = 16.0;

    var rapporto = (function() {
      var distanza = Math.sqrt( Math.pow(xDistanza, 2) + 
        Math.pow(yDistanza, 2) );
      return distanza / distanzaPerFrame;
    })();

    this.dx = xDistanza / rapporto;
    this.dy = yDistanza / rapporto;
  }

  Mirino.prototype.update = function() {
    if(this.stato != MIRINO.tracciamento)
      return;

    var xDistanza = this.inseguiX - this.x;
    var yDistanza = this.inseguiY - this.y;

    var distanzaObiettivo = Math.sqrt( Math.pow(xDistanza, 2) + 
      Math.pow(yDistanza, 2) );

    var spostamentoMirino = Math.sqrt( Math.pow(this.dx, 2) + 
      Math.pow(this.dy, 2) );

    if(distanzaObiettivo <= spostamentoMirino) {
      this.x = this.inseguiX;
      this.y = this.inseguiY;
      return;
    }

    if(distanzaObiettivo >= 1.0) {
      this.x += this.dx;
      this.y += this.dy;
    }
  }
  
  // Constructor for a City
  function Base( x, y ) {
    this.x = x;
    this.y = y;
    this.attivo = true;
  }
  
  // Show a city based on its position
  Base.prototype.disegna = function() {
    var x = this.x,
        y = this.y;

    ctx.fillStyle = "#42EFFF";
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.lineTo( x, y - 10 );
    ctx.lineTo( x + 10, y - 10 );
    ctx.lineTo( x + 15, y - 15 );
    ctx.lineTo( x + 20, y - 10 );
    ctx.lineTo( x + 30, y - 10 );
    ctx.lineTo( x + 30, y );
    ctx.closePath();
    ctx.fill();
  };

  // Constructor for an Anti Missile Battery
  function BatteriaAntiMissile( x, y ) {
    this.x = x;
    this.y = y;
    this.missiliRimanenti = 10;
  }

  BatteriaAntiMissile.prototype.haMissiliADisposizione = function() {
    return !!this.missiliRimanenti;
  };

  // Show the missiles left in an anti missile battery
  BatteriaAntiMissile.prototype.disegna = function() {
    var x, y;
    var delta = [ [0, 0], [-6, 6], [6, 6], [-12, 12], [0, 12],
                  [12, 12], [-18, 18], [-6, 18], [6, 18], [18, 18] ];

    for( var i = 0, len = this.missiliRimanenti; i < len; i++ ) {
      x = this.x + delta[i][0];
      y = this.y + delta[i][1];

      // Draw a missile
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo( x, y );
      ctx.lineTo( x, y + 8 );
      ctx.moveTo( x - 2, y + 10 );
      ctx.lineTo( x - 2, y + 6 );
      ctx.moveTo( x + 2, y + 10 );
      ctx.lineTo( x + 2, y + 6 );
      ctx.stroke();
    }
  };

  // Constructor for a Missile, which may be the player's missile or
  // the enemy's missile.
  // The options argument used to create the missile is expected to 
  // have startX, startY, endX, and endY to define the missile's path
  // as well as color and trailColor for the missile's appearance
  function Missile( options ) {
    this.xDiPartenza = options.xDiPartenza;
    this.yDiPartenza = options.yDiPartenza;
    this.xDiArrivo = options.xDiArrivo;
    this.yDiArrivo = options.yDiArrivo;
    this.colore = options.colore;
    this.coloreScia = options.coloreScia;
    this.x = options.xDiPartenza;
    this.y = options.yDiPartenza;
    this.stato = MISSILE.attivo;
    this.ampiezza = 2;
    this.altezza = 2;
    this.raggioDiEsplosione = 0;
    this.animazioneColore = 0;
    this.massimoRaggioEsplosione = options.massimoRaggioEsplosione;
  }

  // Draw the path of a missile or an exploding missile
  Missile.prototype.disegna = function() {
		this.animazioneColore = (this.animazioneColore + 1) % COLORI.length;
		
    if( this.stato === MISSILE.attivo ){
      ctx.strokeStyle = this.coloreScia;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo( this.xDiPartenza, this.yDiPartenza );
      ctx.lineTo( this.x, this.y );
      ctx.stroke();
			
			ctx.strokeStyle = COLORI[this.animazioneColore];
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo - 5);
      ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo + 5);
      ctx.moveTo( this.xDiArrivo - 5, this.yDiArrivo + 5);
      ctx.lineTo( this.xDiArrivo + 5, this.yDiArrivo - 5);
      ctx.stroke();

      ctx.fillStyle = COLORI[this.animazioneColore];
      ctx.fillRect( this.x - 1, this.y - 1, this.ampiezza, this.altezza );
    } else if( this.stato === MISSILE.esplosione ||
               this.stato === MISSILE.implosione ) {
      ctx.fillStyle = COLORI[this.animazioneColore];
      ctx.beginPath();
      ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
      ctx.closePath();

      esplodiAltriMissili( this, ctx );

      ctx.fill();
    }
  };

  // Handle update to help with animating an explosion
  Missile.prototype.esplodi = function() {
    if( this.stato === MISSILE.esplosione ) {
      this.raggioDiEsplosione++;
    }
    if( this.raggioDiEsplosione > this.massimoRaggioEsplosione ) {
      this.stato = MISSILE.implosione;
    }
    if( this.stato === MISSILE.implosione ) {
      this.raggioDiEsplosione--;
      if( this.esplosioneATerra ) {
        if ( this.bersaglio[2] instanceof Base ) {
          if (this.bersaglio[2].attivo === true) {
            this.bersaglio[2].attivo = false;
            popolazioneMorta += NUMERO_INTEGRANTI_DI_UNA_BASE;
          }
        } 
        else { 
          if (this.bersaglio[2].missiliRimanenti != 0){
            this.bersaglio[2].missiliRimanenti = 0;
            popolazioneMorta += NUMERO_INTEGRANTI_ANTI_MISSILE;
          }
        }
      }
    }
    if( this.raggioDiEsplosione < 0 ) {
      this.stato = MISSILE.esploso;
    }
  };

  // Constructor for the Player's Missile, which is a subclass of Missile
  // and uses Missile's constructor
  function MissileDelGiocatore( indiceTorretta, xDiArrivo, yDiArrivo ) {
    // Anti missile battery this missile will be fired from
    var batteriaAntiMissile = batterieAntiMissile[indiceTorretta];

    Missile.call( this, { xDiPartenza: batteriaAntiMissile.x,  yDiPartenza: batteriaAntiMissile.y,
                          xDiArrivo: xDiArrivo,     yDiArrivo: yDiArrivo, 
                          colore: 'green', coloreScia: 'blue', massimoRaggioEsplosione: 30 } );

    var distanzaX = this.xDiArrivo - this.xDiPartenza,
        distanzaY = this.yDiArrivo - this.yDiPartenza;
    // Determine a value to be used to scale the orthogonal directions 
    // of travel so the missiles travel at a constant speed and in the
    // right direction 
    var scala = (function() {
      var distanza = Math.sqrt( Math.pow(distanzaX, 2) + 
                                Math.pow(distanzaY, 2) ),
          // Make missile fired from central anti missile battery faster
          distanzaPerFrame = ( indiceTorretta === 1 ) ? 20 : 12;

      return distanza / distanzaPerFrame;
    })();

    this.dx = distanzaX / scala;
    this.dy = distanzaY / scala;
    batteriaAntiMissile.missiliRimanenti--;
  }

  // Make PlayerMissile inherit from Missile
  MissileDelGiocatore.prototype = Object.create( Missile.prototype );
  MissileDelGiocatore.prototype.constructor = MissileDelGiocatore;

  // Update the location and/or stato of this missile of the player
  MissileDelGiocatore.prototype.update = function() {
    if( this.stato === MISSILE.attivo && this.y <= this.yDiArrivo ) {
      // Target reached
      this.x = this.xDiArrivo;
      this.y = this.yDiArrivo;
      this.stato = MISSILE.esplosione;
    }
    if( this.stato === MISSILE.attivo ) {
      this.x += this.dx;
      this.y += this.dy;
    } else {
      this.esplodi();
    }
  };

  // Create a missile that will be shot at indicated location
  var sparoDelGiocatore = function( x, y ) {
    if( y >= 50 && y <= 370 ) {
      var indiceTorretta = qualeBatteriaAntiMissileUsare( x );
      if( indiceTorretta === -1 ){ // No missiles left
        return;
      }
      missiliGiocatore.push( new MissileDelGiocatore( indiceTorretta, x, y ) );
    }
  };

  // Constructor for the Enemy's Missile, which is a subclass of Missile
  // and uses Missile's constructor
  function MissileNemico( bersagli, options ) {
    var xDiPartenza = rand( 0, CANVAS_WIDTH ),
        yDiPartenza = 0,
        // Randomly pick a obiettivo for this missile
        bersaglio = bersagli[ rand(0, bersagli.length - 1) ];
    
   
    this.offSpeed = options.speed;

    Missile.call( this, { xDiPartenza: xDiPartenza,  yDiPartenza: yDiPartenza, 
                          xDiArrivo: bersaglio[0], yDiArrivo: bersaglio[1],
                          colore: 'yellow', coloreScia: 'red',
                          massimoRaggioEsplosione: raggioEsplosioneMissileNemico } );


    this.framesToTarget = ( 650 - 30 * livello ) / this.offSpeed;
    if( this.framesToTarget < 20 ) {
      this.framesToTarget = 20;
    }
    this.dx = ( this.xDiArrivo - this.xDiPartenza ) / this.framesToTarget;
    this.dy = ( this.yDiArrivo - this.yDiPartenza ) / this.framesToTarget;

    this.bersaglio = bersaglio;
    // Make missiles heading to their target at random times
    this.delay = rand( 0, 50 + livello * 15 );
    this.esplosioneATerra = false;
  }

  // Make EnemyMissile inherit from Missile
  MissileNemico.prototype = Object.create( Missile.prototype );
  MissileNemico.prototype.constructor = MissileNemico;

  // Update the location and/or stato of an enemy missile.
  // The missile doesn't begin it's flight until its delay is past.
  MissileNemico.prototype.update = function() {
    if( this.delay ) {
      this.delay--;
      return;
    }
    if( this.stato === MISSILE.attivo && this.y >= this.yDiArrivo ) {
      // Missile has hit a ground target (City or Anti Missile Battery)
      this.x = this.xDiArrivo;
      this.y = this.yDiArrivo;
      this.stato = MISSILE.esplosione;
      this.esplosioneATerra = true;
    }
    if( this.stato === MISSILE.attivo ) {
      this.x += this.dx;
      this.y += this.dy;
    } else {
      this.esplodi();
    }
  };

  // When a missile that did not hit the ground is exploding, check if
  // any enemy missile is in the explosion radius; if so, cause that
  // enemy missile to begin exploding too.
  var esplodiAltriMissili = function( missile, ctx ) {
    if( !missile.esplosioneATerra ){
      $.each( missiliNemico, function( indice, altroMissile ) {
        if( ctx.isPointInPath( altroMissile.x, altroMissile.y ) &&
            altroMissile.stato === MISSILE.attivo ) {
          punteggio += 25 * getMultiplier();
          altroMissile.stato = MISSILE.esplosione;
        }
      });
    }
  };

  // Missile nemico generato dalla sdoppiamento di un MissileNemicoDoppio
  function MissileNemicoFrammento( bersaglio, xDiPartenza, yDiPartenza, options) {
    this.xDiPartenza = xDiPartenza;
  	this.yDiPartenza = yDiPartenza;
    
		// Create some variation in the speed of missiles
    this.offSpeed = options.speed;
    	// Randomly pick a obiettivo for this missile
    var framesToTarget;

    Missile.call( this, { xDiPartenza: xDiPartenza,  yDiPartenza: yDiPartenza, 
                          xDiArrivo: bersaglio[0], yDiArrivo: bersaglio[1],
                          colore: 'yellow', coloreScia: 'red',
                          massimoRaggioEsplosione: raggioEsplosioneMissileNemico } );

    framesToTarget = ( 650 - 10 * livello ) / this.offSpeed;
    if( framesToTarget < 20 ) {
      framesToTarget = 20;
    }
    this.dx = ( this.xDiArrivo - this.xDiPartenza ) / framesToTarget;
    this.dy = ( this.yDiArrivo - this.yDiPartenza ) / framesToTarget;

    // Memorizzo il bersaglio del missile per usi futuri
    this.bersaglio = bersaglio;

    // Make missiles heading to their target at random times
    this.delay = 0;
    this.esplosioneATerra = false;
  }
	
	// Make MissileNemicoDoppio inherit from MissileNemico
	MissileNemicoFrammento.prototype = Object.create( MissileNemico.prototype );
  MissileNemicoFrammento.prototype.constructor = MissileNemicoFrammento;
	
	// Missile nemico che si sdoppia ad un certo punto della discesa
	function MissileNemicoDoppio ( bersagli, missiliNemico, options) {
		MissileNemico.call( this, bersagli, options );
		
		this.delaySplit = rand(0, this.framesToTarget/2);
		this.alreadySplit = false;
		this.missiliNemico = missiliNemico;
	}
	
	// Make MissileNemicoDoppio inherit from MissileNemico
	MissileNemicoDoppio.prototype = Object.create( MissileNemico.prototype );
  MissileNemicoDoppio.prototype.constructor = MissileNemicoDoppio;
	
	// Suddivide il missile aggiungendone un altro con un obiettivo differente
	MissileNemicoDoppio.prototype.split = function () {
		var nuoviBersagli = bersagliAttaccabili();
		
    // Escludo il bersaglio del missile "padre"
    nuoviBersagli.filter( function(bersaglio) {
      return bersaglio !== this.bersaglio  
    } );

    var nuovoBersaglio;
    var nMissili = rand(1, 3);
    for(i = 0; i < nMissili; ++i) {
      nuovoBersaglio = nuoviBersagli[ rand(0, nuoviBersagli.length - 1) ];

      // Rimuovo il bersaglio dalla lista di quelli disponibili
      nuoviBersagli.filter( function(bersaglio) {
        return bersaglio !== nuovoBersaglio    
      } );

		  missiliNemico.push(
			  new MissileNemicoFrammento(nuovoBersaglio, this.x, this.y, {speed: this.offSpeed}) );
    }
    this.alreadySplit = true;
	}
	
	// Update the location and/or stato of an enemy missile.
  // The missile doesn't begin it's flight until its delay is past.
	MissileNemicoDoppio.prototype.update = function() {
    if( this.delay ) {
      this.delay--;
      return;
		}
		
		if( this.delaySplit)
			this.delaySplit--;			
		else
			if(this.alreadySplit == false)
				this.split();
		
    if( this.stato === MISSILE.attivo && this.y >= this.yDiArrivo ) {
      // Missile has hit a ground target (City or Anti Missile Battery)
      this.x = this.xDiArrivo;
      this.y = this.yDiArrivo;
      this.stato = MISSILE.esplosione;
      this.esplosioneATerra = true;
    }
		
    if( this.stato === MISSILE.attivo ) {
      this.x += this.dx;
      this.y += this.dy;
    } else {
      this.esplodi();
    }
  };	
  
  // Get targets that may be attacked in a game Level. All targets 
  // selected here may not be attacked, but no target other than those
  // selected here will be attacked in a game level. 
  // Note that at most 3 cities may be attacked in any level.
  var bersagliAttaccabili = function() {
    var bersagli = [];

    // Include all active cities
    $.each( basi, function( indice, base ) {
      if( base.attivo ) {
        bersagli.push( [base.x + 15, base.y - 10, base] );
      }
    });

    // Randomly select at most 3 cities to target
    while( bersagli.length > 3 ) {
      bersagli.splice( rand(0, bersagli.length - 1), 1 );
    }

    // Include all anti missile batteries
    $.each( batterieAntiMissile, function( indice, batteriaAntiMissile ) {
      bersagli.push( [batteriaAntiMissile.x, batteriaAntiMissile.y, batteriaAntiMissile]);
    });
    
    return bersagli;
  };

  // Operations to be performed on each game frame leading to the
  // game animation
  var prossimoFrame = function() {
    disegnaStatoDelGioco();
    aggiornaMissiliNemico();
    disegnaMissiliNemico();
    aggiornaMissiliGiocatore();
    disegnaMissiliGiocatore();
	aggiornaMirino();
	disegnaMirino();
    controllaFineLivello();
  };

  // Check for the end of a Level, and then if the game is also ended
  var controllaFineLivello = function() {
    if( !missiliNemico.length ) {
      // Stop animation
      stopLivello();
      $( '.gameContainer' ).off( 'click' );
      var missiliRimanenti = totaleMissiliRimanenti(),
          basiSalvate  = totaleBasiSalvate();

      !basiSalvate ? fineGioco( missiliRimanenti ) 
                   : fineLivello( missiliRimanenti, basiSalvate );
    }
  };

  // Handle the end of a level
  var fineLivello = function( missiliRimanenti, basiSalvate ) {
    var missiliBonus = missiliRimanenti * 5 * getMultiplier(),
        basiBonus = basiSalvate * 100 * getMultiplier();

    disegnaFineLivello( missiliRimanenti, missiliBonus, 
                  basiSalvate, basiBonus );

    // Show the new game score after 2 seconds
    setTimeout( function() {
      punteggio += missiliBonus + basiBonus;
      disegnaFineLivello( missiliRimanenti, missiliBonus, 
                    basiSalvate, basiBonus );
    }, 2000 );

    setTimeout( setupProssimoLivello, 4000 );
  };

  // Move to the next level
  var setupProssimoLivello = function() {
    livello++;
    inizializzaLivello();
    setupListeners();
  };

  // Handle the end of the game
  var fineGioco = function( missiliRimanenti ) {
    punteggio += missiliRimanenti * 5 * getMultiplier();
    popolazioneSopravvissuta += totaleBasiSalvate() * 200;
    popolazioneSopravvissuta += totaleBatterieAntiMissileSalvate() * 10;
    disegnaFineDelGioco();

    $( 'body' ).on( 'click', 'div', function() {
      location.reload();
    });
  };

  // Get missiles left in all anti missile batteries at the end of a level
  var totaleMissiliRimanenti = function() {
    var totale = 0;
    $.each( batterieAntiMissile, function(indice, batteriaAntiMissile) {
      totale += batteriaAntiMissile.missiliRimanenti;
    });
    return totale;
  };

  var totaleBatterieAntiMissileSalvate = function (){
    var totale = 0;
    $.each( batterieAntiMissile, function(indice, batteriaAntiMissile) {
      if( batteriaAntiMissile.missiliRimanenti != 0 ) {
        totale++;
      }
    });
    return totale;
  }
  
  // Get count of undestroyed cities
  var totaleBasiSalvate = function() {
    var totale = 0;
    $.each( basi, function(indice, base) {
      if( base.attivo ) {
        totale++;
      }
    });
    return totale;
  };
  
  // Update all enemy missiles and remove those that have esplodid
  var aggiornaMissiliNemico = function() {
    $.each( missiliNemico, function( indice, missile ) {
      missile.update();
    });
    missiliNemico = missiliNemico.filter( function( missile ) {
      return missile.stato !== MISSILE.esploso;
    });
  };

  // Draw all enemy missiles
  var disegnaMissiliNemico = function() {
    $.each( missiliNemico, function( indice, missile ) {
      missile.disegna();
    });
  };

  // Update all player's missiles and remove those that have esplodid
  var aggiornaMissiliGiocatore = function() {
    $.each( missiliGiocatore, function( indice, missile ) {
      missile.update();
    });
    missiliGiocatore = missiliGiocatore.filter( function( missile ) {
      return missile.stato !== MISSILE.esploso;
    });
  };

  // Draw all player's missiles
  var disegnaMissiliGiocatore = function() {
    $.each( missiliGiocatore, function( indice, missile ) {
      missile.disegna();
    });
  };
	
	var aggiornaMirino = function() {
    mirino.update();
  };

  var disegnaMirino = function() {
    mirino.disegna();
  };

  // Stop animating a game level
  var stopLivello = function() {
    clearInterval( identificatoreTimer );
  };

  // Start animating a game level
  var startLivello = function() {
    var fps = 30;
    identificatoreTimer = setInterval( prossimoFrame, 1000 / fps );
  };

  // Determine which Anti Missile Battery will be used to serve a 
  // player's request to shoot a missile. Determining factors are
  // where the missile will be fired to and which anti missile 
  // batteries have missile(s) to serve the request
  var qualeBatteriaAntiMissileUsare = function( x ) {
    var sparatoAdUnaAntiMissileEsterna = function( priority1, priority2, priority3) {
      if( batterieAntiMissile[priority1].haMissiliADisposizione() ) {
        return priority1;
      } else if ( batterieAntiMissile[priority2].haMissiliADisposizione() ) {
        return priority2;
      } else {
        return priority3;
      }
    };

    var sparatoAllaAntiMissileInMezzoENonDisponibile = function( priority1, priority2 ) {
      if( batterieAntiMissile[priority1].haMissiliADisposizione() ) {
        return priority1;
      } else {
        return priority2;
      }
    };
    if( !batterieAntiMissile[0].haMissiliADisposizione() && 
        !batterieAntiMissile[1].haMissiliADisposizione() &&
        !batterieAntiMissile[2].haMissiliADisposizione() ) {
      return -1;
    }
    if( x <= CANVAS_WIDTH / 3 ){
      return sparatoAdUnaAntiMissileEsterna( 0, 1, 2 );
    } else if( x <= (2 * CANVAS_WIDTH / 3) ) {
      if ( batterieAntiMissile[1].haMissiliADisposizione() ) {
        return 1;
      } else {
        return ( x <= CANVAS_WIDTH / 2 ) ? sparatoAllaAntiMissileInMezzoENonDisponibile( 0, 2 )
                                         : sparatoAllaAntiMissileInMezzoENonDisponibile( 2, 0 );
      }
    } else {
      return sparatoAdUnaAntiMissileEsterna( 2, 1, 0 );
    }
  };

  // Attach event Listeners to handle the player's input
  var setupListeners = function() {
    $( '.gameContainer' ).one( 'click', function() {
      startLivello();

			$( '.gameContainer' ).on( 'click', function( event ) {
        sparoDelGiocatore( mirino.x, mirino.y );
      });

      $( '.gameContainer' ).on( 'mouseover', function( event ) {
        mirino.stato = MIRINO.tracciamento;
      });

      $( '.gameContainer' ).on( 'mouseout', function( ) {
        mirino.stato = MIRINO.spento;
      });

      $( '.gameContainer' ).on( 'mousemove', function( event ) {
        mirino.inseguiX = event.pageX - this.offsetParent.offsetLeft;
        mirino.inseguiY = event.pageY - this.offsetParent.offsetTop;
        mirino.cambiaMira();
      });
    });
  };

  var caricaLivelli = function(livelloAttuale){
    modificaRaggioEsplosioneMissileNemico(livelloAttuale);
    caricaLivello1(livelloAttuale);
    caricaLivello3(livelloAttuale);
    caricaLivello4(livelloAttuale);
    caricaLivello11(livelloAttuale);
    caricaLivello15(livelloAttuale);
    caricaLivello14(livelloAttuale);
    caricaLivello16(livelloAttuale);
    caricaLivello17(livelloAttuale);
    caricaLivello19(livelloAttuale);
  };
  	
	var caricaLivello1 = function(livelloAttuale) {
		var idLivello = 1;
		if(livelloAttuale <= idLivello) {
			// Codice che l'utente deve correggere
			aggiuntaDelleBasi = function() {
       	var xIniziale = 80;
       	for (var j = 0; j < 3; j++){
					basi.push( new Base( xIniziale,  430 ) );
					xIniziale += 50;
				}
      }
		}
	}
	
	// Nota: per sorvrascrivere il costruttore è necessario salvare
	// il prototipe: "var oldProto = MissileDelGiocatore.prototype;"
	// in seguito la classe "MissileDelGiocatore = function() {}"
	// ed infine si riassegna il vecchio prototype "MissileDelGiocatore.prototype = oldProto;"
	var caricaLivello3 = function(livelloAttuale) {
    var idLivello = 3;
		// Il parametri che agisce sulla velocità è distancePerFrame
    if (livelloAttuale <= idLivello) {
			
			var oldProto = MissileDelGiocatore.prototype;
			MissileDelGiocatore = function( indiceTorretta, xDiArrivo, yDiArrivo ) {
				// Anti missile battery this missile will be fired from
				var batteriaAntiMissile = batterieAntiMissile[indiceTorretta];

				Missile.call( this, { xDiPartenza: batteriaAntiMissile.x,  yDiPartenza: batteriaAntiMissile.y,
															xDiArrivo: xDiArrivo,     yDiArrivo: yDiArrivo, 
															colore: 'green', coloreScia: 'blue' } );

				var distanzaX = this.xDiArrivo - this.xDiPartenza,
						distanzaY = this.yDiArrivo - this.yDiPartenza;
				// Determine a value to be used to scale the orthogonal directions 
				// of travel so the missiles travel at a constant speed and in the
				// right direction 
				var scala = (function() {
					var distanza = Math.sqrt( Math.pow(distanzaX, 2) + 
																		Math.pow(distanzaY, 2) ),
              velocitaMissile;
          //start user
          // Make missile fired from central anti missile battery faster
          if (indiceTorretta === INDICE_TORRETTA_CENTRALE){
            velocitaMissile = 2;   //<= velocità torretta centrale
          } else {
            velocitaMissile = 1;   //<= velocità torrette esterne
          }
          //end user
					return distanza / velocitaMissile;
				})();

				this.dx = distanzaX / scala;
				this.dy = distanzaY / scala;
				batteriaAntiMissile.missiliRimanenti--;
			};
			MissileDelGiocatore.prototype = oldProto;
		}
  };
  
	var caricaLivello4 = function(livelloAttuale){
    var idLivello = 4;
    if (livelloAttuale <= idLivello) {
      MissileDelGiocatore.prototype.esplodi = function() {
        if( this.stato === MISSILE.esplosione ) {
          this.raggioDiEsplosione++;
        }
        // Modificare il seguente valore per indicare quando interrompere l'esplosione ed iniziare l'implosione
        this.stato = MISSILE.implosione;
        /*
        if( this.raggioDiEsplosione > 5 ) {
          this.stato = MISSILE.implosione;
        }
        */
        if( this.stato === MISSILE.implosione ) {
          this.raggioDiEsplosione--;
          if( this.esplosioneATerra ) {
            // Spiegare che questo è un if contratto
            ( this.bersaglio[2] instanceof Base ) ? this.bersaglio[2].attivo = false
                                            : this.bersaglio[2].missiliRimanenti = 0;
          }
        }
        if( this.raggioDiEsplosione < 0 ) {
          this.stato = MISSILE.esploso;
        }
      };
    }
  }
  
  var caricaLivello11 = function(livelloAttuale) {
    var idLivello = 11;
    if (livelloAttuale <= idLivello) {
      velMassimaMissiliNemici = 2;
    }
  }
  
  var caricaLivello14 = function(livelloAttuale) {
    var idLivello = 14;
    if (livelloAttuale <= idLivello) {
      // codice che modifica il sistema di puntamento dei missili del giocatore
      sparoDelGiocatore = function( x, y ) {
        var modificatoreX = 30;
        var modificatoreY = 30;
        var limiteInferioreY = 370; // default 370
        var limiteSuperioreY = 250; // default 50
        if (y - modificatoreY < limiteSuperioreY) {
          y = limiteSuperioreY;
        }
        if (y + modificatoreY > limiteInferioreY) {
          y = limiteInferioreY;
        }
        var indiceTorretta = qualeBatteriaAntiMissileUsare( x );
        if( indiceTorretta === -1 ){ // No missiles left
          return;
        }
        missiliGiocatore.push( new MissileDelGiocatore( indiceTorretta, x + modificatoreX, y - modificatoreY ) );
      };
    }
  }
  
  var caricaLivello15 = function(livelloAttuale) {
    var idLivello = 15;
    if (livelloAttuale <= idLivello) {
      sparoDelGiocatore = function( x, y ) {
        var modificatoreX = 30;
        var modificatoreY = 30;
        var limiteInferioreY = 370; // default 370
        var limiteSuperioreY = 250; // default 50
        if (y < limiteSuperioreY) {
          y = limiteSuperioreY;
        }
        if (y > limiteInferioreY) {
          y = limiteInferioreY;
        }
        var indiceTorretta = qualeBatteriaAntiMissileUsare( x );
        if( indiceTorretta === -1 ){ // No missiles left
          return;
        }
        missiliGiocatore.push( new MissileDelGiocatore( indiceTorretta, x, y ) );
      };
    }
  }
  
  /*
    Livello molto interessante, dato che a livello di codice è molto semplice, basta effettuare il copia incolla della riga
    batterieAntiMissile.push( new BatteriaAntiMissile( 255, 410 ) ); modificando i valori delle x e delle y.
    Ma ho pensato che questo livello sarà molto utile per spiegare all'utente come chiedere aiuto a Cariatide in modo 
    da scoprire dove è stato predisposto lo spazio per le tre batterie anti missile.
  */
  var caricaLivello16 = function(livelloAttuale) {
    var idLivello = 16;
    if (livelloAttuale <= idLivello) {
      caricamentoDeiMissiliNelleBatterieAntiMissile = function (){
        batterieAntiMissile[0].missiliRimanenti = 10;
        batterieAntiMissile[2].missiliRimanenti = 0;
        batterieAntiMissile[1].missiliRimanenti = 0;
      }
      
      aggiuntaDelleBatterieAntiMissile = function(){
        batterieAntiMissile.push( new BatteriaAntiMissile( 255, 410 ) );
        
        /* 
          Nasconderei il codice seguente all'utente. 
          E' stato necessario farlo in questo modo, cioè aggiungendo comunque le batterie anti missile ma settando la
          quantità di missili a 0 perché altrimenti sorgevano tanti bug e per risolverli era necessario modificare in modo
          sostanzioso il codice e bisognava anche modificare altri livelli creati.
        */
        batterieAntiMissile.push( new BatteriaAntiMissile( 35,  410 ) );
        batterieAntiMissile.push( new BatteriaAntiMissile( 475, 410 ) );
        caricamentoDeiMissiliNelleBatterieAntiMissile();
        // Fine codice da nascondere.
      }
    }
  }
  
  /*
    Fino a questo livello saranno offuscate solo le torrette e quindi il nemico sapendo dove sono le basi attaccherà
    solo quelle dato che distruggendo quelle vince. L'utente aggiungendo le basi ai bersagli offuscati riesce a nascondere
    la posizione delle basi e in questo modo il nemico non riesce più a distinguere basi da torrette.
  */
  var caricaLivello17 = function (livelloAttuale) {
    var idLivello = 17;
    if (livelloAttuale <= idLivello) {
      bersagliAttaccabili = function() {
        var bersagliOffuscati = [];
        
        /* Codice che dovrà inserire l'utente
        $.each( basi, function( indice, base ) {
          if( base.attivo ) {
            bersagliOffuscati.push( [base.x + 15, base.y - 10, base] );
          }
        });
        */
        $.each( batterieAntiMissile, function( indice, batteriaAntiMissile ) {
          bersagliOffuscati.push( [batteriaAntiMissile.x, batteriaAntiMissile.y, batteriaAntiMissile]);
        });
        
        return calcoloBersagliIdentificabili(bersagliOffuscati);
      };
    }
  }
  
  var calcoloBersagliIdentificabili = function (bersagliOffuscati) {
    var bersagliPossibili = [];

    // Include all active cities
    $.each( basi, function( indice, base ) {
      if( base.attivo ) {
        bersagliPossibili.push( [base.x + 15, base.y - 10, base] );
      }
    });

    // Randomly select at most 3 cities to target
    while( bersagliPossibili.length > 3 ) {
      bersagliPossibili.splice( rand(0, bersagliPossibili.length - 1), 1 );
    }

    // Include all anti missile batteries
    $.each( batterieAntiMissile, function( indice, batteriaAntiMissile ) {
      bersagliPossibili.push( [batteriaAntiMissile.x, batteriaAntiMissile.y, batteriaAntiMissile]);
    });
    
    return calcoloBersagliConfrontandoArray(bersagliPossibili, bersagliOffuscati);
  }
  
  var calcoloBersagliConfrontandoArray = function (bersagliPossibili, bersagliOffuscati){
    var bersagliDaAttaccare = [];
    var trovato;
    for (var i = 0; i < bersagliPossibili.length; i++) {
      trovato = false;
      for (var j = 0; j < bersagliOffuscati.length; j++) {
        if (bersagliPossibili[i].equals(bersagliOffuscati[j]))
          trovato = true;
      }
      if(!trovato)
        bersagliDaAttaccare.push(bersagliPossibili[i]);
    }
    return (bersagliDaAttaccare.length > 0) ? bersagliDaAttaccare : bersagliPossibili;
  }
  
  // aggiungo metodo equals per confrontare due array
  Array.prototype.equals = function (array) {
    if (!array)
      return false;
 
    if (this.length != array.length)
      return false;

    for (var i = 0, l=this.length; i < l; i++) {
      // Check array ricorsivi
      if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i]))
              return false;       
      }           
      else if (this[i] != array[i]) { 
          return false;   
      }           
    }       
    return true;
  }
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, "equals", {enumerable: false});

  // Modifica del raggio di esplosione del missile nemico NB: NO LIVELLO
  var modificaRaggioEsplosioneMissileNemico = function(livelloAttuale) {
    idLivello = 13;
    if (livelloAttuale <= idLivello) {
      raggioEsplosioneMissileNemico = 30;
    }
  }  
  
  var caricaLivello19 = function(livelloAttuale) {
    var idLivello = 19;
		// Il parametri che agisce sulla velocità è distancePerFrame
    if (livelloAttuale >= idLivello) {
      Base.prototype.disegna = function(conScudo) {
        var x = this.x,
            y = this.y;
        
        if(conScudo){
          var my_gradient = ctx.createLinearGradient(this.x + 15, this.y, 1, this.x + 15, this.y, 3);
          my_gradient.addColorStop(0,"#FFF7CA");
          my_gradient.addColorStop(1,"white");
          ctx.fillStyle = my_gradient;
          ctx.beginPath();
          ctx.arc( this.x + 15, this.y, 24, Math.PI, 0 );
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.fillStyle = "#42EFFF";
        ctx.beginPath();
        ctx.moveTo( x, y );
        ctx.lineTo( x, y - 10 );
        ctx.lineTo( x + 10, y - 10 );
        ctx.lineTo( x + 15, y - 15 );
        ctx.lineTo( x + 20, y - 10 );
        ctx.lineTo( x + 30, y - 10 );
        ctx.lineTo( x + 30, y );
        ctx.closePath();
        ctx.fill();
      };
      
      var oldProto = Base.prototype;
      Base = function(x, y) {
        this.x = x;
        this.y = y;
        this.attivo = true;
        this.scudo = true;
      }
      Base.prototype = oldProto;
      
      // Draw all attivo cities
      disegnaBasi = function() {
        $.each( basi, function( indice, base ) {
          if( base.attivo ) {
            base.disegna(base.scudo);
          }
        });
      };
      
      Missile.prototype.esplodi = function() {
        if( this.stato === MISSILE.esplosione )
          this.raggioDiEsplosione++;        
        if( this.raggioDiEsplosione > 30 )
          this.stato = MISSILE.implosione;        
        if( this.stato === MISSILE.implosione ) {
          this.raggioDiEsplosione--;
          if( this.esplosioneATerra ) {
            if ( this.bersaglio[2] instanceof Base ) {
              if (this.bersaglio[2].scudo == true){
                this.raggioDiEsplosione = 0;
                this.stato = MISSILE.esploso;
                this.bersaglio[2].scudo = false;
              } else {
                if (this.bersaglio[2].attivo == true){
                  this.bersaglio[2].attivo = false;
                  popolazioneMorta += NUMERO_INTEGRANTI_DI_UNA_BASE; 
                }
              }
            } else {
              if (this.bersaglio[2].missiliRimanenti != 0){
                this.bersaglio[2].missiliRimanenti = 0;
                popolazioneMorta += NUMERO_INTEGRANTI_ANTI_MISSILE;  
              }
            }
          }
        }
        if( this.raggioDiEsplosione < 0 )
          this.stato = MISSILE.esploso;        
      };
    }
    
  }
  
  return {
    iniziaGioco: iniziaGioco,
    setupListeners: setupListeners,
    caricaLivelli: caricaLivelli
  };

})();

$( document ).ready( function() {
  var idLivelloAttuale = 1000;
  missileCommand.caricaLivelli(idLivelloAttuale);
  missileCommand.iniziaGioco();
  missileCommand.setupListeners();
});
