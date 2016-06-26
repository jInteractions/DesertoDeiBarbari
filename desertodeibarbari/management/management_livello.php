<?php
/*START SEZIONE SELECT*/
function selectAllFrom_LIVELLO($connection){
	 $query="SELECT idlivello, numero, nome, json FROM livello ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($idlivello, $numero, $nome, $json);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["numero"] = $numero;
			$fields[$i]["nome"] = $nome;
			$fields[$i]["json"] = $json;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_By_idlivello($connection,$value){
	 $query="SELECT idlivello, numero, nome, json FROM livello WHERE idlivello=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($idlivello, $numero, $nome, $json);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["numero"] = $numero;
			$fields[$i]["nome"] = $nome;
			$fields[$i]["json"] = $json;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_By_numero($connection,$value){
	 $query="SELECT idlivello, numero, nome, json FROM livello WHERE numero=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($idlivello, $numero, $nome, $json);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["numero"] = $numero;
			$fields[$i]["nome"] = $nome;
			$fields[$i]["json"] = $json;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_By_nome($connection,$value){
	 $query="SELECT idlivello, numero, nome, json FROM livello WHERE nome=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($idlivello, $numero, $nome, $json);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["numero"] = $numero;
			$fields[$i]["nome"] = $nome;
			$fields[$i]["json"] = $json;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_By_json($connection,$value){
	 $query="SELECT idlivello, numero, nome, json FROM livello WHERE json=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($idlivello, $numero, $nome, $json);
		$i = 0;
		while ($stmt->fetch()) {
			$fields[$i]["idlivello"] = $idlivello;
			$fields[$i]["numero"] = $numero;
			$fields[$i]["nome"] = $nome;
			$fields[$i]["json"] = $json;
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectCOUNTFrom_LIVELLO_By_idlivello($connection,$value){
	 $query="SELECT COUNT(*) FROM livello WHERE idlivello=?";
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
function selectCOUNTFrom_LIVELLO_By_numero($connection,$value){
	 $query="SELECT COUNT(*) FROM livello WHERE numero=?";
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
function selectCOUNTFrom_LIVELLO_By_nome($connection,$value){
	 $query="SELECT COUNT(*) FROM livello WHERE nome=?";
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
function selectCOUNTFrom_LIVELLO_By_json($connection,$value){
	 $query="SELECT COUNT(*) FROM livello WHERE json=?";
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
function selectMAX_idlivello_From_LIVELLO($connection,$value){
	 $query="SELECT MAX(idlivello) FROM livello ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMAX_numero_From_LIVELLO($connection,$value){
	 $query="SELECT MAX(numero) FROM livello ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($max);
		$stmt->fetch(); 
		$stmt->close();
		return $max;
	}
	return NULL;
}
function selectMIN_idlivello_From_LIVELLO($connection,$value){
	 $query="SELECT MIN(idlivello) FROM livello ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectMIN_numero_From_LIVELLO($connection,$value){
	 $query="SELECT MIN(numero) FROM livello ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($min);
		$stmt->fetch(); 
		$stmt->close();
		return $min;
	}
	return NULL;
}
function selectAVERAGE_idlivello_From_LIVELLO($connection,$value){
	 $query="SELECT AV(idlivello) FROM livello ";
 	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($av);
		$stmt->fetch(); 
		$stmt->close();
		return $av;
	}
	return NULL;
}
function selectAVERAGE_numero_From_LIVELLO($connection,$value){
	 $query="SELECT AV(numero) FROM livello ";
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

function deleteFrom_LIVELLO_By_idlivello($connection,$value){
	$query="DELETE FROM livello WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_By_numero($connection,$value){
	$query="DELETE FROM livello WHERE numero=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_By_nome($connection,$value){
	$query="DELETE FROM livello WHERE nome=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function deleteFrom_LIVELLO_By_json($connection,$value){
	$query="DELETE FROM livello WHERE json=?";
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
function insertIntolivello($connection, $label){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO livello (numero, nome, json) VALUES (?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "sss",$numero, $nome, $json);
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
function update_LIVELLO_SET_numero_WITH_idlivello_AS_KEY($connection,$numero_val,$idlivello_val){
	$query="UPDATE livelloSET numero = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$numero_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_numero_WITH_nome_AS_KEY($connection,$numero_val,$nome_val){
	$query="UPDATE livelloSET numero = ? WHERE nome=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$numero_val,$nome_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_numero_WITH_json_AS_KEY($connection,$numero_val,$json_val){
	$query="UPDATE livelloSET numero = ? WHERE json=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$numero_val,$json_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_nome_WITH_idlivello_AS_KEY($connection,$nome_val,$idlivello_val){
	$query="UPDATE livelloSET nome = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$nome_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_nome_WITH_numero_AS_KEY($connection,$nome_val,$numero_val){
	$query="UPDATE livelloSET nome = ? WHERE numero=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$nome_val,$numero_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_nome_WITH_json_AS_KEY($connection,$nome_val,$json_val){
	$query="UPDATE livelloSET nome = ? WHERE json=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$nome_val,$json_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_json_WITH_idlivello_AS_KEY($connection,$json_val,$idlivello_val){
	$query="UPDATE livelloSET json = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$json_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_json_WITH_numero_AS_KEY($connection,$json_val,$numero_val){
	$query="UPDATE livelloSET json = ? WHERE numero=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$json_val,$numero_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_SET_json_WITH_nome_AS_KEY($connection,$json_val,$nome_val){
	$query="UPDATE livelloSET json = ? WHERE nome=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$json_val,$nome_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE UPDATE*/
/**/
?>