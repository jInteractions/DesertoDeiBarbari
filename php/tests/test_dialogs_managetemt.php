<?php
    //require "..\dbmanagement\dbconfig.php"
    require "..\\dbmanagement\\dbconnection.php";
    
    require "..\\tablemanagement\dialogs_management.php";
    
    
    
    echo createDialog($connection, "ciao");
    foreach(getDialogFromID($connection, 1) as $dialog )
        echo $dialog["id"] . " " . $dialog["label"] . "<br>";
    
    
    require "..\dbmanagement\dbclose.php";
?>