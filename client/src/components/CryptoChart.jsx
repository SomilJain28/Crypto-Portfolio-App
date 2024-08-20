import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const CryptoChart = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: selectedCrypto ? `${selectedCrypto} Price` : 'Random Crypto Price',
        data: [12, 19, 3, 5, 2, 3], 
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-center mb-4">
        {selectedCrypto ? `Price Chart of ${selectedCrypto}` : 'Random Crypto Price Chart'}
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
