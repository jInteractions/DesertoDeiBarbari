<?php

    function createLine($connection, $idDialog, $position,$uCharacter){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`lines_table` (`dialogs_iddialog`,`position`,`ucharacter`) VALUE (?,?,?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "sss",$idDialog, $position,$uCharacter);

                /* execute query */   
                if (!$stmt->execute() && $debug) {
                    echo $stmt->error;
                    echo $stmt->errno;
                    return -1;
                }

                //echo mysqli_stmt_insert_id($stmt);
                $id = $stmt->insert_id;
                /* close statement */
                mysqli_stmt_close($stmt);
                //operazione conclusa con successo
                return $id;
            }
            else{
                //echo "IT'S A BUGGGGG!!!!";  
            }
    }
    
    function getLineFromID($connection, $idLine){
        $query = "SELECT idline, dialogs_iddialog,position,ucharacter FROM lines_table where idline=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLine);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $iddialog, $position, $character);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["iddialog"] = $iddialog;
                $fields[$i]["position"] = $position;
                $fields[$i]["character"] = $character;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getLineFromDialogID($connection, $idDialog){
        $query = "SELECT idline, dialogs_iddialog,position,ucharacter FROM lines_table where dialogs_iddialog=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idDialog);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $iddialog, $position, $character);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["iddialog"] = $iddialog;
                $fields[$i]["position"] = $position;
                $fields[$i]["character"] = $character;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    
    


?>