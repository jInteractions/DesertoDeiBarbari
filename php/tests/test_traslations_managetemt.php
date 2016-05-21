<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\\traslations_management.php";
    
    
    echo "<br><h1>START TEST TRASLATIONS</h1><br>";
    echo "Test Inserimento: " . createTraslation($connection, 1, "linea 1","italian",1) . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getTraslationFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID<br>";
    foreach(getTraslationFromLineID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
    
    echo "<br><h1>END TEST TRASLATIONS</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>