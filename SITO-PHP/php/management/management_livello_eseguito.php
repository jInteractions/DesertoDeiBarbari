<?php
/*START SEZIONE SELECT*/
function selectAllFrom_LIVELLO_ESEGUITO($connection){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}


function selectFrom_LIVELLO_ESEGUITO_idlivello_name_By_email($connection,$idlivello,$email){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE idlivello=? AND email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$idlivello,$email);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		while ($stmt->fetch()) {
			$fields["email"] = $email;
			$fields["idlivello"] = $idlivello;
			$fields["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields["ondate"] = $ondate;
			$fields["punteggio"] = $punteggio;
			$fields["missili_abbattuti"] = $missili_abbattuti;
			$fields["minacce_abbattute"] = $minacce_abbattute;
			$fields["missili_lanciati"] = $missili_lanciati;
			$fields["missili_rimasti"] = $missili_rimasti;
			$fields["torrette_salvate"] = $torrette_salvate;
			$fields["morti"] = $morti;
		}
		$stmt->close();
	}
	return $fields;
}


function selectFrom_LIVELLO_ESEGUITO_By_email($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_idlivello($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE idlivello=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_file_virtuali_aggiornati($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE file_virtuali_aggiornati=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_ondate($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE ondate=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_punteggio($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE punteggio=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_abbattuti($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE missili_abbattuti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_minacce_abbattute($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE minacce_abbattute=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_lanciati($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE missili_lanciati=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_rimasti($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE missili_rimasti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_torrette_salvate($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE torrette_salvate=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_morti($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE morti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["file_virtuali_aggiornati"] = $file_virtuali_aggiornati;
			$fields[$i]["ondate"] = $ondate;
			$fields[$i]["punteggio"] = $punteggio;
			$fields[$i]["missili_abbattuti"] = $missili_abbattuti;
			$fields[$i]["minacce_abbattute"] = $minacce_abbattute;
			$fields[$i]["missili_lanciati"] = $missili_lanciati;
			$fields[$i]["missili_rimasti"] = $missili_rimasti;
			$fields[$i]["torrette_salvate"] = $torrette_salvate;
			$fields[$i]["morti"] = $morti;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_email($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE email=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_idlivello($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE idlivello=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_file_virtuali_aggiornati($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE file_virtuali_aggiornati=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_ondate($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE ondate=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_punteggio($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE punteggio=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_missili_abbattuti($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE missili_abbattuti=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_minacce_abbattute($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE minacce_abbattute=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_missili_lanciati($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE missili_lanciati=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_missili_rimasti($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE missili_rimasti=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_torrette_salvate($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE torrette_salvate=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectCOUNTFrom_LIVELLO_ESEGUITO_By_morti($connection,$value){
	 $query="SELECT COUNT(*) FROM livello_eseguito WHERE morti=?";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($max);
		$i = 0;
		$stmt->fetch(); 
		$stmt->close();
	return $max;
	}
}
function selectMAX_idlivello_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(idlivello) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_ondate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(ondate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_punteggio_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(punteggio) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_missili_abbattuti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(missili_abbattuti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_minacce_abbattute_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(minacce_abbattute) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_missili_lanciati_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(missili_lanciati) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_missili_rimasti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(missili_rimasti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_torrette_salvate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(torrette_salvate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_morti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MAX(morti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMIN_idlivello_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(idlivello) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_ondate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(ondate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_punteggio_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(punteggio) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_missili_abbattuti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(missili_abbattuti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_minacce_abbattute_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(minacce_abbattute) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_missili_lanciati_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(missili_lanciati) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_missili_rimasti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(missili_rimasti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_torrette_salvate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(torrette_salvate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_morti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT MIN(morti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectAVERAGE_idlivello_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(idlivello) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_ondate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(ondate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_punteggio_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(punteggio) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_missili_abbattuti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(missili_abbattuti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_minacce_abbattute_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(minacce_abbattute) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_missili_lanciati_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(missili_lanciati) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_missili_rimasti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(missili_rimasti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_torrette_salvate_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(torrette_salvate) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_morti_From_LIVELLO_ESEGUITO($connection,$value){
	 $query="SELECT AV(morti) FROM livello_eseguito ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}

/*END SEZIONE SELECT*/


/*START SEZIONE DELETE*/

function deleteFrom_LIVELLO_ESEGUITO_By_email($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_idlivello($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_file_virtuali_aggiornati($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_ondate($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_punteggio($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_missili_abbattuti($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_minacce_abbattute($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_missili_lanciati($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_missili_rimasti($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_torrette_salvate($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_ESEGUITO_By_morti($connection,$value){
	$query="DELETE FROM livello_eseguito WHERE morti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE DELETE*/

/*START SEZIONE INSERT*/
function insertIntolivello_eseguito($connection, $label){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO livello_eseguito (email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "sssssssssss",$email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		/* execute query */   
		if (!$stmt->execute() && $debug) {
			echo $stmt->error;
			echo $stmt->errno;
			return -1;
		}
		//echo mysqli_stmt_insert_id($stmt);
		$id = $stmt->insert_id;
		/* close statement */
		mysqli_stmt_close($stmt);
		//operazione conclusa con successo
		return $id;
	}
	else{
	}
}/*END SEZIONE INSERT*/

function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_idlivello_email_AS_KEYS($connection,$file_virtuali_aggiornati_val,$idlivello,$email){
	$query="UPDATE livello_eseguito SET file_virtuali_aggiornati = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$file_virtuali_aggiornati_val,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_ondate_WITH_idlivello_email_AS_KEYS($connection,$ondate,$idlivello,$email){
	$query="UPDATE livello_eseguito SET ondate = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$ondate,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_idlivello_email_AS_KEYS($connection,$punteggio,$idlivello,$email){
	$query="UPDATE livello_eseguito SET punteggio = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$punteggio,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_idlivello_email_AS_KEYS($connection,$minacce_abbattute,$idlivello,$email){
	$query="UPDATE livello_eseguito SET minacce_abbattute = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$minacce_abbattute,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_idlivello_email_AS_KEYS($connection,$missili_lanciati,$idlivello,$email){
	$query="UPDATE livello_eseguito SET missili_lanciati = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$missili_lanciati,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_idlivello_email_AS_KEYS($connection,$missili_rimasti,$idlivello,$email){
	$query="UPDATE livello_eseguito SET missili_rimasti = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$missili_rimasti,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_idlivello_email_AS_KEYS($connection,$torrette_salvate,$idlivello,$email){
	$query="UPDATE livello_eseguito SET torrette_salvate = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$torrette_salvate,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_idlivello_email_AS_KEYS($connection,$missili_abbattuti,$idlivello,$email){
	$query="UPDATE livello_eseguito SET missili_abbattuti = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$missili_abbattuti,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_email_idLivello_AS_KEY($connection,$punteggio,$idlivello,$email){
	$query="UPDATE livello_eseguito SET punteggio = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$punteggio,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE UPDATE*/
/**/
?>