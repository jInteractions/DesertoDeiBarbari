$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

$(document).ready(function() {
  $('.collapse.in').prev('.accordionPanel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.accordionPanel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.accordionPanel-heading').removeClass('active');
    });
  $('#bottoneAiuto').on('click', mostraAiuto);
});

var mostraAiuto = function(){
  $('#testoAiuto').html(
    'Questo è il <b>primo aiuto</b>'
  );
  
  
  
};


window.onload = function () {
  var word = CodeMirror.fromTextArea(document.getElementById('codesnippet_editable'), {
      mode: "javascript",
      theme: "default",
      lineNumbers: true
  });
  word.setSize("100%", "100%");
  word.markText({line:1,ch:1},{line:30,ch:10},{readOnly:true});
  word.markText({line:1,ch:1},{line:30,ch:10},{css: "background-color: #f8f8f8"});
  word.markText({line:41,ch:10},{line:80,ch:10},{readOnly:true});
  word.markText({line:41,ch:10},{line:80,ch:10},{css: "background-color: #f8f8f8"});
  
};


    