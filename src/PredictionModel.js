// Impor library ml-cart
const DecisionTreeRegression = require('ml-cart').DecisionTreeRegression;
// Impor library arima
const ARIMA = require('arima');
// Impor library ml-random-forest
const RandomForestRegression = require('ml-random-forest').RandomForestRegression;
// Impor library brain.js
const brain = require('brain.js');

// Data penjualan
// [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000, 1750000]
const salesData = [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000];

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

  // Memperkirakan 3 penjualan selanjutnya
  const predictions = [];
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
  // Menyiapkan data training dan target
  const X = [];
  const y = [];

  for (let i = 0; i < salesData.length - 1; i++) {
    X.push([i]);
    y.push(salesData[i + 1]);
  }

  // Membangun model Decision Tree Regression
  const decisionTree = new DecisionTreeRegression();
  decisionTree.train(X, y);

  // Memperkirakan penjualan selanjutnya
  const nextSales1 = decisionTree.predict([[salesData.length - 1]]);
  const nextSales2 = decisionTree.predict([[salesData.length]]);
  const nextSales3 = decisionTree.predict([[salesData.length + 1]]);

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

  const predictions = predictARIMA(salesData);
  console.log("Prediksi Penjualan Selanjutnya:", predictions);
};

AutoregressiveIntegratedMovingAverage();
console.log('ARIMA');
console.log('----------------------------------------------------------------');

const RandomForest = () => {
  // Target penjualan selanjutnya
  const nextSales = [2240000, 3665000, 0]; // Penjualan berikutnya adalah yang ingin diprediksi, dan 0 untuk hasil prediksi selanjutnya

  // Membuat dataset untuk Random Forest
  const dataset = salesData.map((sale, index) => [index + 1, sale]);

  // Inisialisasi model Random Forest
  const rf = new RandomForestRegression();

  // Melatih model Random Forest
  rf.train(dataset.map(data => [data[0]]), dataset.map(data => data[1]));

  // Melakukan prediksi pada data penjualan selanjutnya
  const predictions = nextSales.map((nextSale) => {
    const prediction = rf.predict([[dataset.length + 1]]);
    return prediction[0];
  });

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

RandomForest();
console.log('Random Forest');
console.log('----------------------------------------------------------------');

const MultilayerPerceptron = () => {
  // Membuat model Multi-layer Perceptron
  const net = new brain.recurrent.LSTMTimeStep();

  // Menyiapkan data pelatihan dalam bentuk urutan waktu
  const trainingData = [];
  for (let i = 3; i < salesData.length; i++) {
    trainingData.push({
      input: [salesData[i - 3], salesData[i - 2], salesData[i - 1]],
      output: [salesData[i]],
    });
  }

  // Melatih model
  net.train(trainingData);

  // Memprediksi 3 penjualan selanjutnya
  const nextSalesData = [salesData[salesData.length - 3], salesData[salesData.length - 2], salesData[salesData.length - 1]];
  const predictions = net.forecast(nextSalesData, 3);

  // Denormalisasi hasil prediksi
  const maxSales = Math.max(...salesData);
  const minSales = Math.min(...salesData);

  const denormalizedPredictions = predictions.map(prediction => prediction * (maxSales - minSales) + minSales);

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(denormalizedPredictions);
};

MultilayerPerceptron();
console.log('Multi-layer Perceptron');
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

const Backpropagation = () => {
  // Normalisasi data agar berada dalam rentang [0, 1]
  const maxSales = Math.max(...salesData);
  const minSales = Math.min(...salesData);
  const normalizedData = salesData.map(sale => (sale - minSales) / (maxSales - minSales));

  // Membuat model Multi-layer Perceptron
  const net = new brain.NeuralNetwork();

  // Menyiapkan data pelatihan
  const trainingData = normalizedData.map((sale, index) => ({
    input: [index / (salesData.length - 1)],
    output: [sale],
  }));

  // Melatih model
  net.train(trainingData);

  // Memprediksi 3 penjualan selanjutnya
  const lastDataIndex = salesData.length - 1;
  const nextSalesData = Array.from({ length: 3 }, (_, i) => ({
    input: [(lastDataIndex + i + 1) / (salesData.length - 1)],
  }));
  const predictions = nextSalesData.map(data => {
    const prediction = net.run(data.input)[0];
    // Denormalisasi hasil prediksi ke dalam skala nilai penjualan asli
    return prediction * (maxSales - minSales) + minSales;
  });

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(predictions);
};

Backpropagation();
console.log('Backpropagation');
console.log('----------------------------------------------------------------');

const BidirectionalLongShortTermMemory = () => {
  // Membuat model Bidirectional LSTM
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 3, // Sesuaikan dengan jumlah fitur dalam satu time step
    hiddenLayers: [10],
    outputSize: 3, // Sesuaikan dengan jumlah langkah prediksi ke depan yang diinginkan
    learningRate: 0.01,
    decayRate: 0.999,
    activation: 'tanh',
  });

  // Menyiapkan data pelatihan
  // [1775000, 1430000, 3480000, 2620000, 2005000, 1510000, 1720000, 2240000, 3665000, 2895000]
  const trainingData = [
    [1775000, 1430000, 3480000],
    [1430000, 3480000, 2620000],
    [3480000, 2620000, 2005000],
    [2620000, 2005000, 1510000],
    [2005000, 1510000, 1720000],
    [1510000, 1720000, 2240000],
    [1720000, 2240000, 3665000],
    [2240000, 3665000, 2895000],
  ];

  // Melatih model
  net.train(trainingData, {
    iterations: 1000,
    errorThresh: 0.001,
  });

  // Memprediksi 3 penjualan selanjutnya
  const nextSalesData = [[2240000, 3665000, 2895000]]; // Data penjualan untuk satu time step
  const predictions = net.forecast(nextSalesData)[0].map(prediction => prediction);

  // const lastSalesValue = salesData[salesData.length - 1];
  // const predictionValues = predictions.map((change) => lastSalesValue + change * lastSalesValue);

  // Denormalisasi hasil prediksi
  const maxSales = Math.max(...salesData);
  const minSales = Math.min(...salesData);

  const denormalizedPredictions = predictions.map(prediction => prediction * (maxSales - minSales) + minSales);

  console.log('Prediksi Penjualan Selanjutnya:');
  console.log(denormalizedPredictions);

  // console.log('Prediksi Penjualan Selanjutnya:');
  // console.log(predictionValues);
};

BidirectionalLongShortTermMemory();
console.log('Bidirectional Long Short Term Memory');
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
