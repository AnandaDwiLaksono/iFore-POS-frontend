// Impor library ml-cart
const DecisionTreeRegression = require('ml-cart').DecisionTreeRegression;
// Impor library arima
const ARIMA = require('arima');
// Impor library ml-random-forest
const RandomForestRegression = require('ml-random-forest').RandomForestRegression;

// Data penjualan
// [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000, 3760000, 2550000]
// const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

const TrendProjection = () => {
  // Fungsi untuk memprediksi penjualan selanjutnya menggunakan metode TREND PROJECTION
  function predictNextSales(data) {
    const n = data.length;

    // Menghitung total penjualan
    const totalSales = data.reduce((sum, sale) => sum + sale, 0);

    // Menghitung rata-rata penjualan
    const averageSales = totalSales / n;

    // Menghitung perubahan rata-rata penjualan
    const delta = averageSales - data[n - 1];

    // Menghitung prediksi penjualan selanjutnya
    const nextSale = data[n - 1] + delta;

    return nextSale;
  }

  // Data penjualan
  let salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  // Memperkirakan 3 penjualan selanjutnya
  let predictions = [];
  for (let i = 0; i < 3; i++) {
    const nextSale = predictNextSales(salesData);
    predictions.push(nextSale);
    salesData.push(nextSale);
  }

  // Menampilkan hasil prediksi
  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

TrendProjection();
console.log('Trend Projection');
console.log('----------------------------------------------------------------');

const MonteCarlo = () => {
  // Fungsi untuk memprediksi penjualan selanjutnya menggunakan Algoritma Monte Carlo
  function predictNextSales(data, numberOfSimulations) {
    const n = data.length;

    // Menghitung rata-rata dan standar deviasi data penjualan
    const mean = data.reduce((sum, sale) => sum + sale, 0) / n;
    const standardDeviation = Math.sqrt(data.reduce((sum, sale) => sum + Math.pow(sale - mean, 2), 0) / n);

    // Menghasilkan penjualan selanjutnya menggunakan Algoritma Monte Carlo
    const simulatedSales = [];
    for (let i = 0; i < numberOfSimulations; i++) {
      const randomValue = mean + standardDeviation * getRandomGaussian();
      simulatedSales.push(randomValue);
    }

    return simulatedSales;
  }

  // Fungsi untuk menghasilkan angka acak dari distribusi Gaussian standar
  function getRandomGaussian() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const standardGaussian = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return standardGaussian;
  }

  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  // Memperkirakan 3 penjualan selanjutnya menggunakan Algoritma Monte Carlo
  const numberOfSimulations = 3;
  const predictions = predictNextSales(salesData, numberOfSimulations);

  // Menampilkan hasil prediksi
  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

MonteCarlo();
console.log('Monte Carlo');
console.log('----------------------------------------------------------------');

const SingleMovingAverage = () => {
  // Fungsi untuk memprediksi penjualan selanjutnya menggunakan Metode Single Moving Average
  function predictNextSales(data, period) {
    const n = data.length;

    // Menghitung rata-rata bergerak
    let total = 0;
    for (let i = n - period; i < n; i++) {
      total += data[i];
    }
    const movingAverage = total / period;

    // Memperkirakan penjualan selanjutnya dengan menggunakan rata-rata bergerak
    const nextSales = movingAverage;

    return nextSales;
  }

  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  // Memperkirakan 3 penjualan selanjutnya menggunakan Metode Single Moving Average
  const period = 7;
  const predictions = [];
  for (let i = 1; i <= 3; i++) {
    const nextSale = predictNextSales(salesData, period);
    predictions.push(nextSale);
    salesData.push(nextSale);
  }

  // Menampilkan hasil prediksi
  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

SingleMovingAverage();
console.log('Single Moving Average');
console.log('----------------------------------------------------------------');

const DecisionTree = () => {
  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  // Menyiapkan data training dan target
  const X = [];
  const y = [];

  for (let i = 0; i < salesData.length - 1; i++) {
    X.push([i]);
    y.push(salesData[i]);
  }

  // Membangun model Decision Tree Regression
  const decisionTree = new DecisionTreeRegression();
  decisionTree.train(X, y);

  // Memperkirakan penjualan selanjutnya
  const nextSales1 = decisionTree.predict([[salesData.length]]);
  const nextSales2 = decisionTree.predict([[salesData.length + 1]]);
  const nextSales3 = decisionTree.predict([[salesData.length + 2]]);

  // Menampilkan hasil prediksi
  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(nextSales1);
  console.log(nextSales2);
  console.log(nextSales3);
};

DecisionTree();
console.log('Decision Tree');
console.log('----------------------------------------------------------------');

const AutoregressiveIntegratedMovingAverage = () => {
  // Fungsi untuk mendapatkan prediksi menggunakan model ARIMA
  function predictARIMA(data) {
    const arimaModel = new ARIMA({ p: 1, d: 1, q: 1 }).train(data); // Membangun model ARIMA
    const predictions = arimaModel.predict(3); // Memperkirakan 3 penjualan selanjutnya
    return predictions;
  }

  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  const predictions = predictARIMA(salesData);
  console.log("Prediksi Penjualan Selanjutnya:", predictions);
};

AutoregressiveIntegratedMovingAverage();
console.log('ARIMA');
console.log('----------------------------------------------------------------');

const RandomForest = () => {
  // Data penjualan
  // [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000, 3760000, 2550000, 2240000]
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000];

  let trainingSet = new Array(salesData.length - 3);
  let predictions = new Array(salesData.length - 3);

  for (let i = 0; i < salesData.length - 3; i++) {
    trainingSet[i] = salesData.slice(i, i + 3);
    predictions[i] = salesData[i + 3];
  };

  // let trainingSet = new Array(salesData.length - 7);
  // let predictions = new Array(salesData.length - 7);

  // for (let i = 0; i < salesData.length - 7; i++) {
  //   trainingSet[i] = salesData.slice(i, i + 7);
  //   predictions[i] = salesData[i + 7];
  // };

  // const dataset = [
  //   [73, 80, 75, 152],
  //   [93, 88, 93, 185],
  //   [89, 91, 90, 180],
  //   [96, 98, 100, 196],
  //   [73, 66, 70, 142],
  //   [53, 46, 55, 101],
  //   [69, 74, 77, 149],
  //   [47, 56, 60, 115],
  //   [87, 79, 90, 175],
  //   [79, 70, 88, 164],
  //   [69, 70, 73, 141],
  //   [70, 65, 74, 141],
  //   [93, 95, 91, 184],
  //   [79, 80, 73, 152],
  //   [70, 73, 78, 148],
  //   [93, 89, 96, 192],
  //   [78, 75, 68, 147],
  //   [81, 90, 93, 183],
  //   [88, 92, 86, 177],
  //   [78, 83, 77, 159],
  //   [82, 86, 90, 177],
  //   [86, 82, 89, 175],
  //   [78, 83, 85, 175],
  //   [76, 83, 71, 149],
  //   [96, 93, 95, 192]
  // ];
  
  // const trainingSet = new Array(dataset.length);
  // const predictions = new Array(dataset.length);
  
  // for (let i = 0; i < dataset.length; ++i) {
  //   trainingSet[i] = dataset[i].slice(0, 3);
  //   predictions[i] = dataset[i][3];
  // }

  const options = {
    seed: 3,
    maxFeatures: 2,
    replacement: false,
    nEstimators: 400
  };

  const randomForest = new RandomForestRegression(options);

  randomForest.train(trainingSet, predictions);

  const result = randomForest.predict([salesData.slice(-3)]);
  
  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(result);

  // console.log(trainingSet);
  // console.log(predictions);
  // console.log([salesData.slice(-3)])
    
};

RandomForest();
console.log('Random Forest');
console.log('----------------------------------------------------------------');

const MovingAverage = () => {
  // Fungsi untuk menghitung nilai rata-rata dari array
  function calculateMovingAverage(data, period) {
    const movingAverages = [];
    for (let i = period; i < data.length; i++) {
      const sum = data.slice(i - period, i).reduce((a, b) => a + b, 0);
      const average = sum / period;
      movingAverages.push(average);
    }
    return movingAverages;
  }
  
  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000];

  // Jumlah data yang akan diprediksi selanjutnya
  const nextSales = 3;

  // Periode moving average
  const period = 7;

  // Menghitung moving average dari data penjualan
  const movingAverages = calculateMovingAverage(salesData, period);

  // Prediksi 3 penjualan selanjutnya berdasarkan moving average terakhir
  const lastMovingAverage = movingAverages[movingAverages.length - 1];
  const predictions = [];
  for (let i = 1; i <= nextSales; i++) {
    predictions.push(lastMovingAverage);
  }

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

MovingAverage();
console.log('Moving Average');
console.log('----------------------------------------------------------------');

const HoltWinters = () => {
  function getAugumentedDataset (data, m) {
    var initialparams = [0.0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0]
    var alpha, beta, gamma, period, prediction
    var err = Infinity
  
    // TODO: rewrite this bruteforce with Levenberg-Marquardt equation
    initialparams.forEach(function (a) {
      initialparams.forEach(function (b) {
        initialparams.forEach(function (g) {
          for (var p = 1; p < data.length / 2; p++) {
            var currentPrediction = getForecast(data, a, b, g, p, m)
            var error
            if (currentPrediction) {
              error = mse(data, currentPrediction, p)
            }
  
            if (error && err > error) {
              err = error
              alpha = a
              beta = b
              gamma = g
              period = p
              prediction = currentPrediction
            }
          }
        })
      })
    })
  
    var augumentedDataset = prediction.slice()
  
    for (var i = 0; i < data.length; i++) {
      augumentedDataset[i] = data[i]
    }
  
    return {
      augumentedDataset: augumentedDataset,
      alpha: alpha,
      beta: beta,
      gamma: gamma,
      period: period,
      mse: mse(data, prediction, period),
      sse: sse(data, prediction, period),
      mpe: mpe(data, prediction, period)
    }
  }
  
  function getForecast (data, alpha, beta, gamma, period, m) {
    var seasons, seasonal, st1, bt1
  
    if (!validArgs(data, alpha, beta, gamma, period, m)) {
      return
    }
  
    seasons = Math.floor(data.length / period)
    st1 = data[0]
    bt1 = initialTrend(data, period)
    seasonal = seasonalIndices(data, period, seasons)
  
    return calcHoltWinters(
      data,
      st1,
      bt1,
      alpha,
      beta,
      gamma,
      seasonal,
      period,
      m
    )
  }
  
  function mse (origin, data, period) {
    return sse(origin, data, period) / (origin.length - period)
  }
  
  function sse (origin, data, period) {
    var sum = 0
    for (var i = period; i < origin.length; i++) {
      sum += Math.pow(data[i] - origin[i], 2)
    }
    return sum
  }
  
  function mpe (origin, data, period) {
    var sum = 0
    for (var i = period; i < origin.length; i++) {
      sum += (data[i] - origin[i]) / origin[i]
    }
    return Math.abs(sum / (origin.length - period))
  }
  
  function validArgs (data, alpha, beta, gamma, period, m) {
    if (!data.length) {
      return false
    }
    if (m <= 0) {
      return false
    }
    if (m > period) {
      return false
    }
    if (alpha < 0.0 || alpha > 1.0) {
      return false
    }
    if (beta < 0.0 || beta > 1.0) {
      return false
    }
    if (gamma < 0.0 || gamma > 1.0) {
      return false
    }
    return true
  }
  
  function initialTrend (data, period) {
    var sum = 0
    for (var i = 0; i < period; i++) {
      sum += (data[period + i] - data[i])
    }
    return sum / (period * period)
  }
  
  function seasonalIndices (data, period, seasons) {
    var savg, obsavg, si, i, j
  
    savg = Array(seasons)
    obsavg = Array(data.length)
  
    si = Array(period)
  
    for (i = 0; i < seasons; i++) {
      savg[i] = 0.0
    }
    for (i = 0; i < period; i++) {
      si[i] = 0.0
    }
  
    for (i = 0; i < seasons; i++) {
      for (j = 0; j < period; j++) {
        savg[i] += data[(i * period) + j]
      }
      savg[i] /= period
    }
    for (i = 0; i < seasons; i++) {
      for (j = 0; j < period; j++) {
        obsavg[(i * period) + j] = data[(i * period) + j] / savg[i]
      }
    }
    for (i = 0; i < period; i++) {
      for (j = 0; j < seasons; j++) {
        si[i] += obsavg[(j * period) + i]
      }
      si[i] /= seasons
    }
  
    return si
  }
  
  function calcHoltWinters
    (data, st1, bt1, alpha, beta, gamma, seasonal, period, m) {
    var len = data.length
    var st = Array(len)
    var bt = Array(len)
    var it = Array(len)
    var ft = Array(len)
    var i
  
    st[1] = st1
    bt[1] = bt1
  
    for (i = 0; i < len; i++) {
      ft[i] = 0.0
    }
  
    for (i = 0; i < period; i++) {
      it[i] = seasonal[i]
    }
  
    for (i = 2; i < len; i++) {
      if (i - period >= 0) {
        st[i] = ((alpha * data[i]) / it[i - period]) + ((1.0 - alpha) * (st[i - 1] + bt[i - 1]))
      } else {
        st[i] = (alpha * data[i]) + ((1.0 - alpha) * (st[i - 1] + bt[i - 1]))
      }
  
      bt[i] = (gamma * (st[i] - st[i - 1])) + ((1 - gamma) * bt[i - 1])
  
      if (i - period >= 0) {
        it[i] = ((beta * data[i]) / st[i]) + ((1.0 - beta) * it[i - period])
      }
  
      if (i + m >= period) {
        ft[i + m] = (st[i] + (m * bt[i])) * it[i - period + m]
      }
    }
  
    return ft
  }
  // const getAugumentedDataset = holtWinters.getAugumentedDataset;

  const data = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000];
  const predictionLength = 3;

  const predictions = getAugumentedDataset(data, predictionLength)

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

HoltWinters();
console.log('Holt Winters');
console.log('----------------------------------------------------------------');

const DoubleExponentialSmoothing = () => {
  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000, 3760000, 2550000];

  // Fungsi untuk melakukan Double Exponential Smoothing
  function doubleExponentialSmoothing(data, alpha, beta) {
    const smoothedData = [];
    let level = data[0];
    let trend = data[1] - data[0];

    smoothedData.push(level);

    for (let i = 1; i < data.length; i++) {
      const value = data[i];
      const lastLevel = level;
      const lastTrend = trend;

      level = alpha * value + (1 - alpha) * (level + trend);
      trend = beta * (level - lastLevel) + (1 - beta) * lastTrend;

      smoothedData.push(level + trend);
    }

    return smoothedData;
  }

  // Parameter alpha dan beta
  const alpha = 0.2;
  const beta = 0.1;

  // Melakukan Double Exponential Smoothing pada data penjualan
  let lastLevel = salesData[0];
  let lastTrend = salesData[1] - salesData[0];
  const smoothedSalesData = doubleExponentialSmoothing(salesData, alpha, beta);

  // Memprediksi 3 penjualan selanjutnya
  const predictions = [];
  for (let i = 1; i <= 3; i++) {
    const nextLevel = alpha * salesData[salesData.length - 3 + i] + (1 - alpha) * (lastLevel + lastTrend);
    const nextTrend = beta * (nextLevel - lastLevel) + (1 - beta) * lastTrend;
    const nextPrediction = nextLevel + nextTrend;
    predictions.push(nextPrediction);

    lastLevel = nextLevel;
    lastTrend = nextTrend;
  }

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

DoubleExponentialSmoothing();
console.log('Double Exponential Smoothing');
console.log('----------------------------------------------------------------');

const ExtremeLearningMachine = () => {
  // Fungsi untuk menyiapkan data pelatihan ELM
  function prepareTrainingData(data, numberOfInputs) {
    const input = [];
    const output = [];

    for (let i = 0; i < data.length - numberOfInputs; i++) {
      const inputRow = data.slice(i, i + numberOfInputs);
      const outputRow = data[i + numberOfInputs];
      input.push(inputRow);
      output.push([outputRow]);
    }

    return { input, output };
  }

  // Data penjualan
  const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000, 3760000, 2550000];

  // Jumlah data penjualan sebelumnya yang digunakan sebagai input
  const numberOfInputs = 3;

  // Menyiapkan data pelatihan
  const trainingData = prepareTrainingData(salesData, numberOfInputs);

  // Fungsi untuk menghitung output ELM dengan bobot dan bias acak
  function predictELM(input, weights, bias) {
    const dotProduct = input.reduce((sum, value, index) => sum + value * weights[index], 0);
    return dotProduct + bias;
  }

  // Melatih model ELM dengan bobot dan bias acak
  const inputSize = numberOfInputs;
  const hiddenLayerSize = 10;
  const outputSize = 1;
  const hiddenLayerWeights = Array.from({ length: hiddenLayerSize }, () => Math.random());
  const outputLayerWeights = Array.from({ length: outputSize }, () => Math.random());
  const bias = Math.random();

  // Memprediksi 3 penjualan selanjutnya
  const nextSalesData = salesData.slice(-numberOfInputs);
  const prediction = predictELM(nextSalesData, hiddenLayerWeights, bias);

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(prediction);
};

ExtremeLearningMachine();
console.log('Extreme Learning Machine');
console.log('----------------------------------------------------------------');
