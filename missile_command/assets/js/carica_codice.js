function CaricaCodice ( obiettivi ) {
  this.obiettivi = obiettivi;
};

CaricaCodice.prototype.aggiornaCodiceUtente = function () {
  $.each( this.obiettivi, function ( indice, obiettivo ) {
    //obiettivo.codiceUtente = "function A () { console.log("'Ciao'")}";  
  } );
};

CaricaCodice.prototype.validazioneSintattica = function () {
  var mySelf = this;
  var messaggiErrore = "Errori di sintassi:\n";
  $.each( this.obiettivi, function ( indice, obiettivo ) {
    var errore = mySelf.trovaErroriSintassi( obiettivo.codiceUtente );
    messaggiErrore += "Nel file " + obiettivo.nomeFile + 
      ": '" + errore.messaggio + "'.\n";
  } );
  return messaggiErrore;
};

CaricaCodice.prototype.valutazioneCodiceUtente = function () {
  
};

CaricaCodice.prototype.trovaErroriSintassi = function ( codice ) {
  try {
    eval(codice);
  } catch (e) {
    msgErrore = e.message
  }
  
  var righe = codice.split('\n');
  for (var i = 1; i <= righe.length; i++) {
    var codiceDaTestare = righe.slice(0, i).join('\n');

    try {
      eval(codiceDaTestare);
    } catch (e) {
      if (e.message === msgErrore) {
        return ({ riga: i, messaggio: msgErrore });
        
      }
    }
  }
  return null;
};

CaricaCodice.prototype.esecuzioneTest = function () {
  
};