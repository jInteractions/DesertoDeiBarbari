<?php
	require "config.php";
	require "generic.php";
	require "management/management_livello_eseguito.php";
  if(isset($_GET["idlivello"]) && isset( $_GET["email"] ) && isset( $_GET["usercode"] )){
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    $result = update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_idlivello_email_AS_KEYS($connection,$_GET["usercode"],$_GET["idlivello"],$_GET["email"]);
    echo $result;
    exit();
	}
	else
		echo "{'result':'error'}";
?>