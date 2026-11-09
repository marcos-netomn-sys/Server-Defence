let imgGameOver;
let imgVitoria;
let imgReiniciar;
let imgMenu;
let fundoFinal;
let fundoFinalCapturado = false;
let cenario;
let backmenu;
let jogador;
let menu;
let fonte;
let estadoJogo = "menu";
let hitboxesVisiveis = false;
let spritesBotao = [];
let logoFrames = [];
let musicaMenu;
let telasRound = [];

let sprites = {
  baixo: [],
  cima: [],
  direita: [],
  esquerda: [],
};

let tiros = [];

let cavaloSprites = {
  direita: [],
  esquerda: [],
  cima: [],
  baixo: [],
};

let servidor;
let servidorImg;

let cavalos = [];
let bugs = [];
let virus = [];

let tempoInicioJogo;
let tempoUltimoSpawn = 0;
let maxCavalos = 8;
let total_cavalos_criados = 0;

let maxBugs = 8;
let total_bugs_criados = 0;
let tempoUltimoSpawnBug = 0;

let maxVirus = 8;
let total_virus_criados = 0;
let tempoUltimoSpawnVirus = 0;

let roundAtual = 1;
let estadoRound = "jogando";
let tempoTransicaoRound = 0;

let plantinha;

// MAPEAMENTO DOS FRAMES DO BUG
let mapeamentoBug = {
  direita: {
    frames: [
      { x: 10, y: 300 },
      { x: 380, y: 300 },
      { x: 710, y: 300 },
      { x: 1060, y: 300 },
      { x: 1410, y: 300 },
    ],
    frameWidth: 350,
    frameHeight: 320,
  },

  esquerda: {
    frames: [
      { x: 20, y: 320 },
      { x: 370, y: 320 },
      { x: 730, y: 320 },
      { x: 1060, y: 320 },
      { x: 1420, y: 320 },
    ],
    frameWidth: 350,
    frameHeight: 320,
  },

  baixo: {
    frames: [
      { x: 330, y: 10 },
      { x: 330, y: 315 },
      { x: 345, y: 620 },
      { x: 335, y: 925 },
      { x: 330, y: 1230 },
    ],
    frameWidth: 360,
    frameHeight: 320,
  },

  cima: {
    frames: [
      { x: 350, y: 10 },
      { x: 350, y: 310 },
      { x: 350, y: 620 },
      { x: 350, y: 935 },
      { x: 350, y: 1240 },
    ],
    frameWidth: 320,
    frameHeight: 310,
  },
};

let bugSprites = {};
let animacoesBug = {};

// MAPEAMENTO DOS FRAMES DO VÍRUS
let mapeamentoVirus = {
  direita: {
    frames: [
      { x: 10, y: 100 },
      { x: 380, y: 100 },
      { x: 710, y: 100 },
      { x: 1060, y: 100 },
      { x: 1410, y: 100 },
    ],
    frameWidth: 350,
    frameHeight: 320,
  },

  esquerda: {
    frames: [
      { x: 20, y: 100 },
      { x: 370, y: 100 },
      { x: 730, y: 100 },
      { x: 1060, y: 100 },
      { x: 1420, y: 100 },
    ],
    frameWidth: 350,
    frameHeight: 320,
  },

  baixo: {
    frames: [
      { x: 392, y: 0 },
      { x: 392, y: 190 },
      { x: 392, y: 375 },
      { x: 392, y: 560 },
      { x: 392, y: 745 },
      { x: 392, y: 930 },
      { x: 392, y: 1115 },
      { x: 392, y: 1300 },
    ],
    frameWidth: 240,
    frameHeight: 190,
  },

  cima: {
    frames: [
      { x: 392, y: 0 },
      { x: 392, y: 190 },
      { x: 392, y: 375 },
      { x: 392, y: 560 },
      { x: 392, y: 745 },
      { x: 392, y: 930 },
      { x: 392, y: 1115 },
      { x: 392, y: 1300 },
    ],
    frameWidth: 240,
    frameHeight: 190,
  },
};

