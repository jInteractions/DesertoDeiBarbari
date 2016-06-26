<?php
	 require "../config.php";
	 require "../generic.php";
	 require "../management/.php";


		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
		$result = foo();
		echo json_encode($result);
?>

