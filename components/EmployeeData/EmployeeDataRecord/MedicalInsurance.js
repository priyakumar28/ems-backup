import React from 'react'
import {  Accordion } from 'react-bootstrap';

import HeartIcon from '../../Icons/HeartIcon';

function MedicalInsurance() {
    return (
        <div>
            <Accordion.Item eventKey="mi" className="disabled">
                <Accordion.Header><HeartIcon/> &nbsp; Medical Insurance</Accordion.Header>
                <Accordion.Body style={{ display: 'none' }}>
                    <div className='payroll-tab'></div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default MedicalInsurance