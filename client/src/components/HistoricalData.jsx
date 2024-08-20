import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});

  const topTokens = ['bitcoin', 'ethereum', 'cardano', 'solana', 'ripple', 'polkadot', 'dogecoin', 'litecoin', 'binancecoin', 'chainlink'];

  useEffect(() => {
    if (startDate && endDate) {
      fetchHistoricalData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetchHistoricalData = async (start, end) => {
    try {
      const promises = topTokens.map(token =>
        axios.get('https://api.coingecko.com/api/v3/coins/' + token + '/market_chart/range', {
          params: {
            vs_currency: 'usd',
            from: Math.floor(start.getTime() / 1000),
            to: Math.floor(end.getTime() / 1000)
          }
        })
      );

      const responses = await Promise.all(promises);

      const datasets = responses.map((response, index) => {
        return {
          label: topTokens[index],
          data: response.data.prices.map(([date, price]) => ({ x: new Date(date).toLocaleDateString(), y: price })),
          borderColor: `rgba(${index * 25}, ${index * 50}, 255, 0.7)`,
          backgroundColor: `rgba(${index * 25}, ${index * 50}, 255, 0.3)`,
          fill: false
        };
      });

      setChartData({
        labels: responses[0].data.prices.map(([date]) => new Date(date).toLocaleDateString()),
        datasets
      });
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <div className="historical-data">
      <h2 className="text-white">Historical Data</h2>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          className="react-datepicker-wrapper"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
          className="react-datepicker-wrapper"
        />
      </div>
      <div className="historical-chart">
        {chartData.datasets ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || '';
                      if (label) {
                        return `${label}: $${context.raw.y.toFixed(2)}`;
                      }
                      return `$${context.raw.y.toFixed(2)}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day'
                  },
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Price (USD)'
                  }
                }
              }
            }}
          />
        ) : (
          <p className="text-white">No data available for the selected range</p>
        )}
      </div>
    </div>
  );
};

export default HistoricalData;
