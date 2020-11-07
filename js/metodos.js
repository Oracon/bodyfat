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


// Function Range
function range(start, count) {
  return Array.apply(0, Array(count))
    .map((element, index) => index + start);
};


// Check Values
function checkValues(){

  submitOk = true;
  var vazios = [];
  var dados = {
    idade: 0,
    peso: 0,
    altura: 0,
    triciptal: 0,
    subscapular: 0,
    toraxica: 0,
    axiliarMedia: 0,
    abdominal: 0,
    suprailiaca: 0,
    femuralMedio: 0
    //"circBraco": 0
  };
  
  for (var key in dados){
    dados[key] = document.getElementById(key).value;
    // Criando array com elementos vazios
    //if (dados[key] == 0){
    //  vazios.push(" " + key[0].toUpperCase() + key.slice(1, )); // Create a list of empties
    //  submitOk = false;
    //};
  };
  
  if (submitOk == false){

    // Apagar alerta

    createAlert(vazios);
    return false;
  }else{

    // Apagar alerta
    
    if (calcular_pollock_7_dobras(dados)){
      return true
    }else{
      return false
    };
  };

}; // End checkValues


function calcular_pollock_7_dobras(data){

  var soma_dobras;
  //var soma_dobras = data["triciptal"] + data["subscapular"] + data["toraxica"] + data["axiliarMedia"] + data["abdominal"] + data["suprailiaca"] + data["femuralMedio"];
  
  // FIX HERE
  // FIX HERE
  // FIX HERE
  
  for ( var i = 3; i < Object.keys(data).length; i++ ){  // for i=3; len(data) -> data.values
    soma_dobras += parseInt(Object.values(data)[i]);
    console.log(soma_dobras);
    console.log(typeof(soma_dobras));
  };
  
  
  var results = {"DC": 1, "G_relativa": 2, "G_absoluta": 3, "MM": 0, "MM": 0, "IMC": 0};
  // DC(g/cm³)=1,112-0,00043499*(soma 7 Dobras)+0,00000055*(soma 7 Dobras)*2-0,00028826*(Idade)
  //results["DC"] = 1,112 - 0.00043499 * (soma 7 Dobras) + 0.00000055 * (soma 7 Dobras) * 2 - 0.00028826 * (Idade)
  
  
  // G% = [(4,95 / DC) - 4,50] * 100
  //var massa_magra = data.peso
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
