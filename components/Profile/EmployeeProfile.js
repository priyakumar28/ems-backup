import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import SaveIcon from "../Icons/SaveIcon";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { profileSchema } from "../../lib/yupHelpers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "../Shared/Box";
import EmployeeProfileHeader from "../Shared/EmployeeProfileHeader";
import { nationalities } from "../../lib/nationalities";
import {isValidDate} from "../../lib/helpers";
import ErrorMsg from "../Shared/ErrorMsg";
import InputMask from "react-input-mask";

const schema = yup.object().shape(profileSchema);

function EmployeeProfile(props) {
    const {
        accesstoken, notify, userAvailable, admins
    } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        control
    } = useForm({ resolver: yupResolver(schema) });
    const [startDate, setStartDate] = useState(null);
    const [phn, setPhn] = useState(false);
    const [hphn, setHphn] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [prezipCode, setpreZipcode] = useState("");
    const [pincodeData, setPincodeData] = useState("");

    useEffect(() => {
        if (userAvailable.employee && typeof userAvailable.employee === "object" && Object.keys(userAvailable.employee).length > 0) {
            for (const property in userAvailable.employee) {
                if (schema._nodes.includes(property)) {
                    let value = userAvailable.employee[property];
                    value = typeof value === "string" ? value.trim() : value;
                    setValue(property, value);
                    if (property === "birthday" && isValidDate(value)) {
                        setStartDate(new Date(value));
                    } else if (property === "pre_zipcode") {
                        setpreZipcode(value);
                    }
                    else if (property === "work_phone") {
                        setPhn(value);
                    }
                    else if (property === "home_phone") {
                        setHphn(value);
                    }
                }
            }
        }
    }, [userAvailable])

    let config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        }
    };

    const findAddress = (arg) => {
        if (arg.length === 6) {
            axios
                .get(`https://api.postalpincode.in/pincode/${arg}`)
                .then((res) => {
                    let data = res.data[0].PostOffice[0];
                        setValue("pre_zipcode", data.Pincode);
                        setValue("pre_city", data.Block === "NA" ? data.Name : data.Block);
                        setValue("pre_country", data.Country);
                        setValue("pre_state", data.State);
                        data ? setPincodeData(data) : setPincodeData("");
                })
                .catch((err) => {
                    console.log(err);
                    notify({ success: false, message: "Enter a valid pincode" });
                });
        }
    };

    const onSubmitHandler = (data) => {
        try {
            for (const property in data) {
                if (data[property] == 'null') data[property] = null;
                if (typeof data[property] == 'string' && data[property]?.trim() == '') data[property] = null;
            }
            let endpoint = getAbsoluteURL(`controllers/employees?id=${userAvailable.employee?.id}`);
            setSubmitting(true);
            axios
                .put(endpoint, data, config)
                .then(() => {
                    setSubmitting(false);
                    notify({ success: true, message: "Employee updated" });
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
                        <EmployeeProfileHeader loggedUser={userAvailable} admins={admins} token={accesstoken} notify={notify} />
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
                                <span className='f-13 f-500 mb-0 d-block '>NAME</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="form-grid ems-form">
                                <Form.Group>
                                    <Form.Label>
                                        First Name
                                    </Form.Label>
                                    <Form.Control {...register("first_name")} placeholder="" defaultValue={userAvailable.employee?.first_name} />
                                    <ErrorMsg errorMessage={errors.first_name?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Middle Name
                                    </Form.Label>
                                    <Form.Control {...register("middle_name")} placeholder="" defaultValue={userAvailable.employee?.middle_name} />
                                    <ErrorMsg errorMessage={errors.middle_name?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Last Name
                                    </Form.Label>
                                    <Form.Control {...register("last_name")} placeholder="" defaultValue={userAvailable.employee?.last_name} />
                                    <ErrorMsg errorMessage={errors.last_name?.message} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile-field'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block '>BIRTHDAY & GENDER</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="ems-form form-grid-2">
                                <Form.Group>
                                    <Form.Label>DOB</Form.Label>
                                    <Controller
                                        control={control}
                                        name="birthday"
                                        render={() => (
                                            <DatePicker selected={startDate} value={startDate} onChange={(date) => {
                                                setStartDate(date);
                                                setValue("birthday", new Date(date));
                                            }} className="form-control" dateFormat="dd-MM-yyyy" />
                                        )}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Gender
                                    </Form.Label>
                                    <Form.Select className="form-control" {...register("gender")} defaultValue={userAvailable.employee?.gender}>
                                        <option value={"null"}>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile-field'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block uppercase'>Marital Status &<br /> Nationality</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="ems-form form-grid-2">
                                <Form.Group>
                                    <Form.Label>
                                        Marital Status
                                    </Form.Label>
                                    <Form.Select className="form-control" {...register("marital_status")}  defaultValue={userAvailable.employee?.marital_status}>
                                        <option value={"null"}>Select Marital Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Nationality
                                    </Form.Label>
                                    <Form.Select className="form-control" {...register("nationality")}
                                         defaultValue={userAvailable.employee?.nationality}>
                                        {nationalities &&
                                            nationalities.map(
                                                ({ nationality, alpha_3_code }, index) => (
                                                    <option key={index} value={alpha_3_code}>
                                                        {nationality}
                                                    </option>
                                                )
                                            )}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col lg={12}>
                            <h6 className='mb-4 sub-heading'>Contact Info  </h6>
                        </Col>
                    </Row>
                    <Row className='profile-field'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 uppercase mb-0 d-block '>Mail</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="ems-form form-grid-2">
                                <Form.Group>
                                    <Form.Label>
                                        Official Mail
                                    </Form.Label>
                                    <Form.Control placeholder="" type='email' {...register("work_email")} readOnly defaultValue={userAvailable.employee?.work_email} />
                                    <ErrorMsg errorMessage={errors.work_email?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Personal Mail
                                    </Form.Label>
                                    <Form.Control placeholder="" type='email' {...register("private_email")} defaultValue={userAvailable.employee?.private_email} />
                                    <ErrorMsg errorMessage={errors.private_email?.message} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile-field'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block '>CONTACT</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="ems-form form-grid-2">
                                <Form.Group>
                                    <Form.Label> Work phone</Form.Label>
                                    <Controller
                                        control={control}
                                        name="work_phone"
                                        render={() => (
                                            <PhoneInput
                                                country={"in"}
                                                value={phn}
                                                onChange={(phone) => {
                                                    setPhn(phone);
                                                    setValue("work_phone", phone);
                                                }}
                                            />
                                        )}
                                    />
                                    <ErrorMsg errorMessage={errors.work_phone?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> Home phone</Form.Label>
                                    <Controller
                                        control={control}
                                        name="home_phone"
                                        render={() => (
                                            <PhoneInput
                                                country={"in"}
                                                value={hphn}
                                                onChange={(phone) => {
                                                    setHphn(phone);
                                                    setValue("home_phone", phone);
                                                }}
                                            />
                                        )}
                                    />
                                    <ErrorMsg errorMessage={errors.home_phone?.message} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile-field'>
                        <Col md={3}>
                            <label>
                                <span className='f-13 f-500 mb-0 d-block uppercase'>Address</span>
                            </label>
                        </Col>
                        <Col md={9}>
                            <div className="form-grid-2 ems-form">
                                <Form.Group>
                                    <Form.Label>
                                        Address line 1
                                    </Form.Label>
                                    <Form.Control placeholder="" {...register("pre_address1")} defaultValue={userAvailable.employee?.pre_address1} />
                                    <ErrorMsg errorMessage={errors.pre_address1?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> Address line 2</Form.Label>
                                    <Form.Control placeholder="" {...register("pre_address2")} defaultValue={userAvailable.employee?.pre_address2} />
                                    <ErrorMsg errorMessage={errors.pre_address2?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        ZIP Code
                                    </Form.Label>
                                    <Controller
                                        control={control}
                                        name="pre_zipcode"
                                        render={() => (
                                            <InputMask
                                                className="form-control"
                                                value={prezipCode}
                                                mask="999999"
                                                maskChar={" "}
                                                onChange={(e) => {
                                                    let val = e.target.value?.trim()
                                                        ? e.target.value.trim()
                                                        : "";
                                                    if (val.length === 6) {
                                                        findAddress(val);
                                                    }
                                                    setpreZipcode(val);
                                                    // setValue("zipcode", val)
                                                }}
                                            />
                                        )}
                                    />
                                    {/* <Form.Control placeholder="" {...register("pre_zipcode")} defaultValue={userAvailable.employee?.pre_zipcode} /> */}
                                    <ErrorMsg errorMessage={errors.pre_zipcode?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        City
                                    </Form.Label>
                                    <Form.Control
                                        value={
                                            pincodeData.Block === "NA"
                                                ? pincodeData.Name
                                                : pincodeData.Block
                                        }
                                        {...register("pre_city")}
                                        placeholder=""
                                    />
                                    {/* <Form.Control placeholder="" {...register("pre_city")} defaultValue={userAvailable.employee?.pre_city} /> */}
                                    <ErrorMsg errorMessage={errors.pre_city?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Country
                                    </Form.Label>
                                    <Form.Control
                                        value={pincodeData.Country}
                                        {...register("pre_country")}
                                        placeholder=""
                                    />
                                    {/* <Controller
                                        control={control}
                                        name="pre_country"
                                        render={({ field: { _onChange, _onBlur, _value, _ref } }) => (
                                            <CountryDropdown
                                                value={country}
                                                className="form-control form-select"
                                                valueType="short"
                                                onChange={(val) => {
                                                    setCountry(val);
                                                    setValue("pre_country", val);
                                                }}
                                            />
                                        )}
                                    /> */}
                                    <ErrorMsg errorMessage={errors.pre_country?.message} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> State</Form.Label>
                                    <Form.Control
                                        value={pincodeData.State}
                                        {...register("pre_state")}
                                        placeholder=""
                                    />
                                    {/* <Controller
                                        control={control}
                                        name="pre_state"
                                        render={({ field: { _onChange, _onBlur, _value, _ref } }) => (
                                            <RegionDropdown
                                                country={country}
                                                className="form-control  "
                                                countryValueType="short"
                                                value={reg}
                                                onChange={(val) => {
                                                    setReg(val);
                                                    setValue("pre_state", val);
                                                }}
                                            />
                                        )}
                                    /> */}
                                    <ErrorMsg errorMessage={errors.pre_state?.message} />
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
export default EmployeeProfile;














// { field: { _onChange, _onBlur, _value, _ref } }