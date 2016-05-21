<?php

    function createTitle($connection, $idLevel, $title,$language){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`titles` (`levels_idlevel`,`title`,`ulanguage`) VALUE (?,?,?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "sss",$idLevel, $title,$language);

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
    
    function getTitleFromID($connection, $idTitle){
        $query = "SELECT levels_idlevel, title, ulanguage FROM titles where idtitle=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idTitle);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idlevel, $title, $language);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idlevel;
                $fields[$i]["title"] = $title;
                $fields[$i]["language"] = $language;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getLineFromLevelID($connection, $idLevel){
        $query = "SELECT levels_idlevel, title, ulanguage FROM titles where levels_idlevel=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLevel);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idlevel, $title, $language);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idlevel;
                $fields[$i]["title"] = $title;
                $fields[$i]["language"] = $language;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    
    


?>