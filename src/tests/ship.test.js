import Ship from '../ship';

describe('Ship Class', () => {
  const ship = new Ship('cruiser', 5);
  test('name', () => {
    expect(ship.name).toBe('cruiser');
  });
  test('length', () => {
    expect(ship.length).toBe(5);
  });
  test('direction', () => {
    expect(ship.isHorizontal).toBe(true);
  });
  test('change direction', () => {
    ship.changeDirection();
    expect(ship.isHorizontal).toBe(false);
  });
});

describe('hit function', () => {
  const ship2 = new Ship('battleship', 4);
  test('no hits', () => {
    expect(ship2.lives).toEqual([undefined, undefined, undefined, undefined]);
  });
  test('one hit', () => {
    ship2.hit(0);
    expect(ship2.lives).toEqual(['X', undefined, undefined, undefined]);
  });
  test('three hits', () => {
    ship2.hit(0);
    ship2.hit(2);
    ship2.hit(3);
    expect(ship2.lives).toEqual(['X', undefined, 'X', 'X']);
  });
});

describe('isSunk function', () => {
  const ship3 = new Ship('submarine', 3);
  test('not sunk', () => {
    expect(ship3.isSunk()).toBe(false);
  });
  test('one hit, not sunk', () => {
    ship3.hit(0);
    expect(ship3.isSunk()).toBe(false);
  });
  test('two hits, not sunk', () => {
    ship3.hit(1);
    expect(ship3.isSunk()).toBe(false);
  });
  test('sunk', () => {
    ship3.hit(2);
    expect(ship3.isSunk()).toBe(true);
  });
});
