import React, { useState, useEffect, useRef } from "react";
import { Form, OverlayTrigger, Popover, Button } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import InputMask from "react-input-mask";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import moment from "moment";
import {
  changeDateFormat,
  getAge,
  getCountry,
  isValidDate,
  getNationality,
  PROBATION_STATUSES,
  NON_RELIGIOUS_IDENTIFICATIONS,
  RELIGIOUS_IDENTIFICATIONS,
  ac,
} from "../../../lib/helpers";
import { employeeSchema } from "../../../lib/yupHelpers";
import { nationalities } from "../../../lib/nationalities";
import SaveIcon from "../../Icons/SaveIcon";
import EditIcon from "../../Icons/EditIcon";
import CloseIcon from "../../Icons/CloseIcon";
import Select from "react-select";
import Span from "../../Shared/Span";
import Label from "../../Shared/Label";
import Box from "../../Shared/Box";
import SubTitle from "../../Shared/SubTitle";
import ErrorMsg from "../../Shared/ErrorMsg";
import Divider from "../../Shared/Divider";
import dynamic from "next/dynamic";
const Pincode = dynamic(() => import("react-pincode"), {
  ssr: false,
});

employeeSchema["probation"] = yup
  .string()
  .required()
  .isValidEnum(
    ["Active", "Completion", "Extension", "Pre-Confirmation"],
    "Probation"
  )
  .label("Probation");

const schema = yup.object().shape(employeeSchema);

