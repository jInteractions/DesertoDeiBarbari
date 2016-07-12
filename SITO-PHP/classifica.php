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
    $connection = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    $informazioniLivelliEseguiti = selectFrom_LIVELLO_ESEGUITO_By_email($connection, $_SESSION["email"]);
    $informazioniLivelliEsistenti = selectAllFrom_LIVELLO($connection); 
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
            <?php 
              $livelloMax = 0;
              foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                if($valore["idlivello"] > $livelloMax){
                  $livelloMax = $valore["idlivello"];
                }
              }
              echo '<a href="index.php?idlivello='.$livelloMax.'">';
            ?>
            <i class="fa fa-play"></i> <span>Gioca</span>
          </a>
        </li>
        <li>
          <a href="dashboard.php">
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
    <div class="row rigaStatistiche">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Classifica mondiale</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
              <tr>
                <th>Alias</th>
                <th>Punteggio</th>
                <th>Morti</th>
                <th>Ondate</th>
                <th>Missili abbattuti</th>
                <th>Minacce abbattute</th>
                <th>Missili lanciati</th>
                <th>Missili rimasti</th>
                <th>Torrette salvate</th>
              </tr>
              </thead>
              <tbody>
              <?php 
                $utenti = selectAllFrom_UTENTE($connection); 
                foreach($utenti as $chiave => $utente) {
                  echo '<tr>';
                  echo '<td>'.$utente["alias"].'</td>';
                  $livelliEseguitiUtente = selectFrom_LIVELLO_ESEGUITO_By_email($connection, $utente["email"]);
                  $punteggioUtente = 0;
                  $mortiUtente = 0;
                  $ondateUtente = 0;
                  $missiliAbbatutiUtente = 0;
                  $minacceAbbatuteUtente = 0;
                  $missiliLanciatiUtente = 0;
                  $missiliRimastiUtente = 0;
                  $torretteSalvateUtente = 0;
                  foreach($livelliEseguitiUtente as $chiave => $livelloEseguitoUtente) {
                    $punteggioUtente += $livelloEseguitoUtente["punteggio"];
                    $mortiUtente += $livelloEseguitoUtente["morti"];
                    $ondateUtente += $livelloEseguitoUtente["ondate"];
                    $missiliAbbatutiUtente += $livelloEseguitoUtente["missili_abbattuti"];
                    $minacceAbbatuteUtente += $livelloEseguitoUtente["minacce_abbatute"];
                    $missiliLanciatiUtente += $livelloEseguitoUtente["missili_lanciati"];
                    $missiliRimastiUtente += $livelloEseguitoUtente["missili_rimasti"];
                    $torretteSalvateUtente += $livelloEseguitoUtente["torrette_salvate"];
                  }
                  echo '<td>'.$punteggioUtente.'</td>';
                  echo '<td>'.$mortiUtente.'</td>';
                  echo '<td>'.$ondateUtente.'</td>';
                  echo '<td>'.$missiliAbbatutiUtente.'</td>';
                  echo '<td>'.$minacceAbbatuteUtente.'</td>';
                  echo '<td>'.$missiliLanciatiUtente.'</td>';
                  echo '<td>'.$missiliRimastiUtente.'</td>';
                  echo '<td>'.$torretteSalvateUtente.'</td>';
                  echo '</tr>';
                }
              ?>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
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
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/Chart.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="assets/js/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
    <!-- DataTables -->
    <script src="assets/datatables/jquery.dataTables.js"></script>
    <script src="assets/datatables/dataTables.bootstrap.min.js"></script>
    
    <script>
    $(function () {
    
      $('#example1').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "order": [[ 1, "desc" ]],
        "info": true,
        "autoWidth": false
        }
      );
    });
    </script>
  </body>
</html>
