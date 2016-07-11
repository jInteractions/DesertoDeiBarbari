<?php
	require "config.php";
	require "generic.php";
	//require "management/management_livello_eseguito.php";
	require "management/management_utente.php";

	if( isset($_POST["email"]) ) {
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, false);
		$email = $_POST["email"];
	    $uno = 1;
        update_UTENTE_SET_tutorial_WITH_email_AS_KEY($connection, $email);
	}
	else
		echo $_POST["email"];
  exit();
?>