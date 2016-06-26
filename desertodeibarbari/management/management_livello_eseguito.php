<?php
/*START SEZIONE SELECT*/
function selectFrom_LIVELLO_ESEGUITO_idlivello_name_By_email($connection,$email){ 
	$query="SELECT livello.idlivello, livello.nome FROM livello_eseguito,livello WHERE livello.idlivello = livello_eseguito.idlivello  AND email=?"; 
	//echo $query;
	$fields = []; 
	if ($stmt = $connection->prepare($query)) { 
		$stmt->bind_param( "s",$email); 
		$stmt->execute(); 
		$stmt->bind_result($idlivello, $name); 
		$i = 0; 
		while ($stmt->fetch()) { 
			$fields[$i]["idlivello"] = $idlivello; 
			$fields[$i]["name"] = $name; 
			$i = $i + 1; 
		} 
		$stmt->close(); 
	}else
		echo "error";
	return $fields; 
}



function selectAllFrom_LIVELLO_ESEGUITO($connection){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito ";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_email($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE email=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_idlivello($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE idlivello=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_file_virtuali_aggiornati($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE file_virtuali_aggiornati=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_ondate($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE ondate=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_punteggio($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE punteggio=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_abbattuti($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE missili_abbattuti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_minacce_abbattute($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE minacce_abbattute=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_lanciati($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE missili_lanciati=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_missili_rimasti($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE missili_rimasti=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
			$i = $i + 1;
		}
		$stmt->close();
	}
	return $fields;
}
function selectFrom_LIVELLO_ESEGUITO_By_torrette_salvate($connection,$value){
	 $query="SELECT email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate FROM livello_eseguito WHERE torrette_salvate=?";
 	$fields = [];
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "s",$value);
		$stmt->execute();
		$stmt->bind_result($email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
/*END SEZIONE DELETE*/

/*START SEZIONE INSERT*/
function insertIntolivello_eseguito($connection, $label){	/* create a prepared statement */
	if ($stmt = $connection->prepare( 'INSERT INTO livello_eseguito (email, idlivello, file_virtuali_aggiornati, ondate, punteggio, missili_abbattuti, minacce_abbattute, missili_lanciati, missili_rimasti, torrette_salvate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')) {
		/* bind parameters for markers */
		$stmt->bind_param( "ssssssssss",$email, $idlivello, $file_virtuali_aggiornati, $ondate, $punteggio, $missili_abbattuti, $minacce_abbattute, $missili_lanciati, $missili_rimasti, $torrette_salvate);
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
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_email_AS_KEY($connection,$file_virtuali_aggiornati_val,$email_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_idlivello_AS_KEY($connection,$file_virtuali_aggiornati_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_ondate_AS_KEY($connection,$file_virtuali_aggiornati_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_punteggio_AS_KEY($connection,$file_virtuali_aggiornati_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_missili_abbattuti_AS_KEY($connection,$file_virtuali_aggiornati_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_minacce_abbattute_AS_KEY($connection,$file_virtuali_aggiornati_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_missili_lanciati_AS_KEY($connection,$file_virtuali_aggiornati_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_missili_rimasti_AS_KEY($connection,$file_virtuali_aggiornati_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_file_virtuali_aggiornati_WITH_torrette_salvate_AS_KEY($connection,$file_virtuali_aggiornati_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET file_virtuali_aggiornati = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$file_virtuali_aggiornati_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_email_AS_KEY($connection,$ondate_val,$email_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_idlivello_AS_KEY($connection,$ondate_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_file_virtuali_aggiornati_AS_KEY($connection,$ondate_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_punteggio_AS_KEY($connection,$ondate_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_missili_abbattuti_AS_KEY($connection,$ondate_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_minacce_abbattute_AS_KEY($connection,$ondate_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_missili_lanciati_AS_KEY($connection,$ondate_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_missili_rimasti_AS_KEY($connection,$ondate_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_ondate_WITH_torrette_salvate_AS_KEY($connection,$ondate_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET ondate = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$ondate_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_email_AS_KEY($connection,$punteggio_val,$email_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_idlivello_AS_KEY($connection,$punteggio_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_file_virtuali_aggiornati_AS_KEY($connection,$punteggio_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_ondate_AS_KEY($connection,$punteggio_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_missili_abbattuti_AS_KEY($connection,$punteggio_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_minacce_abbattute_AS_KEY($connection,$punteggio_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_missili_lanciati_AS_KEY($connection,$punteggio_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_missili_rimasti_AS_KEY($connection,$punteggio_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_punteggio_WITH_torrette_salvate_AS_KEY($connection,$punteggio_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET punteggio = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$punteggio_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_email_AS_KEY($connection,$missili_abbattuti_val,$email_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_idlivello_AS_KEY($connection,$missili_abbattuti_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_file_virtuali_aggiornati_AS_KEY($connection,$missili_abbattuti_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_ondate_AS_KEY($connection,$missili_abbattuti_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_punteggio_AS_KEY($connection,$missili_abbattuti_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_minacce_abbattute_AS_KEY($connection,$missili_abbattuti_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_missili_lanciati_AS_KEY($connection,$missili_abbattuti_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_missili_rimasti_AS_KEY($connection,$missili_abbattuti_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_abbattuti_WITH_torrette_salvate_AS_KEY($connection,$missili_abbattuti_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET missili_abbattuti = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_abbattuti_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_email_AS_KEY($connection,$minacce_abbattute_val,$email_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_idlivello_AS_KEY($connection,$minacce_abbattute_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_file_virtuali_aggiornati_AS_KEY($connection,$minacce_abbattute_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_ondate_AS_KEY($connection,$minacce_abbattute_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_punteggio_AS_KEY($connection,$minacce_abbattute_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_missili_abbattuti_AS_KEY($connection,$minacce_abbattute_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_missili_lanciati_AS_KEY($connection,$minacce_abbattute_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_missili_rimasti_AS_KEY($connection,$minacce_abbattute_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_minacce_abbattute_WITH_torrette_salvate_AS_KEY($connection,$minacce_abbattute_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET minacce_abbattute = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$minacce_abbattute_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_email_AS_KEY($connection,$missili_lanciati_val,$email_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_idlivello_AS_KEY($connection,$missili_lanciati_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_file_virtuali_aggiornati_AS_KEY($connection,$missili_lanciati_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_ondate_AS_KEY($connection,$missili_lanciati_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_punteggio_AS_KEY($connection,$missili_lanciati_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_missili_abbattuti_AS_KEY($connection,$missili_lanciati_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_minacce_abbattute_AS_KEY($connection,$missili_lanciati_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_missili_rimasti_AS_KEY($connection,$missili_lanciati_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_lanciati_WITH_torrette_salvate_AS_KEY($connection,$missili_lanciati_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET missili_lanciati = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_lanciati_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_email_AS_KEY($connection,$missili_rimasti_val,$email_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_idlivello_AS_KEY($connection,$missili_rimasti_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_file_virtuali_aggiornati_AS_KEY($connection,$missili_rimasti_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_ondate_AS_KEY($connection,$missili_rimasti_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_punteggio_AS_KEY($connection,$missili_rimasti_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_missili_abbattuti_AS_KEY($connection,$missili_rimasti_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_minacce_abbattute_AS_KEY($connection,$missili_rimasti_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_missili_lanciati_AS_KEY($connection,$missili_rimasti_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_missili_rimasti_WITH_torrette_salvate_AS_KEY($connection,$missili_rimasti_val,$torrette_salvate_val){
	$query="UPDATE livello_eseguitoSET missili_rimasti = ? WHERE torrette_salvate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$missili_rimasti_val,$torrette_salvate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_email_AS_KEY($connection,$torrette_salvate_val,$email_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE email=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$email_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_idlivello_AS_KEY($connection,$torrette_salvate_val,$idlivello_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE idlivello=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$idlivello_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_file_virtuali_aggiornati_AS_KEY($connection,$torrette_salvate_val,$file_virtuali_aggiornati_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE file_virtuali_aggiornati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$file_virtuali_aggiornati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_ondate_AS_KEY($connection,$torrette_salvate_val,$ondate_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE ondate=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$ondate_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_punteggio_AS_KEY($connection,$torrette_salvate_val,$punteggio_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE punteggio=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$punteggio_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_missili_abbattuti_AS_KEY($connection,$torrette_salvate_val,$missili_abbattuti_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE missili_abbattuti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$missili_abbattuti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_minacce_abbattute_AS_KEY($connection,$torrette_salvate_val,$minacce_abbattute_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE minacce_abbattute=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$minacce_abbattute_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_missili_lanciati_AS_KEY($connection,$torrette_salvate_val,$missili_lanciati_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE missili_lanciati=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$missili_lanciati_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
function update_LIVELLO_ESEGUITO_SET_torrette_salvate_WITH_missili_rimasti_AS_KEY($connection,$torrette_salvate_val,$missili_rimasti_val){
	$query="UPDATE livello_eseguitoSET torrette_salvate = ? WHERE missili_rimasti=?";
	$result = 0;
	if ($stmt = $connection->prepare($query)) {
		$stmt->bind_param( "ss",$torrette_salvate_val,$missili_rimasti_val);
		$result = $stmt->execute();
		$stmt->close();
	}
	return $result;
}
/*END SEZIONE UPDATE*/
/**/
?>