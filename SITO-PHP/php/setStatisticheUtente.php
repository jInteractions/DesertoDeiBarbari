<?php
	require "config.php";
	require "generic.php";
	require "management/management_livello_eseguito.php";

	if(isset($_POST["idlivello"]) && isset( $_POST["email"] )){

		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
		$idlivello = $_POST["idlivello"];
		$email = $_POST["email"];

		$level = selectFrom_LIVELLO_ESEGUITO_By_idlivello_email($connection,$_POST["idlivello"],$_POST["email"]);
    
    
		if(isset( $_POST["ondate"] ) ){
			if($level["ondate"] < $_POST["ondate"]){
				$result = update_LIVELLO_ESEGUITO_SET_ondate_WITH_idlivello_email_AS_KEYS($connection,$_POST["ondate"],$idlivello,$email);
				echo $result;
      }
		}
    
		if(isset( $_POST["punteggio"] ) ){
			if($level["punteggio"] < $_POST["punteggio"]){
				$punteggio = update_LIVELLO_ESEGUITO_SET_punteggio_WITH_idlivello_email_AS_KEYS($connection,$_POST["punteggio"],$idlivello,$email);
				echo $punteggio;
      }
		}


		if(isset( $_POST["missili_abbattuti"] ) ){
      $missiliAbbattutiSommati = $level["missili_abbattuti"] + $_POST["missili_abbattuti"];
      $missili_abbattuti = update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_idlivello_email_AS_KEYS($connection,$missiliAbbattutiSommati,$idlivello,$email);
      echo $missili_abbattuti;
		}

		if(isset( $_POST["minacce_abbattute"]) ){
      $minacceAbbattuteSommate = $level["minacce_abbattute"] + $_POST["minacce_abbattute"];
      $minacce_abbattute = update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_idlivello_email_AS_KEYS($connection,$minacceAbbattuteSommate,$idlivello,$email);
      echo $minacce_abbattute;
		}

		if(isset( $_POST["missili_lanciati"]) ){
      $missiliLanciatiSommati = $level["missili_lanciati"] + $_POST["missili_lanciati"];
      $missili_lanciati = update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_idlivello_email_AS_KEYS($connection,$missiliLanciatiSommati,$idlivello,$email);
      echo $missili_lanciati;
		}

		if(isset( $_POST["missili_rimasti"]) ){
      $missiliRimastiSommati = $level["missili_rimasti"] + $_POST["missili_rimasti"];
      $missili_rimasti = update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_idlivello_email_AS_KEYS($connection,$missiliRimastiSommati,$idlivello,$email);
      echo $missili_rimasti;
		}

		if(isset( $_POST["torrette_salvate"]) ){
      $torretteSalvateSommate = $level["torrette_salvate"] + $_POST["torrette_salvate"];
      $torrette_salvate = update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_idlivello_email_AS_KEYS($connection,$torretteSalvateSommate,$idlivello,$email);
      echo $torrette_salvate;
		}

		if(isset($_POST["morti"])){
      $mortiSommati = $level["morti"] + $_POST["morti"];
      $morti = update_LIVELLO_ESEGUITO_SET_morti_WITH_idlivello_email_AS_KEYS($connection,$mortiSommati,$idlivello,$email);
      echo $morti;
		}
	}
	else
		echo "Error";
  exit();
?>