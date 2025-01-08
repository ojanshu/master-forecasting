
import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StockChart = () => {
  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart("stockChart");
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const stockData = [
    { date: '2025-01-01', open: 100, high: 120, low: 90, close: 105 },
    { date: '2025-01-02', open: 105, high: 115, low: 95, close: 110 },
    { date: '2025-01-03', open: 110, high: 130, low: 100, close: 115 },
    { date: '2025-01-04', open: 115, high: 125, low: 105, close: 120 },
    { date: '2025-01-05', open: 120, high: 130, low: 110, close: 115 },
    { date: '2025-01-06', open: 115, high: 125, low: 100, close: 105 },
    { date: '2025-01-07', open: 105, high: 115, low: 95, close: 100 },
    { date: '2025-01-08', open: 100, high: 110, low: 90, close: 95 },
    { date: '2025-01-09', open: 95, high: 105, low: 85, close: 100 },
    { date: '2025-01-10', open: 100, high: 120, low: 90, close: 110 },
    { date: '2025-01-11', open: 110, high: 125, low: 100, close: 115 },
    { date: '2025-01-12', open: 115, high: 135, low: 105, close: 125 },
    { date: '2025-01-13', open: 125, high: 140, low: 115, close: 120 },
    { date: '2025-01-14', open: 120, high: 130, low: 110, close: 115 },
    { date: '2025-01-15', open: 115, high: 125, low: 105, close: 110 },
    { date: '2025-01-16', open: 110, high: 120, low: 100, close: 105 },
    { date: '2025-01-17', open: 105, high: 115, low: 95, close: 100 }
  ];


  const data = {
    labels: stockData.map(item => item.date),
    datasets: [
      {
        label: 'Close Price',
        data: stockData.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      },
      {
        label: 'High Price',
        data: stockData.map(item => item.high),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.1
      },
      {
        label: 'Low Price',
        data: stockData.map(item => item.low),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        grid: {
          display: true
        },
        title: {
          display: true,
          text: 'Price'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Price Chart'
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '500px', padding: '20px' }}>
      <Line
        id="stockChart"
        data={data}
        options={options}
      />
    </div>
  );
};

export default StockChart;