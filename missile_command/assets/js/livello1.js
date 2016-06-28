function Livello1 ( callbackFineLivello ) {  
  CoreLevel.call( this, callbackFineLivello );
}

Livello1.prototype = Object.create( CoreLevel.prototype );
Livello1.prototype.constructor = Livello1();

Livello1.prototype.inizializzaTorrette = function () {
  var coloreMissili = [ 'blue', 'blue', 'blue', 'blue', 'blue'];
  var nMissili;
  var nSoldati;
  var Tmin;
  var Tmax;
  var deltaTempo;
  var deltaRaffreddamento;
  var tempoRicarica;
  
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile (35, 410, nMissili, nSoldati, coloreMissili, Tmax, Tmin, deltaTempo, deltaRaffreddamento, tempoRicarica)
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile (255, 410, nMissili, nSoldati, coloreMissili, Tmax, Tmin, deltaTempo, deltaRaffreddamento, tempoRicarica)
  );
  this.coreGame.aggiungiBatteriaAntimissile(
    new BatteriaAntimissile (475, 410, nMissili, nSoldati, coloreMissili, Tmax, Tmin, deltaTempo, deltaRaffreddamento, tempoRicarica)
  );
}