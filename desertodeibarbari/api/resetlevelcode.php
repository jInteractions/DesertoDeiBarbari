<?php

    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";


    if(isset($_GET["idlivello"])&& isset($_GET["email"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
        
        $result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
        echo $result;
        echo json_encode(array("result"=>$result));
    }
?>