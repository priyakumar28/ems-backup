import React from 'react'
import { Accordion } from 'react-bootstrap';
import Link from 'next/link';
import CreditCardIcon from '../../Icons/CreditCardIcon';

function Payroll() {
    return (
        <div>
            <Accordion.Item eventKey="payroll" disabled>
                <Accordion.Header><CreditCardIcon/> &nbsp; Payroll</Accordion.Header>
                <Accordion.Body>
                    <div className='payroll-tab'>
                        <Link href="https://payroll.razorpay.com/login"><a target="_blank">Click here to go to razorpay payroll portal</a></Link>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default Payroll