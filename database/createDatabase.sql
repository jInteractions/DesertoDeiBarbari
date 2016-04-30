CREATE TABLE actual_level (
  idactual_level INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  levels_idlevel INTEGER UNSIGNED NOT NULL,
  Users_idUser INTEGER UNSIGNED NOT NULL,
  savedCode LONGTEXT NULL,
  PRIMARY KEY(idactual_level),
  INDEX actual_level_FKIndex1(Users_idUser),
  INDEX actual_level_FKIndex2(levels_idlevel)
);

CREATE TABLE jsons (
  idjson INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  levels_idlevel INTEGER UNSIGNED NOT NULL,
  path VARCHAR(255) NOT NULL,
  language VARCHAR(45) NOT NULL,
  PRIMARY KEY(idjson),
  INDEX jsons_FKIndex1(levels_idlevel)
);

CREATE TABLE levels (
  idlevel INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nextLevel INTEGER UNSIGNED NOT NULL,
  nextLevelFail INTEGER UNSIGNED NULL,
  title VARCHAR(20) NOT NULL,
  points INTEGER UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY(idlevel)
);

CREATE TABLE Users (
  idUser INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(70) NOT NULL,
  email VARCHAR(255) NOT NULL,
  creationDate DATETIME NOT NULL,
  bornDate DATE NOT NULL,
  password_2 VARCHAR(255) NULL,
  PRIMARY KEY(idUser)
);


