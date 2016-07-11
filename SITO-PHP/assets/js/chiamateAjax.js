var host="http://localhost:8888/";

var getHelp = function (livello, file, testoAiutoStr, email, nomeBottoneAiuto){
    $.ajax({
        type: "GET",
        url: host + "php/getAiuti.php",
        data: "idlivello=" + livello + "&" + "nomefile=" + file + "&" + "email=" + email,
        dataType: "text",
        success: function (result) {
            var aiuto = result.replace("<h1>Connection established</h1>", "");
            $(testoAiutoStr).html(aiuto);           
        },
        error: function (errore) {
            oldConsole.log(errore);
        }
    });

};

var resetCodiceUtente = function (livello, nomefile, editorCodice){
    $.ajax({
        type: "GET",
        url: host + "php/getCodiceOriginale.php",
        data: "idlivello=" + livello + "&" + "nomefile=" + nomefile,
        dataType: "text",
        success: function (result) {
          var codice = result.replace("<h1>Connection established</h1>", "");
          oldConsole.log(livello);
          oldConsole.log(nomefile);
          //editorCodice.setValue(codice);
          inserisciCodiceEditor(editorCodice, codice);
          oldConsole.log(codice);
        },
        error: function (error) {
            oldConsole.log(error);
        }
    });
};

var updateCodiceUtente = function (livello, email, richiestoAiuto, nomeFile, codiceUtente){
  
  var strutturaJson = { "fileVirtuali": [] };
  $.each( nomeFile, function( i, nome ) {
    strutturaJson.fileVirtuali.push( {
      nomeFile: nomeFile[i],
      codice: codiceUtente[i],
      aiutoUtilizzato: richiestoAiuto[i]
    } );
  } );
  
  var myJSONString = encodeURIComponent(JSON.stringify(strutturaJson));
  //oldConsole.log( myJSONString );
  
  //oldConsole.log(host + "php/setCodiceUtente.php" );
  $.ajax({
        type: "POST",
        url: host + "php/setCodiceUtente.php",
        data: "idlivello=" + livello + "&" +
        "email=" + email + "&" +
        "json=" + myJSONString,
        dataType: "text",
        success: function (result) {
          oldConsole.log(result);
        },
        error: function (error) {
          oldConsole.log(error);
        }
    });
}

var updateStatisticheUtenti = function (livello, email, ondate, punteggio, missiliAbbattuti, missiliRimasti, minacceAbbattute, torretteSalvate, missiliSparati, morti){
    $.ajax({
        type: "POST",
        url: host + "php/setStatisticheUtente.php",
        data: "idlivello=" + livello + "&" +
        "email=" + email + "&" +
        "ondate=" + ondate + "&" +
        "punteggio=" + punteggio + "&" +
        "missili_abbattuti=" + missiliAbbattuti + "&" +
        "missili_rimasti=" + missiliRimasti + "&" +
        "minacce_abbattute=" + minacceAbbattute + "&" +
        "torrette_salvate=" + torretteSalvate + "&" +
        "missili_lanciati=" + missiliSparati + "&" +
        "morti=" + morti,
        dataType: "text",
        success: function (result) {
            oldConsole.log(result);
        },
        error: function (error) {
            oldConsole.log(error);
        }
    });
}

var aggiungiLivelloSuccessivo = function (livello, email){
    $.ajax({
        type: "POST",
        url: host + "php/setLivelloSuccessivo.php",
        data: "idlivello=" + (livello+1) + "&" +
        "email=" + email,
        dataType: "text",
        success: function (result) {
            oldConsole.log(result);
        },
        error: function (error) {
            oldConsole.log(error);
        }
    });
}

var updateTutorialSuperato = function ( email ){
    $.ajax( {
        type: "POST",
        url: host + "php/setTutorialPassato.php",
        data: "email=" + email,
        dataType: "text",
        success: function (result) {
            oldConsole.log(result);
        },
        error: function (error) {
            oldConsole.log(error);
        }
    } );
}