import Gameboard from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard(10, 10);
  }

  attack(player, x, y) {
    player.board.receiveAttack(x, y);
  }

  attackRandomly(player) {
    let y = Math.floor(Math.random() * player.board.grid[0].length);
    let x = Math.floor(Math.random() * player.board.grid.length);
    let cell = player.board.grid[x][y];
    if (cell === undefined) {
      this.attack(player, x, y);
    } else if (cell === 'miss') {
      this.attackRandomly(player);
    } else if (cell.ship.lives[cell.index] === 'X') {
      this.attackRandomly(player);
    } else {
      this.attack(player, x, y);
    }
  }
}

export default Player;
