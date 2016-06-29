<?php
/*START SEZIONE SELECT*/
function selectAllFrom_UTENTE($connection){
	 $query="SELECT email, password, tutorial, alias FROM utente ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		
		$stmt->fetch();
        $fields["email"] = $email;
        $fields["password"] = $password;
        $fields["tutorial"] = $tutorial;
        $fields["alias"] = $alias;

		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_email($connection,$value){
	 $query="SELECT email, password, tutorial, alias FROM utente WHERE email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_password($connection,$value){
	 $query="SELECT email, password, tutorial, alias FROM utente WHERE password=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_tutorial($connection,$value){
	 $query="SELECT email, password, tutorial, alias FROM utente WHERE tutorial=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_alias($connection,$value){
	 $query="SELECT email, password, tutorial, alias FROM utente WHERE alias=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectCOUNTFrom_UTENTE_By_email($connection,$value){
	 $query="SELECT COUNT(*) FROM utente WHERE email=?";
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
function selectCOUNTFrom_UTENTE_By_password($connection,$value){
	 $query="SELECT COUNT(*) FROM utente WHERE password=?";
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
function selectCOUNTFrom_UTENTE_By_tutorial($connection,$value){
	 $query="SELECT COUNT(*) FROM utente WHERE tutorial=?";
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
function selectCOUNTFrom_UTENTE_By_alias($connection,$value){
	 $query="SELECT COUNT(*) FROM utente WHERE alias=?";
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
function selectMAX_tutorial_From_UTENTE($connection,$value){
	 $query="SELECT MAX(tutorial) FROM utente ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMIN_tutorial_From_UTENTE($connection,$value){
	 $query="SELECT MIN(tutorial) FROM utente ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectAVERAGE_tutorial_From_UTENTE($connection,$value){
	 $query="SELECT AV(tutorial) FROM utente ";
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

function deleteFrom_UTENTE_By_email($connection,$value){
	$query="DELETE FROM utente WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_UTENTE_By_password($connection,$value){
	$query="DELETE FROM utente WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_UTENTE_By_tutorial($connection,$value){
	$query="DELETE FROM utente WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_UTENTE_By_alias($connection,$value){
	$query="DELETE FROM utente WHERE alias=?";
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
function insertIntoutente($connection, $label){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO utente (email, password, tutorial, alias) VALUES (?, ?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "ssss",$email, $password, $tutorial, $alias);
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
/*START SEZIONE UPDATE*/
function update_UTENTE_SET_password_WITH_email_AS_KEY($connection,$password_val,$email_val){
	$query="UPDATE utenteSET password = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_password_WITH_tutorial_AS_KEY($connection,$password_val,$tutorial_val){
	$query="UPDATE utenteSET password = ? WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$tutorial_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_password_WITH_alias_AS_KEY($connection,$password_val,$alias_val){
	$query="UPDATE utenteSET password = ? WHERE alias=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$alias_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_email_AS_KEY($connection,$tutorial_val,$email_val){
	$query="UPDATE utenteSET tutorial = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_password_AS_KEY($connection,$tutorial_val,$password_val){
	$query="UPDATE utenteSET tutorial = ? WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$password_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_alias_AS_KEY($connection,$tutorial_val,$alias_val){
	$query="UPDATE utenteSET tutorial = ? WHERE alias=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$alias_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_email_AS_KEY($connection,$alias_val,$email_val){
	$query="UPDATE utenteSET alias = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_password_AS_KEY($connection,$alias_val,$password_val){
	$query="UPDATE utenteSET alias = ? WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$password_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_tutorial_AS_KEY($connection,$alias_val,$tutorial_val){
	$query="UPDATE utenteSET alias = ? WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$tutorial_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE UPDATE*/
/**/
?>