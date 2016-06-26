<?php
	require "../config.php";
	require "../generic.php";
	require "../management/management_livello_eseguito.php";
	if(isset($_GET["email"])){
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
		$result = selectFrom_LIVELLO_ESEGUITO_idlivello_name_By_email($connection,$_GET["email"]);
		echo json_encode(array("result"=>$result));
	}
	else
		echo "{'result':'error'}";
?>
