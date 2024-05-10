'use client';

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import Search from './components/Search';

function ApexChart() {
  const [series, setSeries] = useState([{
    data: []
  }]);
  const [selectedSymbol, setSelectedSymbol] = useState('LINK');

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/stocks?symbol='+selectedSymbol);
        const formattedData = response.data.map(item => ({
          x: new Date(item.timestamp),
          y: [item.open, item.high, item.low, item.close]
        }));
        setSeries([{ data: formattedData }]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [selectedSymbol]);
  return (
    <div id="chart">
      {selectedSymbol}
      <Search setSelectedSymbol={setSelectedSymbol}/>
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
}

export default ApexChart;
