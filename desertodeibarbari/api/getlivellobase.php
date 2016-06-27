<?php
    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";

    if(isset($_GET["idlivello"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
        $livello = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
       

        $str = file_get_contents($livello[0]["json"]);
        echo $str;
    }
    else{
        if(isset($_GET["numero"]) ){
            $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
            $livello = selectFrom_LIVELLO_By_numero($connection,$_GET["numero"]);
            $str = file_get_contents($livello[0]["json"]);
            echo $str;
        }else 
            return "{'result':'error'}";
    }
?>
