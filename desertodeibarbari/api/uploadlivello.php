<?php

	require "../config.php";
	require "../generic.php";
	require "../management/management_livello.php";


    
    // per prima cosa verifico che il file sia stato effettivamente caricato
    if (!isset($_FILES['userfile']) || !is_uploaded_file($_FILES['userfile']['tmp_name'])) {
        echo "{'result':'error no file uploaded'}";
        exit;    
    }

    
    $ext_ok = array('json','txt');
    $temp = explode('.', $_FILES['userfile']['name']);
    //echo $temp;
    $ext = end($temp);
    if (!in_array($ext, $ext_ok)) {
        echo "{'result':'extension not allowed'}";
        exit;
    }

    
    if(strtolower($_SERVER['REQUEST_METHOD'])=='post')
        $contents= file_get_contents($_FILES['userfile']['tmp_name']);
    elseif(strtolower($_SERVER['REQUEST_METHOD'])=='put')
        $contents= file_get_contents("php://input");
    else
        $contents="";
        
    if($contents != ""){
        //echo $contents;
        $obj = json_decode($contents);
        //print_r($obj);
        $numero = $obj->numeroLivello;
        $nome = $obj->nomeLivello;

        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, false);

        $result = insertIntolivello($connection, $label, $numero,$nome,$contents,$debug);

        echo "{'result':'" . $result . "'}";
    }

?>