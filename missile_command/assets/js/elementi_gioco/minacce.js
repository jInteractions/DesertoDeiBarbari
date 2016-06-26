function AstronaveNemica ( ctx ) {
  var ctxW = 510;
  var ctxH = 460;
  this.lunghezza = 299;
  this.altezza = 54;
  
  this.x = ctxW/2 - this.lunghezza/2;
  this.y = 10;
  
  this.stato = AstronaveNemica.ATTIVO;
  
  this.raggioDiEsplosione = 0;
  this.raggioDiEsplosioneMinore = 0;
  
  this.dx = [];
  this.dy = [];
  
  for(var i = 0; i < 10; ++i) {
    this.dx[i] = (0.5 - Math.random()) * (this.lunghezza - 1);
    this.dy[i] = (0.5 - Math.random()) * (this.altezza - 1);
  }
  
  this.animazioneColore = 0;
  this.ctx = ctx;
}

AstronaveNemica.ATTIVO = 1;
AstronaveNemica.ESPLOSIONE = 2;
AstronaveNemica.IMPLOSIONE = 3;
AstronaveNemica.ESPLOSO = 4;

AstronaveNemica.prototype.disegna = function () {
  if( this.stato === AstronaveNemica.ATTIVO || this.stato === AstronaveNemica.ESPLOSIONE) {    
    this.ctx.fillStyle = "#00FF00";
    this.ctx.beginPath();
    this.ctx.rect( this.x, this.y,
                   this.lunghezza, this.altezza );
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  if ( this.stato === AstronaveNemica.ESPLOSIONE 
      || this.stato === AstronaveNemica.IMPLOSIONE ) {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc( this.x, this.y, this.raggioDiEsplosione, 0, 2 * Math.PI );
    this.ctx.closePath();
    this.ctx.fill();
    
    for(var i = 0; i < 10; ++i) {
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc( this.x + this.dx[i], this.y + this.dy[i], this.raggioDiEsplosioneMinore, 0, 2 * Math.PI );
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  
//  var immagine = new Image(); //document.getElementById( "img_prova" );
//  immagine.src = "file:///Users/francesco/DesertoDeiBarbari/missile_command/index.html";
//  immagine.onload = function () {
//    this.ctx.drawImage( immagine, 0, 0);
//                       //this.ctx.width / 2 - immagine.width / 2, 100 );
//  }
}

AstronaveNemica.prototype.update = function () {
  if ( this.stato === AstronaveNemica.ESPLOSIONE || 
      this.stato === AstronaveNemica.IMPLOSIONE ) {
    this.esplodi();
  }
}

AstronaveNemica.prototype.esplodi = function () {
  if( this.stato === AstronaveNemica.ESPLOSIONE ) {
    this.raggioDiEsplosione+=2;
    this.raggioDiEsplosioneMinore++;
  }
  if( this.raggioDiEsplosione > 100 ) {
    this.stato = AstronaveNemica.IMPLOSIONE;
  }  
  if( this.stato === AstronaveNemica.IMPLOSIONE ) {
    this.raggioDiEsplosione-=2;
    this.raggioDiEsplosioneMinore--;
  }
  if( this.raggioDiEsplosione < 0 ) {
    this.stato = AstronaveNemica.ESPLOSO;
  }
}

AstronaveNemica.prototype.distruggiti = function () {
  
}