DROP TABLE IF EXISTS dialogs;
CREATE TABLE dialogs (
  iddialog INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  labelCMS VARCHAR(100) NULL,
  PRIMARY KEY(iddialog)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  idUser INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(70) NOT NULL,
  email VARCHAR(255) NOT NULL,
  creationDate DATETIME NOT NULL,
  bornDate DATE NOT NULL,
  psw VARCHAR(255) NULL,
  note LONGTEXT NULL,
  PRIMARY KEY(idUser)
);

DROP TABLE IF EXISTS lines_table;
CREATE TABLE lines_table (
  idline INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  dialogs_iddialog INTEGER UNSIGNED NOT NULL,
  position INTEGER UNSIGNED NULL,
  ucharacter VARCHAR(150) NULL,
  PRIMARY KEY(idline),
  FOREIGN KEY (dialogs_iddialog) REFERENCES dialogs(iddialog)
);



DROP TABLE IF EXISTS levels;
CREATE TABLE levels (
  idlevel INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  gamecode LONGTEXT NOT NULL,
  idStartDialog INTEGER UNSIGNED NULL,
  idEndDialog INTEGER UNSIGNED NULL,
  badKeywords LONGTEXT NULL,
  start_point INTEGER UNSIGNED NULL DEFAULT 0,
  labelCMS VARCHAR(100) NULL,
  PRIMARY KEY(idlevel),
  FOREIGN KEY (idStartDialog) REFERENCES dialogs(iddialog),
  FOREIGN KEY (idEndDialog) REFERENCES dialogs(iddialog)
);

DROP TABLE IF EXISTS helps;
CREATE TABLE helps (
  idhelp INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  dialogs_iddialog INTEGER UNSIGNED NOT NULL,
  levels_idlevel INTEGER UNSIGNED NOT NULL,
  position INTEGER UNSIGNED NOT NULL,
  gamecode LONGTEXT NULL,
  image VARCHAR(150) NULL,
  cost INTEGER UNSIGNED NULL,
  maxTries INTEGER UNSIGNED NULL,
  labelCMS VARCHAR(100) NULL,
  PRIMARY KEY(idhelp),
  FOREIGN KEY (levels_idlevel) REFERENCES levels(idlevel),
  FOREIGN KEY (dialogs_iddialog) REFERENCES dialogs(iddialog)
);


DROP TABLE IF EXISTS level_achieved;
CREATE TABLE level_achieved (
  idlevel_achieved INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  levels_idlevel INTEGER UNSIGNED NOT NULL,
  Users_idUser INTEGER UNSIGNED NOT NULL,
  savedCode LONGTEXT NULL,
  points INTEGER UNSIGNED NULL DEFAULT 0,
  population INTEGER UNSIGNED NULL,
  PRIMARY KEY(idlevel_achieved),
  FOREIGN KEY (levels_idlevel) REFERENCES levels(idlevel),
  FOREIGN KEY (Users_idUser) REFERENCES users(idUser)
);


DROP TABLE IF EXISTS titles;
CREATE TABLE titles (
  idtitle INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  levels_idlevel INTEGER UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  ulanguage VARCHAR(100) NOT NULL,
  PRIMARY KEY(idtitle),
  FOREIGN KEY (levels_idlevel) REFERENCES levels(idlevel)
);

DROP TABLE IF EXISTS traslations;
CREATE TABLE traslations (
  idtraslation INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  lines_idline INTEGER UNSIGNED NOT NULL,
  line VARCHAR(250) NULL,
  ulanguage VARCHAR(100) NULL,
  position INTEGER UNSIGNED NULL,
  PRIMARY KEY(idtraslation),
  FOREIGN KEY (lines_idline) REFERENCES lines_table(idline)
);


