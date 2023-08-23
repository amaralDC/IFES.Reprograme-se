const prompt = require('prompt-sync')();

idade = parseInt(prompt("Digite sua idade: "));
tempo = parseInt(prompt("Digite seu tempo de serviço: "));
salario = parseFloat(prompt("Digite seu salário: "));

var aposentar = 0;
if(idade > 64 || tempo > 29 || (idade > 59 && tempo > 24)){
  var aposentar = 1;
};

if(aposentar == 1){
  if(tempo > 20){
    // 80% do último salário recebido como trabalhador
    var salarioAposentadoria = salario*0.8;
    if(salarioAposentadoria >= 7087.22){
      console.log("Seu salário de aposentadoria é 7087.22")
    }else if(salarioAposentadoria <= 1212.00){
      console.log("Seu salário de aposentadoria é 1212.00")
    }else{
      console.log("Seu salário de aposentadoria é ", salarioAposentadoria)
    };
  }else{
    // 60% do último salário recebido como trabalhador
    var salarioAposentadoria = salario*0.6;
    if(salarioAposentadoria >= 7087.22){
      console.log("Seu salário de aposentadoria é 7087.22")
    }else if(salarioAposentadoria <= 1212.00){
      console.log("Seu salário de aposentadoria é 1212.00")
    }else{
      console.log("Seu salário de aposentadoria é ", salarioAposentadoria)
    };
  };
}else{
  console.log("Você ainda não pode se aposentar.")
};