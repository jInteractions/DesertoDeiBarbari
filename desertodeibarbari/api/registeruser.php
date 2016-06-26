<?php

    require "../config.php";
    require "../generic.php";
    require "../management/management_utente.php";
    if(isset($_GET["email"]) && isset($_GET["password"]) && isset($_GET["tutorial"]) && isset($_GET["morti"]) && isset($_GET["alias"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
        $result = insertIntoutente($connection,$_GET["email"],$_GET["password"],$_GET["tutorial"],$_GET["morti"],$_GET["alias"]);
        echo json_encode(array("result"=>$result));
    }
    else
        return "{'result':'error'}";
?>