let virusSprites = {};
let animacoesVirus = {};

class Hitbox {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }

  mostrar() {
    noFill();
    stroke(255, 0, 0);

    rect(
      this.x * width,
      this.y * height,
      this.largura * width,
      this.altura * height,
    );
  }
}

let hitboxes = [
  new Hitbox(0, 0, 0.05, 1),
  new Hitbox(0.95, 0, 0.05, 1),

  new Hitbox(0, 0, 1, 0.1),
  new Hitbox(0, 0.85, 1, 0.15),

  new Hitbox(0.075, 0.2, 0.075, 0.1),
  new Hitbox(0.85, 0.2, 0.075, 0.1),

  new Hitbox(0.06, 0.68, 0.075, 0.1),
  new Hitbox(0.86, 0.68, 0.075, 0.1),
];

function preload() {
  cenario = loadImage("Assets/cenário/cenario.png");

  fonte = loadFont("Assets/font/PixelifySans-VariableFont_wght.ttf");

  backmenu = loadImage("Assets/cenário/menu.png");
  telasRound = [
    null,
    loadImage("Assets/cenário/round_1.png"),
    loadImage("Assets/cenário/round_2.png"),
    loadImage("Assets/cenário/round_3.png"),
  ];

  imgGameOver = loadImage("Assets/cenário/GameOver.png");
  imgVitoria = loadImage("Assets/cenário/Vitória.png");
  imgReiniciar = loadImage("Assets/cenário/Reiniciarbuttom.png");
  imgMenu = loadImage("Assets/cenário/Menubuttom.png");

  musicaMenu = loadSound("Assets/audio/music_menu.mp3");

  logoFrames = [
    loadImage("Assets/logo/frame_1.png"),
    loadImage("Assets/logo/frame_2.png"),
    loadImage("Assets/logo/frame_3.png"),
    loadImage("Assets/logo/frame_4.png"),
    loadImage("Assets/logo/frame_5.png"),
    loadImage("Assets/logo/frame_6.png"),
    loadImage("Assets/logo/frame_7.png"),
    loadImage("Assets/logo/frame_8.png"),
    loadImage("Assets/logo/frame_9.png"),
    loadImage("Assets/logo/frame_10.png"),
  ];

  spritesBotao = [
    loadImage("Assets/botao_frames_jogar/botao_frame_1_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_2_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_3_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_4_jogar.png"),
    loadImage("Assets/botao_frames_jogar/botao_frame_5_jogar.png"),
  ];

  // Sprites do jogador
  sprites.baixo = [
    loadImage("Assets/Personagem/baixo/parado.png"),
    loadImage("Assets/Personagem/baixo/Passo1.png"),
    loadImage("Assets/Personagem/baixo/Passo2.png"),
  ];

  sprites.cima = [
    loadImage("Assets/Personagem/cima/parado.png"),
    loadImage("Assets/Personagem/cima/passo1.png"),
    loadImage("Assets/Personagem/cima/passo2.png"),
  ];

  sprites.direita = [
    loadImage("Assets/Personagem/direita/Parado.png"),
    loadImage("Assets/Personagem/direita/passo1.png"),
    loadImage("Assets/Personagem/direita/passo2.png"),
  ];

  sprites.esquerda = [
    loadImage("Assets/Personagem/esquerda/Parado.png"),
    loadImage("Assets/Personagem/esquerda/passo1.png"),
    loadImage("Assets/Personagem/esquerda/passo2.png"),
  ];

  // Sprites dos cavalos de Troia
  cavaloSprites.direita = [
    loadImage("Assets/Cavalo De Troia/direita/CT_parado.png"),
    loadImage("Assets/Cavalo De Troia/direita/CT_passo1.png"),
  ];

  cavaloSprites.cima = [
    loadImage("Assets/Cavalo De Troia/cima/CT_cima_parado1.png"),
    loadImage("Assets/Cavalo De Troia/cima/CT_cima_passo1.png"),
  ];

  cavaloSprites.esquerda = [
    loadImage("Assets/Cavalo De Troia/esquerda/CT_parado.png"),
    loadImage("Assets/Cavalo De Troia/esquerda/CT_passo1.png"),
    loadImage("Assets/Cavalo De Troia/esquerda/CT_passo2.png"),
    loadImage("Assets/Cavalo De Troia/esquerda/CT_passo3.png"),
  ];

  cavaloSprites.baixo = [
    loadImage("Assets/Cavalo De Troia/baixo/CT_baixo_parado.png"),
    loadImage("Assets/Cavalo De Troia/baixo/CT_baixo_passo1.png"),
    loadImage("Assets/Cavalo De Troia/baixo/CT_baixo_passo2.png"),
    loadImage("Assets/Cavalo De Troia/baixo/CT_baixo_passo3.png"),
  ];

  // Servidor e decoração
  servidorImg = loadImage("Assets/Servidor/Servidor_frame1.png");

  plantinha = loadImage("Assets/plantinha.png.png");

  // Spritesheets do Bug
  bugSprites = {
    direita: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Direita.png",
    ),

    esquerda: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Esquerda.png",
    ),

    baixo: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Baixo.png",
    ),

    cima: loadImage(
      "Assets/Aranha Robótica/Sprite de Aranha Robótica - Cima.png",
    ),
  };

  // Spritesheets do Vírus
  virusSprites = {
    direita: loadImage("Assets/Vírus/Vírus.png"),

    esquerda: loadImage("Assets/Vírus/Vírus - Esquerda.png"),

    baixo: loadImage("Assets/Vírus/virus_baixo_spritesheet.png"),

    cima: loadImage("Assets/Vírus/virus_costas_spritesheet.png"),
  };

  // Animações do Bug
  animacoesBug = {
    direita: new Animacao(mapeamentoBug.direita, bugSprites.direita),

    esquerda: new Animacao(mapeamentoBug.esquerda, bugSprites.esquerda),

    baixo: new Animacao(mapeamentoBug.baixo, bugSprites.baixo),

    cima: new Animacao(mapeamentoBug.cima, bugSprites.cima),
  };

  // Animações do Vírus
  animacoesVirus = {
    direita: new Animacao(mapeamentoVirus.direita, virusSprites.direita),

    esquerda: new Animacao(mapeamentoVirus.esquerda, virusSprites.esquerda),

    baixo: new Animacao(mapeamentoVirus.baixo, virusSprites.baixo),

    cima: new Animacao(mapeamentoVirus.cima, virusSprites.cima),
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  menu = new Menu(backmenu, spritesBotao, logoFrames, fonte);

  jogador = new Jogador(width / 2, height * 0.65, sprites);

  posicionarServidor();
}

