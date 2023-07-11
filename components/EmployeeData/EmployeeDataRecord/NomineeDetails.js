import React, { useState, useRef, useEffect } from "react";

import {
  Form,
  Modal,
  Button,
  Container,
  Table
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import moment from "moment";
import { changeDateFormat, isValidDate, ac } from "../../../lib/helpers";
import { nomineedetailsSchema } from "../../../lib/yupHelpers";
import SaveIcon from "../../Icons/SaveIcon";
import AddIcon from "../../Icons/AddIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";
import Box from "../../Shared/Box";
import Span from "../../Shared/Span";
import EditIcon from "../../Icons/EditIcon";
import ErrorMsg from "../../Shared/ErrorMsg";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";
import SliderIcon from "../../Icons/SliderIcon";
import P from "../../Shared/P";

const schema = yup.object().shape(nomineedetailsSchema);

function NomineeDetail(props) {
  const { selectedEmployee, accesstoken, employeeUpdated, notify,userRoles,
    loggeduseremail,
    admins,
    user
  } = props;

  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const values = watch();

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(() => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);

  const dpRef = useRef();

  const [showNomineeDetail, setShowNomineeDetail] = useState(false);
  const [nomineeDetails, setnomineeDetails] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [nomineeDetailId, setnomineeDetailId] = useState(false);
  const [toFormat] = useState("DD-MMM-YYYY");
  const [show, setShow] = useState({});

  useEffect(() => {
    console.log("se",selectedEmployee);
    setnomineeDetails(
      typeof selectedEmployee.nominee_details == "object"
        ? selectedEmployee.nominee_details
        : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    let nomineeDetail = nomineeDetailId
      ? nomineeDetails.find((x) => x.id == nomineeDetailId)
      : false;
    if (nomineeDetail) {
      for (const property in nomineeDetail) {
        if (schema._nodes.includes(property)) {
          if (["date_start", "date_end"].includes(property)) {
            nomineeDetail[property] = isValidDate(nomineeDetail[property])
              ? changeDateFormat(nomineeDetail[property], toFormat)
              : changeDateFormat(moment(), toFormat);
          }
          setValue(property, nomineeDetail[property]);
        }
      }
    }
  }, [nomineeDetailId]);

  useEffect(() => {
    dpRef.current?.setStartDate(values.date_start);
    dpRef.current?.setEndDate(values.date_end);
  }, [values]);

  const handleShow = (type) => {
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: true }));
    }, 100);
  };

  const handleClose = (type) => {
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: false }));
    }, 100);
  };

  const onshowNomineeDetail = (id = null) => {
    setShowNomineeDetail(true);
    if (id) {
      setnomineeDetailId(id);
    } else {
      reset();
    }
  };

  const onCloseNomineeDetail = () => {
    setShowNomineeDetail(false);
    setnomineeDetailId(false);
    reset();
    setSubmitting(false);
  };

  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const onSubmitHandler = (data) => {

    for (const property in data) {
      console.log("ddd", property, data[property]);
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }

    data["employee"] = selectedEmployee.id;

    let endpoint = getAbsoluteURL("controllers/nomineedetails");

    if (nomineeDetailId) endpoint = `${endpoint}?id=${nomineeDetailId}`;

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: nomineeDetailId ? "PUT" : "POST",
          url: endpoint,
          data: data,
        },
        config
      )
    )
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        if (response.data.code === 200) {
          if (nomineeDetailId) {
            let nomineeDetailIndex = nomineeDetails.findIndex(
              (x) => x.id == nomineeDetailId
            );
            nomineeDetails[nomineeDetailIndex] = response.data.data;
            setnomineeDetails([]);
          } else {
            nomineeDetails.unshift(response.data.data);
          }
          setTimeout(() => {
            setnomineeDetails([...nomineeDetails]);
          }, 100);
          onCloseNomineeDetail();
        }
        setSubmitting(false);
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

  const closeDeleteEhModal = () => {
    handleClose("delete_emp_nominee_detail");
    setnomineeDetailId(false);
    setSubmitting(false);
  };

  const deleteEh = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/nomineedetails?id=${nomineeDetailId}&emp=${selectedEmployee.id}`
    );
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: "DELETE",
          url: endpoint,
        },
        config
      )
    )
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        if (response.data.code === 200) {
          let nomineeDetailIndex = nomineeDetails.findIndex(
            (x) => x.id == nomineeDetailId
          );
          if (nomineeDetailIndex > -1) {
            nomineeDetails.splice(nomineeDetailIndex, 1);
          }
          // setnomineeDetails([]);
          selectedEmployee.nominee_details = nomineeDetails;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setnomineeDetails([...nomineeDetails]);
          }, 100);
          closeDeleteEhModal();
        }
        setSubmitting(false);
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
      <Table
        className={`ems-table ${showNomineeDetail ? "remove" : ""}`}
        size="lg"
      >
        {nomineeDetails && nomineeDetails?.length > 0 ? (
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>District</th>
              <th>Dispensary</th>
              <th>Phone</th>
              <th>Relationship</th>
              <th></th>
            </tr>
            
          </thead>
        ) : ("")}
        <tbody>
          {nomineeDetails && nomineeDetails?.length > 0 ? (
            nomineeDetails.map(
              (
                {
                  id,
                  name,
                  state,
                  district,
                  address_pincode,
                  phone,
                  relationship,
                },
                index
              ) => (
                <tr key={index}>
                  <td data-label="Name">{name}</td>
                  <td data-label="State">{state}</td>
                  <td data-label="District">{district}</td>
                  <td data-label="Address">{address_pincode}</td>
                  <td data-label="Phone">{phone}</td>
                  <td data-label="Relationship">{relationship}</td>
                  <td>
                    <Span className="d-flex justify-content-end">
                      <Span
                        className="square_wrapper edit"
                        isClick={() => {
                          if(ac(userRoles,"update nomiee details",loggeduseremail,admins) ||  (user.employee.employee_id === selectedEmployee.employee_id)){
                            onshowNomineeDetail(id)
                          }
                          else{notify({success: false, message:"you don't have permission",});}
                          }}
                            >
                        <EditIcon />
                      </Span>
                      <Span
                        isClick={() => {
                          handleShow("delete_emp_nominee_detail");
                          setnomineeDetailId(id);
                        }}
                        className="square_wrapper delete  ms-2"
                      >
                        <DeleteIcon />
                      </Span>
                    </Span>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="no-hover">
              <td colSpan={6} style={{ textAlign: "center" }}>
                {/* <Span className='profile-bg'>
                  <P className='text-center my-0 border-top border-bottom py-1 f-15'> */}
                    Click &nbsp;
                    <Span isClick={() => {
                      if (ac(userRoles, "Create nominee details ", loggeduseremail, admins)
                        || (user.employee.employee_id === selectedEmployee. employee_id)
                      ) {
                        onshowNomineeDetail()
                      }
                      else {
                        notify({
                          success: false, message: 'You dont\'t have permission'
                        })
                      }
                    }}><AddIcon /></Span> To Add NomineeDetails
                    {/* </P>
                </Span> */}
              </td>
            </tr>
          )}
          {nomineeDetails && nomineeDetails?.length > 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                <Button style={{ height: 35, width: 180, background: "white" }} onClick={() =>
                  onshowNomineeDetail()}>
                  <span style={{ color: "black" }}> Add Nominee Details </span>
                </Button>
              </td>
            </tr>)}

        </tbody>
      </Table>


      <Form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`edit-form-wrapper  ${showNomineeDetail ? "show" : ""}`}
      >
        <Box className="form-grid ems-form">
          <Form.Group>
            <Form.Label>
              Name <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("name")} placeholder="" />
            <ErrorMsg errorMessage={errors.name?.message} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              State <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("state")} placeoholder="" />
            <ErrorMsg errorMessage={errors.state?.message} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              District <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("district")} placeholder="" />
            <ErrorMsg errorMessage={errors.district?.message} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Address with pincode <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("address_pincode")} placeholder="" />
            <ErrorMsg errorMessage={errors.address_pincode?.message} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Phone <Span className="required">*</Span>
            </Form.Label>
            <PhoneInput
              country={"in"}
              value={values.phone}
              onChange={(fone) => {
                setValue("phone", fone);
              }}
            />
            <ErrorMsg errorMessage={errors.phone?.message} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Relationship <Span className="required">*</Span>
            </Form.Label>
            <Form.Select {...register("relationship")} className="form-control">
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Guardian">Guardian</option>
              <option value="Grandfather">Grandfather</option>
              <option value="Grandmother">Grandmother</option>
            </Form.Select>
            <ErrorMsg errorMessage={errors.relationship?.message} />
          </Form.Group>
        </Box>

        <Box className="d-flex justify-content-end mt-4">
          <Button
            variant="save"
            disabled={submitting}
            type="submit"
            className="square_wrapper save"
          >
            {submitting ? <Loader /> : <SaveIcon />}
          </Button>
          <Button
            variant="delete"
            className="square_wrapper delete ms-1"
            onClick={() => setShowNomineeDetail(false)}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Form>

      {/* Nominee Detail delete Right Modal */}
      <Modal
        show={show.delete_emp_nominee_detail}
        onHide={closeDeleteEhModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete nominee details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected nominee detail record?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteEh}
              onClose={closeDeleteEhModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default NomineeDetail;
