<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <title>Deserto dei Barbari</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <!-- Theme style -->
    <link rel="stylesheet" href="assets/css/AdminLTE.css">
    <link rel="stylesheet" href="assets/css/skins/skin-blue.css">
    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">
    
    <!-- Codemirror Styles -->
    <link rel="stylesheet" href="http://codemirror.net/lib/codemirror.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body class="hold-transition skin-blue sidebar-mini sidebar-collapse">  
  <?php
    require "php/config.php";
    require "php/generic.php";
    require "php/management/management_livello.php";
    require "php/management/management_livello_eseguito.php";
    require "php/management/management_utente.php";
    session_start();
    $_SESSION["email"] = "trombi@gmail.com";
    if(isset($_GET["idlivello"])){
        $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
        $informazioniLivelloAttuale = selectFrom_LIVELLO_By_idlivello($connection,$_GET["idlivello"]);
        $fileVirtualiAggiornati = select_file_virtuali_aggiornati_From_LIVELLO_ESEGUITO_By_idlivello_email ($connection, $_GET["idlivello"], $_SESSION["email"]);
        $fileVirtualiAggiornati = json_decode($fileVirtualiAggiornati, true);
    }
  ?>
  <div class="wrapper">
    <!-- Modal Storia -->
    <div class="modal fade" id="modalDialoghi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel"><?=$informazioniLivelloAttuale["nome"] ?></h4>
          </div>
          <div class="modal-body">
            <?php 
              $jsonLivello = json_decode($informazioniLivelloAttuale["json"], true);
            ?>
            <!-- /.panel -->
            <div class="panel panel-default">
              <!-- /.panel-heading -->
              <div class="panel-body">
                <ul class="timeline">
                  <?php
                    $alternanza=0;
                    foreach($jsonLivello["dialogoIniziale"] as $chiave => $valore)
                    {
                      if ($alternanza % 2 == 0) 
                        echo '<li>'; 
                      else
                        echo '<li class="timeline-inverted" >'; 
                  ?> 
                      <div class="timeline-badge">
                        <?php
                          echo '<img src="assets/img/avatar/'.$valore["nome"].'.png" style="width: 48px; border-radius: 70% 70% 70% 70%; margin-bottom: 4px;">';
                        ?>
                      </div>
                      <div class="timeline-panel">
                        <div class="timeline-heading">
                          <h4 class="timeline-title"><?=$valore["nome"] ?></h4>
                        </div>
                        <div class="timeline-body">
                          <p><?=$valore["testo"] ?></p>
                        </div>
                      </div>
                    </li>
                  <?php
                      $alternanza++;
                    }
                  ?>
                </ul>
              </div>
              <!-- /.panel-body -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="modal fade" id="modalDialoghiFinali" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel"><?=$informazioniLivelloAttuale["nome"] ?></h4>
          </div>
          <div class="modal-body">
            <!-- /.panel -->
            <div class="panel panel-default">
              <!-- /.panel-heading -->
              <div class="panel-body">
                <ul class="timeline">
                  <?php
                    $alternanza=0;
                    foreach($jsonLivello["dialogoFinale"] as $chiave => $valore)
                    {
                      if ($alternanza % 2 == 0) 
                        echo '<li>'; 
                      else
                        echo '<li class="timeline-inverted" >'; 
                  ?> 
                      <div class="timeline-badge">
                        <?php
                          echo '<img src="assets/img/avatar/'.$valore["nome"].'.png" style="width: 48px; border-radius: 70% 70% 70% 70%; margin-bottom: 4px;">';
                        ?>
                      </div>
                      <div class="timeline-panel">
                        <div class="timeline-heading">
                          <h4 class="timeline-title"><?=$valore["nome"] ?></h4>
                        </div>
                        <div class="timeline-body">
                          <p><?=$valore["testo"] ?></p>
                        </div>
                      </div>
                    </li>
                  <?php
                      $alternanza++;
                    }
                  ?>
                </ul>
              </div>
              <!-- /.panel-body -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    
    <?php 
      foreach($jsonLivello["fileVirtuali"] as $chiave => $valore)
      {
        if($valore["consultazione"]===false){
          echo '<div class="modal fade" id="modalAiuto'.$chiave.'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
    ?>
          <!-- Modal check aiuti -->
          
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">Aiuto di <?php echo $valore["nomeFile"] ?></h4>
                </div>
                <div class="modal-body">
                  <h3>Sei sicuro di voler utilizzare un token aiuto? Costerà <?php echo $jsonLivello["costoAiuti"]; ?> punti del tuo punteggio esperienza!</h3>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                  <?php echo '<button type="button" id="bottoneAiuto'.$chiave.'" class="btn btn-primary bottoneAiutoClass" data-dismiss="modal">Sì</button>'; ?>
                </div>
              </div>
            </div>
          </div>
    <?php 
        }
      }
    ?>
    
    
    <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">
        <img src="assets/img/DesertoBarbari.png">
      </span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">
        Il Deserto dei Barbari
      </span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="assets/img/avatar/Simeoni.png" class="user-image" alt="User Image">
              <span class="hidden-xs">
              <?php 
                if(isset($_SESSION["email"])){
                  $utente = selectFrom_UTENTE_By_email($connection, $_SESSION["email"]);
                  echo $utente["alias"];
                }
                
              ?>
              </span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="assets/img/avatar/Simeoni.png" class="img-circle" alt="User Image">
                <p>
                  <?php echo $utente["email"];?>
                  <small>Livello 1</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profilo</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">Disconessione</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="assets/img/avatar/Simeoni.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>
            <?php echo $utente["alias"];?>
          </p>
          <a href="#"><i class="fa fa-circle text-success"></i> Connesso</a>
        </div>
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">Navigazione</li>
        <li>
          <a href="#">
            <i class="fa fa-play"></i> <span>Gioca</span>
          </a>
        </li>
        <li>
          <a href="dashboard.php">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="statistiche.php">
            <i class="fa fa-bar-chart"></i> <span>Statistiche</span>
          </a>
        </li>
        <li>
          <a href="classifica.php">
            <i class="ion ion-podium"></i> <span>Classifica</span>
          </a>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Begin page content -->
    <div class="container">
      <div class="riga">
        <div class="col-md-7 colonna">   
          <div class="panel-group accordionPanel-group accordionWrap" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel accordionPanel">
              <div class="accordionPanel-heading panel-heading" role="tab" id="headingOne">
                <h4 class="accordionPanel-title panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Codice
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="accordionPanel-body panel-body">
                  <div class="panel with-nav-tabs panel-success" id="pannelloContenteCodici">  
        <!--           panel-primary, panel-success, panel-info, panel-warning, panel-danger -->
                    <div class="panel-heading">
                      <ul class="nav nav-tabs nav-justified">
                        <?php
                          $primo=true;
                          foreach($jsonLivello["fileVirtuali"] as $chiave => $valore)
                          {
                            if($primo)
                              echo '<li class="active">';
                            else
                              echo '<li>';
                            echo '<a href="#tab'.$chiave.'default" class="tab'.$chiave.'default" data-toggle="tab">';
                            echo $valore["nomeFile"];
                            echo '<span class="iconaReset glyphicon glyphicon-repeat" id="resetCode'.$chiave.'" aria-hidden="true"/>';
                            echo '</a>';
                        ?>                      
                            
                          
                        </li>
                        <?php 
                            $primo=false;
                          }
                        ?>
                      </ul>
                    </div>
                    <div class="contenutoPannello panel-body">
                      <div class="tab-content">
                          <?php
                            $primo=true;
                            foreach($jsonLivello["fileVirtuali"] as $chiave => $valore)
                            {
                              if(is_null($fileVirtualiAggiornati["fileVirtuali"])){
                                if($primo)
                                  echo '<div class="tab-pane codePanel fade in active" id="tab'.$chiave.'default">';
                                else
                                  echo '<div class="tab-pane codePanel fade" id="tab'.$chiave.'default">';
                                echo '<textarea rows="4" cols="50" name="codesnippet_editable" id="codesnippet_editable'.$chiave.'">';
                                echo $valore["codice"];                    
                                echo '</textarea> </div>';
                                $primo=false;
                              } else {
                                if($primo)
                                  echo '<div class="tab-pane codePanel fade in active" id="tab'.$chiave.'default">';
                                else
                                  echo '<div class="tab-pane codePanel fade" id="tab'.$chiave.'default">';
                                echo '<textarea rows="4" cols="50" name="codesnippet_editable" id="codesnippet_editable'.$chiave.'">';
                                echo $fileVirtualiAggiornati["fileVirtuali"][$chiave]["codice"];                    
                                echo '</textarea> </div>';
                                $primo=false;
                              }
                              
                            }
                          ?>
                        
                      </div>
                    </div>
                  </div>
                  <div class="riga center-block">
                    <div class="col-md-2 text-center">
                      <button type="button" class="bottone btn btn-lg btn-success center-block" data-toggle="tooltip" data-placement="bottom" title="Effettua il test del codice modificato" id="bottoneCaricaCodice">
                        Avvia <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
                         
                      </button>
                    </div>
                    <div class="col-md-3 text-center">
                      <button type="button" class="bottone btn btn-lg btn-success center-block" data-toggle="tooltip" data-placement="bottom" title="Salva il codice nel cloud" id="bottoneSalvaCodice">
                        Salva codice <span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>
                         
                      </button>
                    </div>
                    <div class="col-md-4 text-center">
                      <button type="button" class="bottone btn btn-lg btn-warning center-block" data-toggle="tooltip" data-placement="bottom" title="Vai al livello successivo" id="bottoneLivelloSuccessivo">
                        Livello successivo <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                      </button>
                    </div>
                    <div class="col-md-3 text-center">
                      <button type="button" class="bottone btn btn-lg btn-primary center-block" data-toggle="modal" data-target="#modalDialoghi">
                        Rileggi dialoghi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel accordionPanel">
              <div class="accordionPanel-heading panel-heading" role="tab" id="headingTwo">
                <h4 class="accordionPanel-title panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo" id="collapseObiettivo" aria-expanded="false" aria-controls="collapseTwo">
                    Obiettivo
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="accordionPanel-body panel-body">
                  <?php 
                    foreach($jsonLivello["fileVirtuali"] as $chiave => $valore)
                    {
                      if($valore["consultazione"]===false){
                        if(is_null($fileVirtualiAggiornati["fileVirtuali"])){
                  ?>
                          <p>
                            <?php echo '<p id="obiettivo'.str_replace(".","",$valore["nomeFile"]).'"><span id="spanObiettivo'.str_replace(".","",$valore["nomeFile"]).'" class="glyphicon glyphicon-ok" aria-hidden="true" style="visibility: hidden;"></span> '.$valore["descrizione"].'</p>'; ?>
                          </p>
                        <?php
                          echo '<button type="button" class="btn btn-lg btn-info center-block" data-toggle="modal" id="buttonModalAiuto'.$chiave.'" data-target="#modalAiuto'.$chiave.'">Aiuto</button>';
                          echo '<p class="pTestoAiuto" id="testoAiuto'.$chiave.'" />';
                        } else {
                         ?>
                          <p>
                            <?php echo '<p id="obiettivo'.str_replace(".","",$valore["nomeFile"]).'"><span id="spanObiettivo'.str_replace(".","",$valore["nomeFile"]).'" class="glyphicon glyphicon-ok" aria-hidden="true" style="visibility: hidden;"></span> '.$valore["descrizione"].'</p>'; ?>
                          </p>
                        <?php
                          if (strcmp($valore["aiuto"], "true")===0){
                            echo '<button type="button" class="btn btn-lg btn-info center-block" data-toggle="modal" id="buttonModalAiuto'.$chiave.'" data-target="#modalAiuto'.$chiave.'" disabled>Aiuto</button>';
                            echo '<p class="pTestoAiuto" id="testoAiuto'.$chiave.'">'.$valore["aiuto"].'</p>';
                          } else {
                            echo '<button type="button" class="btn btn-lg btn-info center-block" data-toggle="modal" id="buttonModalAiuto'.$chiave.'" data-target="#modalAiuto'.$chiave.'">Aiuto</button>';
                            echo '<p class="pTestoAiuto" id="testoAiuto'.$chiave.'" />';
                          }
                          
                        }
                      }
                    }
                  ?>'<p  id="testoAiuto'.$chiave.'" />'
                </div>
              </div>
            </div>
            <div class="panel accordionPanel">
              <div class="accordionPanel-heading panel-heading" role="tab" id="headingThree">
                <h4 class="accordionPanel-title panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion3" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Manuale
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div class="accordionPanel-body panel-body">
                  <?php
                    echo $jsonLivello["manuale"];
                  ?>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 colonna">
          <div class="divExternalGame">
            <div class="gameContainer" tabindex="1">
              <div class="crosshair"/>
            </div>
            <canvas width="510" height="460"></canvas>
          </div>
          <div class="pannelloTerminale panel panel-success">
            <div class="panel-body terminale" id="terminale">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
