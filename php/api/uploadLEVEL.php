<?php
// per prima cosa verifico che il file sia stato effettivamente caricato
if (!isset($_FILES['userfile']) || !is_uploaded_file($_FILES['userfile']['tmp_name'])) {
  echo 'Non hai inviato nessun file...';
  exit;    
}

//percorso della cartella dove mettere i file caricati dagli utenti
$uploaddir = '../';

if(strtolower($_SERVER['REQUEST_METHOD'])=='post')
    $contents= file_get_contents($_FILES['userfile']['tmp_name']);
elseif(strtolower($_SERVER['REQUEST_METHOD'])=='put')
    $contents= file_get_contents("php://input");
else
    $contents="";

if($contents != ""){
    echo $contents;
    
}
?>