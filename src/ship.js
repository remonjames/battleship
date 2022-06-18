class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.isHorizontal = true;
    this.lives = [...Array(this.length)];
  }

  changeDirection() {
    this.isHorizontal = this.isHorizontal ? false : true;
  }

  hit(i) {
    this.lives[i] = 'X';
  }

  isSunk() {
    return this.lives.every((value) => value === 'X');
  }
}

export default Ship;
