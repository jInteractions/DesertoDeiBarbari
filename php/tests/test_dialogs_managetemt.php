<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\dialogs_management.php";
    
    
    echo "<br><h1>START TEST DIALOGS</h1><br>";
    echo "Test Inserimento: " . createDialog($connection, "ciao");
    echo "Test Selezione righe<br>";
    foreach(getDialogFromID($connection, 1) as $dialog )
        echo $dialog["id"] . " " . $dialog["label"] . "<br>";
    
    echo "<br><h1>END TEST DIALOGS</h1><br>";
    
    require "..\dbmanagement\dbclose.php";
?>