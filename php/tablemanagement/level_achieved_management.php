<?php
//levels_idlevel, Users_idUser, savedCode, points, population


//`levels_idlevel`,`Users_idUser`,`savedCode`,`points`,`population`
    function createLevelAchieved($connection, $idLevel, $idUser, $savedCode, $points, $population){
        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`level_achieved` 
                                              (`levels_idlevel`,`Users_idUser`,`savedCode`,`points`,`population`) 
                                              VALUE (?,?,?,?,?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "sssss",$idLevel, $idUser, $savedCode, $points, $population);

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
    
    function getLevelAchievedFromID($connection, $idLevelAchieved){
        $query = "SELECT levels_idlevel, Users_idUser, savedCode, points, population FROM level_achieved where idlevel_achieved=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLevelAchieved);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idLevel, $idUser, $savedCode, $points, $population);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idLevel;
                $fields[$i]["iduser"] = $idUser;
                $fields[$i]["savedcode"] = $savedCode;
                $fields[$i]["points"] = $points;
                $fields[$i]["population"] = $population;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    function getLevelAchievedFromLevelID($connection, $idLevel){
        $query = "SELECT levels_idlevel, Users_idUser, savedCode, points, population FROM level_achieved where levels_idlevel=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLevel);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idLevel, $idUser, $savedCode, $points, $population);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idLevel;
                $fields[$i]["iduser"] = $idUser;
                $fields[$i]["savedcode"] = $savedCode;
                $fields[$i]["points"] = $points;
                $fields[$i]["population"] = $population;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    
    function getLevelAchievedFromUserID($connection, $idUser){
        $query = "SELECT levels_idlevel, Users_idUser, savedCode, points, population FROM level_achieved where Users_idUser=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idUser);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idLevel, $idUser, $savedCode, $points, $population);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idLevel;
                $fields[$i]["iduser"] = $idUser;
                $fields[$i]["savedcode"] = $savedCode;
                $fields[$i]["points"] = $points;
                $fields[$i]["population"] = $population;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
    
    function getLevelAchievedFromUserIDAndLevelID($connection, $idLevel, $idUser){
        $query = "SELECT levels_idlevel, Users_idUser, savedCode, points, population FROM level_achieved where levels_idlevel=? AND Users_idUser=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "ii",$idLevel,$idUser);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id, $idLevel, $idUser, $savedCode, $points, $population);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idlevel"] = $idLevel;
                $fields[$i]["iduser"] = $idUser;
                $fields[$i]["savedcode"] = $savedCode;
                $fields[$i]["points"] = $points;
                $fields[$i]["population"] = $population;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    


?>