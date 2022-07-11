import Ship from './ship';

class Gameboard {
  constructor(length, width) {
    this.grid = [...new Array(length)].map(() => [...new Array(width)]);
    this.ships = [];
  }

  createShips() {
    const defaultShips = {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    };

    for (let [ship, length] of Object.entries(defaultShips)) {
      this.ships.push(new Ship(ship, length));
    }
  }

  placeShip(ship, x, y) {
    if (this.isValidPlacement(ship, x, y)) {
      if (ship.isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[x][y + i] = { ship: ship, index: i };
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.grid[x + i][y] = { ship: ship, index: i };
        }
      }
    } else {
      return false;
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      let ship = this.grid[x][y].ship;
      ship.hit(this.grid[x][y].index);
    } else {
      this.grid[x][y] = 'miss';
    }
  }

  isValidPlacement(ship, x, y) {
    //Check if coordinates will put ship out of bounds
    if (ship.isHorizontal) {
      if (y + ship.length > this.grid.length) return false;
    } else {
      if (x + ship.length > this.grid[0].length) return false;
    }

    //Check for collision with placed ships
    for (let i = 0; i < ship.length; i++) {
      if (ship.isHorizontal) {
        if (this.grid[x][y + i] !== undefined) return false;
      } else {
        if (this.grid[x + i][y] !== undefined) return false;
      }
    }

    return true;
  }

  isGameOver() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }
}

export default Gameboard;
