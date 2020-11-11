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
  
  for (let key in dados){
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
    
    if (calcular_pollock_7_dobras(dados)){
      return true
    }else{
      return false
    };
  };

}; // End checkValues


function calcular_pollock_7_dobras(data){

  let staticIMC = document.getElementById("staticIMC");
  let staticMG = document.getElementById("staticMG");
  let staticMM = document.getElementById("staticMM");
  let soma_dobras = 0;
  
  for (let d in data){
    if (data[d] == data["idade"] ||
        data[d] == data["peso"] ||
        data[d] == data["altura"]){
      continue;
    }else{
      soma_dobras += parseInt(data[d]);
    };
  };
  // altura	179
  // idade	31
  // peso	77,00
  // triciptal - PCT	9,50
  // subescapular	11,00
  // toraxica	5,50
  // axiliarMedia	8,00
  // abdominal	15,00
  // suprailiaca	10,00
  // femuralMedio	9,50
  
  let idade = data["idade"];
  let altura = data["altura"] 
  if (altura > 2){
    altura = altura / 100;
  };

  var results = {"DC": 0.0, "G_relativa": 0.0, "G_absoluta": 0.0, "MM": 0.0, "MG": 0.0, "IMC": 0.0};
  
  // DC(g/cm³)=1,112-0,00043499*(soma 7 Dobras)+0,00000055*(soma 7 Dobras)*2-0,00028826*(Idade)
  // G (% relativa) = [(4,95 / DC) - 4,50] * 100
  // G (kg absoluta) = Peso * G (% relativa) / 100
  // Massa Magra = Peso - G kg
  // Massa Gorda = Peso - Massa Magra
  // IMC = Peso / Alt (m)²

  results["DC"] = (1.112 - 0.00043499 * soma_dobras + 0.00000055 * soma_dobras * 2 - 0.00028826 * idade).toFixed(2);
  results["G_relativa"] = (((4.95 / results["DC"]) - 4.5) * 100).toFixed(2);
  results["G_absoluta"] = (data["peso"] * results["G_relativa"] / 100).toFixed(2);
  results["MM"] = (data["peso"] - results["G_absoluta"]).toFixed(2);
  results["MG"] = (data["peso"] - results["MM"]).toFixed(2);
  results["IMC"] = (data["peso"] / (altura ** 2)).toFixed(2);
  let percGordura = (results["MG"] / data["peso"] * 100).toFixed(2);

  // Para test
  // staticIMC.innerHTML = `IMC: 24.58`;
  // staticMM.innerHTML = `Massa Magra: 9.72 Kg`;
  // staticMG.innerHTML = `Massa Gorda: 67.28 Kg`;

  staticIMC.innerHTML = `IMC: ${results["IMC"]}`;
  staticMM.innerHTML = `Massa Magra: ${results["MM"]} Kg`;
  staticMG.innerHTML = `Massa Gorda: ${results["MG"]} Kg -> ${percGordura} %`;
  // console.log(results);
};


// Criando Alerta
function createAlert(vazios){
  // Fechando alerta
  $(".alert").alert('close');

  let alertas = document.getElementById("alertas");
  // Criando alerta
  let div = document.createElement("alertaValores");
   
  div.innerHTML = `
    <div id="alertaValores" class="alert alert-warning alert-dismissible fade show" role="alert">
       <strong>Atenção!</strong> Valores não preenchidos: <strong> ${vazios} </strong>
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
   `;

  alertas.appendChild(div);
};