function posicionarServidor() {
  let xServidor = width * 0.5 - 60;
  let yServidor = height * 0.43 - 55;

  if (!servidor) {
    servidor = new Servidor(xServidor, yServidor, servidorImg);
  } else {
    servidor.x = xServidor;
    servidor.y = yServidor;
  }
}

function atirar() {
  const centroX = jogador.x + jogador.largura / 2;
  const centroY = jogador.y + jogador.altura / 2 + 6;
  const recuo = 12;
  let x = centroX;
  let y = centroY;

  // O projétil nasce junto à borda do personagem voltada para o disparo.
  if (jogador.direcao === "cima") y = jogador.y + recuo + 6;
  if (jogador.direcao === "baixo") y = jogador.y + jogador.altura - recuo + 6;
  if (jogador.direcao === "esquerda") x = jogador.x + recuo;
  if (jogador.direcao === "direita") x = jogador.x + jogador.largura - recuo;

  let tiro = new Tiro(x, y, jogador.direcao);

  tiros.push(tiro);
}

// CRIAR CAVALO DE TROIA
function criarCavalo() {
  let locaisSpawn = [
    { x: 0, y: height * 0.27 },
    { x: 0, y: height * 0.3 },
    { x: 0, y: height * 0.33 },

    { x: width, y: height * 0.27 },
    { x: width, y: height * 0.3 },
    { x: width, y: height * 0.33 },

    { x: width * 0.47, y: 0 },
    { x: width * 0.5, y: 0 },
    { x: width * 0.53, y: 0 },

    { x: width * 0.47, y: height },
    { x: width * 0.5, y: height },
    { x: width * 0.53, y: height },
  ];

  let local = random(locaisSpawn);

  cavalos.push(new Inimigo(local.x, local.y, cavaloSprites));
}

