function CaricaCodice ( fileVirtuali ) {
  this.fileVirtuali = fileVirtuali;
};

CaricaCodice.PAROLE_VIETATE = [
    'eval', '.call', 'call(', 'apply', 'bind',
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
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    //fileVirtuale.codiceUtente = "function A () { console.log("'Ciao'")}";  
  } );
};

CaricaCodice.prototype.validazioneCodiceUtente = function () {
  var mySelf = this;
  var contatoreErrori = 0;
  
  var messaggiErrore = "Parole vietate:\n";
  $.each( this.fileVirtuali, function (indice, fileVirtuale) {
    var erroreParole = mySelf.controlloParoleVietate( fileVirtuale.codiceUtente );
    for ( var i = 0; i < erroreParole.length; i++ ) {
      messaggiErrore += "Nel file " + fileVirtuale.nomeFile + ", riga " + erroreParole[i].riga + ", non puoi utilizzare la parola: '" + erroreParole[i].parola + "'\n";
      contatoreErrori++;
    }
  } );
  
  messaggiErrore += "Errori di sintassi:\n";
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    var erroreSintassi = mySelf.trovaErroriSintassi( fileVirtuale.codiceUtente );
    if(erroreSintassi !== null) {
      messaggiErrore += "Nel file " + fileVirtuale.nomeFile + 
        ": '" + erroreSintassi.messaggio + "'.\n";
      contatoreErrori++;
    }
  } );
  
  return {contatoreErrori: contatoreErrori, messaggiErrore: messaggiErrore};
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
  var msgErrore;
  
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
  var mySelf = this;
  var esiti = [];
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    window.eval( fileVirtuale.codiceUtente );
  } );
         
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    var risultato = window.eval( fileVirtuale.test );
    esiti.push( { nomeFile: fileVirtuale.nomeFile, esito: risultato } );
  } );
  return esiti;
};
