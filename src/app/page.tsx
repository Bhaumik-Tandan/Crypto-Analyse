'use client';

import React, { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import axios from 'axios';
import Search from './components/Search';
import Auth from './components/Auth';
import dynamic from "next/dynamic";

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
        const formattedData = response.data.map((item: any) => ({
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
      <Auth/>
      {selectedSymbol}
      <Search setSelectedSymbol={setSelectedSymbol}/>
      <ReactApexChart options={{ ...options, chart: { ...options.chart, type: "candlestick" }, title: { ...options.title, align: "left" }, xaxis: { type: "datetime" } }} series={series} type="candlestick" height={350} />
      
    </div>
  );
}

export default ApexChart;
