const parImpar = process.argv[2]
const num = Number(process.argv[3])

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)

console.log(`Você escolheu ${parImpar} e o número ${num}`);
console.log(`O computador escolheu o número ${numeroAleatorioEntreZeroeDez}, e a soma total é ${(num + numeroAleatorioEntreZeroeDez)}`);

if (parImpar === "par") {
  if ((num + numeroAleatorioEntreZeroeDez) % 2 === 0){
    console.log("VOCÊ GANHOU!");
  }else{
    console.log("VOCÊ PERDEU!");
  }
} else {
  if ((num + numeroAleatorioEntreZeroeDez) % 2 === 0){
    console.log("VOCÊ PERDEU!");
  }else{
    console.log("VOCÊ GANHOU!");
  }
}
