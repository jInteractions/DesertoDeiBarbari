<?php
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

function selectFrom_LIVELLO_ESEGUITO_By_idlivello_email($connection,$idlivello,$email){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti FROM livello_eseguito WHERE idlivello=? AND email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss", $idlivello, $email);
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

function update_LIVELLO_ESEGUITO_SET_morti_WITH_idlivello_email_AS_KEYS($connection,$morti,$idlivello,$email){
	$query="UPDATE livello_eseguito SET morti = ? WHERE idlivello=? AND email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "sss",$morti,$idlivello,$email);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}

function select_file_virtuali_aggiornati_From_LIVELLO_ESEGUITO_By_idlivello_email($connection,$idlivello,$email){
  $query="SELECT file_virtuali_aggiornati FROM livello_eseguito WHERE idlivello=? AND email=?";
 	$risultato;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$idlivello,$email);
		$stmt->execute();
		$stmt->bind_result($file_virtuali_aggiornati);
		while ($stmt->fetch()) {
			$risultato = $file_virtuali_aggiornati;
		}
		$stmt->close();
	}
	return $risultato;
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

function insertIntolivello_eseguito($connection, $email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO livello_eseguito (email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate, morti) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "sssssssssss",$email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate, $morti);
		/* execute query */   
		if (!$stmt->execute() && $debug) {
			echo "Errore ".$stmt->error;
			echo $stmt->errno;
			return -1;
		}
		//echo mysqli_stmt_insert_id($stmt);
		/* close statement */
		$stmt->close();
		//operazione conclusa con successo
		return "OK";
	}
	else{
	}
}

function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_idlivello_email_AS_KEYS($connection,$file_virtuali_aggiornati_val,$idlivello,$email){
	$query="UPDATE livello_eseguito SET file_virtuali_aggiornati=? WHERE idlivello=? AND email=?";
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

?>