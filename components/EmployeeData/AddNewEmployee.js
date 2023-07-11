import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Stack,
  Container,
} from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import moment from "moment";
import { employeeSchema } from "../../lib/yupHelpers";
import {
  NON_RELIGIOUS_IDENTIFICATIONS,
  RELIGIOUS_IDENTIFICATIONS,
  ac,
  capitalizeFirstLetter,
} from "../../lib/helpers";
import { nationalities } from "../../lib/nationalities";
import SaveIcon from "../Icons/SaveIcon";
import CloseIcon from "../Icons/CloseIcon";
import Select from "react-select";
import DataSetContainer from "../Shared/DataSetContainer";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import Label from "../Shared/Label";
import dynamic from "next/dynamic";
const Pincode = dynamic(() => import("react-pincode"), {
  ssr: false,
});

if (employeeSchema.probation) {
  delete employeeSchema.probation;
}

const schema = yup.object().shape(employeeSchema);

function AddNewEmployee(props) {
  const {
    accesstoken,
    newEmployeeAdded,
    addNewEmployee,
    setAddNewEmployee,
    notify,
    roles,
    userRoles,
    loggeduseremail,
    admins,
    departments,
    designations,
  } = props;

  const [DOB, setDOB] = useState(null);
  const [age, setAge] = useState(null);
  const [DOJ, setDOJ] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setAge(DOB ? moment().diff(moment(DOB, "DD-MMM-YYYY"), "years") : "");
  }, [DOB]);

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [presentCountry, setpresentCountry] = useState("");
  const [presentRegion, setpresentRegion] = useState("");
  const [presentzipcode, setpresentzipcode] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState(null);
  const [superv, setSuperv] = useState("");
  const [selectedRoles, setselectedRoles] = useState(null);

  const [pincodeData, setPincodeData] = useState("");
  const [pincodeData1, setPincodeData1] = useState("");
  const [rms, setRms] = useState("");

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Pan card to be uploaded within 15 days from the DOJ
      </Popover.Body>
    </Popover>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
  } = useForm({ resolver: yupResolver(schema) });


  // console.log("keeeeeeeeeeee", userRoles, loggeduseremail,admins,ac(userRoles, "Assign roles", loggeduseremail, admins))

  useEffect(() => {
    let values = getValues();
    let address_fields = [
      "pre_address1",
      "pre_address2",
      "pre_city",
      "pre_country",
      "pre_state",
      "pre_zipcode",
    ];
    address_fields.forEach((address_field) => {
      let value = values[address_field];
      let address_field2 = address_field.replace("pre_", "");
      setValue(address_field2, isChecked ? value : "");
    });

    setPincodeData1(pincodeData);
    setValue("zipcode", pincodeData.Pincode);
    setzipcode(pincodeData.Pincode);
    // setCountry(isChecked ? presentCountry : "");
    // setRegion(isChecked ? presentRegion : "");
    // setzipcode(isChecked ? presentzipcode : "");
    //setPincodeData1(pincodeData);
  }, [isChecked]);

  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [addNewEmployee]);

  const findAddress = (arg, name) => {
    if (arg.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${arg}`)
        .then((res) => {
          let data = res.data[0].PostOffice[0];
          if (name === "pre_zipcode") {
            setpresentzipcode(data.Pincode);
            setValue("pre_zipcode", data.Pincode);
            setValue("pre_city", data.Block === "NA" ? data.Name : data.Block);
            setValue("pre_country", data.Country);
            setValue("pre_state", data.State);
            data ? setPincodeData(data) : setPincodeData("");
          } else {
            setzipcode(data.Pincode);
            setValue("zipcode", data.Pincode);
            setValue("city", data.Block === "NA" ? data.Name : data.Block);
            setValue("country", data.Country);
            setValue("state", data.State);
            data ? setPincodeData1(data) : setPincodeData1("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRmanagers = (id) => {
    let config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let endpoint = getAbsoluteURL(`controllers/department?id=${id}`);
    axios
      .get(endpoint, config)
      .then((response) => {
        if (response.data.code == 200) {
          const transformed = response.data?.data?.Rmanager?.map(({ id, work_email }) => ({
            value: id,
            label: work_email,
          }));
          setRms(transformed);
        }
      })
      .catch((error) => {
        // let error_msg = "Something went wrong";
        // if (error.response) {
        //   error_msg = error.response.data.message;
        // }
      });
  };

  const onSubmitHandler = (data) => {
    let config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    data["selectedRoles"] = selectedRoles;
    let endpoint = getAbsoluteURL("controllers/employees");
    setSubmitting(true);
    axios
      .post(endpoint, data, config)
      .then((response) => {
        setSubmitting(false);
        if (response.data.code == 200) {
          console.log("aaaaaaa", response);
          setAddNewEmployee(false);
          newEmployeeAdded(response.data.data);
          reset();
        }
        notify({
          success: response.data.code == 200,
          message: capitalizeFirstLetter(response.data.message),
        });
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <DataSetContainer className="lg">
          <Container>
            <Form.Label>Note: Please enter name as per Aadhaar</Form.Label>
            <Row>
              <Col xs={12} className="form-grid ems-form mt-2">
                <Form.Group>
                  <Form.Label>
                    First Name <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    {...register("first_name")}
                    placeholder="First Name"
                    className="required"
                  />''
                  <ErrorMsg errorMessage={errors.first_name?.message} />
                </Form.Group>
                <Form.Group>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    {...register("middle_name")}
                    placeholder="Middle Name"
                  />
                  <ErrorMsg errorMessage={errors.middle_name?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    {...register("last_name")}
                    placeholder="Last Name"
                  />
                  <ErrorMsg errorMessage={errors.last_name?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ zIndex: "9999" }}>
                    Phone Number <Span className="required">*</Span>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="work_phone"
                    render={() => (
                      <PhoneInput
                        country={"in"}
                        enableAreaCodes={true}
                        enableLongNumbers={false}
                        countryCodeEditable={true}
                        enableSearch={true}
                        disableSearchIcon={true}
                        onChange={(phone, data, event, formattedValue) => {
                          setValue("work_phone", formattedValue);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.work_phone?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Office Email Id <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    {...register("work_email")}
                    placeholder="email"
                  />
                  <ErrorMsg errorMessage={errors.work_email?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Gender <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Select {...register("gender")} className="form-control">
                    <option value={"null"}>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.gender?.message} />
                </Form.Group>
                <Box className="d-flex" style={{ gridGap: "0.5rem" }}>
                  <Form.Group controlId="dob" style={{width: "75%"}}>
                    <Form.Label>Date Of Birth <Span className="required">*</Span></Form.Label>
                    <Form.Control
                      className="form-control"
                      {...register("birthday")}
                      type="date"
                      min={moment().subtract(60, 'years').format("YYYY-MM-DD")}
                      max={moment().subtract(18, 'years').format("YYYY-MM-DD")}
                      pattern="\d{4}-\d{2}-\d{2}"
                      name="birthday"
                      onChange={(e) => {
                        setDOB(e.target.valueAsDate);
                      }}
                    />
                    <ErrorMsg errorMessage={errors.birthday?.message} />
                  </Form.Group>
                  <Form.Group className="position-relative flex-1">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      name="age"
                      readOnly
                      value={age}
                      placeholder="age"
                    />
                  </Form.Group>
                </Box>
                <Form.Group>
                  <Form.Label>
                    Marital Status <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Select
                    {...register("marital_status")}
                    className="form-control"
                  >
                    <option value={"null"}>Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.marital_status?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height (in CM)</Form.Label>
                  <Controller
                    control={control}
                    name="height"
                    render={() => (
                      <InputMask
                        className="form-control"
                        mask="999"
                        onChange={(e) => {
                          let val = e.target.value?.trim()
                            ? e.target.value.trim()
                            : "";
                          setValue("height", val);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.height?.message} />
                </Form.Group>
                <Form.Group className="position-relative">
                  <Form.Label>Weight (in Kg)</Form.Label>
                  <Controller
                    control={control}
                    name="weight"
                    render={() => (
                      <InputMask
                        className="form-control"
                        mask="999"
                        onChange={(e) => {
                          let val = e.target.value?.trim()
                            ? e.target.value.trim()
                            : "";
                          setValue("weight", val);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.weight?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Blood Group <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Select
                    {...register("blood_group")}
                    className="form-control"
                  >
                    <option value={"null"}>Select Group</option>
                    <option value="O -">O -</option>
                    <option value="O +">O +</option>
                    <option value="A -">A -</option>
                    <option value="A +">A +</option>
                    <option value="B -">B -</option>
                    <option value="B +">B +</option>
                    <option value="AB -">AB -</option>
                    <option value="AB +">AB +</option>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.blood_group?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Religion <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Select
                    {...register("religion")}
                    className="form-control"
                  >
                    <option value={"null"}>Select Religion</option>
                    <optgroup
                      label="Religious Identification -------------"
                      style={{ fontSize: "15px", fontWeight: "500" }}
                    >
                      {RELIGIOUS_IDENTIFICATIONS.map((ri, index) => (
                        <option value={ri} key={index}>
                          {ri}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup
                      label="Non Religious Identification ---------"
                      style={{ fontSize: "15px", fontWeight: "500" }}
                    >
                      {NON_RELIGIOUS_IDENTIFICATIONS.map((nri, index) => (
                        <option value={nri} key={index}>
                          {nri}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup
                      label="Other option ---------"
                      style={{ fontSize: "15px", fontWeight: "500" }}
                    >
                      <option value={"Not to disclose"}>
                        {"Not to disclose"}
                      </option>
                    </optgroup>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.religion?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Nationality <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Select
                    {...register("nationality")}
                    defaultValue={"IND"}
                    className="form-control"
                  >
                    {nationalities &&
                      nationalities.map(
                        ({ nationality, alpha_3_code }, index) => (
                          <option key={index} value={alpha_3_code}>
                            {nationality}
                          </option>
                        )
                      )}
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.nationality?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Aadhar Number <Span className="required">*</Span>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="aadhar_number"
                    render={() => (
                      <InputMask
                        className="form-control"
                        placeholder="XXXX XXXX XXXX"
                        mask="9999 9999 9999"
                        maskChar={" "}
                        onChange={(e) => {
                          setValue("aadhar_number", e.target.value);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.aadhar_number?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center">
                    PAN Number
                    <Span className="required">
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={popover}
                      >
                        <i
                          className="uil uil-exclamation-circle ms-1"
                          style={{ lineHeight: "1", fontSize: "18px" }}
                        ></i>
                      </OverlayTrigger>
                    </Span>
                  </Form.Label>
                  <Form.Control {...register("pan_number")} placeholder="" />
                  <ErrorMsg errorMessage={errors.pan_number?.message} />
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Passport Number</Form.Label>
                  <Form.Control placeholder="" {...register("passport_num")} />
                  <ErrorMsg errorMessage={errors.passport_num?.message} />
                </Form.Group> */}
              </Col>
              <SubTitle className="mt-5" title="Present Address" />
              <Col xs={12} className="form-grid ems-form mt-2">
                <Form.Group>
                  <Form.Label>
                    Address line 1 <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control {...register("pre_address1")} placeholder="" />
                  <ErrorMsg errorMessage={errors.pre_address1?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Address line 2</Form.Label>
                  <Form.Control {...register("pre_address2")} placeholder="" />
                  <ErrorMsg errorMessage={errors.pre_address2?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Zip Code <Span className="required">*</Span>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="pre_zipcode"
                    className="form-control"
                    render={() => (
                      <InputMask
                        className="form-control"
                        mask="999999"
                        value={presentzipcode}
                        maskChar={" "}
                        onChange={(e) => {
                          let val = e.target.value?.trim()
                            ? e.target.value.trim()
                            : "";
                          if (val.length === 6) {
                            findAddress(val, "pre_zipcode");
                          }
                          setpresentzipcode(val);
                          // setValue("pre_zipcode", e.target.value);
                          // setpresentzipcode(e.target.value);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.pre_zipcode?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City <Span className="required">*</Span>
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
                  <ErrorMsg errorMessage={errors.pre_city?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Country <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    value={pincodeData.Country}
                    {...register("pre_country")}
                    placeholder=""
                  />
                  <ErrorMsg errorMessage={errors.pre_country?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    value={pincodeData.State}
                    {...register("pre_state")}
                    placeholder=""
                  />
                  <ErrorMsg errorMessage={errors.pre_state?.message} />
                </Form.Group>
              </Col>
              <Col xs={12} className="mt-5">
                <Form.Group>
                  <Box className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register("present_and_permanent_addres_same")}
                      id="present_and_permanent_addres_same"
                      onChange={(e) => {
                        setChecked(e.target.checked);
                        setValue(
                          "present_and_permanent_addres_same",
                          e.target.checked
                        );
                      }}
                    />
                    <Label
                      className="form-check-label f-16 mb-0"
                      for="present_and_permanent_addres_same"
                    >
                      Present and Permanent address are same
                    </Label>
                  </Box>
                </Form.Group>
              </Col>

              <SubTitle className="mt-5" title="Permanent Address" />
              <Col xs={12} className="form-grid ems-form mt-2">
                <Form.Group>
                  <Form.Label>
                    Address line 1 <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control {...register("address1")} placeholder="" />
                  <ErrorMsg errorMessage={errors.address1?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Address line 2</Form.Label>
                  <Form.Control {...register("address2")} placeholder="" />
                  <ErrorMsg errorMessage={errors.address2?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Zip Code <Span className="required">*</Span>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="zipcode"
                    render={() => (
                      <InputMask
                        className="form-control"
                        mask="999999"
                        value={zipcode}
                        maskChar={" "}
                        onChange={(e) => {
                          let val = e.target.value?.trim()
                            ? e.target.value.trim()
                            : "";
                          if (val.length === 6) {
                            findAddress(val, "zipcode");
                          }
                          setzipcode(val);
                          // setValue("zipcode", e.target.value);
                          // setzipcode(e.target.value);
                        }}
                      />
                    )}
                  />
                  <ErrorMsg errorMessage={errors.zipcode?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    City <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    value={
                      pincodeData1.Block === "NA"
                        ? pincodeData1.Name
                        : pincodeData1.Block
                    }
                    {...register("city")}
                    placeholder=""
                  />
                  <ErrorMsg errorMessage={errors.city?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Country <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    value={pincodeData1.Country}
                    {...register("country")}
                    placeholder=""
                  />
                  <ErrorMsg errorMessage={errors.country?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    State <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    value={pincodeData1.State}
                    {...register("state")}
                    placeholder=""
                  />
                  <ErrorMsg errorMessage={errors.state?.message} />
                </Form.Group>
              </Col>
              <Col xs={12} className="form-grid ems-form mt-5">
                {ac(
                  userRoles,
                  "Change date of joining",
                  loggeduseremail,
                  admins
                ) && (
                    <Form.Group className="position-relative">
                      <Form.Label>Date of joining</Form.Label>
                      <Form.Control
                        className="form-control"
                        {...register("joined_date")}
                        type="date"
                        pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                        name="joined_date"
                        onChange={(e) => {
                          setDOJ(e.target.valueAsDate);
                        }}
                      />
                      <ErrorMsg errorMessage={errors.joined_date?.message} />
                    </Form.Group>
                  )}
                {ac(
                  userRoles,
                  "Change designation & department",
                  loggeduseremail,
                  admins
                ) && (
                    <Form.Group>
                      <Form.Label>Department</Form.Label>
                      <Select
                        {...register("department")}
                        menuPlacement="top"
                        closeMenuOnSelect={true}
                        value={department}
                        onChange={(e) => {
                          setDepartment(e);
                          setDepartmentId(e.value);
                          setValue("department", e.value);
                          getRmanagers(e.value);
                        }}
                        noOptionsMessage={() => "No departments found!"}
                        options={departments.map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }))}
                      />
                      <ErrorMsg errorMessage={errors.department?.message} />
                    </Form.Group>
                  )}
                {/* {ac(userRoles, "Change designation & department", loggeduseremail, admins) && (
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      {...register("department")}
                      className="form-control"
                      onChange={(e) => {
                        setDepartmentId(e.target.value);
                      }}
                    >
                      <option value={"null"}>Select Department</option>
                      {departments &&
                        departments.map(({ id, name }, index) => (
                          <option key={index} value={id}>
                            {name}
                          </option>
                        ))}
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.department?.message} />
                  </Form.Group>
                )} */}
                {ac(
                  userRoles,
                  "Change designation & department",
                  loggeduseremail,
                  admins
                ) && (
                    <Form.Group>
                      <Form.Label>Designation</Form.Label>
                      <Select
                        {...register("designation")}
                        menuPlacement="top"
                        closeMenuOnSelect={true}
                        value={designation}
                        isDisabled={departmentId == null}
                        onChange={(e) => {
                          setDesignation(e);
                          setValue("designation", e.value);
                        }}
                        noOptionsMessage={() => "No designations found!"}
                        options={designations.filter(x => x.department?.id == departmentId).map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }))}
                      />
                      <ErrorMsg errorMessage={errors.department?.message} />
                    </Form.Group>
                  )}
                {ac(
                  userRoles,
                  "Change as reporting manager",
                  loggeduseremail,
                  admins
                ) && (
                    <Form.Group>
                      <Form.Label>
                        Is Reporting Manager <Span className="required">*</Span>
                      </Form.Label>
                      <Form.Select
                        {...register("is_reporting_manager")}
                        className="form-control"
                      >
                        <option value={"flase"}>Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                      <ErrorMsg
                        errorMessage={errors.is_reporting_manager?.message}
                      />
                    </Form.Group>
                  )}
                {ac(userRoles, "Change report to", loggeduseremail, admins) && (
                  <Form.Group>
                    <Form.Label>Report to</Form.Label>
                    <Select
                      {...register("supervisor")}
                      menuPlacement="top"
                      closeMenuOnSelect={true}
                      value={superv}
                      isDisabled={departmentId == null}
                      onChange={(e) => {
                        setSuperv(e);
                        setValue("supervisor", e.value);
                      }}
                      noOptionsMessage={() => "No supervisors found!"}
                      options={rms}
                    />
                    {/* <Form.Select
                      {...register("supervisor")}
                      className="form-control"
                    >
                      <option value={"null"}>Select Reports to</option>
                      {rms &&
                        rms.map(({ id, work_email }, index) => (
                          <option key={index} value={id}>
                            {work_email}
                          </option>
                        ))}
                    </Form.Select> */}
                    <ErrorMsg errorMessage={errors.supervisor?.message} />
                  </Form.Group>
                )}
                {ac(userRoles, "Assign roles", loggeduseremail, admins) && (
                  <Form.Group>
                    <Form.Label>Employee Roles</Form.Label>
                    <Select
                      menuPlacement="top"
                      closeMenuOnSelect={false}
                      isMulti
                      value={selectedRoles}
                      onChange={setselectedRoles}
                      options={roles}
                      noOptionsMessage={() => "No roles found!"}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Container>
        </DataSetContainer>
        <Container>
          <Stack
            direction="horizontal"
            className="pt-3 mt-1 justify-content-end"
          >
            <Button
              type="submit"
              disabled={submitting}
              variant="save"
              className="save"
            >
              <SaveIcon className="me-2" />
              {submitting ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlineDark"
              onClick={() => setAddNewEmployee(false)}
              className="delete"
            >
              <CloseIcon className="me-2" />
              Discard
            </Button>
          </Stack>
        </Container>
      </Form>
    </>
  );
}

export default AddNewEmployee;
