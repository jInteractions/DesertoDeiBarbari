<?php
    function createuser($connection, $email, $username, $dateofbirth, $password){
        /* create a prepared statement */
        if($password != ""){
            if ($stmt = $connection->prepare( 'INSERT INTO `desertodeibarbari`.`users` ( `username`, `email`,  `bornDate`, `psw`) VALUE (?,?,?,?)')) {

                //in caso la data non sia stata inserita
                $date = date('Y-m-d'); 
                $none = "none";
                $email = ($email == "" ? $none : $email) ;
                $dateofbirth =($dateofbirth == "" ? $date : $dateofbirth);
                $username = ($username == "" ? $none : $username);
                $pass = md5(md5($password));
                /* bind parameters for markers */
                $stmt->bind_param( "ssds", 
                $username,
                $email,
                $dateofbirth,
                $pass);

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
        }else
            return -1;
    }
    
    function searchUserByEmail($connection, $email){
    }
    
    function searchUserByUsername($connection, $username){
    }
    
    function userLoginMD5($connection, $usernameOrEmail, $password){
        if ($stmt = $connection->prepare("SELECT idUser FROM users WHERE psw=? AND (email=? OR username=?)")) {
            $crypt = md5(md5($password));
            $stmt->bind_param( "sss", 
                $crypt,
                $usernameOrEmail,
                $usernameOrEmail
                );
            $id = -1;
            
              if (!$stmt->execute() && $debug) {
                    echo $stmt->error;
                    echo $stmt->errno;
                    return -1;
                }
            mysqli_stmt_execute($stmt);

            
            mysqli_stmt_bind_result($stmt, $id);

            
            mysqli_stmt_fetch($stmt);

            
            mysqli_stmt_close($stmt);
                        
            return $id;

        }
    }


?>