// CRIAR BUG
function criarBug() {
  console.log("Função criarBug foi chamada!");

  let locaisSpawn = [
    { x: 0, y: height * 0.27 },
    { x: 0, y: height * 0.3 },
    { x: 0, y: height * 0.33 },

    { x: width, y: height * 0.27 },
    { x: width, y: height * 0.3 },
    { x: width, y: height * 0.33 },

    { x: width * 0.47, y: 0 },
    { x: width * 0.5, y: 0 },
    { x: width * 0.53, y: 0 },

    { x: width * 0.47, y: height },
    { x: width * 0.5, y: height },
    { x: width * 0.53, y: height },
  ];

  let local = random(locaisSpawn);

  bugs.push(new Inimigo(local.x, local.y, null, animacoesBug));

  console.log("Quantidade de Bugs:", bugs.length);
}

// CRIAR VÍRUS
function criarVirus() {
  console.log("Função criarVirus foi chamada!");

  let locaisSpawn = [
    { x: 0, y: height * 0.27 },
    { x: 0, y: height * 0.3 },
    { x: 0, y: height * 0.33 },

    { x: width, y: height * 0.27 },
    { x: width, y: height * 0.3 },
    { x: width, y: height * 0.33 },

    { x: width * 0.47, y: 0 },
    { x: width * 0.5, y: 0 },
    { x: width * 0.53, y: 0 },

    { x: width * 0.47, y: height },
    { x: width * 0.5, y: height },
    { x: width * 0.53, y: height },
  ];

  let local = random(locaisSpawn);

  virus.push(new Inimigo(local.x, local.y, null, animacoesVirus));

  console.log("Quantidade de Vírus:", virus.length);
}

