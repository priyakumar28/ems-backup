import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Box from "./Box";
import LoaderComponent from "./LoaderComponent";

function PageLoaderComponent(props) {
    const { isauthLoading } = props;
    return (
        <Box className='full_wrapper'>
            <Container>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className='text-center'>
                        <Box className="table-wrapper d-sm-flex p-4 align-items-center justify-content-center">
                            <Box className='mt-3 ms-5 mt-sm-0 flex-1'>
                                <h6 className='mt-4'>{isauthLoading ? isauthLoading : "Please wait while we are processing..."}</h6>
                                <LoaderComponent />
                            </Box>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Box>
    );
}

export default PageLoaderComponent;