function EmployeeBasicDetail(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    roles,
    userRoles,
    loggeduseremail,
    admins,
    designations,
    departments,
    user,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm({ resolver: yupResolver(schema) });
  const formRef = useRef(null);
  const [DOB, setDOB] = useState(null);
  const [age, setAge] = useState(null);
  const [DOJ, setDOJ] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [aadhaarNumber, setaadhaarNumber] = useState("");
  const [preZipcode, setpreZipcode] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [workPhone, setworkPhone] = useState("");
  const [aadharNumberMask, setAadharNumberMask] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [selectedRoles, setselectedRoles] = useState(null);
  const [checkRoles, setcheckRoles] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [superv, setSuperv] = useState("");

  const [pincodeData, setPincodeData] = useState("");
  const [pincodeData1, setPincodeData1] = useState("");
  const [rms, setRms] = useState("");

  useEffect(() => {
    setAge(DOB ? moment().diff(moment(DOB, "DD-MMM-YYYY"), "years") : "");
  }, [DOB]);

  const [showBasicDetail, setShowBasicDetail] = useState(false);
  const onShowBasicDetail = () => {
    setShowBasicDetail(true);
  };

  const viewRoles = (roless) => {
    if (typeof roless == "object" && roless?.length > 0) {
      return roless.map((x) => x.name).join(", ");
    } else {
      return "No roles assigned yet";
    }
  };

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
    setzipCode(pincodeData.Pincode);
  }, [isChecked]);

  useEffect(() => {
    // console.log("se", selectedEmployee, user)
    if (selectedEmployee && typeof selectedEmployee === "object") {
      let empRoles = selectedEmployee?.user?.roles;
      setselectedRoles([]);
      if (typeof empRoles === "object" && empRoles.length > 0) {
        setselectedRoles(
          empRoles.map((x) => {
            return { label: x.name, value: x.id };
          })
        );
        setcheckRoles(
          empRoles.map((x) => {
            return { label: x.name, value: x.id };
          })
        );
      }

      setDepartmentId(selectedEmployee?.department?.id);

      for (const property in selectedEmployee) {
        if (schema._nodes.includes(property)) {
          let value = selectedEmployee[property];
          value = typeof value === "string" ? value.trim() : value;
          if (property === "is_reporting_manager") {
            setValue(
              property,
              typeof value === "boolean" && value ? "true" : "false"
            );
          } else if (property === "supervisor") {
            setValue(
              property,
              value && typeof value === "object" ? value.id : "null"
            );
          } else {
            setValue(property, value);
          }

          if (property === "birthday" && isValidDate(value)) {
            setDOB(new Date(value));
          } else if (property === "joined_date" && isValidDate(value)) {
            setDOJ(new Date(value));
          } else if (property === "pre_zipcode") {
            setpreZipcode(value);
            setValue("pre_zipcode", value);
          } else if (property === "zipcode") {
            setzipCode(value);
            setValue("zipcode", value);
          }
          // else if (property === 'country') {
          //     setCountry(value);
          // } else if (property === 'state') {
          //     setRegion(value);
          // } else if (property === 'pre_country') {
          //     setpresentCountry(value);
          // } else if (property === 'pre_state') {
          //     setpresentRegion(value);
          // }
          else if (property === "work_phone") {
            setworkPhone(value);
          } else if (property === "height") {
            setHeight(value);
          } else if (property === "weight") {
            setWeight(value);
          } else if (property === "aadhar_number") {
            setaadhaarNumber(value);
          } else if (property === "supervisor") {
            setValue(
              property,
              value && typeof value === "object" ? value.id : "null"
            );
            setSuperv([]);
            if (typeof selectedEmployee?.supervisor === "object") {
              let dep = {};
              dep.label = selectedEmployee?.supervisor?.work_email;
              dep.value = selectedEmployee?.supervisor?.id;
              setSuperv(dep);
            }
          } else if (property === "department") {
            setValue(
              property,
              value && typeof value === "object" ? value.id : "null"
            );
            setDepartment([]);
            if (typeof selectedEmployee?.department === "object") {
              let dep = {};
              dep.label = selectedEmployee?.department?.name;
              dep.value = selectedEmployee?.department?.id;
              setDepartment(dep);
            }
            getRmanagers(selectedEmployee?.department?.id);
          } else if (property === "designation") {
            setValue(
              property,
              value && typeof value === "object" ? value.id : "null"
            );
            setDesignation([]);
            if (typeof selectedEmployee?.designation === "object") {
              let des = {};
              des.label = selectedEmployee?.designation?.name;
              des.value = selectedEmployee?.designation?.id;
              setDesignation(des);
            }
          }
        }
      }
    }
  }, [selectedEmployee]);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>PAN number should be submitted with in 7 days</Popover.Body>
    </Popover>
  );
  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const findAddress = (arg, name) => {
    if (arg.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${arg}`)
        .then((res) => {
          let data = res.data[0].PostOffice[0];
          if (name === "pre_zipcode") {
            setpreZipcode(data.Pincode);
            setValue("pre_zipcode", data.Pincode);
            setValue("pre_city", data.Block === "NA" ? data.Name : data.Block);
            setValue("pre_country", data.Country);
            setValue("pre_state", data.State);
            data ? setPincodeData(data) : setPincodeData("");
          } else {
            setzipCode(data.Pincode);
            setValue("zipcode", data.Pincode);
            setValue("city", data.Block === "NA" ? data.Name : data.Block);
            setValue("country", data.Country);
            setValue("state", data.State);
            data ? setPincodeData1(data) : setPincodeData1("");
          }
        })
        .catch((err) => {
          console.log(err);
          notify({ success: false, message: "Enter a valid pincode" });
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
          const transformed = response.data?.data?.Rmanager?.map(
            ({ id, work_email }) => ({
              value: id,
              label: work_email,
            })
          );
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
    data["selectedRoles"] = selectedRoles;

    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
      if (
        property == "selectedRoles" &&
        selectedRoles.length == 0 &&
        checkRoles.length == 0
      ) {
        data[property] = null;
      }
    }

    let config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let endpoint = getAbsoluteURL(
      `controllers/employees?id=${selectedEmployee.id}`
    );
    setSubmitting(true);
    axios
      .put(endpoint, data, config)
      .then((response) => {
        setSubmitting(false);
        if (response.data.code === 200) {
          employeeUpdated(response.data.data);
        }
        notify({
          success: response.data.code === 200,
          message: response.data.message,
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
    <Box>
      <Box
        className={`employee-info  xEr1-vh ${showBasicDetail ? "remove" : ""}`}
      >
        <Box className="edit-info">
          <Span
            isClick={() => {
              if (
                ac(userRoles, "Update employees", loggeduseremail, admins) ||
                user.employee.employee_id === selectedEmployee.employee_id
              ) {
                onShowBasicDetail();
              } else {
                notify({
                  success: false,
                  message: "You dont't have permission",
                });
              }
            }}
            className="square_wrapper edit me-2"
          >
            <EditIcon />
          </Span>
        </Box>
        <Box className="employee_Data_Record_Container grid">
          <Box>
            <Label>Name</Label>
            <h6>
              {selectedEmployee.first_name ? selectedEmployee.first_name : "-"}{" "}
              {selectedEmployee.last_name}
            </h6>
          </Box>
          <Box>
            <Label>Phone Number</Label>
            <h6>
              {selectedEmployee.work_phone ? selectedEmployee.work_phone : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Email</Label>
            <h6>
              {selectedEmployee.work_email ? selectedEmployee.work_email : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Gender</Label>
            <h6>{selectedEmployee.gender ? selectedEmployee.gender : "-"}</h6>
          </Box>
          <Box>
            <Label>Date of Birth</Label>
            <h6>{changeDateFormat(selectedEmployee.birthday)}</h6>
          </Box>
          <Box>
            <Label>Age</Label>
            <h6>
              {getAge(selectedEmployee.birthday)
                ? getAge(selectedEmployee.birthday)
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Nationality</Label>
            <h6>
              {getNationality(selectedEmployee.nationality)?.nationality
                ? getNationality(selectedEmployee.nationality)?.nationality
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Religion</Label>
            <h6>
              {selectedEmployee.religion ? selectedEmployee.religion : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Marital Status</Label>
            <h6>
              {selectedEmployee.marital_status
                ? selectedEmployee.marital_status
                : "-"}
            </h6>
          </Box>
          {/* <Box>
            <Label>Passport No</Label>
            <h6>
              {selectedEmployee.passport_num
                ? selectedEmployee.passport_num
                : "-"}
            </h6>
          </Box> */}
          <Box>
            <Label>PAN Number</Label>
            <h6>
              {selectedEmployee.pan_number ? selectedEmployee.pan_number : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Aadhar Number</Label>
            <h6>
              {selectedEmployee.aadhar_number
                ? selectedEmployee.aadhar_number
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Weight (Kg)</Label>
            <h6>{selectedEmployee.weight ? selectedEmployee.weight : "-"}</h6>
          </Box>
          <Box>
            <Label>Height (CM)</Label>
            <h6>{selectedEmployee.height ? selectedEmployee.height : "-"}</h6>
          </Box>
        </Box>
        <Divider />
        <SubTitle className="mt-4 f-500 mb-4" title="Present Address" />
        <Box className="employee_Data_Record_Container grid mt-3">
          <Box>
            <Label>Address Line 1</Label>
            <h6>
              {selectedEmployee.pre_address1
                ? selectedEmployee.pre_address1
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Address Line 2</Label>
            <h6>
              {selectedEmployee.pre_address2
                ? selectedEmployee.pre_address2
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>City </Label>
            <h6>
              {selectedEmployee.pre_city ? selectedEmployee.pre_city : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Region</Label>
            <h6>
              {selectedEmployee.pre_state ? selectedEmployee.pre_state : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Zipcode</Label>
            <h6>
              {selectedEmployee.pre_zipcode
                ? selectedEmployee.pre_zipcode
                : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Country</Label>
            <h6>{getCountry(selectedEmployee.pre_country)?.name}</h6>
          </Box>
        </Box>
        <Divider />
        <SubTitle className="mt-4 f-500 mb-4" title="Permanent Address" />
        <Box className="employee_Data_Record_Container grid mt-3">
          <Box>
            <Label>Address Line 1</Label>
            <h6>
              {selectedEmployee.address1 ? selectedEmployee.address1 : "-"}
            </h6>
          </Box>
          <Box>
            <Label>Address Line 2</Label>
            <h6>
              {selectedEmployee.address2 ? selectedEmployee.address2 : "-"}
            </h6>
          </Box>
          <Box>
            <Label>City</Label>
            <h6>{selectedEmployee.city ? selectedEmployee.city : "-"}</h6>
          </Box>
          <Box>
            <Label>Region</Label>
            <h6>{selectedEmployee.state ? selectedEmployee.state : "-"}</h6>
          </Box>
          <Box>
            <Label>Zipcode</Label>
            <h6>{selectedEmployee.zipcode ? selectedEmployee.zipcode : "-"}</h6>
          </Box>
          <Box>
            <Label>Country</Label>
            <h6>{getCountry(selectedEmployee.country, "code")?.name}</h6>
          </Box>
        </Box>
        <Divider />
        <Box className="employee_Data_Record_Container grid mt-4">
          {/* {ac(
            userRoles,
            "Change probation status",
            loggeduseremail,
            admins
          ) && ( */}
          <Box>
            <Label>Probation</Label>
            <h6>{selectedEmployee.probation}</h6>
          </Box>
          {/* // )} */}
          <Box>
            <Label>Date Of Join</Label>
            <h6>
              {isValidDate(selectedEmployee.joined_date)
                ? changeDateFormat(selectedEmployee.joined_date)
                : "Not assigned"}
            </h6>
          </Box>
          <Box>
            <Label>Department</Label>
            <h6>{selectedEmployee?.department?.name ? selectedEmployee?.department?.name : 'Not assigned'}</h6>
          </Box>
          <Box>
            <Label>Designation</Label>
            <h6>{selectedEmployee?.designation?.name ? selectedEmployee?.designation?.name : 'Not assigned'}</h6>
          </Box>
          {/* {ac(userRoles, "Assign roles", loggeduseremail, admins) && ( */}
          <Box>
            <Label>Employee Roles</Label>
            <h6>{viewRoles(selectedEmployee?.user?.roles)}</h6>
          </Box>
          {/* // )} */}
        </Box>
      </Box>
      <Form
        onSubmit={handleSubmit(onSubmitHandler)}
        ref={formRef}
        className={`edit-form-wrapper  ${showBasicDetail ? "show" : ""}`}
      >
        <Box className="xEr1-vh xs">

          <Form.Label>Note: Please enter name as per Aadhaar</Form.Label>

          <Box className="form-grid ems-form mb-5">
            <Form.Group>
              <Form.Label>
                First Name <Span className="required">*</Span>
              </Form.Label>
              <Form.Control {...register("first_name")} className="required" />
              <ErrorMsg errorMessage={errors.first_name?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control {...register("middle_name")} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Last Name <Span className="required">*</Span>
              </Form.Label>
              <Form.Control {...register("last_name")} />
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
                    value={workPhone}
                    onChange={(phone, data, event, formattedValue) => {
                      setworkPhone(formattedValue);
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
                readOnly
                defaultValue={selectedEmployee.work_email}
                {...register("work_email")}
              />
              {/* <Form.Control {...register("work_email")} placeholder="email" /> */}
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
                <Form.Label>
                  Age <Span className="required">*</Span>
                </Form.Label>
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
                    value={height}
                    mask="999"
                    onChange={(e) => {
                      let val = e.target.value?.trim()
                        ? e.target.value.trim()
                        : "";
                      setHeight(val);
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
                    value={weight}
                    mask="999"
                    onChange={(e) => {
                      let val = e.target.value?.trim()
                        ? e.target.value.trim()
                        : "";
                      setWeight(val);
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
              <Form.Select {...register("religion")} className="form-control">
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
                  nationalities.map(({ nationality, alpha_3_code }, index) => (
                    <option key={index} value={alpha_3_code}>
                      {nationality}
                    </option>
                  ))}
              </Form.Select>
              <ErrorMsg errorMessage={errors.nationality?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Aadhaar Number <Span className="required">*</Span>
              </Form.Label>
              <Controller
                control={control}
                name="aadhar_number"
                render={() => (
                  <InputMask
                    className="form-control"
                    value={aadhaarNumber}
                    placeholder="XXXX XXXX XXXX"
                    mask={aadharNumberMask}
                    maskChar={" "}
                    onChange={(e) => {
                      setAadharNumberMask("9999 9999 9999");
                      let val = e.target.value?.trim()
                        ? e.target.value.trim()
                        : "";
                      if (val == "") {
                        setAadharNumberMask("");
                        val = "************";
                      }
                      setaadhaarNumber(val);
                      setValue("aadhar_number", val);
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
          </Box>
          <h6>Present Address</h6>
          <Box className="form-grid ems-form mt-3  mb-5">
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
                render={() => (
                  <InputMask
                    className="form-control"
                    value={preZipcode}
                    mask="999999"
                    maskChar={" "}
                    onChange={(e) => {
                      let val = e.target.value?.trim()
                        ? e.target.value.trim()
                        : "";
                      // setValue("pre_zipcode", val)
                      if (val.length === 6) {
                        findAddress(val, "pre_zipcode");
                      }
                      setpreZipcode(val);
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
          </Box>
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
                className="form-check-label f-16 mb-0 text-dark"
                for="present_and_permanent_addres_same"
              >
                Present and Permanent address are same
              </Label>
            </Box>
          </Form.Group>

          <h6 className="mt-5">Permanent Address</h6>
          <Box className="form-grid ems-form mt-3">
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
                    value={zipCode}
                    mask="999999"
                    maskChar={" "}
                    onChange={(e) => {
                      let val = e.target.value?.trim()
                        ? e.target.value.trim()
                        : "";
                      if (val.length === 6) {
                        findAddress(val, "zipcode");
                      }
                      setzipCode(val);
                      // setValue("zipcode", val)
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
          </Box>
          <Box className="form-grid ems-form mt-5">
            {ac(
              userRoles,
              "Change probation status",
              loggeduseremail,
              admins
            ) && (
                <Form.Group>
                  <Form.Label>Probation</Form.Label>
                  <Form.Select
                    {...register("probation")}
                    className="form-control"
                  >
                    <option value={"null"}>Select probation type</option>
                    {PROBATION_STATUSES &&
                      PROBATION_STATUSES.map(({ status }, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.probation?.message} />
                </Form.Group>
              )}
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
                  <ErrorMsg errorMessage={errors.designation?.message} />
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
                    <option value={"null"}>Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.is_reporting_manager?.message} />
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
                                    <option value={'null'}>Select Reporting Manager</option>
                                    {rms && rms.map(({ id, work_email }, index) => (
                                        (id != selectedEmployee.id) ?
                                            <option key={index} value={id}>{work_email}</option>
                                            : null
                                    ))}
                                </Form.Select> */}
                <ErrorMsg errorMessage={errors.supervisor?.message} />
              </Form.Group>
            )}
            {ac(userRoles, "Assign roles", loggeduseremail, admins) && (
              <Form.Group>
                <Form.Label>EmployeeRoles</Form.Label>
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
          </Box>
        </Box>
        <Box className="d-flex justify-content-end mt-4">
          <Button variant="save" type="submit" className="square_wrapper save">
            {submitting ? <Loader /> : <SaveIcon />}
          </Button>
          <Button
            variant="delete"
            className="square_wrapper delete ms-1"
            onClick={() => setShowBasicDetail(false)}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

export default EmployeeBasicDetail;
