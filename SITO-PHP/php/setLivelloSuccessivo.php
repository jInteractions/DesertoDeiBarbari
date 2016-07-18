<?php
	require "config.php";
	require "generic.php";
	require "management/management_livello_eseguito.php";
  if(isset($_POST["idlivello"]) && isset($_POST["email"])){
    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    
    $result = insertIntolivello_eseguito($connection, $_POST["email"], $_POST["idlivello"], "", 0, 0, 0, 0, 0, 0, 0, 0);
     
    echo "Risultato insert: ".$result;
    exit();
	}
	else
		echo "{'result':'error'}";
?>