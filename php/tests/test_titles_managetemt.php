<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\\titles_management.php";
    
    
    echo "<br><h1>START TEST TITLES</h1><br>";
    echo "Test Inserimento: " . createTitle($connection, 1, "test titolo","italiano") . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getTitleFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID<br>";
    foreach(getLineFromLevelID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
    
    echo "<br><h1>END TEST TITLES</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>