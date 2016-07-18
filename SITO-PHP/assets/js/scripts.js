$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
});

$(document).ready(function() {
  $('.collapse.in').prev('.accordionPanel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.accordionPanel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.accordionPanel-heading').removeClass('active');
    });
});




    