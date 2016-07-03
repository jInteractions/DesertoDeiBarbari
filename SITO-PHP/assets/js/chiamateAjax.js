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
            $(nomeBottoneAiuto).prop("disabled",true);
        },
        error: function (error) {
            console.log(error);
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
          console.log(livello);
          console.log(nomefile);
          editorCodice.setValue(codice);
          console.log(codice);
        },
        error: function (error) {
            console.log(error);
        }
    });
};



var updateCodiceUtente = function (livello, email, richiestoAiuto, nomeFile, codiceUtente){
    console.log("idlivello=" + livello);
    console.log("email=" + email);
    console.log("richiestoAiuto=" + JSON.stringify(richiestoAiuto));
    console.log("nomeFile=" + JSON.stringify(nomeFile));
    console.log("codiceUtente=" + JSON.stringify(codiceUtente));
    $.ajax({
        type: "GET",
        url: host + "php/setCodiceUtente.php",
        data: "idlivello=" + livello + "&" +
        "email=" + email + "&" +
        "richiestoAiuto=" + JSON.stringify(richiestoAiuto)+ "&" +
        "nomeFile=" + JSON.stringify(nomeFile) + "&" +
        "codiceUtente=" + codiceUtente,
        dataType: "text",
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
            console.log("idlivello=" + livello);
            console.log("email=" + email);
            console.log("richiestoAiuto=" + richiestoAiuto);
            console.log("nomeFile=" + nomeFile);
            console.log("codiceUtente=" + codiceUtente);
            alert(error);
        }
    });
}