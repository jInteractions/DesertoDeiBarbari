/** Elimina le stringhe ###START_MODIFICABILE e ###END_MODIFICABILE
    e  ritorna anche l'array con i delimitatori */
var determinaPartiModificabili = function ( codice ) {
  var lineeCodice = codice.split("\n");

  var delimitatori = [];
  var contatore = 0;
  for( var i = 0; i < lineeCodice.length; ++i) {
    var lineaCorrente = lineeCodice[i];

    if (lineaCorrente.indexOf("\/\/###START_MODIFICABILE") === 0) {
      lineeCodice.splice(i, 1);
      i--;
      delimitatori[contatore] = {inizio: null, fine: null}
      delimitatori[contatore].inizio = i + 1;     
    } else if (lineaCorrente.indexOf("\/\/###END_MODIFICABILE") === 0) {
      lineeCodice.splice(i, 1);
      i--;
      delimitatori[contatore].fine = i + 1; 
      contatore++;
    }
  }
  return { nuovoCodice: lineeCodice.join("\n"), delimitatori: delimitatori };
};
    
/** Sovrascrive il codice nell'istanza di codemirro passata con quello
    passato come parametro */
var inserisciCodiceEditor = function ( editor, codice ) {
  var risultato = determinaPartiModificabili(codice);
  var nuovoCodice = risultato.nuovoCodice;
  var delimitatori = risultato.delimitatori;

  $.each( editor.getAllMarks(), function ( i, m ) { m.clear(); } );
  editor.setValue(nuovoCodice);

  var lineaFinale = editor.lineCount();
  var inizio = 0;
  for(var i = 0; i < delimitatori.length; ++i) {
    var fine = delimitatori[i].inizio;
    editor.markText( { line: inizio, ch: 0 },
                     { line: fine, ch: 0 }, 
                     { readOnly: true, className: "disabled" } );
    var inizio = delimitatori[i].fine;
  }
  editor.markText( {line: inizio, ch:0},
                   {line: lineaFinale, ch:0}, 
                   {readOnly: true, className: "disabled"} );

  editor.clearHistory();
  
  editor.refresh();



};

/** Estrae il codice dall'editor, reinserisce i marcatori 
    ###START_MODIFICABILE e ###END_MODIFICABILE nelle posizioni
    adeguate ed infine ritorna il nuovo codice */
var salvaCodiceEditor = function ( editor ) {
  var delimitatori = editor.getAllMarks();
  var codice = editor.getValue();
  var lineeCodice = codice.split("\n");

  var inizio = 0;
  var fine = 0;
  var offset = 0;
  for(var i = 0; i < delimitatori.length; ++i) {
    var delimitatore = delimitatori[i].find();
    fine = delimitatore.from.line;

    lineeCodice.splice(fine + offset, 0, "\/\/###END_MODIFICABILE"); offset++;
    lineeCodice.splice(inizio - 1 + offset, 0, "\/\/###START_MODIFICABILE"); offset++;  

    inizio = delimitatore.to.line;
  }

  return lineeCodice.join("\n");
};