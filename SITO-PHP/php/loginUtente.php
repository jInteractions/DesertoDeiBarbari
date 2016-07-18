<?php
	require "config.php";
	require "generic.php";
	require "management/management_utente.php";
	if(isset($_POST["user"]) && isset( $_POST["password"] )){
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    $risultatoQuery = selectFrom_UTENTE_By_email($connection, $_POST["user"]);
    if (strcmp($risultatoQuery["password"], $_POST["password"])===0){
      $cookie_name = "user";
      $cookie_value = $_POST["user"];
      setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
      //header('Location: http://localhost:8888/dashboard.php');
      echo '<script>window.location.replace("http://localhost:8888/dashboard.php");</script>';
    } else
		  echo "Login errato.";
	}
	else
		echo "Login errato.";
?>