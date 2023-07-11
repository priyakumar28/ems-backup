import React, { useState } from 'react';
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Shared/Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function holiday() {
  const localizer = momentLocalizer(moment)
  const DnDCalendar = withDragAndDrop(Calendar);
  const myEventsList = [
    {
      start: moment().toDate(),
      end: moment()
        .add(0, "days")
        .toDate(),
      title: "Republic Day",
    }
  ]
  const [isFilter, setIsFilter] = useState("BAssure Holidays");
  const [showHd, setShowHd] = useState(false); // LD => Leave Reason Detail
  const [showAHd, setShowAHd] = useState(false); // LD => Leave Reason Detail

  const onEventDrop = (data) => {
    console.log(data);
  };
  const onSelectEvent = (e) => {
    setShowHd(true);
  }
  const onSelectSlot = (e) => {
    setShowAHd(true);
  }
  const handleEvent = (event, picker) => {
    console.log(picker.startDate);
  }
  const handleCallback = (start, end, label) => {
    console.log(start, end, label);
  }
  return (
    <Layout>

      <div className=" d-flex justify-content-between align-items-center mb-3 ">
        <div className='d-flex align-items-center'><span className="icon-wrapper me-2"><i className="uit uit-calender"></i></span> <h6 className="mb-0">Holidays</h6></div>
        <div className='d-flex align-items-center'>
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="white" id="dropdown-basic">
              <span>{isFilter == "BAssure Holidays" ? "BAssure Holidays" : ""}</span>
              <span>{isFilter == "Client 01" ? "Client 01" : ""}</span>
              <span>{isFilter == "Client 02" ? "Client 02" : ""}</span>
              <span>{isFilter == "Client 03" ? "Client 03" : ""}</span>
              <i className="uil uil-filter ms-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => setIsFilter("BAssure Holidays")}>BAssure Holidays</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setIsFilter("Client 01")}>Client 01</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setIsFilter("Client 02")}>Client 02</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setIsFilter("Client 03")}>Client 03</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <hr style={{ backgroundColor: '#e5e5e5' }} />
      <DnDCalendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: '76vh' }}
        onEventDrop={onEventDrop}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
      />
      <div className={`overlay-wrapper xs ${showHd ? 'show' : ''}`} ></div>
      <div className={`ems_Right_Modal_Popup xs ${showHd ? 'show fade' : ''}`}>
        <div className='employee_breif_detail-wrapper'>
          <div>
            <h6 className="m-0">Holidays</h6>
          </div>
          <img src="/images/close.png" onClick={() => setShowHd(false)} alt="close" className='close-modal' />
        </div>
        <div className="p-3">
          <Form>
            <div className="form-grid">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value="Repulic Day" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <DateRangePicker initialSettings={{ locale: { format: 'DD-MMM-YYYY' } }} onEvent={handleEvent} onCallback={handleCallback}>
                  <input className="form-control" size="sm" />
                </DateRangePicker>
              </Form.Group>
            </div>
            <Row className="mt-2">
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} value="Republic Day is a public holiday in India, when the country marks and celebrates the date on which the Constitution of India came into effect on 26 January 1950, replacing the Government of India Act 1935 as the governing document of India and thus, turning the nation into a newly formed republic." />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className={`overlay-wrapper  ${showAHd ? 'show' : ''}`}></div>
      <div className={`ems_Right_Modal_Popup  ${showAHd ? 'show' : ''}`}>
        <div className='employee_breif_detail-wrapper'>
          <div>
            <h6 className="m-0">Holidays</h6>
          </div>
          <img src="/images/close.png" onClick={() => setShowAHd(false)} alt="close" className='close-modal'/>
        </div>
        <div className="p-3">
          <Form>
            <div className="form-grid">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Repulic Day" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>

                <DateRangePicker initialSettings={{ locale: { format: 'DD-MMM-YYYY' } }} onEvent={handleEvent} onCallback={handleCallback}>
                  <input className="form-control" size="sm" />
                </DateRangePicker>
              </Form.Group>
            </div>
            <Row className="mt-2">
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Description" />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="d-flex justify-content-end">
                <Button variant="primary">Save</Button>{' '}
                <Button variant="danger" onClick={() => setShowAHd(false)} className="ms-2">Cancel</Button>{' '}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default holiday;
