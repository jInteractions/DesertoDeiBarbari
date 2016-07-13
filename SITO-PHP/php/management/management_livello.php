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
		while ($stmt->fetch()) {
			$fields["idlivello"] = $idlivello;
			$fields["numero"] = $numero;
			$fields["nome"] = $nome;
			$fields["json"] = $json;
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
		while ($stmt->fetch()) {
			$fields["idlivello"] = $idlivello;
			$fields["numero"] = $numero;
			$fields["nome"] = $nome;
			$fields["json"] = $json;
		}
		$stmt->close();
	}
	return $fields;
}
?>