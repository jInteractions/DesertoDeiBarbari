<?php

	function connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug){
		$connection = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
		/* check connection */
		if (mysqli_connect_errno()) {
			if($debug){
				printf("<h1>Connect failed:\n %s</h1>", mysqli_connect_error());
				exit();
			}
		}else{
			if($debug)
				echo "<h1>Connection established</h1>";
		}
		return $connection;
	}

?>
