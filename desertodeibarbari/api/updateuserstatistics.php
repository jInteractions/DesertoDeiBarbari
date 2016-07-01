<?php
	require "../config.php";
	require "../generic.php";
	require "../management/management_livello_eseguito.php";

	if(isset($_POST["idlivello"]) && isset( $_POST["email"] )){

		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
		$idlivello = $_POST["idlivello"];
		$email = $_POST["email"];

		$level = selectFrom_LIVELLO_ESEGUITO_By_idlivello_email($connection,$_POST["idlivello"],$_POST["email"]);
		
		if(isset( $_POST["ondate"] ){
			if($level["ondate"] < $_POST["ondate"])
				
				$result = update_LIVELLO_ESEGUITO_SET_ondate_WITH_idlivello_email_AS_KEYS($connection,$ondate,$idlivello,$email);
				echo "{\"result\":\"$result\"}";
				exit();

		}

		if(isset( $_POST["punteggio"] ){
			if($level["punteggio"] < $_POST["punteggio"])
				
				$punteggio = update_LIVELLO_ESEGUITO_SET_punteggio_WITH_idlivello_email_AS_KEYS($connection,$punteggio,$idlivello,$email);
				echo "{\"result\":\"$punteggio\"}";
				exit();

		}

		if(isset( $_POST["missili_abbattuti"] ){
			if($level["missili_abbattuti"] < $_POST["missili_abbattuti"])
				
				$missili_abbattuti = update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_idlivello_email_AS_KEYS($connection,$missili_abbattuti,$idlivello,$email);
				echo "{\"result\":\"$missili_abbattuti\"}";
				exit();

		}

		if(isset( $_POST["minacce_abbattute"] ){
			if($level["minacce_abbattute"] < $_POST["minacce_abbattute"])
				
				$minacce_abbattute = update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_idlivello_email_AS_KEYS($connection,$minacce_abbattute,$idlivello,$email);
				echo "{\"result\":\"$minacce_abbattute\"}";
				exit();

		}

		if(isset( $_POST["missili_lanciati"] ){
			if($level["missili_lanciati"] < $_POST["missili_lanciati"])
				
				$missili_lanciati = update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_idlivello_email_AS_KEYS($connection,$missili_lanciati,$idlivello,$email);
				echo "{\"result\":\"$missili_lanciati\"}";
				exit();

		}

		if(isset( $_POST["missili_rimasti"] ){
			if($level["missili_rimasti"] > $_POST["missili_rimasti"])
				
				$missili_rimasti = update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_idlivello_email_AS_KEYS($connection,$missili_rimasti,$idlivello,$email);
				echo "{\"result\":\"$missili_rimasti\"}";
				exit();

		}

		if(isset( $_POST["torrette_salvate"] ){
			if($level["torrette_salvate"] < $_POST["torrette_salvate"])
				
				$torrette_salvate = update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_idlivello_email_AS_KEYS($connection,$torrette_salvate,$idlivello,$email);
				echo "{\"result\":\"$torrette_salvate\"}";
				exit();

		}

		if(isset( $_POST["morti"] ){
			if($level["morti"] < $_POST["morti"])
				
				$morti = update_LIVELLO_ESEGUITO_SET_morti_WITH_idlivello_email_AS_KEYS($connection,$morti,$idlivello,$email);
				echo "{\"result\":\"$morti\"}";
				exit();

		}
	}
	else
		echo "{'result':'error'}";



?>