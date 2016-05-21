<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\helps_management.php";
    
    
    echo "<br><h1>START TEST HELPS</h1><br>";
    echo "Test Inserimento: " . createHelp($connection, 
                        "1", 
                        "1", 
                        "1", 
                        "test game code", 
                        "no image", 
                        12, 
                        3, 
                        "test label") . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getHelpFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID<br>";
    foreach(getHelpFromLevelID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da LEVEL ID e DIALOG ID<br>";
    foreach(getHelpFromLevelIDAndDialogID($connection, 1,1) as $dialog )
        echo $dialog["id"] .  "<br>";
    
    echo "<br><h1>END TEST HELPS</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>