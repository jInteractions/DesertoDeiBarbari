<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\\users_management.php";
    
    $pass = "ZioTartacchia";
    $email = "1@1.1";
    $user = "tartacchia";
    $data = "1414-14-14";
    echo "<br><h1>START TEST USERS</h1><br>";
    echo "Test Inserimento: " . createuser($connection, $email, $user, $data, $pass) . "<br>";
                        
    echo "Test LonIn Username: ";
    echo userLoginMD5($connection, $user, $pass);
                        
    echo "<br>Test LonIn Email: ";
    echo userLoginMD5($connection, $email, $pass);
                        
    echo "<br><h1>END TEST USERS</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>