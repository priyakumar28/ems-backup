
import React, { useState, useRef } from "react";
import Layout from '../../components/Shared/Layout';
import { Button, Accordion, Container, Form, Row, Col } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { LeaveChart } from '../../components/EmployeeData/LeaveChart';
import DatePicker from "react-datepicker";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ProgressBar from 'react-bootstrap/ProgressBar'
import DateRangePicker from 'react-bootstrap-daterangepicker';


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

function myleaves() {
    const handleEvent = (event, picker) => {
        console.log(picker.startDate);
    }
    const handleCallback = (start, end, label) => {
        console.log(start, end, label);
    }
    const now = 42;
    const localizer = momentLocalizer(moment)
    const DnDCalendar = withDragAndDrop(Calendar);
    const calendarRef = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const reporting_popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <div className="d-flex flex-column">
                    <span>John Nash Miranda</span>
                </div>
            </Popover.Body>
        </Popover>
    );

    const [showLD, setShowLD] = useState(false); // LD => Leave Detail
    const [showLED, setShowLED] = useState(false); // LD => Leave Reason Detail
    const [showLo, setShowLo] = useState(false); // LD => Leaves Overview


    const myEventsList = [
        {
            start: moment().toDate(),
            end: moment()
                .add(3, "days")
                .toDate(),
            title: "Marriage Trip",
        }
    ]
    const onEventDrop = (data) => {
        console.log(data);
    };
    const onOpenLd = (e) => {
        setShowLD(true);
    }
    const onOpenLo = (e) => {
        setShowLo(true);
    }
    const onSelectEvent = (e) => {
        setShowLED(true);
    }

    return (

        <Layout>
            <div className="d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center'><span className="icon-wrapper me-2"><i className="uit uit-calender"></i></span> <h6 className="mb-0">My Leaves</h6></div>
                <span className='d-flex align-items-center'>
                    <Button variant="primary" className="ms-2" onClick={onOpenLd}><i className="uil uil-plus"></i> Apply Leave</Button>{' '}
                    <Button variant="white" className="ms-2 py-0 px-2" onClick={onOpenLo}><i className="uil uil-file-search-alt" style={{ color: '#506ee4', fontSize: '22px' }}></i></Button>{' '}
                </span>
            </div>
            <hr style={{ backgroundColor: '#e5e5e5', marginBottom: '15px' }} />
            <DnDCalendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '76vh' }}
                onEventDrop={onEventDrop}
                onSelectEvent={onSelectEvent}
                selectable={true}
            />


            <div className={`overlay-wrapper  ${showLD ? 'show' : ''}`}></div>
            <div className={`ems_Right_Modal_Popup  ${showLD ? 'show' : ''}`}>
                <div className='employee_breif_detail-wrapper'>
                    <div className='d-flex align-items-center'>
                        <div className="avator-badge-container me-3">
                            <img src="/images/1.jpg" alt="Avatar" className="avatar card-avator" />
                        </div>
                        <span>
                            <h6 style={{ margin: '0', lineHeight: '1', alignItems: 'center' }}>Venu Karthikeyan
                                <Badge bg="light" text="dark" className='ms-1'>
                                    00555
                                </Badge>{' '}
                                <Badge bg="success">
                                    Active
                                </Badge>{' '}
                            </h6>
                            <p className='secondary-text-label mb-0'>Trainee</p>
                        </span>
                    </div>
                    <img src="/images/close.png" onClick={() => setShowLD(false)}alt="close" className='close-modal' />
                </div>
                <div className="p-3">
                    <Form>
                        <div className="form-grid">
                            <Form.Group>
                                <Form.Label>Leave Type</Form.Label>
                                <Form.Select value="Leave Type" selected="Leave Type" className="form-control">
                                    <option value="2">Casual Leave</option>
                                    <option value="3">Half Casual Leave</option>
                                    <option value="4">Restricted Holidays</option>
                                    <option value="5">Half Restricted Holidays</option>
                                    <option value="2">Sick Leave</option>
                                    <option value="2">Half Sick Leave</option>
                                    <option value="2">Unpaid Leave</option>
                                    <option value="2">Unpaid Half Day</option>
                                    <option value="2">Maternity </option>
                                    <option value="2">Paternity</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select Date</Form.Label>

                                <DateRangePicker initialSettings={{ locale: { format: 'DD-MMM-YYYY' } }} onEvent={handleEvent} onCallback={handleCallback}>
                                    <input className="form-control" size="sm" style={{ maxWidth: '300px' }} />
                                </DateRangePicker>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Number of days</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                        </div>
                        <Row className="mt-2">
                            <Form.Group>
                                <Form.Label>Reports to</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group>
                                <Form.Label>Leave Reason</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="" />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary">Apply</Button>{' '}
                                <Button variant="danger" className="ms-2">Cancel</Button>{' '}
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

            <div className={`overlay-wrapper ${showLED ? 'show' : ''}`}></div>
            <div className={`ems_Right_Modal_Popup  ${showLED ? 'show' : ''}`}>
                <div className='employee_breif_detail-wrapper'>
                    <div>
                        <h6 style={{ marginBottom: '5px', lineHeight: '1', alignItems: 'center' }}>Marriage Trip Request &nbsp; <Badge bg="success">
                            Approved
                        </Badge></h6>
                        <p className='secondary-text-label mb-0'>Applied On 12-Dec-2021 <span className="theme-text ms-1">(59 days ago)</span></p>
                    </div>
                    <img src="/images/close.png" onClick={() => setShowLED(false)} alt="close" className='close-modal'/>
                </div>
                <div className="p-3">
                    <div className="text-center">
                        <p className="theme-text mb-1">4 days</p>
                        <p className="dark-text-label-bold  m-0">04-Jan-2022 to 06-Jan-2022</p>
                        <ProgressBar now={now} label={`${now}%`} visuallyHidden size='sm' />
                        <p className='secondary-text-label mb-0'><span className='dark-text-label-bold'>1 out of 5</span> casual leaves remaining</p>
                    </div>
                    <hr />
                    <span>
                        <p className='secondary-text-label mb-1'>Reason</p>
                        <p className="dark-text-label m-0 d-flex align-items-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco </p>
                    </span>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <span>
                            <p className='secondary-text-label mb-1'>Reports to</p>
                            <p className="dark-text-label-bold  m-0 d-flex align-items-center">Shankar Prasad</p>
                        </span>
                        <span>
                            <p className='secondary-text-label mb-1'>Approved by</p>
                            <p className="dark-text-label-bold  m-0 d-flex align-items-center">Shankar Prasad</p>
                        </span>
                    </div>
                </div>
            </div>

            <div className={`overlay-wrapper  ${showLo ? 'show' : ''}`}></div>
            <div className={`ems_Right_Modal_Popup  ${showLo ? 'show' : ''}`}>
                <div className='employee_breif_detail-wrapper'>
                    <div>
                        <h6 className="m-0" >My Leaves Overview</h6>
                    </div>
                    <img src="/images/close.png" onClick={() => setShowLo(false)} alt="close" className='close-modal' />
                </div>
                <div className="p-3">
                    <div className='d-flex align-items-center justify-content-around mt-5'>
                        <div style={{ height: '240px', width: '240px' }}>
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
                </div>
            </div>
        </Layout>
    );
}

export default myleaves;
