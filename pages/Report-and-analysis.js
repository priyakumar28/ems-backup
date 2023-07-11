import React, { useState } from 'react';
import Layout from '../components/Shared/Layout';
import { Button, Dropdown, Form } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function ReportAndAnalysis() {
    
    return (
        <Layout>
            <div>
                <div className='d-flex  justify-content-between align-items-center'>
                    <h6 className="m-0 header-text">Report And Analysis</h6>
                </div>
               
                {/* <h6 className=" ms-1">Report and analysis</h6>
                <div className="shadow-wrapper d-flex justify-content-between align-items-center mb-2 mt-2 ">
                    <div className="d-flex">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ marginBottom: '4px' }}>Report Type</Form.Label>
                                <Form.Select aria-label="Default select example" className="form-control" style={{ minHeight: '49px' }}>
                                    <option value="Onboarding">Onboarding</option>
                                    <option value="Leave Management">Leave Management</option>
                                    <option value="Performance Management">Performance Management</option>
                                    <option value="Feedback Management">Feedback Management</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                        <span className=" ms-2">
                            <label>Select Date Range</label>
                            <DateRangePicker initialSettings={{locale: {format: 'DD-MMM-YYYY'}}} onEvent={handleEvent} onCallback={handleCallback}>
                                <input className="form-control" size="sm" style={{ maxWidth: '300px' }} />
                            </DateRangePicker>
                        </span>
                    </div>
                    <Button variant="primary" className="ms-2" style={{ minHeight: '49px' }}>Generate Report</Button>{' '}
                </div>
                <div className="text-center py-5">
                    <img src="/images/report.svg" style={{ maxWidth: '300px' }} />
                    <p className='mt-3'>Select the report type and date range to generate report</p>
                </div> */}
            </div>
        </Layout>
    );
}

export default ReportAndAnalysis;
