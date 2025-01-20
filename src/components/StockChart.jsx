import React, { useEffect,useContext } from 'react';
import { StockValue } from '../pages/Home';

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
  const {stock,updateStock} = useContext(StockValue);
  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart("stockChart");
      if (chart) {
        chart.destroy();
      }
    };
  }, []);
  const entireData={'BHARTIARTL.NS':[{ date: '2025-01-01', open: 100, high: 120, low: 90, close: 105 },
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
    { date: '2025-01-17', open: 105, high: 115, low: 95, close: 100 }],
    'GOOG':[
      { date: '2025-01-02', open: 100, high: 115, low: 90, close: 110 },
      { date: '2025-01-03', open: 110, high: 130, low: 100, close: 115 },
      { date: '2025-01-04', open: 115, high: 125, low: 105, close: 120 },
      { date: '2025-01-05', open: 120, high: 130, low: 110, close: 115 },
      { date: '2025-01-06', open: 115, high: 125, low: 100, close: 105 },
      { date: '2025-01-07', open: 105, high: 115, low: 95, close: 100 },
      { date: '2025-01-08', open: 100, high: 110, low: 90, close: 95 },
      { date: '2025-01-09', open: 95, high: 102, low: 88, close: 100 },
      { date: '2025-01-10', open: 100, high: 120, low: 90, close: 110 },
      { date: '2025-01-11', open: 110, high: 125, low: 100, close: 115 },
      { date: '2025-01-12', open: 115, high: 135, low: 105, close: 125 },
      { date: '2025-01-13', open: 125, high: 140, low: 115, close: 120 },
      { date: '2025-01-14', open: 121, high: 140, low: 110, close: 136 },
      { date: '2025-01-15', open: 115, high: 125, low: 105, close: 110 },
      { date: '2025-01-16', open: 110, high: 120, low: 100, close: 105 },
      { date: '2025-01-17', open: 105, high: 115, low: 95, close: 100 },
    ],
    'HDFCBANK':[ { date: '2025-01-02', open: 105, high: 115, low: 95, close: 110 },
      { date: '2025-01-03', open: 110, high: 130, low: 100, close: 115 },
      { date: '2025-01-04', open: 115, high: 125, low: 105, close: 120 },
      { date: '2025-01-05', open: 120, high: 130, low: 110, close: 115 },
      { date: '2025-01-06', open: 115, high: 125, low: 100, close: 105 },
      { date: '2025-01-07', open: 105, high: 115, low: 95, close: 100 },
      { date: '2025-01-08', open: 100, high: 110, low: 90, close: 95 },
      { date: '2025-01-09', open: 97, high: 110, low: 85, close: 100 },
      { date: '2025-01-10', open: 100, high: 120, low: 90, close: 110 },
      { date: '2025-01-11', open: 110, high: 125, low: 100, close: 115 },
      { date: '2025-01-12', open: 115, high: 135, low: 105, close: 125 },
      { date: '2025-01-13', open: 125, high: 140, low: 115, close: 120 },
      { date: '2025-01-14', open: 123, high: 130, low: 100, close: 115 },
      { date: '2025-01-15', open: 115, high: 125, low: 105, close: 110 },
      { date: '2025-01-16', open: 110, high: 120, low: 100, close: 105 },
      { date: '2025-01-17', open: 105, high: 115, low: 95, close: 100 }],
    'HINDUNILVR.NS':[ { date: '2025-01-02', open: 105, high: 115, low: 95, close: 110 },
      { date: '2025-01-03', open: 110, high: 130, low: 100, close: 115 },
      { date: '2025-01-04', open: 115, high: 125, low: 105, close: 120 },
      { date: '2025-01-05', open: 120, high: 130, low: 110, close: 115 },
      { date: '2025-01-06', open: 115, high: 125, low: 100, close: 105 },
      { date: '2025-01-07', open: 105, high: 115, low: 95, close: 100 },
      { date: '2025-01-08', open: 100, high: 110, low: 90, close: 95 },
      { date: '2025-01-09', open: 98, high: 107, low: 87, close: 100 },
      { date: '2025-01-10', open: 100, high: 120, low: 90, close: 110 },
      { date: '2025-01-11', open: 110, high: 125, low: 100, close: 115 },
      { date: '2025-01-12', open: 115, high: 135, low: 105, close: 125 },
      { date: '2025-01-13', open: 125, high: 140, low: 115, close: 120 },
      { date: '2025-01-14', open: 120, high: 130, low: 110, close: 115 },
      { date: '2025-01-15', open: 115, high: 125, low: 105, close: 110 },
      { date: '2025-01-16', open: 110, high: 120, low: 100, close: 105 },
      { date: '2025-01-17', open: 105, high: 120, low: 90, close: 100 }],
    'IBN':[
      { date: "2025-01-02", open: 104, high: 114, low: 94, close: 109 },
      { date: "2025-01-03", open: 109, high: 129, low: 99, close: 114 },
      { date: "2025-01-04", open: 114, high: 124, low: 106, close: 121 },
      { date: "2025-01-05", open: 121, high: 131, low: 111, close: 116 },
      { date: "2025-01-06", open: 116, high: 126, low: 102, close: 107 },
      { date: "2025-01-07", open: 107, high: 117, low: 97, close: 102 },
      { date: "2025-01-08", open: 102, high: 112, low: 92, close: 96 },
      { date: "2025-01-09", open: 100, high: 109, low: 89, close: 98 },
      { date: "2025-01-10", open: 99, high: 119, low: 90, close: 109 },
      { date: "2025-01-11", open: 109, high: 126, low: 99, close: 113 },
      { date: "2025-01-12", open: 113, high: 133, low: 103, close: 123 },
      { date: "2025-01-13", open: 123, high: 139, low: 114, close: 119 },
      { date: "2025-01-14", open: 119, high: 129, low: 109, close: 114 },
      { date: "2025-01-15", open: 114, high: 123, low: 105, close: 109 },
      { date: "2025-01-16", open: 109, high: 121, low: 100, close: 104 },
      { date: "2025-01-17", open: 104, high: 121, low: 92, close: 101 }
    ]
    ,
    'INFY':[
      { date: "2025-01-02", open: 108, high: 117, low: 96, close: 111 },
      { date: "2025-01-03", open: 111, high: 131, low: 101, close: 116 },
      { date: "2025-01-04", open: 116, high: 125, low: 105, close: 119 },
      { date: "2025-01-05", open: 119, high: 130, low: 112, close: 115 },
      { date: "2025-01-06", open: 115, high: 128, low: 102, close: 109 },
      { date: "2025-01-07", open: 109, high: 115, low: 96, close: 100 },
      { date: "2025-01-08", open: 100, high: 113, low: 93, close: 97 },
      { date: "2025-01-09", open: 98, high: 110, low: 89, close: 102 },
      { date: "2025-01-10", open: 101, high: 123, low: 91, close: 112 },
      { date: "2025-01-11", open: 112, high: 127, low: 102, close: 117 },
      { date: "2025-01-12", open: 117, high: 136, low: 106, close: 126 },
      { date: "2025-01-13", open: 126, high: 142, low: 115, close: 122 },
      { date: "2025-01-14", open: 122, high: 131, low: 110, close: 116 },
      { date: "2025-01-15", open: 116, high: 124, low: 108, close: 112 },
      { date: "2025-01-16", open: 112, high: 120, low: 103, close: 107 },
      { date: "2025-01-17", open: 107, high: 121, low: 91, close: 104 }
    ]
    ,
    'ITC.NS':[
      { date: "2025-01-02", open: 106, high: 115, low: 95, close: 110 },
      { date: "2025-01-03", open: 110, high: 132, low: 101, close: 117 },
      { date: "2025-01-04", open: 117, high: 124, low: 107, close: 120 },
      { date: "2025-01-05", open: 120, high: 132, low: 113, close: 115 },
      { date: "2025-01-06", open: 115, high: 127, low: 103, close: 106 },
      { date: "2025-01-07", open: 106, high: 117, low: 94, close: 98 },
      { date: "2025-01-08", open: 98, high: 114, low: 92, close: 96 },
      { date: "2025-01-09", open: 97, high: 108, low: 88, close: 100 },
      { date: "2025-01-10", open: 100, high: 121, low: 90, close: 111 },
      { date: "2025-01-11", open: 111, high: 125, low: 101, close: 116 },
      { date: "2025-01-12", open: 116, high: 135, low: 108, close: 125 },
      { date: "2025-01-13", open: 125, high: 141, low: 116, close: 120 },
      { date: "2025-01-14", open: 120, high: 131, low: 112, close: 115 },
      { date: "2025-01-15", open: 115, high: 126, low: 109, close: 113 },
      { date: "2025-01-16", open: 113, high: 122, low: 102, close: 108 },
      { date: "2025-01-17", open: 108, high: 123, low: 92, close: 102 }
    ]
    ,
    'RELIANCE.NS':[
      { date: "2025-01-02", open: 107, high: 116, low: 94, close: 111 },
      { date: "2025-01-03", open: 111, high: 129, low: 100, close: 116 },
      { date: "2025-01-04", open: 116, high: 126, low: 106, close: 122 },
      { date: "2025-01-05", open: 122, high: 133, low: 112, close: 118 },
      { date: "2025-01-06", open: 118, high: 129, low: 103, close: 110 },
      { date: "2025-01-07", open: 110, high: 118, low: 96, close: 103 },
      { date: "2025-01-08", open: 103, high: 115, low: 92, close: 97 },
      { date: "2025-01-09", open: 98, high: 112, low: 89, close: 101 },
      { date: "2025-01-10", open: 101, high: 123, low: 92, close: 112 },
      { date: "2025-01-11", open: 112, high: 128, low: 102, close: 119 },
      { date: "2025-01-12", open: 119, high: 137, low: 108, close: 127 },
      { date: "2025-01-13", open: 127, high: 143, low: 117, close: 124 },
      { date: "2025-01-14", open: 124, high: 132, low: 113, close: 117 },
      { date: "2025-01-15", open: 117, high: 125, low: 108, close: 112 },
      { date: "2025-01-16", open: 112, high: 124, low: 102, close: 109 },
      { date: "2025-01-17", open: 109, high: 121, low: 93, close: 105 }
    ]
    ,
    'SBIN.NS':[
      { date: "2025-01-02", open: 106, high: 118, low: 95, close: 112 },
      { date: "2025-01-03", open: 112, high: 132, low: 101, close: 118 },
      { date: "2025-01-04", open: 118, high: 127, low: 107, close: 121 },
      { date: "2025-01-05", open: 121, high: 134, low: 114, close: 116 },
      { date: "2025-01-06", open: 116, high: 128, low: 105, close: 108 },
      { date: "2025-01-07", open: 108, high: 120, low: 96, close: 101 },
      { date: "2025-01-08", open: 101, high: 113, low: 93, close: 98 },
      { date: "2025-01-09", open: 99, high: 115, low: 90, close: 103 },
      { date: "2025-01-10", open: 103, high: 125, low: 91, close: 114 },
      { date: "2025-01-11", open: 114, high: 129, low: 103, close: 120 },
      { date: "2025-01-12", open: 120, high: 138, low: 110, close: 128 },
      { date: "2025-01-13", open: 128, high: 145, low: 118, close: 125 },
      { date: "2025-01-14", open: 125, high: 134, low: 114, close: 119 },
      { date: "2025-01-15", open: 119, high: 126, low: 111, close: 114 },
      { date: "2025-01-16", open: 114, high: 123, low: 104, close: 110 },
      { date: "2025-01-17", open: 110, high: 122, low: 92, close: 106 }
    ]
    ,
    'TCS.NS':[
      { date: "2025-01-02", open: 105, high: 117, low: 94, close: 113 },
      { date: "2025-01-03", open: 113, high: 131, low: 102, close: 119 },
      { date: "2025-01-04", open: 119, high: 129, low: 108, close: 122 },
      { date: "2025-01-05", open: 122, high: 136, low: 115, close: 117 },
      { date: "2025-01-06", open: 117, high: 130, low: 106, close: 109 },
      { date: "2025-01-07", open: 109, high: 122, low: 97, close: 102 },
      { date: "2025-01-08", open: 102, high: 114, low: 93, close: 99 },
      { date: "2025-01-09", open: 99, high: 116, low: 92, close: 104 },
      { date: "2025-01-10", open: 104, high: 126, low: 92, close: 115 },
      { date: "2025-01-11", open: 115, high: 132, low: 104, close: 121 },
      { date: "2025-01-12", open: 121, high: 140, low: 112, close: 130 },
      { date: "2025-01-13", open: 130, high: 146, low: 120, close: 126 },
      { date: "2025-01-14", open: 126, high: 136, low: 116, close: 121 },
      { date: "2025-01-15", open: 121, high: 128, low: 113, close: 115 },
      { date: "2025-01-16", open: 115, high: 125, low: 107, close: 111 },
      { date: "2025-01-17", open: 111, high: 124, low: 93, close: 108 }
    ]
    
  }
