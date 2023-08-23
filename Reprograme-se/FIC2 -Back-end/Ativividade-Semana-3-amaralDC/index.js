let par = 0
let impar = 0

for (i = 0; i <= 20; i++){
  let temp = i * i
  console.log(temp)

  if (temp % 2 == 0){
    par += temp
  }else{
    impar += temp
  }
}

console.log("A soma de quadrados pares: ", par)
console.log("A soma de quadrados ímpares: ", impar)