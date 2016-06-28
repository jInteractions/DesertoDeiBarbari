<?php
	require "../config.php";
	require "../generic.php";
	require "../management/management_livello_eseguito.php";

	if(isset($_POST["idlivello"]) && isset( $_POST["email"] )&& isset( $_POST["ondate"] )
	&& isset( $_POST["missili_abbattuti"] )&& isset( $_POST["punteggio"] )
	&& isset( $_POST["minacce_abbattute"] )&& isset( $_POST["missili_lanciati"] )
	&& isset( $_POST["missili_rimasi"] )&& isset( $_POST["torrette_salvate"] ))
	{
		$connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
		
		
		$result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
        $json = json_decode($result["json"]);
        foreach ($json->fileVirtuali as $file) {
            if($file->nomeFile == $_GET["nomefile"]){
                echo "{\"result\":\"$file->aiuto\"}";
                exit();
            }
        }
		print_r($json);
        //echo json_encode(array("result"=>$result));
	}
	else
		echo "{'result':'error'}";



?>