<?php

	function connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug){
		$connection = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
		/* check connection */
		if (mysqli_connect_errno()) {
			if($debug){
				printf("Connect failed:\n %s", mysqli_connect_error());
				exit();
			}
		}else{
			if($debug)
				echo "connection established!!!";
		}
		return $connection;
	}

?>
