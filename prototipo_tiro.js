let mapeamentoTiro = {
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

    let tirosSprites = {};
    let animacoesTiro = {};

    // Sprites do Tiro
    tirosSprites = {
      direita: loadImage("Assets/Tiro/Tiro - Direita.png"),
      esquerda: loadImage("Assets/Tiro/Tiro - Esquerda.png"),
      cima: loadImage("Assets/Tiro/Tiro - Cima.png"),
      baixo: loadImage("Assets/Tiro/Tiro - Baixo.png"),
    };

    // Animações do Tiro
    animacoesTiro = {
      direita: new Animacao(mapeamentoTiro.direita, tirosSprites.direita),
      esquerda: new Animacao(mapeamentoTiro.esquerda, tirosSprites.esquerda),
      cima: new Animacao(mapeamentoTiro.cima, tirosSprites.cima),
      baixo: new Animacao(mapeamentoTiro.baixo, tirosSprites.baixo),
    };