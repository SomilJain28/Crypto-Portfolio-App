import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendingCryptos = ({ addToWatchlist }) => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoChartData, setCryptoChartData] = useState([]);

  useEffect(() => {
    const fetchTrendingCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptos(data);

       
        const randomCrypto = data[Math.floor(Math.random() * data.length)];
        setSelectedCrypto(randomCrypto);
        fetchCryptoChartData(randomCrypto.id);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchTrendingCryptos();
  }, []);

  const fetchCryptoChartData = async (id) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
      );
      const data = await response.json();

      const chartData = data.prices.map(([time, price]) => ({
        time: new Date(time).toLocaleDateString(),
        price,
      }));

      setCryptoChartData(chartData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const handleClick = (crypto) => {
    setSelectedCrypto(crypto);
    fetchCryptoChartData(crypto.id);
  };

  return (
    <div className="w-full p-5">
      <h2 className="text-2xl text-white mb-4">Top 10 Cryptocurrencies</h2>
      <ul className="list-none">
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="mb-2 flex justify-between items-center">
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => handleClick(crypto)}
            >
              <span className="text-white">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </span>
              <span className="text-green-400">${crypto.current_price.toLocaleString()}</span>
            </div>
            <button
              onClick={() => addToWatchlist(crypto)}
              className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
            >
              Add to Watchlist
            </button>
          </li>
        ))}
      </ul>

      {selectedCrypto && (
        <div className="crypto-chart mt-8">
          <h3 className="text-white text-lg mb-4">{selectedCrypto.name} Price Chart (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cryptoChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TrendingCryptos;
