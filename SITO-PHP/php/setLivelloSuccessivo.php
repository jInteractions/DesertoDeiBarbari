<?php
	require "config.php";
	require "generic.php";
	require "management/management_livello_eseguito.php";
  if(isset($_POST["idlivello"]) && isset($_POST["email"])){
    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    
    $result = insertIntolivello_eseguito($connection, $_POST["email"], $_POST["idlivello"], "", 0, 0, 0, 0, 0, 0, 0, 0);
     
    echo "Risultato insert: ".$result;
    exit();
    
    /*$codiceUtente = explode("########FineCodiceUtente########", $_GET["codiceUtente"]);
    $richiestoAiuto = json_decode($_GET["richiestoAiuto"],true);
    $nomeFile = json_decode($_GET["nomeFile"],true);
    
    $jsonFileVirtuali = '{ "fileVirtuali": [';
    for ($i = 0; $i < count($richiestoAiuto); $i++) {
      $jsonFileVirtuali = $jsonFileVirtuali.'{ "nomeFile": "'.$nomeFile[$i].'", "codice": '.json_encode($codiceUtente[$i]).', "aiutoUtilizzato": "'.$richiestoAiuto[$i].'" }';
      
      if($i!=(count($richiestoAiuto)-1))
        $jsonFileVirtuali = $jsonFileVirtuali.',';
    }
    $jsonFileVirtuali = $jsonFileVirtuali.'] }';
    
    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    $result = update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_idlivello_email_AS_KEYS($connection,$jsonFileVirtuali,$_GET["idlivello"],$_GET["email"]);
    
    echo var_dump($richiestoAiuto);
    echo $result;
    exit();*/
	}
	else
		echo "{'result':'error'}";
?>