<?php
//idlevel , idNextLevel , idNextLevelFail, gamecode , idStartDialog , idEndDialog , timer , badKeywords , start_point, labelCMS


//`idlevel`,`idNextLevel`,`idNextLevelFail`,`gamecode`,`idStartDialog`,`idEndDialog`,`timer`,`badKeywords`,`start_point`,`labelCMS`

    function createLevelAchieved($connection, $idNextLevel ,$idNextLevelFail ,$gamecode ,$idStartDialog ,$idEndDialog ,$timer ,$badKeywords ,$start_point ,$labelCMS){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`level_achieved` 
                                              (`idNextLevel`,`idNextLevelFail`,`gamecode`,`idStartDialog`,`idEndDialog`,`timer`,`badKeywords`,`start_point`,`labelCMS`) 
                                              VALUE (?,?,?,?,?,?,?,?,)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "ssssssss",$idNextLevel ,$idNextLevelFail ,$gamecode ,$idStartDialog ,$idEndDialog ,$timer ,$badKeywords ,$start_point ,$labelCMS);

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
    
    function getLevelFromID($connection, $idLevel){
        $query = "SELECT idlevel , idNextLevel , idNextLevelFail, gamecode , idStartDialog , idEndDialog , timer , badKeywords , start_point, labelCMS FROM level_achieved where idlevel=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLevel);
            /* execute statement */
            $stmt->execute();
            /* bind result variables */
            $stmt->bind_result($id, $idNextLevel ,$idNextLevelFail ,$gamecode ,$idStartDialog ,$idEndDialog ,$timer ,$badKeywords ,$start_point ,$labelCMS);
            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idNextLevel"] = $idNextLevel;
                $fields[$i]["idNextLevelFail"] = $idNextLevelFail;
                $fields[$i]["gamecode"] = $gamecode;
                $fields[$i]["idStartDialog"] = $idStartDialog;
                $fields[$i]["idEndDialog"] = $idEndDialog;
                $fields[$i]["timer"] = $timer;
                $fields[$i]["badKeywords"] = $badKeywords;
                $fields[$i]["start_point"] = $start_point;
                $fields[$i]["labelCMS"] = $labelCMS;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    

?>