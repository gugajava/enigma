const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array.from({ length: columns }).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00FF00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);

// ===== Enigma das Bestas (versão JS) =====

let falcon = 0, rat = 0, bat = 0, jogador = 0;
let jogadas = 0;
const terminal = document.getElementById("terminal");
const input = document.getElementById("comando");

function printStatus() {
  let ini = "", fim = "";

  if (falcon === 0) ini += "[Falcão] ";
  if (rat === 0) ini += "[Rato] ";
  if (bat === 0) ini += "[Morcego] ";
  if (jogador === 0) ini += "[Você] ";

  if (falcon === 1) fim += "[Falcão] ";
  if (rat === 1) fim += "[Rato] ";
  if (bat === 1) fim += "[Morcego] ";
  if (jogador === 1) fim += "[Você] ";

  terminal.innerText += `\nMargem inicial: ${ini}\nMargem final: ${fim}`;
}

function verificarPerigo() {
  return jogador !== rat && (rat === falcon || rat === bat);
}

function mover(escolha) {
  const direcao = jogador === 0 ? 1 : 0;
  let animal = null;

  if (escolha === "rato") animal = { val: rat, ref: () => rat = direcao };
  else if (escolha === "falcao") animal = { val: falcon, ref: () => falcon = direcao };
  else if (escolha === "morcego") animal = { val: bat, ref: () => bat = direcao };
  else if (escolha === "vazio") {
    jogador = direcao;
    return;
  } else {
    terminal.innerText += `\nEscolha inválida....\n`;
    return;
  }

  if (animal.val !== jogador) {
    terminal.innerText += `\nEsse animal não está do seu lado.\n`;
    return;
  }

  animal.ref();
  jogador = direcao;
}

function verificarFim() {
  if (falcon === 1 && rat === 1 && bat === 1) {
    terminal.innerText += `\n 01010010 01110101 01101110  existe um endereço que você sabe qual... você sabe o quanto pagam por esses carros caros, é uma fortuna, mas o mais impressionante é que eles não são tão rápidos, por isso vão morrer. mas por sorte, você tem um brinquedo a altura, não é?: .\nJogadas: ${jogadas}`;
    input.disabled = true;
    return true;
  }

  if (verificarPerigo()) {
    terminal.innerText += `\nVocê voltou e...Um deles esta sem a cabeça, outro teve o crânio estourado, joelhos quebrados, visceras espalhadas por todos os cantos, premeditado, para confundir a investigação, houve um incêndio provcado na avenida Coronel St.330, foi muito difícil recuperar os restos mortais, mas a equipe forense ja chegou a conclusao do que aconteceu com os vestígios do corpo, nao houve testemunhas, mas a imprensa indica um vazamento de gás, as autoridades arquivaram o caso, apesar de muita repercussão, o incidente levou a vida de Clarice C. Morrigan de 16 anos, uma jovem, filha de um deputado a governador de Gotham. hoje ela teria 27 anos. mas apesar de tudo isso... você falhou o jogo... \nOs animais não sobreviveram.`;
    input.disabled = true;
    return true;
  }

  return false;
}

function iniciarJogo() {
  terminal.innerText = `===       Essa é até simples... Vamos iniciar esse jogo      ===
   
   Há três animais. todos devem chegar ate o outro lado.
 
     o falcão devora o rato. o morcego teme o rato.
 
      Você só pode levar um por vez (ou ir sozinho.. considere usar o comando --vazio-- para deslocar da margem final ate inicial, ou vice versa.).\n

        Comandos: rato / falcao / morcego / vazio\n`;
  printStatus();
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !input.disabled) {
    const valor = input.value.trim().toLowerCase();
    input.value = "";
    terminal.innerText += `\n\n> ${valor}`;
    mover(valor);
    jogadas++;
    printStatus();
    verificarFim();
    terminal.scrollTop = terminal.scrollHeight;
  }
});

iniciarJogo();
