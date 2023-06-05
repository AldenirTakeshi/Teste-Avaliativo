function toUpperCase(event) {
  var inputElement = event.target;
  inputElement.value = inputElement.value.toUpperCase();
}

function converterRomanoParaArabico() {
  var romano = document.getElementById("inputRomano").value.toUpperCase();
  var arabico = 0;
  var mapaRomanoArabico = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  for (var i = 0; i < romano.length; i++) {
    var atual = romano[i];
    var proximo = romano[i + 1];
    var valorAtual = mapaRomanoArabico[atual];
    var valorProximo = mapaRomanoArabico[proximo];

    if (valorProximo && valorProximo > valorAtual) {
      arabico += valorProximo - valorAtual;
      i++;
    } else {
      arabico += valorAtual;
    }
  }

  document.getElementById("inputArabico").value = arabico;
}

document.getElementById("inputRomano").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    converterRomanoParaArabico();
  }
});

function converterArabicoParaRomano() {
  var arabico = parseInt(document.getElementById("inputArabico2").value);
  var romano = "";

  var mapaArabicoRomano = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };

  for (var valor in mapaArabicoRomano) {
    while (arabico >= valor) {
      romano += mapaArabicoRomano[valor];
      arabico -= valor;
    }
  }

  document.getElementById("inputRomano2").value = romano;
}

document.getElementById("inputArabico2").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    converterArabicoParaRomano();
  }
});
