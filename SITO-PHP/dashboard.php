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
    
    <link rel="icon" href="assets/img/DesertoBarbari.png" type="image/png" />

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
    <link rel="stylesheet" href="assets/datatables/dataTables.bootstrap.css">
    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">
    

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
    require "php/management/management_livello_eseguito.php";
    require "php/management/management_livello.php";
    require "php/management/management_utente.php";
    session_start();
    if(!isset($_COOKIE["user"])) {
      $_SESSION["email"] = "trombi@gmail.com";
    } else {
      $_SESSION["email"] = $_COOKIE["user"];
    }
    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, false);
    $informazioniLivelliEseguiti = selectFrom_LIVELLO_ESEGUITO_By_email($connection, $_SESSION["email"]);
    $informazioniLivelliEsistenti = selectAllFrom_LIVELLO($connection);
  ?>
    
  <?php 
      foreach($informazioniLivelliEsistenti as $chiave => $valore)
      {
        echo '<div class="modal fade" id="modalResetCodice'.$valore["idlivello"].'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
    ?>

    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Reset codice</h4>
        </div>
        <div class="modal-body">
          <!-- /.panel -->
          <div class="panel panel-default">
            <!-- /.panel-heading -->
            <div class="panel-body">
              Sei sicuro di voler ripristinare il codice iniziale? 
            </div>
            <!-- /.panel-body -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <?php echo '<button type="button" id="resetCode'.$valore["idlivello"].'" class="btn btn-primary" data-dismiss="modal">Sì</button>'; ?>
        </div>
      </div>
    </div>
  </div>
  <?php 
    }
  ?>  
  
  <div class="wrapper">
    
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
                  <?php  echo $utente["email"];?>
                </p>
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
            <?php 
              $livelloMax = 0;
              foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                if($valore["idlivello"] > $livelloMax){
                  $livelloMax = $valore["idlivello"];
                }
              }
              echo '<a href="gioco.php?idlivello='.$livelloMax.'">';
            ?>
            <i class="fa fa-play"></i> <span>Gioca</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>Livelli</span>
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
    <div class="row rigaDashboard">
      <?php 
      foreach($informazioniLivelliEsistenti as $chiave => $valore) {
        $livelloDisponibile=false;
        $livelloSuccessivoDisponibile=false;
        foreach($informazioniLivelliEseguiti as $chiaveEseguito => $valoreEseguito) {
          if($valore["idlivello"]===$valoreEseguito["idlivello"])
            $livelloDisponibile=true;
          if(($valore["idlivello"]+1)===$valoreEseguito["idlivello"])
            $livelloSuccessivoDisponibile=true;
        }
        if($livelloDisponibile)
          echo '<div class="small-box box-dashboard bg-green-active">';
        else
          echo '<div class="small-box box-dashboard bg-green-active">';
      ?>
        <div class="inner">
          <h3><?php echo $valore["nome"] ?></h3>

          <p><?php 
                if($livelloSuccessivoDisponibile)
                  echo "Livello completato!";
                else
                  if (!$livelloDisponibile)
                    echo "Livello non ancora sbloccato";
                  else
                    echo "Livello da completare";
          ?></p>
                  
                    
        </div>
        <div class="icon">
          <?php 
          if($livelloSuccessivoDisponibile)
            echo '<i class="ion ion-thumbsup"></i>';
          else
            if (!$livelloDisponibile)
              echo '<i class="ion ion-locked"></i>';
            else
              echo '<i class="ion ion-alert-circled"></i>';?>
          
        </div>
      <?php
        if($livelloDisponibile){
          echo '<a href="gioco.php?idlivello='.$valore["idlivello"].'" class="small-box-footer" style="font-size: 20px;">Gioca livello <i class="fa fa-arrow-circle-right"></i></a>';
          echo '<a href="#" class="small-box-footer" data-toggle="modal" data-target="#modalResetCodice'.$valore["idlivello"].'">Reset livello <i class="fa fa-refresh"></i></a>';
        }
      ?>
      </div>
      <?php 
      } 
      ?>
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
      $(document).ready( function ( ) {
        for (var i = 1; i <= <?php echo count($informazioniLivelliEsistenti); ?>; i++) {
          $("#resetCode"+i).click( function () {
            var resetCodeId = $(this).attr('id').replace('resetCode', '');
            //resetCodice(resetCodeId);
            console.log("Arrivati a reset livello");
            resetLivello(<?php echo '"'.$_SESSION["email"].'"';?>, resetCodeId);
          }); 
        }
      });
    </script>
    <script src="assets/js/chiamateAjax.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/Chart.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="assets/js/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
