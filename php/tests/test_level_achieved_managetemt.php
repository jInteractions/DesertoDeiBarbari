<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\level_achieved_management.php";
    
    
    echo "<br><h1>START TEST LEVEL_ACHIEVED</h1><br>";
    echo "Test Inserimento: " . createLevelAchieved($connection, 1, 1, "test code", 11, 11) . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getLevelAchievedFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID<br>";
    foreach(getLevelAchievedFromLevelID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
    echo "Test Selezione righe da USER ID<br>";
    foreach(getLevelAchievedFromUserID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID e DIALOG ID<br>";
    foreach(getLevelAchievedFromUserIDAndLevelID($connection, 1,1) as $dialog )
        echo $dialog["id"] .  "<br>";
    
    echo "<br><h1>END TEST LEVEL_ACHIEVED</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>