function draw() {
  if (estadoJogo === "menu") {
    if (menu) {
      menu.mostrar();
    }
    return;
  }

  if (
    estadoJogo === "jogando" &&
    (jogador.vida <= 0 || servidor.foiDestruido())
  ) {
    capturarFundoFinal();
    estadoJogo = "gameover";
  }

  if (
    estadoJogo === "jogando" &&
    roundAtual === 3 &&
    estadoRound === "round3" &&
    total_virus_criados >= maxVirus &&
    virus.length === 0
  ) {
    capturarFundoFinal();
    estadoJogo = "vitoria";
  }

  if (estadoJogo === "jogando") {
    jogar();

    // Fim da rodada 1: todos os cavalos foram derrotados.
    if (
      roundAtual === 1 &&
      total_cavalos_criados >= maxCavalos &&
      cavalos.length === 0 &&
      estadoRound === "jogando"
    ) {
      estadoRound = "transicao";
      tempoTransicaoRound = millis();
    }

    // Fim da rodada 2: todos os Bugs foram derrotados.
    if (
      roundAtual === 2 &&
      total_bugs_criados >= maxBugs &&
      bugs.length === 0 &&
      estadoRound === "round2"
    ) {
      estadoRound = "transicao";
      tempoTransicaoRound = millis();
    }

  
    // Espera 5 segundos antes de anunciar a próxima rodada.
    if (estadoRound === "transicao" && millis() - tempoTransicaoRound >= 5000) {
      roundAtual++;

      estadoRound = "anunciando";
      tempoTransicaoRound = millis();
    }

    // Mostra o anúncio e inicia a próxima rodada após 5 segundos.
    if (
      estadoRound === "anunciando" &&
      millis() - tempoTransicaoRound >= 5000
    ) {
      if (roundAtual === 1) {
        estadoRound = "jogando";
        tempoInicioJogo = millis();
        tempoUltimoSpawn = millis();
      } else if (roundAtual === 2) {
        estadoRound = "round2";
        tempoUltimoSpawnBug = millis();
      } else if (roundAtual === 3) {
        estadoRound = "round3";
        tempoUltimoSpawnVirus = millis();
      
    }
  }

    // Surgimento gradual dos cavalos na rodada 1.
    if (
      roundAtual === 1 &&
      estadoRound === "jogando" &&
      millis() - tempoInicioJogo >= 10000 &&
      millis() - tempoUltimoSpawn >= 5000 &&
      total_cavalos_criados < maxCavalos
    ) {
      criarCavalo();

      total_cavalos_criados++;
      tempoUltimoSpawn = millis();
    }

    // Surgimento gradual dos Bugs na rodada 2.
    if (
      roundAtual === 2 &&
      estadoRound === "round2" &&
      total_bugs_criados < maxBugs &&
      millis() - tempoUltimoSpawnBug >= 5000
    ) {
      criarBug();

      total_bugs_criados++;
      tempoUltimoSpawnBug = millis();
    }

    // Surgimento gradual dos Vírus na rodada 3.
    if (
      roundAtual === 3 &&
      estadoRound === "round3" &&
      total_virus_criados < maxVirus &&
      millis() - tempoUltimoSpawnVirus >= 5000
    ) {
      criarVirus();

      total_virus_criados++;
      tempoUltimoSpawnVirus = millis();
    }

    

    // Atualiza e desenha os cavalos.
    for (let cavalo of cavalos) {
      let distanciaJogador = dist(
        cavalo.x + cavalo.largura / 2,
        cavalo.y + cavalo.altura / 2,
        jogador.x + jogador.largura / 2,
        jogador.y + jogador.altura / 2,
      );

      if (distanciaJogador <= 200) {
        cavalo.mover(jogador);
        cavalo.atacar(jogador);
      } else {
        cavalo.mover(servidor);
        cavalo.atacar(servidor);
      }

      cavalo.animar();
      cavalo.mostrar();
      cavalo.mostrarVida();
    }

    // Atualiza e desenha os Bugs.
    for (let bug of bugs) {
      let distanciaJogador = dist(
        bug.x + bug.largura / 2,
        bug.y + bug.altura / 2,
        jogador.x + jogador.largura / 2,
        jogador.y + jogador.altura / 2,
      );

      if (distanciaJogador <= 200) {
        bug.mover(jogador);
        bug.atacar(jogador);
      } else {
        bug.mover(servidor);
        bug.atacar(servidor);
      }

      bug.animar();
      bug.mostrar();
      bug.mostrarVida();
    }

    // Atualiza e desenha os Vírus.
    for (let inimigoVirus of virus) {
      let distanciaJogador = dist(
        inimigoVirus.x + inimigoVirus.largura / 2,
        inimigoVirus.y + inimigoVirus.altura / 2,
        jogador.x + jogador.largura / 2,
        jogador.y + jogador.altura / 2,
      );

      if (distanciaJogador <= 200) {
        inimigoVirus.mover(jogador);
        inimigoVirus.atacar(jogador);
      } else {
        inimigoVirus.mover(servidor);
        inimigoVirus.atacar(servidor);
      }

      inimigoVirus.animar();
      inimigoVirus.mostrar();
      inimigoVirus.mostrarVida();
    }

    if (jogador.vida <= 0 || servidor.foiDestruido()) {
      capturarFundoFinal();
      estadoJogo = "gameover";
    }
  }

  if (estadoJogo === "jogando" && estadoRound === "anunciando") {
    mostrarAnuncioRound();
  }

  if (estadoJogo === "jogando" && hitboxesVisiveis) {
    mostrarHitboxes();
  }

  if (estadoJogo === "gameover" || estadoJogo === "vitoria") {
    telaFinal();
  }
}

