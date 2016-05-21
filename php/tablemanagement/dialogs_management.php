<?php

    function createDialog($connection, $label){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`dialogs` (`labelCMS`) VALUE (?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "s",$label);

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
    
    function getDialogFromID($connection, $idDialog){
        $query = "SELECT iddialog,labelCMS FROM dialogs where iddialog=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idDialog);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $label);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["label"] = $label;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }


?>