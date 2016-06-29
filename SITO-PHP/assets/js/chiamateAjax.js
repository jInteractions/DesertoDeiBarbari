var host="http://localhost:8888/";

function getHelp(livello, file, testoAiutoStr, email, nomeBottoneAiuto){
    $.ajax({
        type: "GET",
        url: host + "php/getAiuti.php",
        data: "idlivello=" + livello + "&" + "nomefile=" + file + "&" + "email=" + email,
        dataType: "text",
        success: function (result) {
            aiuto = result.replace("<h1>Connection established!!!</h1>", "");
            $(testoAiutoStr).html(aiuto);
            $(nomeBottoneAiuto).prop("disabled",true);
        },
        error: function (error) {
            console.log(error);
        }
    });

}