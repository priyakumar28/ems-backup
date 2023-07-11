import React, { useState, useEffect } from "react";
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
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getUniqueListBy } from "../../lib/helpers";
import CloseLgIcon from "../Icons/CloseLgIcon";
import DataSetContainer from "../Shared/DataSetContainer";
import Box from "../Shared/Box";
import SearchIcon from "../Icons/SearchIcon";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import FetchingWrapper from "../Shared/FetchingWrapper";

const schema = yup.object().shape({
  name: yup.string().required().max(100).label("Name"),
  description: yup.string().nullable().max(400).label("Description"),
});

function Educations(props) {
  const { accesstoken, addeducation, notify } = props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showSaveEducation, setShowSaveEducation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allEducations, setallEducations] = useState([]);
  const [foundEducations, setfoundEducations] = useState([]);
  const [fetchingEducations, setfetchingEducations] = useState(false);
  const [educationId, seteducationId] = useState(false);
  const [show, setShow] = useState({});

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/educations");
      setfetchingEducations(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallEducations(response.data.data);
          setfoundEducations(response.data.data);
          setfetchingEducations(false);
        })
        .catch((_error) => {
          setfetchingEducations(false);
        });
    } catch (err) {
      setfetchingEducations(false);
    }
  }, []);

  useEffect(() => {
    let education = educationId
      ? allEducations.find((x) => x.id == educationId)
      : false;
    if (education) {
      for (const property in education) {
        if (schema._nodes.includes(property)) {
          setValue(property, education[property]);
        }
      }
    }
  }, [educationId]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = allEducations.filter((education) => {
        return (
          education.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          education.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          education.description?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundEducations([...results]);
    } else {
      setfoundEducations([...allEducations]);
    }
  };

  const onOpenEducationForm = (id = null) => {
    setShowSaveEducation(true);
    if (id) {
      seteducationId(id);
    } else {
      reset();
      seteducationId(false);
    }
  };

  const onCloseEducationForm = () => {
    setShowSaveEducation(false);
    seteducationId(false);
    reset();
  };

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

  const closeDeleteCertificateModal = () => {
    handleClose("delete_education");
    seteducationId(false);
  };

  const deleteCertificate = async () => {
    let endpoint = getAbsoluteURL(`controllers/educations?id=${educationId}`);
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
          let acIndex = allEducations.findIndex((x) => x.id == educationId);
          let fcIndex = foundEducations.findIndex((x) => x.id == educationId);

          if (acIndex > -1) allEducations.splice(acIndex, 1);
          if (fcIndex > -1) foundEducations.splice(fcIndex, 1);

          setTimeout(() => {
            setallEducations([...getUniqueListBy(allEducations, "id")]);
            setfoundEducations([...getUniqueListBy(foundEducations, "id")]);
          }, 100);

          closeDeleteCertificateModal();
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

  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [addeducation]);

  const onSubmitHandler = async (data) => {
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }
    let endpoint = getAbsoluteURL("controllers/educations");
    if (educationId) {
      endpoint = `${endpoint}?id=${educationId}`;
    }
    // post data in axios

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: educationId ? "PUT" : "POST",
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
          setShowSaveEducation(false);
          if (educationId) {
            let aeducationIndex = allEducations.findIndex(
              (x) => x.id == educationId
            );
            allEducations[aeducationIndex] = response.data.data;

            let feducationIndex = foundEducations.findIndex(
              (x) => x.id == educationId
            );
            foundEducations[feducationIndex] = response.data.data;
          } else {
            allEducations.unshift(response.data.data);
            foundEducations.unshift(response.data.data);
          }
          setTimeout(() => {
            setallEducations([...getUniqueListBy(allEducations, "id")]);
            setfoundEducations([...getUniqueListBy(foundEducations, "id")]);
          }, 100);
          seteducationId(false);
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
    <div className="p-3 ">
      <Container fluid className="px-0">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <>
                <Form size="large" className="search-form-wrapper">
                  <Form.Group
                    className="mb-0 position-relative search-form"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      placeholder="Search"
                      type="search"
                      className="input"
                      onChange={filter}
                    />
                    <SearchIcon className="search-icon" />
                  </Form.Group>
                </Form>
              </>
              <span>
                <h6 className="f-16 mb-0">Educations</h6>
              </span>
              <span className="d-flex Zy49_xyt">
                <Button
                  variant="white"
                  onClick={() => onOpenEducationForm()}
                  className="ms-2 ms-md-2 border-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </Button>{" "}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={`table-wrapper xs-none  settings`}>
              <hr className="mb-0" />
              <Table>
                <thead
                  className={` ${foundEducations?.length > 0 ? "" : "d-none"}`}
                >
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {fetchingEducations ? (
                    <FetchingWrapper title="Fetching educations..." />
                  ) : foundEducations && foundEducations.length > 0 ? (
                    foundEducations.map((education, index) => (
                      <tr key={index} id={`emp_${education.id}`}>
                        <td>
                          <Badge bg="light" text="dark" className="f-12">
                            {index + 1}
                          </Badge>
                        </td>
                        <td>{education.name}</td>
                        <td>
                          {education.description ? education.description : "-"}
                        </td>
                        <td>
                          <span
                            onClick={() => onOpenEducationForm(education.id)}
                            className="square_wrapper edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-edit-3"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </span>
                          <span
                            onClick={() => {
                              seteducationId(education.id);
                              handleShow("delete_education");
                            }}
                            className="square_wrapper delete  ms-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-trash"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No Education found!"
                      subtitle="Click new button to add education"
                    />
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Add Education */}
      <div
        className={`ems_Right_Modal_Popup ${showSaveEducation ? "show fade" : ""
          }`}
      >
        <div className="ems-modal-header">
          <div className="d-flex align-items-center">
            <h6 className="m-0">Educations</h6>
          </div>
          <span className="d-flex align-items-center">
            <span className="close-modal" onClick={onCloseEducationForm}>
              <CloseLgIcon />
            </span>
          </span>
        </div>
        <Box className="p-sm-3 py-3">
          <DataSetContainer className="lg">
            <Container>
              <Form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="ems-form"
              >
                <Row className="row-gap-10 ">
                  <Form.Group>
                    <Form.Label>
                      Education Name <span className="required">*</span>
                    </Form.Label>
                    <Form.Control placeholder="" {...register("name")} />
                    <span className="error-msg">{errors.name?.message}</span>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      {...register("description")}
                      placeholder=""
                    />
                    <span className="error-msg">
                      {errors.description?.message}
                    </span>
                  </Form.Group>
                </Row>
                <Stack
                  direction="horizontal"
                  className="pt-3 justify-content-end"
                >
                  <Button
                    variant="save"
                    type="submit"
                    disabled={submitting}
                    className="save"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-save me-2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>{" "}
                    {submitting ? "Saving..." : "Save"}
                  </Button>{" "}
                  <Button variant="outlineDark" onClick={onCloseEducationForm}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x me-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>{" "}
                    Discard
                  </Button>{" "}
                </Stack>
              </Form>
            </Container>
          </DataSetContainer>
        </Box>
      </div>
      {/* End */}

      {/* Delete educations */}
      <Modal
        show={show.delete_education}
        onHide={closeDeleteCertificateModal}
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
            Are you sure want to delete the selected education?
            <Stack direction="horizontal" className="pt-3">
              <Button
                variant="delete"
                disabled={submitting}
                onClick={deleteCertificate}
                className="delete"
              >
                {" "}
                {submitting ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="outlineDark"
                onClick={closeDeleteCertificateModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x me-2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>{" "}
                Discard
              </Button>{" "}
            </Stack>
          </Container>
        </Modal.Body>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* End */}
    </div>
  );
}

export default Educations;