function mostrarHitboxes() {
  push();
  noFill();
  strokeWeight(2);

  // Obstáculos do cenário.
  for (let hitbox of hitboxes) {
    hitbox.mostrar();
  }

  // Jogador: caixa efetiva usada por checarColisao().
  const caixaJogador = jogador.hitbox();
  stroke(0, 255, 0);
  rect(
    caixaJogador.x,
    caixaJogador.y,
    caixaJogador.largura,
    caixaJogador.altura,
  );

  // Servidor.
  let caixaServidor = servidor.serverHitbox();
  stroke(255, 220, 0);
  rect(
    caixaServidor.x,
    caixaServidor.y,
    caixaServidor.largura,
    caixaServidor.altura,
  );

  // Inimigos atingidos pelos tiros.
  stroke(255, 0, 255);
  for (let lista of [cavalos, bugs, virus]) {
    for (let inimigo of lista) {
      let caixa = inimigo.inimigoHitbox();
      rect(caixa.x, caixa.y, caixa.largura, caixa.altura);
    }
  }

  pop();
}

function mousePressed() {
  if (estadoJogo === "gameover" || estadoJogo === "vitoria") {
    if (clicouBotaoFinal("reiniciar")) {
      iniciarJogo();
    } else if (clicouBotaoFinal("menu")) {
      estadoJogo = "menu";
    }
    return;
  }

  if (estadoJogo === "menu") {
    if (!menu) {
      return;
    }

    userStartAudio();

    if (!menu.clicouJogar()) {
      if (!musicaMenu.isPlaying()) {
        musicaMenu.setVolume(31);
        musicaMenu.loop();
      }
    } else {
      if (musicaMenu.isPlaying()) {
        musicaMenu.stop();
      }

      iniciarJogo();
    }
  }
}

function iniciarJogo() {
  fundoFinal = null;
  fundoFinalCapturado = false;
  cavalos.length = 0;
  bugs.length = 0;
  virus.length = 0;
  tiros.length = 0;

  jogador.x = width / 2;
  jogador.y = height * 0.65;
  jogador.vida = jogador.vidaMaxima;
  jogador.direcao = "baixo";
  jogador.andando = false;
  jogador.frameAtual = 0;
  jogador.tempoFrame = 0;

  servidor.vida = servidor.vidaMaxima;
  posicionarServidor();

  total_cavalos_criados = 0;
  total_bugs_criados = 0;
  total_virus_criados = 0;
  roundAtual = 1;
  estadoRound = "anunciando";

  tempoInicioJogo = millis();
  tempoUltimoSpawn = tempoInicioJogo;
  tempoUltimoSpawnBug = tempoInicioJogo;
  tempoUltimoSpawnVirus = tempoInicioJogo;
  tempoTransicaoRound = tempoInicioJogo;

  estadoJogo = "jogando";
}

function dimensoesBotoesFinais() {
  let largura = Math.min(220, (width - 48) / 2);
  let altura = 58;
  let espacamento = 16;
  let y = height / 2 + 34;
  let xReiniciar = (width - largura * 2 - espacamento) / 2;

  return {
    reiniciar: { x: xReiniciar, y, largura, altura },
    menu: { x: xReiniciar + largura + espacamento, y, largura, altura },
  };
}

function clicouBotaoFinal(acao) {
  let botao = dimensoesBotoesFinais()[acao];

  return (
    mouseX >= botao.x &&
    mouseX <= botao.x + botao.largura &&
    mouseY >= botao.y &&
    mouseY <= botao.y + botao.altura
  );
}

function telaFinal() {
  if (fundoFinal) {
    image(fundoFinal, 0, 0, width, height);
  } else {
    background(0);
  }

  noStroke();
  fill(0, 0, 0, 145);
  rect(0, 0, width, height);

  let imagemTitulo;

  if (estadoJogo === "gameover") {
    imagemTitulo = imgGameOver;
  } else {
    imagemTitulo = imgVitoria;
  }

  let larguraTitulo = Math.min(width * 0.65, 700);
  let alturaTitulo = (larguraTitulo * imagemTitulo.height) / imagemTitulo.width;

  image(
    imagemTitulo,
    (width - larguraTitulo) / 2,
    height * 0.18,
    larguraTitulo,
    alturaTitulo,
  );

  let botoes = dimensoesBotoesFinais();

  image(
    imgReiniciar,
    botoes.reiniciar.x,
    botoes.reiniciar.y,
    botoes.reiniciar.largura,
    botoes.reiniciar.altura,
  );

  image(
    imgMenu,
    botoes.menu.x,
    botoes.menu.y,
    botoes.menu.largura,
    botoes.menu.altura,
  );
}