<!-- ./wrapper -->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    
    <script src="assets/js/jquery-2.2.0.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
      $.widget.bridge('uibutton', $.ui.button);
    </script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/chiamateAjax.js"></script>
    <script src="assets/js/codice-modificabile.js"></script>
    <script src="missile_command/core_game.js"></script>
    <script src="missile_command/core_level.js"></script>
    <script src="missile_command/carica_codice.js"></script>
<!--    <script src="missile_command/livello1-corretto.js"></script>-->
    <script src="missile_command/elementi_gioco/base.js"></script>
    <script src="missile_command/elementi_gioco/minacce.js"></script>
    <script src="missile_command/elementi_gioco/mirino.js"></script>
    <script src="missile_command/elementi_gioco/missili.js"></script>
    <script src="missile_command/elementi_gioco/batteria_antimissile.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/app.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="assets/js/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
    <script>
      var editorCodice = [];
      var coreLevel;
      var nOndata;
      var risoltoTuttiObiettivi = false;
      
      var editor = function (id){
        var x = CodeMirror.fromTextArea(id, {
            mode: "javascript",
            theme: "default",
            lineNumbers: true,
            height: "100%",
            width: "100%",
            autoRefresh: true,
            styleActiveLine: true,
            lineWrapping: true,
            matchBrackets: true
        });
        inserisciCodiceEditor(x, x.getValue());
        return x;
      };
      
      var mostraAiuto = function(indice){
        var testoAiutoStr = "#testoAiuto" + indice;
        var titoloCodice = $(".tab"+indice+"default").text();
        var nomeBottoneAiuto = "#buttonModalAiuto" + indice;
        funzioneSalvaCodice();
        getHelp(<?php echo $_GET["idlivello"]; ?>, titoloCodice, testoAiutoStr, "<?php echo $_SESSION["email"]; ?>", nomeBottoneAiuto);
      };
      
      var resetCodice = function (id){
          resetCodiceUtente(<?php echo $_GET["idlivello"]; ?>, $(".tab" + id + "default").text(), editorCodice[id]);
      };
      var funzioneSalvaCodice = function (){
        var jsonFileVirtuali;
        var conAiuti = [<?php 
              $primoGiro = true;
              foreach($jsonLivello["fileVirtuali"] as $chiave => $valore)
              {
                if($valore["consultazione"]===false){
                  if ($primoGiro){
                    echo $chiave;
                    $primoGiro = false;
                  } else
                    echo ", ".$chiave;
                }
              }
        ?>];

        var richiestoAiuto = [];
        var nomeFile = [];
        var codiceUtente = "";

        for (var i = 0; i < <?php echo count($jsonLivello["fileVirtuali"]); ?>; i++) {
          if (conAiuti.indexOf(i)!=-1 && $("#buttonModalAiuto" + i).disabled){
            richiestoAiuto[i] = "true";
            nomeFile[i] = $(".tab"+i+"default").text();
            codiceUtente = codiceUtente + (escape(salvaCodiceEditor(editorCodice[i])+"########FineCodiceUtente########"));
          } else {
            richiestoAiuto[i] = "false";
            nomeFile[i] = $(".tab"+i+"default").text();
            codiceUtente = codiceUtente + (escape(salvaCodiceEditor(editorCodice[i])+"########FineCodiceUtente########"));
          }
        }

        updateCodiceUtente(<?php echo $_GET["idlivello"]; ?>, "<?php echo $_SESSION["email"]; ?>", richiestoAiuto, nomeFile, codiceUtente);
      };
     $(document).ready(function () {
        <?php if(is_null($fileVirtualiAggiornati["fileVirtuali"])){
            echo '$("#modalDialoghi").modal("show");';
          } 
        ?>
        $("#bottoneLivelloSuccessivo").prop("disabled",true);
        $(document).on("click", "button.bottoneAiutoClass" , function() {
            mostraAiuto(this.id.replace("bottoneAiuto", ""));
        });
        $("#bottoneCaricaCodice").click(ricaricaCodice);
        $("#bottoneSalvaCodice").click(funzioneSalvaCodice);
        
        $('textarea').each(function(){
           if( $(this).attr('id').match('codesnippet_editable.*') ) {
              var codesnippet = document.getElementById($(this).attr('id'));
              var identificatoreCodice = parseInt($(this).attr('id').replace("codesnippet_editable", ""));
              editorCodice[identificatoreCodice] = editor(codesnippet);
           }
        });
        for (var i = 0; i < <?php echo count($jsonLivello["fileVirtuali"]); ?>; i++) {
          $("#resetCode"+i).click( function () {
            var resetCodeId = $(this).attr('id').replace('resetCode', '');
            resetCodice(resetCodeId);
          }); 
        }
        
       ricaricaCodice();
       
     });
     var punteggioTotale = 0;
     var ricaricaCodice = function (){
        punteggioTotale = 0;
        var callback = function ( risultatoOndata ) {
          if( risultatoOndata.esito === true ) {
            if(nOndata===1 && risoltoTuttiObiettivi){
              funzioneSalvaCodice();
              $("#modalDialoghiFinali").modal("show");
              $("#bottoneLivelloSuccessivo").prop("enabled",false);
            }
            console.log(risultatoOndata.punteggio + " " + risultatoOndata.missiliAbbattuti + " " +  risultatoOndata.missiliRimasti + " " +  risultatoOndata.minacceAbbattute + " " +  risultatoOndata.torretteSalvate + " " +  risultatoOndata.missiliSparati + " " +  risultatoOndata.morti);
            updateStatisticheUtenti(<?php echo $_GET["idlivello"]; ?>, "<?php echo $_SESSION["email"]; ?>", nOndata, risultatoOndata.punteggio, risultatoOndata.missiliAbbattuti, risultatoOndata.missiliRimasti, risultatoOndata.minacceAbbattute, risultatoOndata.torretteSalvate, risultatoOndata.missiliSparati, risultatoOndata.morti);
            ++nOndata;
            coreLevel.inizializzaLivello(nOndata);
            coreLevel.mostraSchermataIniziale(); 
          } else {
            nOndata = 1;
            coreLevel.inizializzaLivello(1);
            coreLevel.mostraSchermataGameOver();
          }
        }
       
        var jsonLivello = <?php echo $informazioniLivelloAttuale["json"] ?>;
        window.eval( jsonLivello.codiceLivello );
        var caricaCodice = new CaricaCodice( jsonLivello.fileVirtuali );
        caricaCodice.aggiornaCodiceUtente();
        var e = caricaCodice.validazioneCodiceUtente();

        $.each(e.erroriSintassi, function(indice, errore) {
          $("#terminale").append(errore.file + ": " + errore.testo + " alla riga " + errore.riga + "<br>");
        });
        $.each(e.erroreParole, function(indice, errore) {
          $("#terminale").append(errore.file + ": " + errore.testo + " alla riga " + errore.riga + "<br>");
        });
        $.each(e.erroriCiclo, function(indice, errore) {
          $("#terminale").append(errore.file + ": " + errore.testo + " alla riga " + errore.riga + "<br>");
        });
        
       
        nOndata = 1;

       
        if(e.erroriCiclo.length === 0 
          && e.erroriSintassi.length === 0
          && e.erroriParole.length === 0 ) {

          esiti = caricaCodice.esecuzioneTest();
          risoltoTuttiObiettivi = true;
          $.each(esiti, function (i, esito){
            var obiettivo = esito.nomeFile.replace('.','');
            var risultato = esito.esito;
            if(risultato === true){
              $("#obiettivo" + obiettivo).css('color', 'green');
              $("#spanObiettivo" + obiettivo).css("visibility", "visible");
              $("#collapseObiettivo").click();
            } else {
              risoltoTuttiObiettivi = false;
              $("#pannelloContenteCodici").removeClass("panel-success");
              $("#pannelloContenteCodici").addClass("panel-danger");
              $("#collapseObiettivo").click();
              var fileVirtuale = jsonLivello.fileVirtuali.find(function (f){
                return f.nomeFile === esito.nomeFile;
              });
              $("#terminale").append(fileVirtuale.messaggioFallimento + "<br>");
            }
          });

          if(risoltoTuttiObiettivi){
            $("#pannelloContenteCodici").removeClass("panel-danger");
            $("#pannelloContenteCodici").addClass("panel-success");
          }

          if(coreLevel != undefined) {
            coreLevel.stopLivello();
            clearInterval(coreLevel.intervalloSchermata);  
          }

          coreLevel = new Livello<?php echo $_GET["idlivello"]?>( callback );
          coreLevel.inizializzaLivello(nOndata);
          console.log(Base);
          console.log(coreLevel.coreGame.basi);
          coreLevel.mostraSchermataIniziale();
        }
     }    
     
     setInterval(function(){
        console.log("chiamata");
        $.each( $('.CodeMirror-line'), function( key, value ) {
          if($(this).find('.disabled').length > 0)
            $(this).css("background-color","gray");
        });
      },1000);
      
    </script>
    <script src="http://codemirror.net/lib/codemirror.js"></script>
    <script src="https://codemirror.net/addon/display/autorefresh.js"></script>
    <script src="http://codemirror.net/addon/edit/matchbrackets.js"></script>
    <script src="http://codemirror.net/mode/javascript/javascript.js"></script>
  </body>
</html>