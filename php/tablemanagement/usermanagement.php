<?php
    function createuser($connection, $email, $username, $dateofbirth, $password){
        /* create a prepared statement */
        if($password != ""){
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`users` ( `username`, `email`,  `bornDate`, `pass`) VALUE (?,?,?,?)')) {

                //in caso la data non sia stata inserita
                $date = date('Y-m-d'); 
                /* bind parameters for markers */
                $stmt->bind_param( "sdss", 
                $email == "" ? "none" : $email, 
                $dateofbirth == "" ? $date : $dateofbirth, 
                $username == "" ? "none" : $username, 
                md5(md5($password)));

                /* execute query */   
                if (!$stmt->execute() && $debug) {
                    echo $stmt->error;
                    echo $stmt->errno;
                    return -1;
                }

                //echo mysqli_stmt_insert_id($stmt);
                /* close statement */
                mysqli_stmt_close($stmt);
                //operazione conclusa con successo
                return 1;
            }
            else{
                //echo "IT'S A BUGGGGG!!!!";  
            }
        }else
            return -1;
    }
    
    function searchUserByEmail($connection, $email){
    }
    
    function searchUserByUsername($connection, $username){
    }
    
    function userLoginMD5($connection, $usernameOrEmail, $password){
        if ($stmt = mysqli_prepare($link, "SELECT idUser FROM users WHERE psw=? AND (email=? OR username=?)")) {
            $stmt->bind_param( "sdss", 
                md5(md5($password))
                $email == "" ? "none" : $email, 
                $username == "" ? "none" : $username 
                );
            $id = -1;
            
            $stmt->execute();
            
            mysqli_stmt_execute($stmt);

            
            mysqli_stmt_bind_result($stmt, $id);

            
            mysqli_stmt_fetch($stmt);

            
            mysqli_stmt_close($stmt);
                        
            return $id;

        }
    }


?>