const stockData = entireData[`${stock}`]












  // const stockData = [
  //   { date: '2025-01-01', open: 100, high: 120, low: 90, close: 105 },
  //   { date: '2025-01-02', open: 105, high: 115, low: 95, close: 110 },
  //   { date: '2025-01-03', open: 110, high: 130, low: 100, close: 115 },
  //   { date: '2025-01-04', open: 115, high: 125, low: 105, close: 120 },
  //   { date: '2025-01-05', open: 120, high: 130, low: 110, close: 115 },
  //   { date: '2025-01-06', open: 115, high: 125, low: 100, close: 105 },
  //   { date: '2025-01-07', open: 105, high: 115, low: 95, close: 100 },
  //   { date: '2025-01-08', open: 100, high: 110, low: 90, close: 95 },
  //   { date: '2025-01-09', open: 95, high: 105, low: 85, close: 100 },
  //   { date: '2025-01-10', open: 100, high: 120, low: 90, close: 110 },
  //   { date: '2025-01-11', open: 110, high: 125, low: 100, close: 115 },
  //   { date: '2025-01-12', open: 115, high: 135, low: 105, close: 125 },
  //   { date: '2025-01-13', open: 125, high: 140, low: 115, close: 120 },
  //   { date: '2025-01-14', open: 120, high: 130, low: 110, close: 115 },
  //   { date: '2025-01-15', open: 115, high: 125, low: 105, close: 110 },
  //   { date: '2025-01-16', open: 110, high: 120, low: 100, close: 105 },
  //   { date: '2025-01-17', open: 105, high: 115, low: 95, close: 100 }
  // ];


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
    <div style={{ width: '100%', height: '500px', padding: '20px' }} >
      <Line
        id="stockChart"
        data={data}
        options={options}
      />
    </div>
  );
};

export default StockChart;