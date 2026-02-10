function assertFiniteNumber(x, name) {
  if (!Number.isFinite(x)) throw new TypeError(`${name} must be a finite number`);
}

function round1(n) {
  const r = Math.round(n * 10) / 10;
  return Object.is(r, -0) ? 0 : r;
}

function round2(n) {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? 0 : r;
}

// °C = (°F − 32) × 5/9  |  1 decimal
function toCelsius(f) {
  assertFiniteNumber(f, 'f');
  return round1((f - 32) * (5 / 9));
}

// °F = (°C × 9/5) + 32  |  1 decimal
function toFahrenheit(c) {
  assertFiniteNumber(c, 'c');
  return round1((c * (9 / 5)) + 32);
}

// moving average | 2 decimals
function movingAverage(series, window) {
  if (!Array.isArray(series)) throw new TypeError('series must be an array');
  for (const v of series) {
    if (!Number.isFinite(v)) throw new TypeError('series must contain only finite numbers');
  }

  if (!Number.isInteger(window)) throw new TypeError('window must be an integer');
  if (window < 2 || window > series.length) throw new RangeError('window out of range');

  const out = [];
  let sum = 0;

  for (let i = 0; i < window; i++) sum += series[i];
  out.push(round2(sum / window));

  for (let i = window; i < series.length; i++) {
    sum += series[i] - series[i - window];
    out.push(round2(sum / window));
  }

  return out;
}

module.exports = { toCelsius, toFahrenheit, movingAverage };

