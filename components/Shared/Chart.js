import React from 'react';
import {  Button } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Leaves Left', 'Leaves Applied', 'Rejected', 'Approved'],
    datasets: [
        {

            label: '# of Votes',
            data: [16, 4, 3, 5],
            backgroundColor: [
                '#92A9BD',
                '#FFF89A',
                '#FF6B6B',
                '#3FA796',
            ],
            borderWidth: 0,
        },
    ],
};
function Chart() {
    
   
    return (
        <div className="py-4">
            <h6>Leaves Overview</h6>
            <div className='d-flex align-items-center justify-content-around mt-5'>
                <div style={{ height: '180px', width: '180px' }}>
                    <Pie data={data} options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }} />
                </div>
                <ul className='chart-data'>
                    {data?.labels?.map((label, index) => (
                        <li key={index}><span><span className="label-bg me-2" style={{ backgroundColor: data['datasets'][0]['backgroundColor'][index] }}></span>  {label} - {data['datasets'][0]['data'][index]}</span></li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="d-flex justify-content-end mt-2">
                <Button variant="success">Approve</Button>{' '}
                <Button variant="danger" className="ms-2">Reject</Button>{' '}
            </div>
        </div>
    );
}

export default Chart;
