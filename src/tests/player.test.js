import Ship from '../ship';
import Player from '../player';

global.Math.random = () => 0.5;

describe('Player Class', () => {
  const player = new Player('Player');
  test('name', () => {
    expect(player.name).toBe('Player');
  });
  test('board', () => {
    expect(player.board.grid.length).toBe(10);
  });
});

describe('Player attack enemy board', () => {
  const player = new Player('Player');
  const computer = new Player('Computer');
  const computerBattleship = new Ship('battleship', 4);
  computer.board.placeShip(computerBattleship, 1, 3);
  player.attack(computer, 1, 3);
  test('attack enemy board at (1,3)', () => {
    expect(computerBattleship.lives).toEqual([
      'X',
      undefined,
      undefined,
      undefined,
    ]);
  });
});

describe('Computer attacks randomly and misses', () => {
  const player = new Player('Player');
  const computer = new Player('Computer');

  computer.attackRandomly(player);
  test('attack randomly()', () => {
    expect(player.board.grid[5][5]).toEqual('miss');
  });
});

describe('Computer attacks randomly and hits', () => {
  const player = new Player('Player');
  const computer = new Player('Computer');
  const ship = new Ship('battleship', 4);
  player.board.placeShip(ship, 5, 4);
  computer.attackRandomly(player);
  test('attack randomly()', () => {
    expect(ship.lives[1]).toEqual('X');
  });
});
