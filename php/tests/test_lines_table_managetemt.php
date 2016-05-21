<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\lines_table_management.php";
    
    
    echo "<br><h1>START TEST LINES_TABLE</h1><br>";
    echo "Test Inserimento: " . createLine($connection, 1, 1,1) . "<br>";
                        
    echo "Test Selezione righe da ID<br>";
    foreach(getLineFromID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
                        
    echo "Test Selezione righe da DIALOG ID<br>";
    foreach(getLineFromDialogID($connection, "1") as $dialog )
        echo $dialog["id"] .  "<br>";
    
    echo "<br><h1>END TEST LINES_TABLE</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>