import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import SaveIcon from "../Icons/SaveIcon";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Box from "../Shared/Box";
import UserProfileHeader from "../Shared/UserProfileHeader";
import ErrorMsg from "../Shared/ErrorMsg";
import Label from "../Shared/Label";

const schema = yup.object().shape({
    username: yup.string().required().matches(/^[A-Za-z0-9_]+$/, "Username can only have alphabets, numbers and underscores").max(32).label("Username"),
});
function UserProfile(props) {
    const {
        accesstoken, notify, userAvailable, admins
    } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({ resolver: yupResolver(schema) });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setValue("username", userAvailable.username);
    }, [userAvailable]);

    let config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        }
    };
    const onSubmitHandler = (data) => {
        try {
            let endpoint = getAbsoluteURL(`controllers/users/currentUserUpdate`);
            setSubmitting(true);
            axios
                .put(endpoint, data, config)
                .then((response) => {
                    
                    setSubmitting(false);
                    notify({ success: (response.data.code == 200), message: response.data.message });
                })
                .catch((error) => {
                    let error_msg = 'Something went wrong';
                    if (error.response) {
                        error_msg = error.response.data.message;
                    }
                    setSubmitting(true);
                    notify({ success: false, message: error_msg });
                });
        } catch (error) {
        }
    };
    return (
        <Box className='p-3'>
            <Container>
                <Row className='mb-1'>
                    <Col sm={12}>
                        <UserProfileHeader user={userAvailable} admins={admins} token={accesstoken} notify={notify} />
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col sm={12}>
                        <hr />
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(onSubmitHandler)} className="profile-wrapper">
                    <Row className='profile-field mt-3'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block '>USERNAME</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="form-grid ems-form">
                                <Form.Group>
                                    <Form.Control {...register("username")} onChange={(e) => setValue("username", e.target.value)} defaultValue={userAvailable.username} />
                                    <ErrorMsg errorMessage={errors.username?.message} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile-field mt-3'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block '>EMAIL</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="form-grid ems-form">
                                <Form.Group>
                                    <Form.Control readOnly defaultValue={userAvailable.email} />
                                    <ErrorMsg errorMessage={errors.email?.message} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Stack direction="horizontal" className='pt-3 justify-content-end '>
                        <Button type="submit" variant="save" disabled={submitting} className='save'>
                            <SaveIcon /> <span className="ms-2">{submitting ? 'Saving...' : 'Save'}</span>
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </Box >
    )
}
export default UserProfile;