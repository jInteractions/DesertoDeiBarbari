<?php
/*START SEZIONE SELECT*/
function selectAllFrom_UTENTE($connection){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_email($connection,$value){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente WHERE email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_password($connection,$value){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente WHERE password=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_tutorial($connection,$value){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente WHERE tutorial=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_morti($connection,$value){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente WHERE morti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
			$fields[$i]["alias"] = $alias;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_UTENTE_By_alias($connection,$value){
	 $query="SELECT email, password, tutorial, morti, alias FROM utente WHERE alias=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $morti, $alias);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["email"] = $email;
			$fields[$i]["password"] = $password;
			$fields[$i]["tutorial"] = $tutorial;
			$fields[$i]["morti"] = $morti;
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
function selectCOUNTFrom_UTENTE_By_morti($connection,$value){
	 $query="SELECT COUNT(*) FROM utente WHERE morti=?";
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
function selectMAX_morti_From_UTENTE($connection,$value){
	 $query="SELECT MAX(morti) FROM utente ";
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
function selectMIN_morti_From_UTENTE($connection,$value){
	 $query="SELECT MIN(morti) FROM utente ";
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
function selectAVERAGE_morti_From_UTENTE($connection,$value){
	 $query="SELECT AV(morti) FROM utente ";
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
function deleteFrom_UTENTE_By_morti($connection,$value){
	$query="DELETE FROM utente WHERE morti=?";
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
function insertIntoutente($connection,$email, $password, $tutorial, $morti, $alias){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO utente (email, password, tutorial, morti, alias) VALUES (?, ?, ?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "sssss",$email, $password, $tutorial, $morti, $alias);
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
	$query="UPDATE utente SET password = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_password_WITH_tutorial_AS_KEY($connection,$password_val,$tutorial_val){
	$query="UPDATE utente SET password = ? WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$tutorial_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_password_WITH_morti_AS_KEY($connection,$password_val,$morti_val){
	$query="UPDATE utente SET password = ? WHERE morti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$morti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_password_WITH_alias_AS_KEY($connection,$password_val,$alias_val){
	$query="UPDATE utente SET password = ? WHERE alias=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$password_val,$alias_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_email_AS_KEY($connection,$tutorial_val,$email_val){
	$query="UPDATE utente SET tutorial = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_password_AS_KEY($connection,$tutorial_val,$password_val){
	$query="UPDATE utente SET tutorial = ? WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$password_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_morti_AS_KEY($connection,$tutorial_val,$morti_val){
	$query="UPDATE utente SET tutorial = ? WHERE morti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$morti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_tutorial_WITH_alias_AS_KEY($connection,$tutorial_val,$alias_val){
	$query="UPDATE utente SET tutorial = ? WHERE alias=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$tutorial_val,$alias_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_morti_WITH_email_AS_KEY($connection,$morti_val,$email_val){
	$query="UPDATE utente SET morti = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$morti_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_morti_WITH_password_AS_KEY($connection,$morti_val,$password_val){
	$query="UPDATE utente SET morti = ? WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$morti_val,$password_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_morti_WITH_tutorial_AS_KEY($connection,$morti_val,$tutorial_val){
	$query="UPDATE utente SET morti = ? WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$morti_val,$tutorial_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_morti_WITH_alias_AS_KEY($connection,$morti_val,$alias_val){
	$query="UPDATE utente SET morti = ? WHERE alias=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$morti_val,$alias_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_email_AS_KEY($connection,$alias_val,$email_val){
	$query="UPDATE utente SET alias = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_password_AS_KEY($connection,$alias_val,$password_val){
	$query="UPDATE utente SET alias = ? WHERE password=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$password_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_tutorial_AS_KEY($connection,$alias_val,$tutorial_val){
	$query="UPDATE utente SET alias = ? WHERE tutorial=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$tutorial_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_UTENTE_SET_alias_WITH_morti_AS_KEY($connection,$alias_val,$morti_val){
	$query="UPDATE utente SET alias = ? WHERE morti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$alias_val,$morti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE UPDATE*/
/**/
?>