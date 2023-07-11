import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Leaves Left', 'Leaves Applied', 'Rejected', 'Approved'],
  datasets: [
    {
        
      label: '# of Votes',
      data: [16, 4, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(31, 203, 122, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(31, 203, 122, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
function add(accumulator, a) {
  return accumulator + a;
}
export function LeaveChart() {
  return <div className='d-flex align-items-center w-100 justify-content-center'>
  <div style={{ height: '280px', width: '280px' }}>
      <Pie data={data} plugins={[ChartDataLabels]} options={{
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = ctx.dataset.data.reduce(add, 0);
                  return (value * 100 / sum).toFixed(0) + "%";
                }
              }
          }
          
      }} />
  </div>
  <ul>
      {data?.labels?.map((label, index) => (
          <li key={index}><span><span className="label-bg me-2" style={{backgroundColor: data['datasets'][0]['backgroundColor'][index]}}></span>  {label} - {data['datasets'][0]['data'][index]}</span></li>
      ))}
  </ul>
</div>
}
