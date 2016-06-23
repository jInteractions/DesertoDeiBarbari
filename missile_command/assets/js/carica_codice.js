function CaricaCodice ( obiettivi ) {
  this.obiettivi = obiettivi;
};
CaricaCodice.PAROLE_VIETATE = [
    'eval', '.call', 'call(', 'apply', 'bind',
    'prototype',
    'setTimeout', 'setInterval',
    'requestAnimationFrame', 'mozRequestAnimationFrame',
    'webkitRequestAnimationFrame', 'setImmediate',
    'prompt', 'confirm',
    'debugger',
    'delete',
    'atob(','btoa(',
    'Function(',
    'constructor',
    'window',
    'document',
    'self.', 'self[', 'top.', 'top[', 'frames',
    'parent', 'content',
    'validate', 'onExit', 'objective',
    'this['
];

CaricaCodice.prototype.aggiornaCodiceUtente = function () {
  $.each( this.obiettivi, function ( indice, obiettivo ) {
    //obiettivo.codiceUtente = "function A () { console.log("'Ciao'")}";  
  } );
};

CaricaCodice.prototype.validazioneSintattica = function () {
  
};

CaricaCodice.prototype.validazioneCodiceUtente = function () {
  var mySelf = this;
  var messaggiErrore = "Parole vietate:\n";
  $.each( this.obiettivi, function (indice, obiettivo) {
    var errore = mySelf.controlloParoleVietate( obiettivo.codiceUtente );
    for ( var i = 0; i < errore.length; i++ ) {
      messaggiErrore += "Nel file " + obiettivo.nomeFile + ", riga " + errore[i].riga + ", non puoi utilizzare la parola: '" + errore[i].parola + "'\n";
    }
  } );
  messaggiErrore += "Errori di sintassi:\n";
  $.each( this.obiettivi, function ( indice, obiettivo ) {
    var errore = mySelf.trovaErroriSintassi( obiettivo.codiceUtente );
    messaggiErrore += "Nel file " + obiettivo.nomeFile + 
      ": '" + errore.messaggio + "'.\n";
  } );
  return messaggiErrore;
};

CaricaCodice.prototype.controlloParoleVietate = function ( codice ) {
  var erroriParoleVietate = [];
  var righe = codice.split( '\n' );
  for ( var riga = 1; riga <= righe.length; riga++ ) {
    var codiceDaTestare = righe.slice( 0, riga ).join( '\n' );
    for ( var i = 0; i < CaricaCodice.PAROLE_VIETATE.length; i++ ) {
      var parolaVietata = CaricaCodice.PAROLE_VIETATE[i];
      if ( codiceDaTestare.indexOf( parolaVietata ) > -1 ) {
        erroriParoleVietate.push( { parola: parolaVietata, riga: riga } );
      }
    }
  }
  return erroriParoleVietate;
};

CaricaCodice.prototype.trovaErroriSintassi = function ( codice ) {
  try {
    eval(codice);
  } catch (e) {
    msgErrore = e.message
  }
  
  var righe = codice.split( '\n' );
  for (var i = 1; i <= righe.length; i++) {
    var codiceDaTestare = righe.slice( 0, i ).join( '\n' );
    try {
      eval( codiceDaTestare );
    } catch ( e ) {
      if ( e.message === msgErrore ) {
        return ( { riga: i, messaggio: msgErrore } );
      }
    }
  }
  return null;
};

CaricaCodice.prototype.esecuzioneTest = function () {
  
};
