//Variáveis de localização da bolinha
let xBolinha = 370;
let yBolinha = 230;

//Variáveis de caracterização da bolinha
let diametro = 20;
let raio = diametro / 2;

//Variáveis de velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variáveis de localização da Minha Raquete
let xMinhaRaquete = 10;
let yMinhaRaquete = 170;

//Variáveis de caracterização da Minha Raquete
let alturaMinhaRaquete = 90;
let comprimentoMinhaRaquete = 10;

//Variável do p5.collide
let colidiu = false;

//Variáveis de localização da Raquete Oponente
let xRaqueteOponente = 665;
let yRaqueteOponente = 170;

//Variáveis de velocidade da Raquete Oponente
let velocidadeYOponente;

//Variáveis do placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Variável para erro do oponente
let chanceDeErrar = 0;

//Função para colocar os sons
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
//Função setup: define o background
function setup(){
  createCanvas (710, 475)
  trilha.loop();
}
  

//Função draw: desenha e mostra as funções
function draw(){
  background (0)
  mostrarBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoMinhaRaquete();
  verificaColisaoRaqueteBiblioteca(xMinhaRaquete, yMinhaRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  calculaChanceDeErrar();
 
}
function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
     velocidadeXBolinha *= -1;}
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y){
  rect(x, y, comprimentoMinhaRaquete, alturaMinhaRaquete)}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
  if (keyIsDown (DOWN_ARROW)){
    yMinhaRaquete += 10;}}

//Função de verificação da colisão sem utilizar biblioteca importada. Função não utilizada em draw.
function verificaColisaoMinhaRaquete(){
  if (xBolinha - raio < xMinhaRaquete + comprimentoMinhaRaquete && yBolinha - raio < yMinhaRaquete + alturaMinhaRaquete && yBolinha + raio > yMinhaRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

//Função utilizando biblioteca importada de p5.collide.
function verificaColisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, comprimentoMinhaRaquete, alturaMinhaRaquete, xBolinha, yBolinha, diametro)
  if(colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoMinhaRaquete / 2 - 35;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}
function incluirPlacar (){
  stroke(255)
  textAlign(CENTER)
  fill(color(0, 0, 128))
  rect(150, 10, 40, 20);
  rect(560, 10, 40, 20);
  fill(255)
  textSize(20);
  text(meusPontos, 170, 26)
  text(pontosDoOponente, 580, 26)
}
function marcaPonto(){
  if(xBolinha > 700){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

//Função que calcula a chance do oponente errar
function calculaChanceDeErrar(){
  if(pontosDoOponente >= meusPontos){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39){
      chanceDeErrar = 45;
    }
  }
  else {
    chanceDeErrar -= 1;
    if(chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
}