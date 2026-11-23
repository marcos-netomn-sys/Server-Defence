class Tiro {
  constructor(x, y, direcao, tirosSprites) {
    this.x = x;
    this.y = y;
    this.direcao = direcao;
    this.velocidade = 10;

    // Hitbox de colisão.
    this.largura = 20;
    this.altura = 20;
    this.dano = 10;

    // Para a esquerda, utiliza o sprite da direita.
    this.sprite =
      direcao === "esquerda"
        ? tirosSprites.direita
        : tirosSprites[direcao];

    this.frameAtual = 0;
    this.intervaloFrame = 80;
    this.tempoUltimoFrame = millis();
    this.animacaoTerminada = false;

    // Frames da animação.
    if (direcao === "direita" || direcao === "esquerda") {
      this.frames = [
        { x: 0, y: 0, largura: 512, altura: 682 },
        { x: 512, y: 0, largura: 512, altura: 682 },
        { x: 1024, y: 0, largura: 512, altura: 682 },
        { x: 1536, y: 0, largura: 512, altura: 682 },
      ];
    } 

    else if (direcao === "cima") {
      this.frames = [
        { x: 350, y: 10, largura: 320, altura: 310 },
        { x: 350, y: 310, largura: 320, altura: 310 },
        { x: 350, y: 620, largura: 320, altura: 310 },
        { x: 350, y: 935, largura: 320, altura: 310 },
        { x: 350, y: 1240, largura: 320, altura: 296 },
      ];
    } 

    else {
      this.frames = [
        { x: 330, y: 10, largura: 360, altura: 320 },
        { x: 330, y: 315, largura: 360, altura: 320 },
        { x: 345, y: 620, largura: 360, altura: 320 },
        { x: 335, y: 925, largura: 360, altura: 320 },
        { x: 330, y: 1230, largura: 360, altura: 306 },
      ];
    }

    // Tamanho visual do tiro.
    this.tamanhoVisual = 64;
  }

  atualizarAnimacao() {
    if (this.animacaoTerminada) {
      return;
    }

    if (millis() - this.tempoUltimoFrame >= this.intervaloFrame) {
      this.frameAtual++;

      // Ao chegar ao último frame, não reinicia.
      if (this.frameAtual >= this.frames.length - 1) {
        this.frameAtual = this.frames.length - 1;
        this.animacaoTerminada = true;
      }

      this.tempoUltimoFrame = millis();
    }
  }

  mover() {
    this.atualizarAnimacao();

    if (this.direcao === "cima") {
      this.y -= this.velocidade;
    }

    if (this.direcao === "baixo") {
      this.y += this.velocidade;
    }

    if (this.direcao === "esquerda") {
      this.x -= this.velocidade;
    }

    if (this.direcao === "direita") {
      this.x += this.velocidade;
    }
  }

  mostrar() {
    if (!this.sprite) {
      return;
    }

    let frame = this.frames[this.frameAtual];

    push();

    imageMode(CENTER);

    if (this.direcao === "esquerda") {
      // Espelha horizontalmente o sprite da direita.
      translate(this.x, this.y);
      scale(-1, 1);

      image(
        this.sprite,
        0,
        0,
        this.tamanhoVisual,
        this.tamanhoVisual,
        frame.x,
        frame.y,
        frame.largura,
        frame.altura
      );
    } 

    else {
      image(
        this.sprite,
        this.x,
        this.y,
        this.tamanhoVisual,
        this.tamanhoVisual,
        frame.x,
        frame.y,
        frame.largura,
        frame.altura
      );
    }

    pop();
  }

  saiuDaTela() {
    return (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height
    );
  }

  checarColisao(hitbox) {
    return (
      this.x - this.largura / 2 < hitbox.x + hitbox.largura &&
      this.x + this.largura / 2 > hitbox.x &&
      this.y - this.altura / 2 < hitbox.y + hitbox.altura &&
      this.y + this.altura / 2 > hitbox.y
    );
  }
}