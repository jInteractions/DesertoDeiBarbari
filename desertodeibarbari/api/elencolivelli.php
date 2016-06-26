<?php
	 require "../config.php";
	 require "../generic.php";
	 require "../management/management_livello.php";


		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
		$result = selectAllFrom_LIVELLO($connection);
		echo json_encode($result);
?>

