class Jogador {
  constructor(x, y, sprites) {
    this.x = x;
    this.y = y;

    this.largura = 80;
    this.altura = 80;

    this.velocidade = 5;

    this.sprites = sprites;

    this.direcao = "baixo";
    this.andando = false;

    this.frameAtual = 0;
    this.tempoFrame = 0;
    this.velocidadeAnimacao = 8;

    this.vidaMaxima = 100;
    this.vida = this.vidaMaxima;
  }

  mover() {
    this.andando = false;

    if (keyIsDown(87)) { // W
      this.y -= this.velocidade;
      this.direcao = "cima";
      this.andando = true;
    }

    if (keyIsDown(83)) { // S
      this.y += this.velocidade;
      this.direcao = "baixo";
      this.andando = true;
    }

    if (keyIsDown(65)) { // A
      this.x -= this.velocidade;
      this.direcao = "esquerda";
      this.andando = true;
    }

    if (keyIsDown(68)) { // D
      this.x += this.velocidade;
      this.direcao = "direita";
      this.andando = true;
    }
  }

  animar() {
    if (this.andando) {
      this.tempoFrame++;

      if (this.tempoFrame >= this.velocidadeAnimacao) {
        this.frameAtual++;

        if (this.frameAtual >= this.sprites[this.direcao].length) {
          this.frameAtual = 0;
        }

        this.tempoFrame = 0;
      }
    } else {
      this.frameAtual = 0;
      this.tempoFrame = 0;
    }
  }

  mostrar() {
    let sprite;

    if (this.andando) {
      sprite = this.sprites[this.direcao][this.frameAtual];
    } else {
      sprite = this.sprites[this.direcao][0];
    }

    image(
      sprite,
      this.x,
      this.y,
      this.largura,
      this.altura
    );
  }

  hitbox() {
    // A arte tem transparência nas bordas; a colisão fica no corpo central.
    return {
      x: this.x + this.largura * 0.22,
      y: this.y + this.altura * 0.20,
      largura: this.largura * 0.56,
      altura: this.altura * 0.60
    };
  }

  checarColisao(outro) {
    const caixaJogador = this.hitbox();
    return (
      caixaJogador.x < outro.x + outro.largura &&
      caixaJogador.x + caixaJogador.largura > outro.x &&
      caixaJogador.y < outro.y + outro.altura &&
      caixaJogador.y + caixaJogador.altura > outro.y
    );
  }
  receberDano(dano) {

    this.vida -= dano;

    if (this.vida < 0) {
      this.vida = 0;
    }

  }
  mostrarVida() {

    let x = 50;
    let y = 30;

    let larguraBarra = 200;
    let alturaBarra = 20;

    let larguraVida = map(
      this.vida,
      0,
      this.vidaMaxima,
      0,
      larguraBarra
    );

    fill(50);
    rect(
      x,
      y,
      larguraBarra,
      alturaBarra
    );

    fill(0, 255, 0);
    rect(
      x,
      y,
      larguraVida,
      alturaBarra
    );

    fill(255);
    textSize(16);


    text(
      this.vida + " / " + this.vidaMaxima,
      x,
      y + 40
    );
  }

}
