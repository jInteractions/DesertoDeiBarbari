function CaricaCodice ( fileVirtuali ) {
  this.fileVirtuali = fileVirtuali;
};

CaricaCodice.PAROLE_VIETATE = [
    'eval', '.call', 'call(', 'apply',
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
CaricaCodice.ATTESA_MASSIMA = 1000;
CaricaCodice.NUMERO_RIPETIZIONI_TEST = 10;

CaricaCodice.prototype.aggiornaCodiceUtente = function () {
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
      fileVirtuale.codice = editorCodice[indice].getValue();
  } );
};

CaricaCodice.prototype.validazioneCodiceUtente = function () {
  var mySelf = this;
  var errori = { erroriSintassi: [], erroriParole: [], erroriCiclo: [] };
  
  $.each( this.fileVirtuali, function ( indice, file ) {
    var e = mySelf.verificaCicliInfiniti( file );
    errori.erroriCiclo = errori.erroriCiclo.concat( e );
  } );
    
  $.each( this.fileVirtuali, function ( indice, file) {
    var e = mySelf.trovaErroriSintassi( file );
    errori.erroriSintassi = errori.erroriSintassi.concat( e );
  } );
         
  $.each( this.fileVirtuali, function ( indice, file ) {
    var e = mySelf.controlloParoleVietate( file );
    errori.erroriParole = errori.erroriParole.concat( e );
  } );
  
  return errori;
}

// obsoleta
CaricaCodice.prototype.validazioneCodiceUtenteOld = function () {
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

CaricaCodice.prototype.controlloParoleVietate = function ( file ) {
  var codice = file.codice;
  var erroriParoleVietate = [];
  
  var righe = codice.split( '\n' );
  for ( var riga = 1; riga <= righe.length; riga++ ) {
    var codiceDaTestare = righe.slice( riga - 1, riga ).join( '\n' );
    for ( var i = 0; i < CaricaCodice.PAROLE_VIETATE.length; i++ ) {
      var parolaVietata = CaricaCodice.PAROLE_VIETATE[i];
      if ( codiceDaTestare.indexOf( parolaVietata ) > -1 ) {
        erroriParoleVietate.push( { file: file.nomeFile, riga: riga, testo: parolaVietata } );
      }
    }
  }
  return erroriParoleVietate;
};

CaricaCodice.prototype.trovaErroriSintassi = function ( file ) {
  var codice = file.codice;
  var msgErrore;
  
  try {
    eval(codice);
  } catch (e) {
    msgErrore = e.message
  }
  
  var errori = [];
  
  var righe = codice.split( '\n' );
  for (var i = 1; i <= righe.length; i++) {
    var codiceDaTestare = righe.slice( 0, i ).join( '\n' );
    try {
      eval( codiceDaTestare );
    } catch ( e ) {
      if( e.message == msgErrore ) {
        errori.push( { file: file.nomeFile, riga: i, testo: e.message } );
        break;
      }
    }
  }

  return errori;
};

CaricaCodice.prototype.verificaCicliInfiniti = function ( file ) {
  var codice = file.codice;
  var test = file.test;
  var errori = [];
  
  codice = codice.replace( /\)\s*{/g, ") {" );
  codice = codice.replace( /\n\s*while\s*\((.*)\)/g, "\nfor (dummy=0;$1;)" );
  codice = $.map( codice.split( '\n' ), function ( riga, i ) {
    return riga.replace( /for\s*\((.*);(.*);(.*)\)\s*{/g,
      "for ($1, startTime = Date.now();$2;$3){" +
      "if (Date.now() - startTime > " + CaricaCodice.ATTESA_MASSIMA + ") {" +
      "throw ({ riga: " + ( i + 1 ) + ", testo: \"msgCicloInfinito\" });}" );
  } ).join('\n');
    
  try {
    eval( codice );
    eval( test );
  } catch ( e ) {
    if ( e.testo === "msgCicloInfinito" ) {
      errori.push( { file: file.nomeFile, riga: e.riga, testo: e.testo } );
    }
  }
  
  return errori;
  
};

CaricaCodice.prototype.esecuzioneTest = function () {
  var mySelf = this;
  var esiti = [];
  var errori = [];
  
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    window.eval( fileVirtuale.codice );
  } );
        
  console.output = false;
  $.each( this.fileVirtuali, function ( indice, fileVirtuale ) {
    if( fileVirtuale.consultazione === false ) {
      risultato = true;
      for( var j = 0; j < CaricaCodice.NUMERO_RIPETIZIONI_TEST; ++j ) {
        try {
          risultato = window.eval( fileVirtuale.test ) && risultato;
          
        } catch( e ) {
          var erroreSingoloTest = { file: fileVirtuale.nomeFile, testo: e.message };
          presente = false;
          $.each( errori, function( i, err ) { 
            presente = presente || ( err.testo === erroreSingoloTest.testo )
          } );
          if( ! presente )
            errori.push( erroreSingoloTest );
          risultato = false;
        }
      }
      
      esiti.push( { nomeFile: fileVirtuale.nomeFile, esito: risultato, errori: errori } );
    }
  } );
  console.output = true;
      
  return esiti;
};
