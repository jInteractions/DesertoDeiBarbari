<?php
	require "config.php";
	require "generic.php";
	require "management/management_livello.php";
	require "management/management_livello_eseguito.php";
	if(isset($_GET["idlivello"]) && isset( $_GET["nomefile"] ) && isset( $_GET["email"] )){
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $debug);
    $informazioniLivelliEseguiti = selectFrom_LIVELLO_ESEGUITO_By_email($connection, $_GET["email"]);
    $punteggio = 0;
    foreach($informazioniLivelliEseguiti as $chiave => $valore) {
      $punteggio+=$valore["punteggio"];
    }
		$result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
    $json = json_decode($result["json"]);
    if($punteggio >= $json->costoAiuti) {
      foreach ($json->fileVirtuali as $chiave => $file) {
        if(strcmp($file->nomeFile, $_GET["nomefile"])===0){
          $livelloAttuale = selectFrom_LIVELLO_ESEGUITO_idlivello_name_By_email($connection,$_GET["idlivello"],$_GET["email"]);
          $nuovoPunteggio = $livelloAttuale["punteggio"] - $json->costoAiuti; update_LIVELLO_ESEGUITO_SET_punteggio_WITH_email_idLivello_AS_KEY($connection,$nuovoPunteggio,$_GET["idlivello"],$_GET["email"]);
          echo $file->aiuto;
          exit();
        }
      }
    } else
      echo "Punteggio a disposizione non sufficiente per richiedere l'aiuto!";
  }
	else
		echo "Merda";



?>