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
    $_SESSION["email"] = "trombi@gmail.com";
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
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
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
      <div class="col-md-5 col-md-offset-2">
        <!-- small box -->
        <div class="small-box bg-green">
          <div class="inner">
            <h3><?php 
              $punteggio = 0;
              foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                $punteggio+=$valore["punteggio"];
              }
              echo $punteggio; 
            ?></h3>

            <p>Punteggio</p>
          </div>
          <div class="icon">
            <i class="ion ion-podium"></i>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <!-- small box -->
        <div class="small-box bg-red">
          <div class="inner">
            <h3><?php 
              $morti = 0;
              foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                $morti+=$valore["morti"];
              }
              echo $morti; 
            ?></h3>

            <p>Morti</p>
          </div>
          <div class="icon">
            <i class="ion ion-sad"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row rigaStatistiche">
      <!-- /.col -->
        <div class="col-md-3 col-md-offset-2">
          <div class="info-box bg-green">
            <span class="info-box-icon"><i class="ion ion-flame"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Missili abbattuti</span>
              <span class="info-box-number"><?php 
                $missiliAbbattuti = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $missiliAbbattuti+=$valore["missili_abbattuti"];
                }
                echo $missiliAbbattuti; 
              ?></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3">
          <div class="info-box bg-green">
            <span class="info-box-icon"><i class="ion ion-fireball"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Minacce abbattute</span>
              <span class="info-box-number"><?php 
                $minacceAbbattute = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $minacceAbbattute+=$valore["minacce_abbattute"];
                }
                echo $minacceAbbattute; 
              ?></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3">
          <div class="info-box bg-yellow">
            <span class="info-box-icon"><i class="ion ion-radio-waves"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Missili lanciati</span>
              <span class="info-box-number"><?php 
                $missiliLanciati = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $missiliLanciati+=$valore["missili_lanciati"];
                }
                echo $missiliLanciati; 
              ?></span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </div>
    </div>
    <div class="row rigaStatistiche">
      <div class="col-md-3 col-md-offset-2">
        <div class="info-box bg-aqua">
          <span class="info-box-icon"><i class="ion ion-speedometer"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Missili rimasti</span>
            <span class="info-box-number"><?php 
                $missiliRimasti = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $missiliRimasti+=$valore["missili_rimasti"];
                }
                echo $missiliRimasti; 
              ?></span>
          </div>
          <!-- /.info-box-content -->
        </div>
      </div>
      <!-- /.col -->
        <div class="col-md-3">
          <div class="info-box bg-green">
            <span class="info-box-icon"><i class="ion ion-happy"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Torrette salvate</span>
              <span class="info-box-number"><?php 
                $torretteSalvate = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $torretteSalvate+=$valore["torrette_salvate"];
                }
                echo $torretteSalvate; 
              ?></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3">
          <div class="info-box bg-green">
            <span class="info-box-icon"><i class="ion-ribbon-b"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Ondate superate</span>
              <span class="info-box-number"><?php 
                $ondateSuperate = 0;
                foreach($informazioniLivelliEseguiti as $chiave => $valore) {
                  $ondateSuperate+=$valore["ondate"];
                }
                echo $ondateSuperate; 
              ?></span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </div>
    </div>
    <div class="row rigaStatistiche">
      <div class="col-md-6">
        <!-- DONUT CHART -->
        <div class="box box-danger">
          <div class="box-header with-border">
            <h3 class="box-title">Missili</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body">
            <canvas id="pieChart" style="height:250px"></canvas>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Morti</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body">
            <div class="chart">
              <canvas id="areaChartMorti" style="height:250px"></canvas>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
      <div class="col-md-6">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Punteggio</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body">
            <div class="chart">
              <canvas id="areaChartPunteggio" style="height:250px"></canvas>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Ondate</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body">
            <div class="chart">
              <canvas id="areaChartOndate" style="height:250px"></canvas>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
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
    <script src="assets/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/datatables/dataTables.bootstrap.min.js"></script>
    
    <script>
    $(function () {
      /* ChartJS
       * -------
       * Here we will create a few charts using ChartJS
       */

      //--------------
      //- AREA CHART -
      //--------------

      // Get context with jQuery - using jQuery's .get() method.
    
      var areaChartCanvasMorti = $("#areaChartMorti").get(0).getContext("2d");
      var areaChartCanvasPunteggio = $("#areaChartPunteggio").get(0).getContext("2d");
      var areaChartCanvasOndate = $("#areaChartOndate").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var areaChartMorti = new Chart(areaChartCanvasMorti);
      var areaChartPunteggio = new Chart(areaChartCanvasPunteggio);
      var areaChartOndate = new Chart(areaChartCanvasOndate);

      var areaChartDataPunteggio = {
        labels: [<?php 
            foreach($informazioniLivelliEsistenti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo '"'.$valore["nome"].'"';
              else
                echo '"'.$valore["nome"].'", ';
            }
            ?>],
        datasets: [
          {
            label: "Punteggio",
            fillColor: "#b9e9b2",
            strokeColor: "#53c743",
            pointColor: "#53c743",
            pointStrokeColor: "#53c743",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data:  [<?php 
            foreach($informazioniLivelliEseguiti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo $valore["punteggio"];
              else
                echo $valore["punteggio"].', ';
            }
            ?>]
          }
        ]
      };
      
      var areaChartDataMorti = {
        labels: [<?php 
            foreach($informazioniLivelliEsistenti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo '"'.$valore["nome"].'"';
              else
                echo '"'.$valore["nome"].'", ';
            }
            ?>],
        datasets: [
          {
            label: "Punteggio",
            fillColor: "#b9e9b2",
            strokeColor: "#53c743",
            pointColor: "#53c743",
            pointStrokeColor: "#53c743",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data:  [<?php 
            foreach($informazioniLivelliEseguiti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo $valore["morti"];
              else
                echo $valore["morti"].', ';
            }
            ?>]
          }
        ]
      };
      
      var areaChartDataOndate = {
        labels: [<?php 
            foreach($informazioniLivelliEsistenti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo '"'.$valore["nome"].'"';
              else
                echo '"'.$valore["nome"].'", ';
            }
            ?>],
        datasets: [
          {
            label: "Punteggio",
            fillColor: "#b9e9b2",
            strokeColor: "#53c743",
            pointColor: "#53c743",
            pointStrokeColor: "#53c743",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data:  [<?php 
            foreach($informazioniLivelliEseguiti as $chiave => $valore) {
              if($chiave + 1 == count($informazioniLivelliEseguiti))
                echo $valore["ondate"];
              else
                echo $valore["ondate"].', ';
            }
            ?>]
          }
        ]
      };

      var areaChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: false,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true
      };

      //Create the line chart
      areaChartMorti.Line(areaChartDataMorti, areaChartOptions);
      areaChartPunteggio.Line(areaChartDataPunteggio, areaChartOptions);
      areaChartOndate.Line(areaChartDataOndate, areaChartOptions);

      
      //-------------
      //- PIE CHART -
      //-------------
      // Get context with jQuery - using jQuery's .get() method.
      var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
      var pieChart = new Chart(pieChartCanvas);
      var PieData = [
        {
          value: <?php echo $missiliLanciati; ?>,
          color: "#f56954",
          highlight: "#f56954",
          label: "Missili lanciati"
        },
        {
          value: <?php echo $missiliRimasti;  ?>,
          color: "#00a65a",
          highlight: "#00a65a",
          label: "Missili rimasti"
        }
      ];
      var pieOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 100,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      };
      //Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      pieChart.Doughnut(PieData, pieOptions);
    
    });
    </script>
  </body>
</html>
