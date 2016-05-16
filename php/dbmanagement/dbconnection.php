<?php
    require "dbconfig.php";
    
    $link = mysqli_connect("localhost", "root", "root", "desertodeibarbari");

    /* check connection */
    if (mysqli_connect_errno()) {
        if($debug)
            printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }else{
        if($debug)
            echo "connection established!!!";
    }



?>