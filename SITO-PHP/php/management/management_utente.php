<?php
function selectAllFrom_UTENTE($connection){
	 $query="SELECT email, password, tutorial, alias FROM utente ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
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

function selectFrom_UTENTE_By_email($connection,$value){
	 $query="SELECT email, password, tutorial, alias FROM utente WHERE email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $password, $tutorial, $alias);
		while ($stmt->fetch()) {
			$fields["email"] = $email;
			$fields["password"] = $password;
			$fields["tutorial"] = $tutorial;
			$fields["alias"] = $alias;
		}
		$stmt->close();
	}
	return $fields;
}

function insertIntoutente($connection, $email, $password, $tutorial, $alias){	
	if ($stmt = $connection->prepare( 'INSERT INTO utente (email, password, tutorial, alias) VALUES (?, ?, ?, ?)')) {
		$stmt->bind_param( "ssss",$email, $password, $tutorial, $alias);
		if (!$stmt->execute() && $debug) {
			echo $stmt->error;
			echo $stmt->errno;
			return -1;
		}
		$id = $stmt->insert_id;
		mysqli_stmt_close($stmt);
		return $id;
	}
	else{
	}
}

function update_UTENTE_SET_tutorial_WITH_email_AS_KEY($connection,$email_val){
	$query="UPDATE utente SET tutorial = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "is", $uno = 1,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $email_val;
}
?>