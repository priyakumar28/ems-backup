import React, { useState, useEffect } from "react";

import {
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Meta from "../Meta";
import Box from "../Shared/Box";
import ExportProject from "./ExportProjects";
import ExportEmployee from "./ExportEmployee";
import ExportClient from "./ExportClient";
import ExportTimesheet from "./ExportTimesheet";
import ExportEmployeeProjects from "./ExportEmployeeProject";

function Reports(props) {
  const { accesstoken } = props;

  const [change, setChange] = useState(false);

  

  return (
    <Box>
      <Meta title="EMS -Reports" />
      <Container fluid>
        <Row>
          <Col md={3} className="form-grid-1 ems-form">
            <Form.Group className="position-relative">
              <Form.Label>Reports</Form.Label>
              <Form.Select
                className="form-control select"
                onChange={(e) => {
                  setChange(e.target.value);
                }}
              >
                <option>Select Option</option>
                <option value="1">Project</option>
                <option value="2">Employee</option>
                <option value="3">Client</option>
                <option value="4">Employee Time Entry</option>
                <option value="5">Employees in Project</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-3">
        <Row>
          <Col sm={12}>
            {change && (
              <Box>
                {change == 1 && (
                  <ExportProject {...props} mode={"export_projects"} />
                )}
                {change == 2 && (
                  <ExportEmployee {...props} mode={"export_employee"} />
                )}
                {change == 3 && (
                  <ExportClient {...props} mode={"export_clients"} />
                )}
                {change == 4 && (
                  <ExportTimesheet {...props} mode={"export_timesheets"} />
                )}
                {change == 5 && (
                  <ExportEmployeeProjects
                    {...props}
                    mode={"export_employeeprojects"}
                  />
                )}
              </Box>
            )}
          </Col>
        </Row>
      </Container>
    </Box>
  );
}
export default Reports;
