DROP TABLE IF EXISTS utente;
CREATE TABLE utente(

	email varchar(250) NOT NULL PRIMARY KEY ,
	password varchar(250) NOT NULL,
	tutorial int NOT NULL DEFAULT 0,
	morti INT NOT NULL DEFAULT 0,
	alias varchar(100) NOT NULL
);

DROP TABLE IF EXISTS livello;
CREATE TABLE livello(
	idlivello INT PRIMARY KEY AUTO_INCREMENT,
	numero INT NOT NULL,
	nome varchar(250) NOT NULL,
	json TEXT NOT NULL
);

DROP TABLE IF EXISTS livello_eseguito;
CREATE TABLE livello_eseguito(
	email varchar(250) NOT NULL,
	idlivello INT NOT NULL,
	file_virtuali_aggiornati TEXT NOT NULL,
	ondate	INT NOT NULL DEFAULT 0,
	punteggio INT NOT NULL DEFAULT 0,
	missili_abbattuti INT NOT NULL DEFAULT 0,
	minacce_abbattute INT NOT NULL DEFAULT 0,
	missili_lanciati INT NOT NULL DEFAULT 0,
	missili_rimasti INT NOT NULL DEFAULT 0,
	torrette_salvate INT NOT NULL DEFAULT 0,
	FOREIGN KEY (idlivello) REFERENCES livello(idlivello),
	FOREIGN KEY (email) REFERENCES utente(email),
  PRIMARY KEY (email,idlivello)
);