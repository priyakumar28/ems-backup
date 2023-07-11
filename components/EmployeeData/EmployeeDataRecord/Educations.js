import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Table,
  Badge,
  Stack,
  Modal,
  OverlayTrigger
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import axios from "axios";
import DatePicker from "react-datepicker";
import { employeeEducationSchema } from "../../../lib/yupHelpers";
import { changeDateFormat, isValidDate, ac, capitalizeFirstLetter } from "../../../lib/helpers";
import SaveIcon from "../../Icons/SaveIcon";
import AddIcon from "../../Icons/AddIcon";
import EditIcon from "../../Icons/EditIcon";
import EyeIcon from "../../Icons/EyeIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";
import DownloadIcon from "../../Icons/DownloadIcon";
import { FileIcon, defaultStyles } from "react-file-icon";
// import EyeIcon from "../../Icons/EyeIcon";
import Span from "../../Shared/Span";
import Box from "../../Shared/Box";
import Label from "../../Shared/Label";
import SubTitle from "../../Shared/SubTitle";
import ErrorMsg from "../../Shared/ErrorMsg";
import P from "../../Shared/P";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";
import NoResultsWrapper from "../../Shared/NoResultsWrapper";
import SliderIcon from "../../Icons/SliderIcon";
import MailIcon from "../../Icons/MailIcon";

const schema = yup.object().shape(employeeEducationSchema);

