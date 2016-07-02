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



var updateCodiceUtente = function (livello,email,filevirtuali){
    $.ajax({
        type: "GET",
        url: host + "php/setCodiceUtente.php",
        data: "idlivello=" + livello + "&" +
        "email=" + email+ "&" +
        "usercode=" + escape(filevirtuali),
        dataType: "text",
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
            alert(error);
        }
    });
}