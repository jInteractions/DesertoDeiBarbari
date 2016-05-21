<?php

    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\dialogs_management.php";
    require "..\\tablemanagement\helps_management.php";
    require "..\\tablemanagement\level_achieved_management.php";
    require "..\\tablemanagement\levels_management.php";
    require "..\\tablemanagement\lines_table_management.php";
    require "..\\tablemanagement\\titles_management.php";
    require "..\\tablemanagement\\traslations_management.php";


    // per prima cosa verifico che il file sia stato effettivamente caricato
    if (!isset($_FILES['userfile']) || !is_uploaded_file($_FILES['userfile']['tmp_name'])) {
    echo 'Non hai inviato nessun file...';
    exit;    
    }
    $ext_ok = array('json','txt');
    $temp = explode('.', $_FILES['userfile']['name']);
    //echo $temp;
    $ext = end($temp);
    if (!in_array($ext, $ext_ok)) {
        echo 'Il file ha un estensione non ammessa!';
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
       // inserisco tutti i contenuti nel DB
       
       //estraggo le informazioni
       $dialogo_inizio = $obj->dialoghi->inizio;
       $dialogo_fine = $obj->dialoghi->fine;
       $posizione = $obj->posizione;
       $titoli = $obj->titoli;
       $aiuti = $obj->aiuti;
       $codice_da_modificare = $obj->codice_da_modificare;
       $codice_di_test = $obj->codice_di_test;
       $id_livello_successivo = $obj->id_livello_successivo;
       $id_livello_successivo_fail = $obj->id_livello_successivo_fail;
       $tempo_massimo = $obj->tempo_massimo;
       $bad_keywords = $obj->bad_keywords;
       $labelCMS = $obj->labelCMS;
       
       //creo i dialoghi iniziali e finali
       
       //creo i dialoghi
       $idDialogoInizio = createDialog($connection, $dialogo_inizio->labelCMS);
       $idDialogoFine = createDialog($connection, $dialogo_fine->labelCMS);
       
       //inizio inserimento lines
       //carico le battute del dialogo d'inizio
       $indexBattuta = 0;
       foreach ($dialogo_inizio->battute as $battuta) {
           $idLine = createLine($connection, $idDialogoInizio, $indexBattuta, $battuta->personaggio);
           $indexBattuta = $indexBattuta + 1;
           //ora carico le traduzioni
           $indexTrad = 0;
           foreach ($battuta->traduzioni as $traduzione) {
                createTraslation($connection, $idLine, json_encode($traduzione->dialogo),$traduzione->lingua,$indexTrad);
                $indexTrad = $indexTrad + 1;
           }
       }
       //carico le battute del dialogo di fine livello
       $indexBattuta = 0;
       foreach ($dialogo_fine->battute as $battuta) {
           $idLine = createLine($connection, $idDialogoFine, $indexBattuta,$battuta->personaggio);
           $indexBattuta = $indexBattuta + 1;
       }
       //fine inserimento lines
       
       //fine caricamento dialoghi
       
       //inizio inserimento livello
       
       $idLevel = createLevel($connection, 
                              $id_livello_successivo ,
                              $id_livello_successivo_fail ,
                              $codice_da_modificare ,
                              $idDialogoInizio ,
                              $idDialogoFine ,
                              $tempo_massimo ,
                              json_encode($bad_keywords) ,
                              $posizione ,
                              $labelCMS);
       
       //fine inserimento livello
       
       //inizio inserimento aiuti
       foreach ($aiuti as $aiuto) {
            //inserisco il dialogo
            $idDialogoAiuto = createDialog($connection, $aiuto->dialogo->labelCMS);
            $indexBattuta = 0;
            foreach ($aiuto->dialogo->battute as $battuta) {
                $idLine = createLine($connection, $idDialogoAiuto, $indexBattuta,$battuta->personaggio);
                $indexBattuta = $indexBattuta + 1;
                //carico le traduzioni della battuta
                $indexTrad = 0;
                foreach ($battuta->traduzioni as $traduzione) {
                    createTraslation($connection, $idLine, json_encode($traduzione->dialogo),$traduzione->lingua,$indexTrad);
                    $indexTrad = $indexTrad + 1;
                }
            }
            //carico l'aiuto
            createHelp($connection, 
                        $idDialogoAiuto, 
                        $idLevel, 
                        $aiuto->posizione, 
                        $aiuto->codice, 
                        $aiuto->immagine, 
                        $aiuto->costo, 
                        $aiuto->massimo_tentativi, 
                        $aiuto->labelCMS);
                        
       }
       //fine inserimento aiuti
       
    }//fine gestione contenuto
?>