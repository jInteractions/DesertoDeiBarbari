<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\levels_management.php";
    
    
    echo "<br><h1>START TEST LEVELS</h1><br>";
    echo "Test Inserimento: " . createLevel($connection, 
                                                    1 ,
                                                    2 ,
                                                    "testCode" ,
                                                    1 ,
                                                    2 ,
                                                    12 ,
                                                    "ciao><a><tutti" ,
                                                    1 ,
                                                    "label1") . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getLevelFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "<br><h1>END TEST LEVELS</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>