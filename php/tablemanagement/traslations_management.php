<?php

    function createTraslation($connection, $idLine, $line,$language,$position){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`traslations` 
                                              (`lines_idline`,`line`,`ulanguage`,`position`) 
                                              VALUE (?,?,?,?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "ssss",$idLine, $line,$language,$position);

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
    
    function getTraslationFromID($connection, $idTraslation){
        $query = "SELECT idtraslation,lines_idline,line,ulanguage,position FROM traslations where idtraslation=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idTraslation);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idlevel, $line, $language,$position);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idlevel;
                $fields[$i]["line"] = $line;
                $fields[$i]["language"] = $language;
                $fields[$i]["position"] = $position;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getTraslationFromLineID($connection, $idLine){
        $query = "SELECT idtraslation,lines_idline,line,ulanguage,position FROM traslations where lines_idline=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLine);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idlevel, $line, $language,$position);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idlevel;
                $fields[$i]["line"] = $line;
                $fields[$i]["language"] = $language;
                $fields[$i]["position"] = $position;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    
    


?>