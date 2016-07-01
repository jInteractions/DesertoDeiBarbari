var host="http://localhost:10887/IPC/desertodeibarbari/";

function getHelp(livello, file){
    $.ajax({
        type: "GET",
        url: host + "api/getaiuti.php",
        data: "idlivello=" + livello + "&" +
        "nomefile=" + file,
      dataType: "json",
        success: function (result) {
            //cosa fare se va a buon fine
            console.log(result.result);
            alert(result.result);
        },
        error: function (error) {
            //cosa fare se c'è un problema
            alert(error);
        }
    });

}

function updateCodiceUtente(livello,email,filevirtuali){
    console.log("idlivello=" + livello + "&" +
        "email=" + email+ "&" +
        "usercode=" + filevirtuali);
    $.ajax({
        type: "GET",
        url: host + "api/updateusercode.php",
        data: "idlivello=" + livello + "&" +
        "email=" + email+ "&" +
        "usercode=" + filevirtuali,
      dataType: "json",
        success: function (result) {
            //cosa fare se va a buon fine
            console.log(result);
        },
        error: function (error) {
            //cosa fare se c'è un problema
            console.log(error);
            alert(error);
        }
    });
}
