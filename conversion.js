function assertFiniteNumber(x, name = 'value') {
  if (!Number.isFinite(x)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function roundTo1(n) {
  const r = Math.round(n * 10) / 10;
  return Object.is(r, -0) ? 0 : r;
}

function roundTo2(n) {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? 0 : r;
}


function toCelsius(f) {
  assertFiniteNumber(f, 'f');
  return roundTo1((f - 32) * (5 / 9));
}

function toFahrenheit(c) {
  assertFiniteNumber(c, 'c');
  return roundTo1((c * (9 / 5)) + 32);
}

function movingAverage(series, window) {
  if (!Array.isArray(series)) throw new TypeError('series must be an array');

  // valida números
  for (let i = 0; i < series.length; i++) {
    if (!Number.isFinite(series[i])) throw new TypeError('series must contain only finite numbers');
  }

  if (!Number.isInteger(window)) throw new TypeError('window must be an integer');
  if (window < 2 || window > series.length) throw new RangeError('window out of range');

  const out = [];
  let sum = 0;

  // suma inicial
  for (let i = 0; i < window; i++) sum += series[i];
  out.push(roundTo2(sum / window));


  for (let i = window; i < series.length; i++) {
    sum += series[i] - series[i - window];
    out.push(roundTo2(sum / window));
  }

  return out;
}

module.exports = {
  toCelsius,
  toFahrenheit,
  movingAverage,
};
