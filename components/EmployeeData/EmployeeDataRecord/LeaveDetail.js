import React from 'react'
import { Accordion } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import UserMinusIcon from '../../Icons/UserMinusIcon';

function LeaveDetail() {
    const percentage = 66;
    const Casualpercentage = 23;
    const Medicalpercentage = 10;
    const Annualpercentage = 27;
    const Maternitypercentage = 0;
    return (
        <div>
            <Accordion.Item eventKey="9">
                <Accordion.Header><UserMinusIcon/> &nbsp; Leaves </Accordion.Header>
                <Accordion.Body className='p-5'>
                    <div className='d-flex align-items-center grid-col-40' >
                        <div>
                            <div style={{ width: 280, height: 280 }}>
                                <CircularProgressbar strokeWidth={4} className="overall-leave" value={percentage} text={'Leave Balance'} />
                            </div>
                        </div>
                        <div className='w-100'>
                            <div className='d-flex align-items-center'>
                                <div className='d-flex'>
                                    <span className='leave-status me-2' style={{ background: '#d6d6d6' }}></span>
                                    <div>
                                        <label className="f-14">Total Leaves</label>
                                        <h3>20</h3>
                                    </div>
                                </div>
                                <div className='ms-5 d-flex'>
                                    <span className='leave-status me-2' style={{ background: '#506ee4' }}></span>
                                    <div>
                                        <label className="f-14">Leaves Used</label>
                                        <h3>15</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 d-flex justify-content-between'>
                                <div className='text-center'>
                                    <div style={{ width: 50, height: 50 }} className='m-auto'> <CircularProgressbar strokeWidth={6} className='casual-leave' value={Casualpercentage} text={'05'} /></div>
                                    <label>Casual Leaves</label>
                                </div>
                                <div className='text-center'>
                                    <div style={{ width: 50, height: 50 }} className='m-auto'> <CircularProgressbar strokeWidth={6} className='medical-leave' value={Medicalpercentage} text={'03'} /></div>
                                    <label>Medical Leaves</label>
                                </div>
                                <div className='text-center'>
                                    <div style={{ width: 50, height: 50 }} className='m-auto'> <CircularProgressbar strokeWidth={6} className='annual-leave' value={Annualpercentage} text={'07'} /></div>
                                    <label>Annual Leaves</label>
                                </div>
                                <div className='text-center'>
                                    <div style={{ width: 50, height: 50 }} className='m-auto'> <CircularProgressbar strokeWidth={6} className='maternity-leave' value={Maternitypercentage} text={'0'} /></div>
                                    <label>Maternity Leave</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default LeaveDetail