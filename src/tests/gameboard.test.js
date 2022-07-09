import Gameboard from '../gameboard';
import Ship from '../ship';

describe('10x10 Gameboard', () => {
  const gameboard = new Gameboard(10, 10);
  test('empty board', () => {
    gameboard.grid.forEach((row) => {
      row.forEach((square) => {
        expect(square).toBe(undefined);
      });
    });
  });
  test('board has 10 rows', () => {
    expect(gameboard.grid.length).toBe(10);
  });
  test('board has 10 columns', () => {
    expect(gameboard.grid[0].length).toBe(10);
  });
  test('default ships', () => {
    gameboard.createShips();
    expect(gameboard.ships.length).toBe(5);
  });
});

describe('place ship function', () => {
  const gameboard = new Gameboard(10, 10);
  const ship = new Ship('destroyer', 2);
  gameboard.placeShip(ship, 0, 0);
  test('place horizontal ship at (0,0)', () => {
    expect(gameboard.grid[0][0]).toEqual({ ship, index: 0 });
    expect(gameboard.grid[0][1]).toEqual({ ship, index: 1 });
  });
  const ship2 = new Ship('submarine', 3);
  ship2.changeDirection();
  gameboard.placeShip(ship2, 5, 6);
  test('place vertical ship at (5,6)', () => {
    expect(gameboard.grid[5][6]).toEqual({ ship: ship2, index: 0 });
    expect(gameboard.grid[6][6]).toEqual({ ship: ship2, index: 1 });
    expect(gameboard.grid[7][6]).toEqual({ ship: ship2, index: 2 });
  });
});

describe('place ship at invalid position', () => {
  const gameboard = new Gameboard(10, 10);
  const ship = new Ship('destroyer', 2);
  test('place ship out of bounds of board', () => {
    expect(gameboard.placeShip(ship, 0, 9)).toBe(false);
  });
  const ship2 = new Ship('submarine', 3);
  ship2.changeDirection();
  test('place vertical ship out of bounds', () => {
    expect(gameboard.placeShip(ship2, 8, 0)).toBe(false);
  });
  gameboard.placeShip(ship, 0, 0);
  test('collision with placed ships', () => {
    expect(gameboard.placeShip(ship2, 0, 0)).toBe(false);
  });
});

describe('receive attack function', () => {
  const gameboard = new Gameboard(10, 10);
  const ship = new Ship('destroyer', 2);
  gameboard.placeShip(ship, 1, 2);
  gameboard.receiveAttack(1, 3);
  test('receive attack at (1,3)', () => {
    expect(gameboard.grid[1][3].ship.lives).toEqual([undefined, 'X']);
  });
});

describe('missed attack', () => {
  const gameboard = new Gameboard(10, 10);
  gameboard.receiveAttack(1, 3);
  test('receive attack at (1,3)', () => {
    expect(gameboard.missedShots).toEqual(
      expect.arrayContaining([{ x: 1, y: 3 }])
    );
  });
});

describe('check whether all ships are sunk', () => {
  const gameboard = new Gameboard(10, 10);
  const ship1 = new Ship('destroyer', 2);
  const ship2 = new Ship('submarine', 3);
  gameboard.ships.push(ship1, ship2);
  gameboard.placeShip(ship1, 1, 2);
  ship2.changeDirection();
  gameboard.placeShip(ship2, 4, 3);

  test('No ships destroyed', () => {
    expect(gameboard.isGameOver()).toBe(false);
  });

  test('One ship destroyed', () => {
    gameboard.receiveAttack(1, 2);
    gameboard.receiveAttack(1, 3);
    expect(gameboard.isGameOver()).toBe(false);
  });

  test('All ships destroyed', () => {
    gameboard.receiveAttack(4, 3);
    gameboard.receiveAttack(5, 3);
    gameboard.receiveAttack(6, 3);
    expect(gameboard.isGameOver()).toBe(true);
  });
});