function mostrarAnuncioRound() {
  let imagemRound = telasRound[roundAtual];

  if (!imagemRound || imagemRound.width === 0) {
    return;
  }

  push();
  fill(0, 0, 0, 180);
  noStroke();
  rect(0, 0, width, height);

  let proporcao = imagemRound.width / imagemRound.height;
  let largura = Math.min(width * 0.48, height * 1.5);
  let altura = largura / proporcao;
  let progresso = constrain((millis() - tempoTransicaoRound) / 5000, 0, 1);
  let x = width - progresso * (width + largura);
  let y = (height - altura) / 2;

  image(imagemRound, x, y, largura, altura);
  pop();
}

function jogar() {
  image(cenario, 0, 0, width, height);

  let xAnterior = jogador.x;
  let yAnterior = jogador.y;

  jogador.mover();

  let hitboxServidor = servidor.serverHitbox();

  if (jogador.checarColisao(hitboxServidor)) {
    jogador.x = xAnterior;
    jogador.y = yAnterior;
  }

  for (let hitbox of hitboxes) {
    let hitboxPixels = {
      x: hitbox.x * width,
      y: hitbox.y * height,
      largura: hitbox.largura * width,
      altura: hitbox.altura * height,
    };

    if (jogador.checarColisao(hitboxPixels)) {
      jogador.x = xAnterior;
      jogador.y = yAnterior;
    }
  }

  servidor.mostrar();
  servidor.mostrarVida();

  jogador.animar();
  jogador.mostrar();
  jogador.mostrarVida();

  atualizarTiros();

  // Plantinhas decorativas.
  image(plantinha, width * 0.065, height * 0.2, 60, 60);

  image(plantinha, width * 0.05, height * 0.67, 60, 60);
}

function keyPressed() {
  if (estadoJogo === "gameover" || estadoJogo === "vitoria") {
    if (key.toLowerCase() === "r") {
      iniciarJogo();
    } else if (key.toLowerCase() === "m") {
      estadoJogo = "menu";
    }
    return;
  }

  if (estadoJogo === "jogando") {
    if (key.toLowerCase() === "h") {
      hitboxesVisiveis = !hitboxesVisiveis;
      return;
    }

    if (key === " ") {
      atirar();
    }
  }
}

function atualizarTiros() {
  for (let i = tiros.length - 1; i >= 0; i--) {
    let tiro = tiros[i];

    tiro.mover();

    let acertou = false;

    // Os tiros podem acertar cavalos, Bugs e Vírus.
    let listasInimigos = [cavalos, bugs, virus];

    for (let lista of listasInimigos) {
      for (let j = lista.length - 1; j >= 0; j--) {
        let inimigo = lista[j];
        let hitbox = inimigo.inimigoHitbox();

        if (tiro.checarColisao(hitbox)) {
          inimigo.receberDano(tiro.dano);
          acertou = true;

          if (inimigo.estaMorto()) {
            lista.splice(j, 1);
          }

          break;
        }
      }

      if (acertou) {
        break;
      }
    }

    if (acertou || tiro.saiuDaTela()) {
      tiros.splice(i, 1);
    } else {
      tiro.mostrar();
    }
  }

  // Luz lilás perto do servidor.
  push();
  noStroke();

  fill(180, 100, 255, 15);
  ellipse(width * 0.5, height * 0.43, 260, 200);

  fill(180, 100, 255, 25);
  ellipse(width * 0.5, height * 0.43, 180, 140);

  fill(180, 100, 255, 35);
  ellipse(width * 0.5, height * 0.43, 100, 80);

  pop();
}

function capturarFundoFinal() {
  if (!fundoFinalCapturado) {
    fundoFinal = get();
    fundoFinal.filter(BLUR, 4);
    fundoFinalCapturado = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  posicionarServidor();
}

