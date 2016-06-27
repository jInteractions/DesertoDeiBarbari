<?php
$str = file_get_contents('./livello_test.json');
$json = json_decode($str,true);
//echo '<pre>' . print_r($json, true) . '</pre>';
//echo '<pre>' . print_r($json["fileVirtuali"], true) . '</pre>';
//       echo json_last_error_msg() ;
$ser = serialize($json);


echo '<pre>' . print_r(unserialize($ser)["fileVirtuali"], true) . '</pre>';
?>