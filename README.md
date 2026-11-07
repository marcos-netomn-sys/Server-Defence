# Server Defence

Jogo 2D de defesa em pixel art. O jogador protege o servidor de três ondas de ameaças: Cavalos de Troia, Bugs e Vírus.

## Como executar

Abra `index.html` com uma extensão de servidor local, como o Live Server do VS Code. O projeto usa p5.js e p5.sound.js, incluídos em `libraries/`, e não precisa de um processo de build.

## Como jogar

- Clique em **Jogar** no menu para iniciar.
- Mova o personagem com **W**, **A**, **S** e **D**.
- Atire com **Espaço** na direção para a qual o personagem está virado.
- Derrote as ameaças e proteja o servidor até o fim das três ondas.
- Nas telas de vitória e Game Over, use os botões na tela ou pressione **R** para reiniciar e **M** para voltar ao menu.

Cada onda cria oito inimigos: Cavalos de Troia na primeira, Bugs na segunda e Vírus na terceira. Os anúncios das ondas usam imagens em `Assets/cenário/`.

## Estrutura

- `sketch.js`: inicialização, menu, rodadas, combate e telas finais.
- `jogador.js`, `inimigo.js`, `servidor.js` e `tiro.js`: lógica das entidades do jogo.
- `menu.js` e `animação.js`: menu e animações.
- `Assets/`: imagens, fontes e áudio usados pelo jogo.
- `libraries/`: bibliotecas locais p5.js e p5.sound.js.
