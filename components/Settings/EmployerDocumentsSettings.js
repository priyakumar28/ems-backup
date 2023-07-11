import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { employerdocumentssettingsSchema } from "../../lib/yupHelpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import Meta from "../Meta";
import SubTitle from "../Shared/SubTitle";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
import Divider from "../Shared/Divider";
import Select from "react-select";

const schema = yup.object().shape(employerdocumentssettingsSchema);

function EmployerDocumentsSettings(props) {
    const { accesstoken, settings, notify } = props;
    const [submitting, setSubmitting] = useState(false);
    const onSubmitHandler = async (data) => {
        try {
            if (selectedusers) data["users"] = selectedusers;
            let endpoint = getAbsoluteURL("controllers/settings");
            setSubmitting(true);
            axios({
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accesstoken}`,
                },
                url: endpoint,
                data: data,
            })
                .then((response) => {
                    notify({
                        success: response.data.code === 200,
                        message: response.data.message,
                    });
                    if (response.data.code === 200) {

                        setconfigurationsettings([response.data.data]);

                    }
                    setSubmitting(false);
                })
                .catch((error) => {
                    console.log("hshs", error);
                    let error_msg = "Something went wrong";
                    if (error.response) {
                        error_msg = error.response.data.message;
                    }
                    setSubmitting(false);
                    notify({ success: false, message: error_msg });
                });
        } catch (error) {
            notify({ success: false, message: "Something went wrong" });
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    return (
        <Box>
            <Container>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <Form.Group as={Row} className='mt-4'>
                    <Form.Label column lg="6" className="py=0">
                        <span className="f-23 f-500 uppercase mb-0 d-block text-dark" >
                            hr assessment password
                        </span>
                    </Form.Label>
                    <Col lg="6" className="py=0 mb-4">
                        <Form.Control type="password"
                            {...register("hr_assessment_password")} />

                        <span className="error-msg">
                            {errors.hr_assessment_password?.message}
                        </span>

                    </Col>
                    <Form.Label column lg="6" className="py=0 mb-4">
                        <span className="f-23 f-500 uppercase mb-0 d-block text-dark" >
                            l1 assessment password
                        </span>
                    </Form.Label>
                    <Col lg="6" className="py=0 mb-4">
                        <Form.Control type="password"
                            {...register("l1_assessment_password")} />

                        <span className="error-msg">
                            {errors.l1_assessment_password?.message}
                        </span>

                    </Col>
                    <Form.Label column lg="6" className="py=0 mb-4">
                        <span className="f-23 f-500 uppercase mb-0 d-block text-dark" >
                            rex approval password
                        </span>
                    </Form.Label>
                    <Col lg="6" className="py=0">
                        <Form.Control type="password"
                            {...register("rex_approval_password")} />

                        <span className="error-msg">
                            {errors.rex_approval_password?.message}
                        </span>

                    </Col>

                </Form.Group>
                <Stack className="mt-3 justify-content-end align-items-end">
                    <Button variant="outlineDark" type="submit" className='save' disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                    </Stack>
                </Form>
            </Container>
        </Box>
    )
}
export default EmployerDocumentsSettings;