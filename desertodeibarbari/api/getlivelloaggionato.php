<?php
    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";

    if(isset($_GET["idlivello"])&& isset($_GET["email"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
        echo $_GET["idlivello"];
        $result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
        echo $result;
        echo json_encode(array("result"=>$result));
    }
    else{
        if(isset($_GET["numero"]) ){
            $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
            $result = selectFrom_LIVELLO_By_numero($connection,$_GET["numero"]);
            echo json_encode(array("result"=>$result));
        }else 
            return "{'result':'error'}";
    }
?>
