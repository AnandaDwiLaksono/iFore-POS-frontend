// Import library TensorFlow.js
const tf = require('@tensorflow/tfjs');

// Data penjualan
const data = [1775000, 1430000, 3380000, 2620000, 2005000, 1510000];

const model1 = () => {
  // Menyiapkan data pelatihan
  const input = tf.tensor(data.slice(0, data.length - 3));
  const output = tf.tensor(data.slice(3, data.length));

  // Membuat model Jaringan Saraf Tiruan
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, inputShape: [1] }));
  model.add(tf.layers.dense({ units: 1 }));

  // Menentukan fungsi loss dan optimizer
  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

  // Melatih model
  model.fit(input, output, { epochs: 100 })
    .then(() => {
      // Menggunakan model untuk memprediksi 3 penjualan selanjutnya
      const inputPredict = tf.tensor(data.slice(data.length - 3));
      const predictions = model.predict(inputPredict).dataSync();
      console.log('Prediksi Penjualan Selanjutnya:');
      console.log(predictions);
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat melatih model:', error);
    });
};

model1();