function Educations(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    userRoles,
    loggeduseremail,
    admins,
    user,
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
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const values = watch();

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch((_value, { _name, _type }) => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);

  const [showEmpEducation, setShowEmpEducation] = useState(false);
  const [empEducations, setempEducations] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittingtwo, setSubmittingtwo] = useState(false);
  const [educationId, seteducationId] = useState(false);
  const [show, setShow] = useState({});
  // const [docfetch, setDocfetch] = useState(false);
  const [selectededucation, setSelectededucation] = useState(false);
  const [saved, setSaved] = useState(true);
  const [removefile, setRemovefile] = useState(null);
  const [selectedDocument, setselectedDocument] = useState(false);
  useEffect(() => {
    setempEducations(
      typeof selectedEmployee.educations == "object"
        ? selectedEmployee.educations
        : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    let td = educationId
      ? empEducations.find((x) => x.id == educationId)
      : false;
    if (td) {
      let assocs = ["trainingsession"];
      for (const property in td) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, td[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, td[property]);
        }
      }
    }
  }, [educationId]);

  useEffect(() => {
    setselectedDocument(
      removefile ? selectededucation.attachment?.find((x) => x.id == removefile) : false
    );
  }, [removefile]);

  const initialFormData = Object.freeze({
    attachment: null
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const baseName = (str) => {
    if (typeof str !== "string") return;
    let frags = str.trim().split(".");
    return frags
      .splice(0, frags.length - 1)
      .join(".")
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s{2,}/g, " ");
  };

  const fileExt = (filename) => {
    return filename?.split(".")?.pop()?.toLowerCase();
  };
  
  const handleShow = (type) => {
    // if (type == "add_documents") {
    //   setDocfetch(true);
    // }
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: true }));
    }, 100);
  };

  const closeAddDocumentsModal = () => {
    handleClose("add_documents");
    // setDocfetch(false);
    setSelectededucation(false);
    seteducationId(false);
  };

  const handleClose = (type) => {
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: false }));
    }, 100);
  };

  const onShowEmpEducation = (id = null) => {
    setShowEmpEducation(true);
    if (id) {
      seteducationId(id);
    } else {
      reset();
    }
  };

  const onCloseEmpEducation = () => {
    setShowEmpEducation(false);
    seteducationId(false);
    reset();
  };

  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const closeDeleteEducationModal = () => {
    handleClose("delete_emp_education");
    seteducationId(false);
  };
  const closeDeleteDocumentModal = () => {
    handleClose("delete_document");
    setSubmitting(false);
  };


  const handledocuments = (data) => {
    const formDataa = new FormData();
    if (removefile) {
      formDataa.append('removeFile', removefile);
    }
    else {
      for (const property in data) {
        if (data[property] == "null") data[property] = null;
        if (typeof data[property] == "string" && data[property]?.trim() == "")
          data[property] = null;
        if (data[property]) {
          if (property != 'attachment') {
            formDataa.append(property, data[property]);
          }
        }
      }



      if (formData.attachment) {
        formDataa.delete('attachment');
        for (let index = 0; index < formData.attachment.length; index++) {
          formDataa.append(formData.attachment[index].name, formData.attachment[index]);
        }
      }
    }


    formDataa.append('employee', selectedEmployee.id);
    setSubmittingtwo(true);
    let endpoint = getAbsoluteURL(`controllers/employeeeducations?id=${selectededucation.id}`);
    axios(
      Object.assign(
        {
          method: "PUT",
          url: endpoint,
          data: formDataa,
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
          if (educationId) {
            let tdIndex = empEducations.findIndex((x) => x.id == educationId);
            empEducations[tdIndex] = response.data.data;
            setSelectededucation(response.data.data);
            setempEducations([]);
          }
          setempEducations([...empEducations]);
          setValue("attachment", null);
          // onCloseEmpEducation();
          closeDeleteDocumentModal();
          updateFormData(initialFormData);
        }
        setSubmittingtwo(false);
        // setSubmitting(false);
        setRemovefile(false);
      })
      .catch((error) => {
        setRemovefile(false);
        console.log(error);
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmittingtwo(false);
        // setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
    updateFormData({ ...initialFormData });
  }

  const deletedocuments = () => {
    const formDataa = new FormData();
    if (removefile) {
      formDataa.append('removeFile', removefile);
    }
    formDataa.append('employee', selectedEmployee.id);
    setSubmittingtwo(true);
    let endpoint = getAbsoluteURL(`controllers/employeeeducations?id=${selectededucation.id}`);
    axios(
      Object.assign(
        {
          method: "PUT",
          url: endpoint,
          data: formDataa,
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
          if (educationId) {
            let tdIndex = empEducations.findIndex((x) => x.id == educationId);
            empEducations[tdIndex] = response.data.data;
            setSelectededucation(response.data.data);
            setempEducations([]);
          }
          setempEducations([...empEducations]);
          closeDeleteDocumentModal();
        }
        setSubmittingtwo(false);
        setRemovefile(false);
      })
      .catch((error) => {
        setRemovefile(false);
        console.log(error);
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmittingtwo(false);
        notify({ success: false, message: error_msg });
      });
    updateFormData({ ...initialFormData });
  }

  const onSubmitHandler = (data) => {
    const formDataa = new FormData();
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
      if (data[property]) {
        formDataa.append(property, data[property]);
      }
    }

    formDataa.append('employee', selectedEmployee.id);
    let endpoint = getAbsoluteURL("controllers/employeeeducations");

    if (educationId) endpoint = `${endpoint}?id=${educationId}`;

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: educationId ? "PUT" : "POST",
          url: endpoint,
          data: formDataa,
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
          if (educationId) {
            let tdIndex = empEducations.findIndex((x) => x.id == educationId);
            empEducations[tdIndex] = response.data.data;
            setSelectededucation(response.data.data);
            setempEducations([]);
          } else {
            empEducations.unshift(response.data.data);
          }
          setempEducations([...empEducations]);
          onCloseEmpEducation();
          updateFormData(initialFormData);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
    updateFormData({ ...initialFormData });
  };

  const deleteEducation = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeeeducations?id=${educationId}&emp=${selectedEmployee.id}`
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
          let ehIndex = empEducations.findIndex((x) => x.id == educationId);
          if (ehIndex > -1) {
            empEducations.splice(ehIndex, 1);
          }
          setempEducations([]);
          selectedEmployee.educations = empEducations;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setempEducations([...empEducations]);
          }, 100);
          closeDeleteEducationModal();
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.response);
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
      <Box className="position-relative">
        <Box className={`timeline_wrapper ${showEmpEducation ? "remove" : ""}`}>
          <Box className="add-info"></Box>
          <VerticalTimeline
            className={`timeline_wrapper ${empEducations?.length > 0 ? "" : "remove-before"
              }`}
          >
            {empEducations && empEducations?.length > 0 ? (
              empEducations.map(
                (
                  empeducation,
                  _index
                  // { id, education_name, institute, date_start, date_end }
                ) => (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={`${changeDateFormat(
                      empeducation.date_start,
                      "MMM-YYYY"
                    )} - ${changeDateFormat(empeducation.date_end, "MMM-YYYY")}`}
                    iconStyle={{ background: "rgb(80 110 228)", color: "#fff" }}
                  >
                    <Box className="timeline-action">
                      <Span
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Update educations",
                              loggeduseremail,
                              admins
                            )
                            || (user.employee.employee_id === selectedEmployee.employee_id)
                          ) {
                            onShowEmpEducation(empeducation.id);
                          } else {
                            notify({
                              success: false,
                              message: "You dont't have permission",
                            });
                          }
                        }}
                        className="square_wrapper edit"
                      >
                        <EditIcon />
                      </Span>
                      <Span
                        className="square_wrapper delete ms-1"
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Delete educations",
                              loggeduseremail,
                              admins
                            ) || (user.employee.employee_id === selectedEmployee.employee_id)
                          ) {
                            handleShow("delete_emp_education");
                            seteducationId(empeducation.id);
                          } else {
                            notify({
                              success: false,
                              message: "You dont't have permission",
                            });
                          }
                        }}
                      >
                        <DeleteIcon />
                      </Span>
                     
                    </Box>
                    <Label>Name</Label>
                    <SubTitle
                      className="vertical-timeline-element-subtitle mb-1 mt-0"
                      title={empeducation.education_name}
                    />
                    <P className="mt-3 mb-2">{empeducation.institute}</P>
                    <Span isClick={() => {
                      seteducationId(empeducation.id);
                      setSelectededucation(empeducation);
                      handleShow("add_documents");
                    }}><a href="#">Upload/View Documents</a></Span>
                  </VerticalTimelineElement>
                )
              )
            ) : (
              <Span className="profile-bg">
                <P className="text-center my-0 border-top border-bottom py-1 f-15">
                  Click &nbsp;
                  <Span
                    isClick={() => {
                      if (
                        ac(
                          userRoles,
                          "Create educations",
                          loggeduseremail,
                          admins
                        ) || (user.employee.employee_id === selectedEmployee.employee_id)
                      ) {
                        onShowEmpEducation();
                      } else {
                        notify({
                          success: false,
                          message: "You dont't have permission",
                        });
                      }
                    }}
                  >
                    <AddIcon />
                  </Span> To Add Educations
                </P>
              </Span>
            )}
            {empEducations && empEducations?.length > 0 && (
              <tr className="no-hover">
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Button style={{ height: 35, width: 145, background: "white" }} onClick={() =>
                    onShowEmpEducation()}>
                    <span style={{ color: "black" }}> Add Educations </span>
                  </Button>
                </td>
              </tr>
            )}
          </VerticalTimeline>
        </Box>
        <Form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={`edit-form-wrapper pt-2 ${showEmpEducation ? "show" : ""}`}
        >
          <Box className="form-grid ems-form">
            <Form.Group>
              <Form.Label>
                Education name <Span className="required">*</Span>
              </Form.Label>
              <Form.Control {...register("education_name")} />
              <ErrorMsg errorMessage={errors.education_name?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Institute <Span className="required">*</Span>
              </Form.Label>
              <Form.Control {...register("institute")} />
              <ErrorMsg errorMessage={errors.institute?.message} />
            </Form.Group>
            <Form.Group
              className="position-relative flex-2"
              style={{ background: "transparent" }}
            >
              <Form.Label>Start date </Form.Label>
              <Span className="required">*</Span>
              <DatePicker
                selected={
                  isValidDate(values.date_start)
                    ? new Date(values.date_start)
                    : ""
                }
                className="form-control"
                onChange={(date) => {
                  setValue("date_start", new Date(date));
                }}
                dateFormat="dd-MMM-yyyy"
              />
              <ErrorMsg errorMessage={errors.date_start?.message} />
            </Form.Group>
            <Form.Group
              className="position-relative flex-2"
              style={{ background: "transparent" }}
            >
              <Form.Label>End date </Form.Label>
              <Span className="required">*</Span>
              <DatePicker
                selected={
                  isValidDate(values.date_end) ? new Date(values.date_end) : ""
                }
                className="form-control"
                onChange={(date) => {
                  setValue("date_end", new Date(date));
                }}
                dateFormat="dd-MMM-yyyy"
              />
              <ErrorMsg errorMessage={errors.date_end?.message} />
            </Form.Group>
          </Box>
          <Box className="d-flex justify-content-end mt-4">
            <Button
              variant="save"
              type="submit"
              className="square_wrapper save"
            >
              {submitting ? <Loader /> : <SaveIcon />}
            </Button>
            <Button
              variant="delete"
              className="square_wrapper delete ms-1"
              onClick={onCloseEmpEducation}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Form>
      </Box>

      {/* Education delete Right Modal */}
      <Modal
        show={show.delete_emp_education}
        onHide={closeDeleteEducationModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected education record?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteEducation}
              onClose={closeDeleteEducationModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}

      {/* Add documents */}
      <Modal
        show={show.add_documents}
        onHide={closeAddDocumentsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit(handledocuments)} className="ems-form">
              <Row>
                <Col md={12} className="form-grid mt-2">

                  <Form.Group className="position-relative">
                    <Form.Label>Select documents</Form.Label>
                    <Form.Control {...register('attachment')} className='form-control' accept='image/jpg' multiple={true} type="file" onChange={(e) => {
                      updateFormData({
                        attachment: e.target.files
                      });
                      setSaved(false);
                    }} />
                    {/* )} */}
                    <ErrorMsg errorMessage={errors.attachment?.message} />
                  </Form.Group>
                </Col>
              </Row>
              <Stack
                direction="horizontal"
                className="pt-3 justify-content-end"
              >
                <Button
                  variant="save"
                  type="submit"
                  disabled={saved}
                  className="save"
                >
                  <SaveIcon className="me-2" />{" "}
                  {submittingtwo ? "Saving..." : "Save"}
                </Button>{" "}
                <Button variant="outlineDark" onClick={closeAddDocumentsModal}>
                  <CloseIcon className="me-2" /> Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
          <Container>
          <Box
            className={`mt-3 employee_Data_Record_Container documents`}
            style={{ marginBottom: "5px" }}
          >
            
            {selectededucation?.attachment?.length > 0 ?
              (selectededucation?.attachment?.map(
                (
                  { id,name, date_added, attachment },
                  index
                ) => (
                  <Box key={index} className="position-relative">
                    <Box title={capitalizeFirstLetter(baseName(name))} className="doc-upload">
                      <label className="d-block">{capitalizeFirstLetter(baseName(name))}</label>
                      <FileIcon
                        extension={fileExt(name)}
                        {...defaultStyles[fileExt(name)]}
                        style={{ width: "150px" }}
                      />
                      <Box className="document-action-wrapper">
                        <a href={attachment} download={name}>
                          <Span className="action-wrapper">
                            <DownloadIcon />
                          </Span>
                        </a>
                        <Span
                          className="square_wrapper delete ms-1"
                          isClick={() => {
                            setRemovefile(id);
                            handleShow("delete_document")
                          }}
                        >
                          <DeleteIcon />
                        </Span>
                      </Box>
                    </Box>
                  </Box>
                )
              )): (<NoResultsWrapper
              title="No documents found!"
              subtitle="Add documents "
            />)}
          </Box>
          </Container>
          {/* Document delete Right Modal */}
          <Modal
            show={show.delete_document}
            onHide={closeDeleteDocumentModal}
            backdrop="static"
            animation={true}
            fullscreen={true}
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                Are you sure want to delete {baseName(selectedDocument.name)}?
                <DeleteAndDiscard isSubmitting={submittingtwo} onDelete={deletedocuments} onClose={closeDeleteDocumentModal} />
              </Container>
            </Modal.Body>
          </Modal>
          {/* End */}

        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default Educations;


































































// {
//   selectededucation?.attachment?.length > 0 ? (<Table>
//     <thead
//     // className={` ${empEducations?.length > 0 ? "" : "d-none"} ${empEducations ? "d-none" : ""
//     //   }`}
//     >
//       <tr>
//         <th>Id</th>
//         <th>Name</th>
//         <th>Email</th>
//         <th>
//           <SliderIcon />
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {selectededucation.attachment?.map((rm, index) =>
//         <tr key={index} id={`rm_${rm.id}`}>
//           <td>
//             {rm.id}
//           </td>
//           <td>{rm.name ? rm.name : "-"}</td>
//           <td>
//             <Span>
//               <Box className="position-relative">
//                 <OverlayTrigger
//                   trigger={["hover", "focus"]}
//                   placement="auto"
//                 >
//                   <Span
//                     isClick={() => {

//                     }}
//                     className="circle-wrapper red"
//                   >
//                     <MailIcon />
//                   </Span>
//                 </OverlayTrigger>
//               </Box>
//             </Span>
//           </td>

//           <td>
//             <Span>
//               {/* {ac(userRoles, "Delete departments", loggeduseremail, admins) && */}
//               <Button
//                 variant="delete"
//                 onClick={(e) => {
//                   // handledoo(rm);
//                   setRemovefile(rm.name);
//                   handledocuments();
//                 }}
//                 className="delete"
//               >
//                 Delete
//               </Button>
//               {/* } */}

//             </Span>
//           </td>
//         </tr>

//       )}
//     </tbody>
//   </Table>) : (<NoResultsWrapper
//     title="No documents found!"
//     subtitle="Add documents "
//   />)
// }


















{/* <Container>
  <Form onSubmit={handleSubmit(handledocuments)} className="ems-form">
    <Row>
      <Col md={12} className="form-grid mt-2">

        <Form.Group className="position-relative">
          <Form.Label>Select documents</Form.Label>
          <Form.Control {...register('attachment')} className='form-control' accept='image/jpg' multiple={true} type="file" onChange={(e) => {
            console.log("yoyo", e.target.files);
            updateFormData({
              attachment: e.target.files
            });
            setSaved(false);
          }} />
          <ErrorMsg errorMessage={errors.attachment?.message} />
        </Form.Group>
      </Col>
    </Row>
    <Stack
      direction="horizontal"
      className="pt-3 justify-content-end"
    >
      <Button
        variant="save"
        type="submit"
        disabled={submitting || saved}
        className="save"
      >
        <SaveIcon className="me-2" />{" "}
        {submitting ? "Saving..." : "Save"}
      </Button>{" "}
      <Button variant="outlineDark" onClick={closeAddDocumentsModal}>
        <CloseIcon className="me-2" /> Discard
      </Button>{" "}
    </Stack>
  </Form>
</Container> */}
{/* <Container> */ }
{/* <Box
  className={`table-wrapper xs-none shadow-wrapper settings " d-none"`}
>
  {selectededucation?.attachment?.length > 0 ? (<Table>
    <thead
    >
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>
          <SliderIcon />
        </th>
      </tr>
    </thead>
    <tbody>
      {selectededucation.attachment?.map((rm, index) =>
        <tr key={index} id={`rm_${rm.id}`}>
          <td>
            {rm.id}
          </td>
          <td>{rm.name ? rm.name : "-"}</td>
          <td>
            <Span>
              <Box className="position-relative">
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="auto"
                >
                  <Span
                    isClick={() => {

                    }}
                    className="circle-wrapper red"
                  >
                    <MailIcon />
                  </Span>
                </OverlayTrigger>
              </Box>
            </Span>
          </td>

          <td>
            <Span>
              {/* {ac(userRoles, "Delete departments", loggeduseremail, admins) && */}
//               <Button
//                 variant="delete"
//                 onClick={(e) => {
//                   // handledoo(rm);
//                   setRemovefile(rm.name);
//                   handledocuments();
//                 }}
//                 className="delete"
//               >
//                 Delete
//               </Button>
//               {/* } */}

//             </Span>
//           </td>
//         </tr>

//       )}
//     </tbody>
//   </Table>) : (<NoResultsWrapper
//     title="No documents found!"
//     subtitle="Add documents "
//   />)}
// </Box> */}
{/* </Container> */ }