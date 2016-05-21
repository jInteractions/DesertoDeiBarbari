<?php

    function createHelp($connection, 
                        $idDialog, 
                        $idLevel, 
                        $position, 
                        $gamecode, 
                        $image, 
                        $cost, 
                        $maxTries, 
                        $labelCMS){

        
         /* create a prepared statement */
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`helps` 
            (`dialogs_iddialog`,`levels_idlevel`,`position`,`gamecode`,`image`,`cost`,`maxTries`,`labelCMS`) 
            VALUE (?,?,?,?,?,?,?,?)')) {

                /* bind parameters for markers */
                $stmt->bind_param( "ssssssss",$idDialog, $idLevel, $position, $gamecode, $image, $cost, $maxTries, $labelCMS);

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
    
    function getHelpFromID($connection, $idHelp){
        $query = "SELECT idhelp, dialogs_iddialog,levels_idlevel,position,gamecode,image,cost,maxTries,labelCMS FROM helps where idhelp=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "s",$idHelp);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id,$dialogs_iddialog,$levels_idlevel,$position,$gamecode,$image,$cost,$maxTries,$labelCMS);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idDialog"] = $dialogs_iddialog;
                $fields[$i]["idLevel"] = $levels_idlevel;
                $fields[$i]["position"] = $position;
                $fields[$i]["gamecode"] = $gamecode;
                $fields[$i]["image"] = $image;
                $fields[$i]["cost"] = $cost;
                $fields[$i]["maxTries"] = $maxTries;
                $fields[$i]["labelCMS"] = $labelCMS;
                $i = $i + 1;
            }
            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getHelpFromDialogID($connection, $idDialog){
        $query = "SELECT idhelp, dialogs_iddialog,levels_idlevel,position,gamecode,image,cost,maxTries,labelCMS FROM helps where dialogs_iddialog=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idDialog);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id,$dialogs_iddialog,$levels_idlevel,$position,$gamecode,$image,$cost,$maxTries,$labelCMS);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                
                $fields[$i]["id"] = $id;
                $fields[$i]["idDialog"] = $dialogs_iddialog;
                $fields[$i]["idLevel"] = $levels_idlevel;
                $fields[$i]["position"] = $position;
                $fields[$i]["gamecode"] = $gamecode;
                $fields[$i]["image"] = $image;
                $fields[$i]["cost"] = $cost;
                $fields[$i]["maxTries"] = $maxTries;
                $fields[$i]["labelCMS"] = $labelCMS;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getHelpFromLevelID($connection, $idLevel){
        $query = "SELECT idhelp, dialogs_iddialog,levels_idlevel,position,gamecode,image,cost,maxTries,labelCMS FROM helps where levels_idlevel=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "i",$idLevel);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id,$dialogs_iddialog,$levels_idlevel,$position,$gamecode,$image,$cost,$maxTries,$labelCMS);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idDialog"] = $dialogs_iddialog;
                $fields[$i]["idLevel"] = $levels_idlevel;
                $fields[$i]["position"] = $position;
                $fields[$i]["gamecode"] = $gamecode;
                $fields[$i]["image"] = $image;
                $fields[$i]["cost"] = $cost;
                $fields[$i]["maxTries"] = $maxTries;
                $fields[$i]["labelCMS"] = $labelCMS;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    function getHelpFromLevelIDAndDialogID($connection, $idLevel,$idDialog){
        $query = "SELECT idhelp, dialogs_iddialog,levels_idlevel,position,gamecode,image,cost,maxTries,labelCMS FROM helps where levels_idlevel=? AND dialogs_iddialog=?";

        $fields = [];
        if ($stmt = $connection->prepare($query)) {
            /* bind parameters for markers */
            $stmt->bind_param( "ii",$idLevel,$idDialog);

            /* execute statement */
            $stmt->execute();

            
            /* bind result variables */
            $stmt->bind_result($id,$dialogs_iddialog,$levels_idlevel,$position,$gamecode,$image,$cost,$maxTries,$labelCMS);

            /* fetch values */
            $i = 0;
            while ($stmt->fetch()) {
                $fields[$i]["id"] = $id;
                $fields[$i]["idDialog"] = $dialogs_iddialog;
                $fields[$i]["idLevel"] = $levels_idlevel;
                $fields[$i]["position"] = $position;
                $fields[$i]["gamecode"] = $gamecode;
                $fields[$i]["image"] = $image;
                $fields[$i]["cost"] = $cost;
                $fields[$i]["maxTries"] = $maxTries;
                $fields[$i]["labelCMS"] = $labelCMS;
                $i = $i + 1;
            }

            /* close statement */
            $stmt->close();
        }
        return $fields;
    }
    
     
    
    


?>