import React from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import SiteSettings from "./SiteSettings";
import ConfigurationSettings from "./ConfigurationSettings";
import EmployerDocumentsSettings from "./EmployerDocumentsSettings";
import Box from "../../components/Shared/Box";
import Meta from "../../components/Meta";
import SubTitle from "../../components/Shared/SubTitle";
import DataSetContainer from "../../components/Shared/DataSetContainer";

import Designations from "./Designations";
import Departments from "./Departments";

function Settings(props) {
  return (
    <Box className="p-3 ">
      <Meta title="EMS - Settings" />
      <Container fluid className="px-0">
        <Row>
          <Col lg={12}>
            <SubTitle className="header-text" title="Settings" />
          </Col>
        </Row>
      </Container>
      <DataSetContainer className="mt-1">
        <Container fluid>
          <Accordion>
            <Accordion.Item eventKey="SiteSettings">
              <Accordion.Header> Site Settings </Accordion.Header>
              <Accordion.Body className="position-relative">
                <SiteSettings {...props} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="ConfigurationSettings">
              <Accordion.Header> Configuration Settings </Accordion.Header>
              <Accordion.Body className="position-relative">
                <ConfigurationSettings {...props} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="Departments">
              <Accordion.Header> Departments </Accordion.Header>
              <Accordion.Body className="position-relative">
                <Departments {...props} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="Designations">
              <Accordion.Header> Designations </Accordion.Header>
              <Accordion.Body className="position-relative">
                <Designations {...props} />
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="EmployerDocumentsSettings">
                            <Accordion.Header> EmployerDocuments Settings{" "} </Accordion.Header>
                            <Accordion.Body className="position-relative">
                                <EmployerDocumentsSettings {...props} />
                            </Accordion.Body>
                        </Accordion.Item> */}
          </Accordion>
        </Container>
      </DataSetContainer>
    </Box>
  );
}

export default Settings;
