<?php
    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";
    require "../management/management_livello_eseguito.php";

    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
    
    if(isset($_GET["idlivello"])&& isset($_GET["email"]) ){
        //echo $_GET["idlivello"];
        $livello = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
        $livello_eseguito = selectFrom_LIVELLO_ESEGUITO_By_idlivello_email($connection,$_GET["idlivello"],$_GET["email"]);
        
        $str = file_get_contents($livello[0]["json"]);
        $json_livello = json_decode($str,true);
        $json_livello_eseguito = json_decode($livello_eseguito[0]["file_virtuali_aggiornati"]);
        
        for($i = 0 ; $i < count($json_livello["fileVirtuali"]);$i = $i + 1){
            for($e = 0 ; $e < count($json_livello_eseguito->fileVirtuali);$e = $e + 1)
                if($json_livello_eseguito->fileVirtuali[$e]->nomeFile == $json_livello["fileVirtuali"][$i]["nomeFile"]){
                    $json_livello["fileVirtuali"][$i]["codice"] = $json_livello_eseguito->fileVirtuali[$e]->codice;
                    $json_livello["fileVirtuali"][$i]["aiutoutilizzato"] = $json_livello_eseguito->fileVirtuali[$e]->aiutoutilizzato;
                }            
        }
        echo json_encode($json_livello);
    }
    else
        echo "{\"return\":\"ERROR\"}";
    
    /*
    else{
        if(isset($_GET["numero"]) ){
            $result = selectFrom_LIVELLO_By_numero($connection,$_GET["numero"]);
            echo json_encode(array("result"=>$result));
        }else 
            return "{'result':'error'}";
    }*/
?>
