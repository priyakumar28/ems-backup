import React, { useState } from 'react';
import Layout from '../../components/Shared/Layout';
import { Dropdown, Button, Form, Row, Col } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function leavepolicy() {
    const [startDate, setStartDate] = useState(new Date());
    const [isFilter, setIsFilter] = useState("active");
    const [isEFilter, setIsEFilter] = useState("inactive");

    const openMenuRight = (e) => {
        e.preventDefault();
        document.body.classList.add("hidden");
        var element = document.getElementById("lpDetail");
        element.classList.add("show");
        var element = document.getElementById("overLay");
        element.classList.add("show");
    };
    const closeMenuRight = (e) => {
        e.preventDefault();
        document.body.classList.remove("hidden");
        var element = document.getElementById("lpDetail");
        element.classList.remove("show");
        var element = document.getElementById("overLay");
        element.classList.remove("show");
    };
    return (
        <Layout>
            <div className="d-flex align-items-center justify-content-between">
                <h6 className=" ms-1 mb-0">Leave Policy</h6>
                <Breadcrumb size="lg">
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        resource pool
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>leave policy</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='shadow-wrapper d-flex justify-content-between align-items-center mb-2 mt-3'>
                <Form size="large">
                    <Form.Group className="mb-0 position-relative search-form" controlId="formBasicEmail">
                        <Form.Control type="Search" placeholder="Search" />
                        <i className="uil uil-search"></i>
                    </Form.Group>
                </Form>

                <Button variant="primary" className="ms-2" onClick={openMenuRight}>New Leave Policy</Button>{' '}
            </div>
            <div className='card-wrapper position-relative mt-3'>
                <div className='cards'>
                    <div>
                        <div className='d-flex align-items-center justify-content-between employee-card-header'>
                            <div>
                                <h6 className="m-0">Probation Leave Policy</h6>
                            </div>
                            <div className="d-flex align-items-center">
                                {isFilter == "active" ?
                                    <Badge pill bg="success">
                                        Active
                                    </Badge> :
                                    ""}
                                {isFilter == "inactive" ?
                                    <Badge pill bg="danger">
                                        In Active
                                    </Badge> :
                                    ""}
                                <Dropdown size="small" >
                                    <Dropdown.Toggle variant="white" id="dropdown-basic" className="p-0 ms-2">
                                        <i className="uil uil-ellipsis-v"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item href="#" onClick={() => setIsFilter("active")}>Active</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={() => setIsFilter("inactive")}>In active</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Assign</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <p className="secondary-text-label mt-3">A leave policy is a document that lays down the rules and regulations related to various types of leaves that an employee can avail of</p>
                    </div>
                </div>
                <div className='cards'>
                    <div>
                        <div className='d-flex align-items-center justify-content-between employee-card-header'>
                            <div>
                                <h6 className="m-0">Employee Leave Policy</h6>
                            </div>
                            <div className="d-flex align-items-center">
                                {isEFilter == "active" ?
                                    <Badge pill bg="success">
                                        Active
                                    </Badge> :
                                    ""}
                                {isEFilter == "inactive" ?
                                    <Badge pill bg="danger">
                                        In Active
                                    </Badge> :
                                    ""}
                                <Dropdown size="small" >
                                    <Dropdown.Toggle variant="white" id="dropdown-basic" className="p-0 ms-2">
                                        <i className="uil uil-ellipsis-v"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item href="#" onClick={() => setIsEFilter("active")}>Active</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={() => setIsEFilter("inactive")}>In active</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Assign</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <p className="secondary-text-label mt-3">A leave policy is a document that lays down the rules and regulations related to various types of leaves that an employee can avail of</p>
                    </div>
                </div>
            </div>

            <div className="overlay-wrapper" onClick={closeMenuRight} id="overLay"></div>
            <div className="ems_Right_Modal_Popup xs" id="lpDetail">
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
                    <img src="/images/close.png" onClick={closeMenuRight} alt="close" className='close-modal' />
                </div>
                <div className="p-3">
                    <Form className="grid-gap">
                        <Form.Control placeholder="Policy Name" />
                        <span className="position-relative d-block">
                            <DatePicker dateFormat="dd-MMM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                            <i className="uil uil-calender date-icon"></i>
                        </span>
                        <div>
                            <Form.Control placeholder="Subject" />
                        </div>
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
                        <div className="form-grid">
                            <Form.Control placeholder="Total" />
                            <Form.Control placeholder="MCF" />
                            <Form.Control placeholder="Accural" />
                            <Form.Control placeholder="Doc" />
                        </div>

                        <Row className="mt-2">
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary">Apply</Button>{' '}
                                <Button variant="danger" className="ms-2">Cancel</Button>{' '}
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}

export default leavepolicy;
