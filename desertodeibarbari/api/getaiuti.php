<?php
	require "../config.php";
	require "../generic.php";
	require "../management/management_livello.php";
	if(isset($_GET["idlivello"]) && isset( $_GET["nomefile"] )){
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