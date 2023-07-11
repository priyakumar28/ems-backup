import React, { useState } from 'react'
import { Button, Form, Accordion, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import MonitorIcon from '../../Icons/MonitorIcon';

function ManagedDevices() {
    const [showMD, setShowMD] = useState(false);
    const onShowMD = () => {
        setShowMD(true);
    }
    const onCloseMD = () => {
        setShowMD(false);
    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <Accordion.Item eventKey="7" className="disabled">
                <Accordion.Header><MonitorIcon/> &nbsp; Managed devices </Accordion.Header>
                <Accordion.Body className='position-relative'>
                    <Table className={`ems-table ${showMD ? 'remove' : ''}`} size="lg">
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Serial Number</th>
                                <th>Granted Date</th>
                                <th>Status</th>
                                <th><Button variant="light-secondary" className="icon-btn"><i className="uil uil-plus"></i></Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Device">Laptop</td>
                                <td data-label="Serial Number">4CEO15F78TS</td>
                                <td data-label="Granted Date">31-Jan-2022</td>
                                <td data-label="Status">With employee</td>
                                <td>
                                    <i className="uil uil-edit-alt me-2" onClick={onShowMD}></i>
                                    <i className="uil uil-trash color-danger"></i>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Device">Keyboard</td>
                                <td data-label="Serial Number">4CEO15F78TS</td>
                                <td data-label="Granted Date">31-Jan-2022</td>
                                <td data-label="Status">With employee</td>
                                <td>
                                    <i className="uil uil-edit-alt me-2" onClick={onShowMD}></i>
                                    <i className="uil uil-trash color-danger"></i>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className={`edit-form-wrapper  ${showMD ? 'show' : ''}`}>
                        <div className="edit-info">
                            <Button variant="light-secondary" className="icon-btn" onClick={onCloseMD}><i className="uil uil-multiply"></i></Button>
                        </div>
                        <div className="form-grid ems-form me-40">
                            <Form.Group>
                                <Form.Label>Device</Form.Label>
                                <Form.Select className='form-control'>
                                    <option value="1">Laptop</option>
                                    <option value="2">Keyboard</option>
                                    <option value="3">Mouse</option>
                                    <option value="4">Monitor</option>
                                    <option value="5">Pen Drive</option>
                                    <option value="6">Hard Disk</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Serial Number</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group className='position-relative'>
                                <Form.Label>Granted Date</Form.Label>
                                <DatePicker selected={startDate} className='form-control' onChange={(date) => setStartDate(date)} dateFormat="dd-MMM-yyyy" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select className='form-control'>
                                    <option value="1">With Employee</option>
                                    <option value="2">Returned</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default ManagedDevices