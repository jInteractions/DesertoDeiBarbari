<?php
    require "../config.php";
    require "../generic.php";
    require "../management/management_livello.php";

    if(isset($_GET["idlivello"]) ){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME,$debug);
        $result = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
       //echo '<pre>'; print_r($result); echo '</pre>';
       //echo $result[0]["json"];
       echo $result[0]["json"];
       $arr = json_decode($result[0]["json"]);
       echo json_last_error_msg() ;
       print_r($arr);
       print_r(json_decode($result[0]["json"]));    
       echo json_encode(json_decode($result[0]["json"]));
       //echo json_encode(utf8_encode( $result[0] ));
       //echo json_last_error_msg() ;
       //     echo json_encode(array_values($result));
       // echo json_encode($result);
    }
    else{
        if(isset($_GET["numero"]) ){
            $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
            $result = selectFrom_LIVELLO_By_numero($connection,$_GET["numero"]);
            echo json_encode(array("result"=>$result));
        }else 
            return "{'result':'error'}";
    }
?>
