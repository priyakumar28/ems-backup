import React from 'react'
import { useRouter } from "next/router";
import Box from './Box';
import { Button, Col, Container, Row } from 'react-bootstrap';


function LoginErrorMsg(props) {
    const router = useRouter();
    const { errorMsg } = props;
    return (
        <Box className='full_wrapper'>
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className='text-center'>
                        <Box className="table-wrapper d-flex p-4 align-items-center justify-content-center">
                            <Box className='flex-1'>
                                <img src='/images/error.svg' style={{ width: '230px' }} />
                            </Box>
                            <Box className='ms-5 flex-1 text-left'>
                                <h6>An Error Occurred:{errorMsg}</h6>
                                <Button onClick={() => router.push(`/login`)} variant="outline-secondary" className='delete text-center w-100'>
                                    Back to login
                                </Button>
                            </Box>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}

export default LoginErrorMsg