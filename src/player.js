import Gameboard from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard(10, 10);
  }

  attack(player, x, y) {
    player.board.receiveAttack(x, y);
  }
}

export default Player;
