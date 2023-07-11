import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'
import Layout from '../../components/Shared/Layout';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Toolbar from 'react-big-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Accordion from 'react-bootstrap/Accordion'
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
function leaveAndAttendance() {
    const [showLD, setShowLD] = useState(false); // LD => Leave Detail
    const localizer = momentLocalizer(moment)
    const DnDCalendar = withDragAndDrop(Calendar);
    const reporting_popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <div className="d-flex flex-column">
                    <span>John Nash Miranda</span>
                    |
                    <span>Mrinali Desgupta</span>
                    |
                    <span>Alexy Vinaya</span>
                </div>
            </Popover.Body>
        </Popover>
    );
    const myEventsList = [
        {
            start: moment().toDate(),
            end: moment()
                .add(2, "days")
                .toDate(),
            title: "Venu Karthikeyan",
        }
    ]
    const onEventDrop = (data) => {
        console.log(data);
    };
    const onSelectEvent = (e) => {
        setShowLD(true);
    }
    return (
        <Layout>
            <>
                <DnDCalendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '90.85vh' }}
                    onEventDrop={onEventDrop}
                    onSelectEvent={onSelectEvent}
                />
                <div className={`overlay-wrapper ${showLD ? 'show' : ''}`}></div>
                <div className={`ems_Right_Modal_Popup xs ${showLD ? 'show' : ''}`} id="leaveDetail">
                    <div className='employee_breif_detail-wrapper'>
                        <div className='d-flex align-items-center'>
                            <div className="avator-badge-container xl me-3">
                                <img src="/images/1.jpg" alt="Avatar" className="avatar square" />
                            </div>
                            <span>
                                <h6 className="mt-1" style={{ marginBottom: '2px', lineHeight: '1', alignItems: 'center' }}>Venu Karthikeyan</h6>
                                <p className='secondary-text-label mb-1'>Trainee</p>
                                <p className="dark-text-label-bold  m-0 d-flex align-items-center" ><i className="uil uil-calender f-18 me-1"></i> 04-Jan-2022 to 06-Jan-2022 <span className="theme-text ms-1">(4 days)</span></p>
                            </span>
                        </div>
                        <span className="d-flex align-items-center">
                            <img src="/images/close.png" onClick={() => setShowLD(false)} alt="close" className='close-modal' />
                        </span>
                    </div>
                    <div className="p-3 modal_Body_container">
                        <div>
                            <div className=" leave-status-grid mb-4">
                                <span>
                                    <p className='secondary-text-label mb-1'>Applied On</p>
                                    <p className="dark-text-label-bold  m-0 d-flex align-items-center">12-Dec-2021 <span className="theme-text ms-1">(59 days ago)</span></p>
                                </span>
                                <span>
                                    <p className='secondary-text-label mb-1'>Reports to</p>
                                    <p className="dark-text-label-bold  m-0 d-flex align-items-center">Shankar Prasad</p>
                                </span>
                                <span>
                                    <p className='secondary-text-label mb-1'>Approved by</p>
                                    <p className="dark-text-label-bold  m-0 d-flex align-items-center">Shankar Prasad</p>
                                </span>
                            </div>
                            <span>
                                <p className='secondary-text-label mb-1'>Reason</p>
                                <p className="dark-text-label m-0 d-flex align-items-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco </p>
                            </span>
                            <hr />
                        </div>
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

                    </div>

                </div>
            </>
        </Layout>
    );
}

export default leaveAndAttendance;
