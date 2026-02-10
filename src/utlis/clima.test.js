const { toCelsius, toFahrenheit, movingAverage } = require('./clima');

describe('toCelsius(f)', () => {
  test('32°F -> 0.0°C', () => {
    expect(toCelsius(32)).toBe(0.0);
  });

  test('-40°F -> -40.0°C', () => {
    expect(toCelsius(-40)).toBe(-40.0);
  });

  test('TypeError si f no es número finito', () => {
    expect(() => toCelsius('32')).toThrow(TypeError);
    expect(() => toCelsius(NaN)).toThrow(TypeError);
    expect(() => toCelsius(Infinity)).toThrow(TypeError);
  });
});

describe('toFahrenheit(c)', () => {
  test('0°C -> 32.0°F', () => {
    expect(toFahrenheit(0)).toBe(32.0);
  });

  test('100°C -> 212.0°F', () => {
    expect(toFahrenheit(100)).toBe(212.0);
  });

  test('-40°C -> -40.0°F', () => {
    expect(toFahrenheit(-40)).toBe(-40.0);
  });

  test('TypeError si c no es número finito', () => {
    expect(() => toFahrenheit('0')).toThrow(TypeError);
    expect(() => toFahrenheit(NaN)).toThrow(TypeError);
    expect(() => toFahrenheit(-Infinity)).toThrow(TypeError);
  });
});

describe('movingAverage(series, window)', () => {
  test('movingAverage([10,20,30,40], 2) -> [15.00, 25.00, 35.00]', () => {
    expect(movingAverage([10, 20, 30, 40], 2)).toEqual([15.00, 25.00, 35.00]);
  });

  test('movingAverage([1,2,3], 3) -> [2.00]', () => {
    expect(movingAverage([1, 2, 3], 3)).toEqual([2.00]);
  });

  test('TypeError si series tiene no numéricos', () => {
    expect(() => movingAverage([1, 'x', 3], 2)).toThrow(TypeError);
    expect(() => movingAverage([1, NaN], 2)).toThrow(TypeError);
  });

  test('TypeError si window no es entero', () => {
    expect(() => movingAverage([1, 2, 3], 2.5)).toThrow(TypeError);
    expect(() => movingAverage([1, 2, 3], '2')).toThrow(TypeError);
  });

  test('RangeError si window fuera de rango', () => {
    expect(() => movingAverage([1, 2, 3], 1)).toThrow(RangeError);
    expect(() => movingAverage([1, 2, 3], 4)).toThrow(RangeError);
  });
});
