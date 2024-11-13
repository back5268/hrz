import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Cardz } from '@components/core';
import { applicationStatus } from '@constant';

export const PieChart = ({ data = [] }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const dataz = {
      labels: applicationStatus.map((a) => a.name),
      datasets: [
        {
          data: applicationStatus.map((a) => {
            const datum = data.find((d) => d.status === a._id);
            if (datum) return datum.count;
            else return 0;
          }),
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    setChartData(dataz);
    setChartOptions(options);
  }, [JSON.stringify(data)]);

  return (
    <Cardz className="w-full flex flex-col justify-center items-center py-8">
      <h2 className="font-bold uppercase leading-normal mb-4 text-primary">Báo cáo đơn từ theo trạng thái</h2>
      <Chart type="pie" data={chartData} options={chartOptions} className="w-[20rem]" />
    </Cardz>
  );
};
