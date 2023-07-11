import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Box from "./Box";
import LoaderComponent from "./LoaderComponent";

function FetchingWrapper(props) {
    const {
        className
    } = props;
    return (
        <Container>
            <Row>
                <Col md={{ span: 10 }} className='text-center'>
                    <Box className={"d-sm-flex p-4 align-items-center justify-content-center" + (className ? ` ${className}` : "")}>
                        <Box className='mt-3 ms-5 mt-sm-0 flex-1'>
                            <h6 className='fetch-header'>{props.title}</h6>
                            <LoaderComponent />
                        </Box>
                    </Box>
                </Col>
            </Row>
        </Container>
    );
}
export default FetchingWrapper;