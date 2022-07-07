class Gameboard {
  constructor(length, width) {
    this.grid = [...new Array(length)].map(() => [...new Array(width)]);
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, x, y) {
    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = { ship: ship, index: i };
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x + i][y] = { ship: ship, index: i };
      }
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      let ship = this.grid[x][y].ship;
      ship.hit(this.grid[x][y].index);
    } else {
      this.missedShots.push({ x: x, y: y });
    }
  }

  isGameOver() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }
}

export default Gameboard;
