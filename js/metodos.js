
// Start up the menu
$(document).ready(function(){
  $('.list-group a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  $(function () {
    $('#list-group a:last-child').tab('show')
  });

  $('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
    
  });
});


// Smooth Scroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


// Enabling Alerts
$(document).ready(function(){
  $('#btn-calc').click(function(){
    $('#alertaValores').hide();
  }) 
});


// Check Values
function checkValues(){

  submitOk = true;
  var vazios = [];
  var dados = {
    "idade": 0,
    "peso": 0,
    "altura": 0,
    "triciptal": 0,
    "subscapular": 0,
    "toraxica": 0,
    "axiliarMedia": 0,
    "abdominal": 0,
    "suprailiaca": 0,
    "femuralMedio": 0,
    "circBraco": 0
  };
  
  for (var key in dados){
    dados[key] = document.getElementById(key).value;

    // Criando array com elementos vazios
    if (dados[key] == 0){
      vazios.push(" " + key[0].toUpperCase() + key.slice(1, )); // Create a list of empties
      submitOk = false;
    };
  };
  

  if (submitOk == false){
    
    // Apagar alerta
    createAlert(vazios);
    return false;
  }else{
    // Apagar alerta
    //calcular(idade, peso, altura);
    return true;
  };

}; // End checkValues


function calcular(){
  // Calcular
  return false
};


function createAlert(vazios){
  // Encontrando alerta pai
  var alertas = document.getElementById("alertas");
  // Criando alerta
  var div = document.createElement("div");
  div.innerHTML = `
    <div id="alertaValores" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Atenção!</strong> Valores não preenchidos: <strong> ${vazios} </strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `
  alertas.appendChild(div);
};


// Deletando Alerta
function deleteAlert(){
  var alertaValores = document.getElementById("alertaValores");
  alertaValores.parentNode.removeChild(alertaValores);
  timeElapsed = 0;
};

/*
// Get time elapsed

var startTime = Date.now(); // Get Starting time in MS
var endTime = 0;
var timeElapsed = 0;
        
function getTimeElapsed() {
  endTime = Date.now(); // Get current Time
  timeElapsed = endTime - startTime; // current time - startTime = Time Elapsed
  startTime = Date.now();
  
  return timeElapsed * 0.001; // Convert MS to S
}
*/