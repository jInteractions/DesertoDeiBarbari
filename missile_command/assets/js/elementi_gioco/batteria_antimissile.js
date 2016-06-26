function BatteriaAntimissile ( x, y, nMissili, nSoldati, colori, 
                               Tmin, Tmax, deltaTempo, deltaRaffreddamento ) {
  // Attributi Posizione
  this.x = x;
  this.y = y;
  
  // Attributi stato
  this.stato = BatteriaAntimissile.ATTIVA;
  this.numeroMissili = nMissili;
  this.numeroSoldati = nSoldati;
  this.tipoMunizioni = colori;
  
  // Attributi temperatura
  this.temperatura = Tmin;
  this.temperaturaMassima = Tmax;
  this.temperaturaMinima = Tmin;
  this.deltaTempo = deltaTempo;
  this.deltaRaffreddamento = deltaRaffreddamento;
  
  // Attributi Animazione
  this.animazioneColore = 0;
  this.raggioDiEsplosione = 0;
  
  // Set timer raffreddamento
  this.timerRaffreddamento = 
    setInterval( this.raffreddati.bind( this ), this.deltaTempo );
};

// Costanti
BatteriaAntimissile.ATTIVA = 1;
BatteriaAntimissile.ESPLOSIONE = 2;
BatteriaAntimissile.IMPLOSIONE = 3;
BatteriaAntimissile.DISTRUTTA = 4;
BatteriaAntimissile.COLORI = ['red', 'yellow', 'white', 'blue', 'purple'];

BatteriaAntimissile.prototype.update = function ( ) {
  if(this.stato === BatteriaAntimissile.DISTRUTTA) {
    return;
  }
  if(this.stato === BatteriaAntimissile.ESPLOSIONE || 
     this.stato === BatteriaAntimissile.IMPLOSIONE) {
    this.esplodi();
    return;
  } 
  if(this.temperatura >= this.temperaturaMassima) {
      this.distruggiti();
      return;
  }
};

BatteriaAntimissile.prototype.raffreddati = function ( ) {
  this.temperatura -= this.deltaRaffreddamento;
  if(this.temperatura <= this.temperaturaMinima)
    this.temperatura = this.temperaturaMinima;
}

BatteriaAntimissile.prototype.controllaMissiliRimanenti = function () {
  return this.numeroMissili === 0;
};

BatteriaAntimissile.prototype.esplodi = function () {
  if( this.stato === BatteriaAntimissile.ESPLOSIONE ) {
    ++this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione > 30 ) {
    this.stato = BatteriaAntimissile.IMPLOSIONE;
  }  
  if( this.stato === BatteriaAntimissile.IMPLOSIONE ) {
    --this.raggioDiEsplosione;
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = BatteriaAntimissile.DISTRUTTA;
  }
};

BatteriaAntimissile.prototype.distruggiti = function ( ) {
  clearInterval(this.timerRaffreddamento);
  this.stato = BatteriaAntimissile.ESPLOSIONE;
}

BatteriaAntimissile.prototype.disegna = function ( ctx ) {
  this.animazioneColore = (this.animazioneColore + 1) % Missile.COLORI.length;
  if( this.stato === BatteriaAntimissile.ATTIVA ) {
    var x, y;
    
    // Disegna munizioni
    var delta = [ [0, 0], [-6, 6], [6, 6], [-12, 12], [0, 12],
      [12, 12], [-18, 18], [-6, 18], [6, 18], [18, 18] ];
    for( var i = 0, len = this.numeroMissili; i < len; i++ ) {
      x = this.x + delta[i][0];
      y = this.y + delta[i][1];

      ctx.strokeStyle = this.tipoMunizioni[i];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo( x, y );
      ctx.lineTo( x, y + 8 );
      ctx.moveTo( x - 2, y + 10 );
      ctx.lineTo( x - 2, y + 6 );
      ctx.moveTo( x + 2, y + 10 );
      ctx.lineTo( x + 2, y + 6 );
      ctx.closePath();
      ctx.stroke();
    }

    var txt = this.temperatura + " C°";    
    // Scrivi temperatura
    var coloreTesto = 'blue';
    if(this.temperatura <= 200)
      coloreTesto = 'blue';
    else 
      coloreTesto = 'red';
    
    /*
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.rect(this.x - dx/2 - 3, this.y + 10 + 3, this.x - dx/2 - 3 + dx, this.y + 10 + 3 + dy);
    ctx.stroke();
    ctx.fill();
    */
    
    ctx.fillStyle = coloreTesto;
    ctx.font = 'bold 12px arial';
    var dx = ctx.measureText(txt).width;
    var dy = ctx.measureText(txt).height;
    ctx.fillText( txt, this.x - dx/2, this.y + 45 );
  }
    
  // Anima esplosione
  if( this.stato === BatteriaAntimissile.ESPLOSIONE || 
      this.stato === BatteriaAntimissile.IMPLOSIONE ) {
    ctx.fillStyle = BatteriaAntimissile.COLORI[this.animazioneColore];
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
    ctx.closePath();
    ctx.fill();
  }
};