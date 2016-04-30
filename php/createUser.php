<?php
try{
    $email = $_GET["email"]; 
    $dateofbirth = $_GET["date"];  
    $username = $_GET["username"];  
    $password = md5(md5($_GET["pass"]));


                            //host      user    passs   DB
    $link = mysqli_connect("localhost", "root", "root", "desertodeibarbari");

    /* check connection */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }else{
        
        //echo "connection established!!!";
    }
        /* create a prepared statement */
        if ($stmt = $link->prepare( 'INSERT INTO `desertodeibarbari`.`users` ( `username`, `email`,  `bornDate`, `pass`) VALUE (?,?,?,?)')) {

            //in caso la data non sia stata inserita
            $date = date('Y-m-d'); 
            /* bind parameters for markers */
            $stmt->bind_param( "sdss", $email == "" ? "none" : $email, $dateofbirth == "" ? $date : $dateofbirth, $username == "" ? "none" : $username, $password == "" ? "none" : $password);

            /* execute query */   
            if (!$stmt->execute()) {
                throw new Exception($stmt->error, $stmt->errno);
            }

            //echo mysqli_stmt_insert_id($stmt);
            /* close statement */
            mysqli_stmt_close($stmt);
            echo "correct";
        }
        else{
            //echo "IT'S A BUGGGGG!!!!";  
        }

        /* close connection */
        mysqli_close($link);

    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
?>