<?php
    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";

    if(isset($_GET["idlivello"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
        $result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
       echo $result["json"];
    }
    else{
        if(isset($_GET["numero"]) ){
            $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
            $result = selectFrom_LIVELLO_By_numero($connection,$_GET["numero"]);
            echo $result[0]["json"];
        }else 
            return "{'result':'error'}";
    }
?>
