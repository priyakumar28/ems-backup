import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Col,
  Container,
  Modal,
  Form,
  Row,
  Table,
  OverlayTrigger,
  Tooltip,
  Stack,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { timesheetSchema } from "../../lib/yupHelpers";
import SearchIcon from "../Icons/SearchIcon";
import Meta from "../Meta";
import Box from "../Shared/Box";
import { useForm } from "react-hook-form";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import ListViewIcon from "../Icons/ListViewIcon";
import DatePicker from "react-datepicker";
import AddIcon from "../Icons/AddIcon";
import Divider from "../Shared/Divider";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import SliderIcon from "../Icons/SliderIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import FetchingWrapper from "../Shared/FetchingWrapper";
import {
  timesheetStatusColors,
  getUniqueListBy,
  changeDateFormat,
  getWorkingHours,
  CalculateTyme,
  getBusinessDatesCount,
  ac,
} from "../../lib/helpers";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import EditIcon from "../Icons/EditIcon";
import ErrorMsg from "../Shared/ErrorMsg";
import Calendar from "./Calendar";
import EyeIcon from "../Icons/EyeIcon";
const moment = require("moment");
const schema = yup.object().shape(timesheetSchema);
function TSEmp(props) {
  const {
    accesstoken,
    userAvailable,
    userRoles,
    loggeduseremail,
    notify,
    admins,
  } = props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  ////State Variables////////////////////////
  const [alltimeentries, setAllTimeEntries] = useState([]);
  const [timesheetId, setTimesheetId] = useState(false);
  const [addeditstat, setAddEditStat] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingtimesheets, setFetchingTimesheets] = useState([]);
  const [timesheetdata, setTimesheetData] = useState(false);
  const [emptimesheets, setEmpTimesheets] = useState([]);
  const [ds1, setDS1] = useState(new Date());
  const [de1, setDE1] = useState(new Date());
  const [time_entry_date_start, setTEDS] = useState(new Date());
  const [time_entry_date_end, setTEDE] = useState(new Date());
  const [timesheetstatus, setTimeSheetStatus] = useState();
  const [ds, setDS] = useState(new Date());
  const [de, setDE] = useState(new Date());
  const [empstatus] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  const [showSaveTimesheets, setShowSaveTimeSheets] = useState(false);
  const [tsId, setTSId] = useState(false);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employeetimesheets");
      setFetchingTimesheets(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          let a = response.data.data;
          setFetchingTimesheets(false);
        })
        .catch((error) => {
          setFetchingTimesheets(false);
        });
    } catch (error) {
      setFetchingTimesheets(false);
    }
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employeetimeentry");
      axios
        .get(endpoint, config)
        .then((response) => {
          let a = response.data.data;
          let b = a.filter((x) => x.employee.work_email == userAvailable.email);
          setAllTimeEntries(b);
        })
        .catch((error) => {
          let error_msg =
            "Something went wrong while fetching the time entries";
          if (error.response) {
            error_msg = error.response.message;
          }
          notify({ success: false, message: error_msg });
        });
    } catch (error) {
      let error_msg = "Something went wrong";
      if (error.response) {
        error_msg = error.response.message;
      }
      notify({ success: false, message: error_msg });
    }
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (timesheetdata && typeof timesheetdata === "object") {
      for (const property in timesheetdata) {
        if (schema._nodes.includes(property)) {
          let value = timesheetdata[property];
          value = typeof value === "string" ? value.trim() : value;
          if (property === "date_start") {
            setDS(new Date(value));
            setValue(property, new Date(value));
          } else if (property === "date_end") {
            setDE(new Date(value));
            setValue(property, new Date(value));
          } else if (property === "status") {
            setStatus(value);
            setValue(property, value);
          } else {
            setValue(property, value);
          }
        }
      }
    }
  }, [timesheetdata]);
  const [showGrid, setShowGrid] = useState(false);
  const togglebtn = () => {
    setShowGrid(!showGrid);
  };
  const onOpenTimeSheetForm = (id = null) => {
    setShowSaveTimeSheets(true);
    if (id) {
      setTimesheetId(id);
    }
  };
  const onCloseTimeSheetForm = () => {
    setShowSaveTimeSheets(false);
    setTimesheetId(false);
    reset();
  };
  const onCloseCal = () => {
    setOpenCal(false);
  };
  const total_days = CalculateTyme(
    new Date(time_entry_date_start),
    new Date(time_entry_date_end)
  );
  const busineess_days = getBusinessDatesCount(
    new Date(time_entry_date_start),
    new Date(time_entry_date_end)
  );
  const busineess_hrs = busineess_days * 8;
  const added_hrs = alltimeentries
    .filter((x) => x.timesheet === tsId)
    .map((x) => getWorkingHours(x.time_start, x.time_end))
    .reduce((x, y) => {
      return x + y;
    }, 0);
  const completion_percentage =
    (alltimeentries
      .filter((x) => x.timesheet === tsId)
      .map((x) => getWorkingHours(x.time_start, x.time_end))
      .reduce((x, y) => {
        return x + y;
      }, 0) /
      (getBusinessDatesCount(
        new Date(time_entry_date_start),
        new Date(time_entry_date_end)
      ) *
        8)) *
    100;

  const Grid_of_Timesheets = () => {
    if (fetchingtimesheets) {
      return (
        <FetchingWrapper title="Fetching timesheets..." className="mh-60" />
      );
    } else {
      if (emptimesheets && emptimesheets.length > 0) {
        return emptimesheets.map((ts, index) => (
          <Box key={index} className="employee_Card">
            <Box>
              <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                <Box className="mb-2">
                  <Badge bg="light" text="dark" className="f-12">
                    {`${emptimesheets.length - index} `}
                  </Badge>
                </Box>
                <Box
                  className="id-id_And_Status_Container"
                  style={{ top: "15px" }}
                >
                  <Badge bg={timesheetStatusColors[ts.status]} className="f-12">
                    {ts.status}
                  </Badge>
                </Box>
              </Box>
              <Box className="mt-2 d-flex grid-c-gap align-items-center">
                <Span>
                  <p className="secondary-text-label">Start Date:</p>
                  <p className="secondary-text-label dark-text">
                    {ts.date_start}
                  </p>
                </Span>
              </Box>
              <Box className="mt-3 d-flex grid-c-gap align-items-center">
                <Span>
                  <p className="secondary-text-label">End Date:</p>
                  <p className="secondary-text-label dark-text">
                    {ts.date_end}
                  </p>
                </Span>
              </Box>
              <Box className="mt-3 d-flex grid-c-gap align-items-center">
                <Span>
                  <p className="secondary-text-label">Comments:</p>
                  <p className="secondary-text-label dark-text">
                    {ts.comments}
                  </p>
                </Span>
              </Box>
              <Box>
                <Divider className="my-2" />
                <Box className="d-flex justify-content-end pt-2 align-items-center">
                  {ac(userRoles, "Add timesheets", loggeduseremail, admins) && (
                    <Span
                      isClick={() => {
                        setTEDS(ts.date_start);
                        setTEDE(ts.date_end);
                        setTSId(ts.id);
                        setOpenCal(true);
                        setTimeSheetStatus(ts.status);
                        setTimesheetId(ts.id);
                      }}
                      className="square_wrapper edit ms-1"
                    >
                      {ts.status !== "Approved" && ts.status !== "Submitted" ? (
                        <AddIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </Span>
                  )}
                  {ac(
                    userRoles,
                    "Update timesheets",
                    loggeduseremail,
                    admins
                  ) &&
                    (ts.status != "Approved" &&
                    ts.status != "Submitted" &&
                    index === 0 ? (
                      <Span
                        isClick={() => {
                          setTimesheetData(ts);
                          setAddEditStat(false);
                          setTimesheetId(ts.id);
                          onOpenTimeSheetForm(ts.id);
                        }}
                        className="square_wrapper edit ms-1"
                      >
                        <EditIcon />
                      </Span>
                    ) : (
                      " "
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ));
      } else {
        return (
          <NoResultsWrapper
            title="No Timesheets found!"
            subtitle="Click the + button to add a timesheet"
          />
        );
      }
    }
  };
  const TimesheetSubmitButton = () => {
    if (
      timesheetstatus != "Approved" &&
      timesheetstatus != "Submitted" &&
      added_hrs >= busineess_hrs
    ) {
      return (
        <Button
          {...register("status")}
          value={empstatus}
          onClick={() => {
            onSubmitHandler({ status: "Submitted" });
          }}
        >
          Submit for approval
        </Button>
      );
    } else if (added_hrs < busineess_hrs) {
      return (
        <Button className="mx-2" disabled={true}>
          {` ${
            (Math.round(busineess_hrs - added_hrs) * 100) / 100
          } more hours to enter`}
        </Button>
      );
    } else {
      return (
        <Button className="mx-2" disabled={true}>
          {` Timesheet is ${timesheetstatus}`}
        </Button>
      );
    }
  };
  useEffect(() => {
    reset();
    setSubmitting(false);
  }, []);
  useEffect(() => {
    try {
      let empId = null;
      let endpoint = getAbsoluteURL(
        `controllers/employeetimesheets?empId=${empId}`
      );
      setFetchingTimesheets(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          let lastdate_end = moment(response.data.data[0].date_end);
          let nextdate_start = new Date(lastdate_end.add(1, "days"));
          setEmpTimesheets(response.data.data);
          setDS1(nextdate_start);
          setDE1(nextdate_start);
          setFetchingTimesheets(false);
        })
        .catch(() => {
          setFetchingTimesheets(false);
        });
    } catch (error) {
      setFetchingTimesheets(false);
    }
  }, []);
  const onSubmitHandler = async (data) => {
    data["employee"] = userAvailable.employee.id;
    let endpoint = getAbsoluteURL("controllers/employeetimesheets");
    if (timesheetId) {
      endpoint = `${endpoint}?id=${timesheetId}`;
    }
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: timesheetId ? "PUT" : "POST",
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
          if (timesheetId) {
            let fctsIndex = emptimesheets.findIndex((x) => x.id == timesheetId);
            emptimesheets[fctsIndex] = response.data.data.data;
            setDS1(
              new Date(moment(response.data.data.data.date_end).add(1, "days"))
            );
            setDE1(
              new Date(moment(response.data.data.data.date_end).add(1, "days"))
            );
          } else {
            emptimesheets.unshift(response.data.data);
            setDS1(
              new Date(moment(response.data.data.date_end).add(1, "days"))
            );
            setDE1(
              new Date(moment(response.data.data.date_end).add(1, "days"))
            );
          }
          setShowSaveTimeSheets(false);
          onCloseCal();
          setTimeout(() => {
            setEmpTimesheets([...getUniqueListBy(emptimesheets, "id")]);
          }, 100);
          setTimesheetId(false);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        let error_msg = "Something wrong in creating timesheet";
        if (error.response) {
          error_msg = error.response.data.message;
          setSubmitting(false);
          notify({ success: false, message: error_msg });
        }
      });
  };
  return (
    <Box className="p-3">
      <Meta title="TSMS-timesheets" />
      <Container fluid className="px-0">
        {/*First row*/}
        <Row>
          <Col>
            <Box className="d-flex justify-content-between align-items-center">
              <Form size="large" className="search-form-wrapper">
                <Form.Group
                  className="mb-0 position-relative search-form"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    placeholder="Search"
                    type="search"
                    className="input"
                  />
                  <SearchIcon className="search-icon" />
                </Form.Group>
              </Form>
              <Span>
                <SubTitle title="Timesheets" />
              </Span>
              <Span className="d-flex Zy49_xyt">
                <Button
                  variant="white"
                  className="px-2 svg d-r-none"
                  style={{ lineHeight: "1" }}
                  onClick={togglebtn}
                >
                  <Span className={` ${!showGrid ? "" : " d-none"}`}>
                    <GridViewIcon />
                  </Span>
                  <Span className={` list-view ${!showGrid ? "" : " d-block"}`}>
                    <ListViewIcon />
                  </Span>
                </Button>
                <OverlayTrigger
                  trigger="hover"
                  placement="left"
                  overlay={
                    <Tooltip id="button-tooltip">Add a new timesheet</Tooltip>
                  }
                >
                  <Button
                    variant="bottom"
                    className="ms-0"
                    onClick={() => {
                      reset();
                      setAddEditStat(true);
                      onOpenTimeSheetForm();
                    }}
                  >
                    {" "}
                    <AddIcon />
                  </Button>
                </OverlayTrigger>
              </Span>
            </Box>
          </Col>
        </Row>
        {/*Next rows*/}
        <Row>
          <Col>
            <Box
              className={`table-wrapper xs-none shadow-wrapper settings ${
                !showGrid ? "" : "d-none"
              }`}
            >
              <Divider className="mb-0" />
              <Table>
                <thead
                  className={`${emptimesheets?.length > 0 ? "" : "d-none"} ${
                    fetchingtimesheets ? "d-none" : ""
                  }`}
                >
                  <tr>
                    <th>#</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comments</th>
                    <th>Status</th>
                    <th>
                      <SliderIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchingtimesheets ? (
                    <FetchingWrapper
                      title="Fetching timesheets for"
                      className="mh-60"
                    />
                  ) : emptimesheets && emptimesheets.length > 0 ? (
                    emptimesheets.map((ts, index) => (
                      <tr key={index} id={`timesheet_${ts.id}`}>
                        <td>
                          <Badge bg="light" text="dark" className="f-12">
                            {ts.id}
                          </Badge>
                        </td>{" "}
                        <td>{changeDateFormat(ts.date_start, "DD-MM-YYYY")}</td>
                        <td>{changeDateFormat(ts.date_end, "DD-MM-YYYY")}</td>
                        <td>{ts.comments ? <>ts.comments</> : <>_</>}</td>
                        <td>
                          <Badge
                            bg={timesheetStatusColors[ts.status]}
                            className="f-12"
                          >
                            {ts.status}
                          </Badge>
                        </td>
                        <td>
                          {
                            <Span
                              isClick={() => {
                                setTEDS(ts.date_start);
                                setTEDE(ts.date_end);
                                setTSId(ts.id);
                                setOpenCal(true);
                                setTimeSheetStatus(ts.status);
                                setTimesheetId(ts.id);
                              }}
                              className="square_wrapper edit ms-1"
                            >
                              {ts.status !== "Approved" &&
                              ts.status !== "Submitted" ? (
                                <AddIcon />
                              ) : (
                                <EyeIcon />
                              )}
                            </Span>
                          }
                          {ts.status != "Approved" &&
                          ts.status != "Submitted" &&
                          index === 0 ? (
                            <Span
                              isClick={() => {
                                setAddEditStat(false);
                                setTimesheetData(ts);
                                setTimesheetId(ts.id);
                                onOpenTimeSheetForm(ts.id);
                              }}
                              className="square_wrapper edit ms-1"
                            >
                              <EditIcon />
                            </Span>
                          ) : (
                            " "
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No timesheets Found!"
                      subtitle={`Click the + button to add a new timesheet`}
                    />
                  )}
                </tbody>
              </Table>
            </Box>
          </Col>
        </Row>
      </Container>
      <Box
        style={{ display: "none" }}
        className={`mt-3 responsive-view ${!showGrid ? "" : " d-block"}`}
      >
        <Box
          className={`employee_Card_Container row-gap-15 mt-5 position-relative ${
            emptimesheets?.length > 0 ? "" : "grid-remover-class"
          }${fetchingtimesheets ? "grid-remover-class" : ""}}`}
        >
          <Grid_of_Timesheets />
        </Box>
      </Box>
      {/*Calendar stuff*/}
      {openCal && (
        <Container>
          <Modal
            show={`${props ? "show fade" : "d-none"}`}
            onHide={onCloseCal}
            backdrop="static"
            animation={true}
            fullscreen={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {/* View and Add Timesheets<br/> */}
                <Badge
                  bg={timesheetStatusColors[timesheetstatus]}
                  className="f-12 mx-2"
                >
                  {timesheetstatus}
                </Badge>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {timesheetstatus != "Approved" &&
              timesheetstatus != "Submitted" ? (
                <Stack
                  direction="horizontal"
                  style={{ alignItems: "flex-start" }}
                  className="timesheet-info mx-2"
                >
                  <Box>
                    <p>
                      {`Total days: ${total_days}`}
                      <br />
                      {`Business days: ${busineess_days}`}
                    </p>
                  </Box>
                  <Box>
                    <p>
                      {`Business hours: ${busineess_hrs}`}
                      <br />
                      {` Added hours: ${Math.round(added_hrs * 100) / 100}`}
                    </p>
                  </Box>
                  {added_hrs <= busineess_hrs ? (
                    <Box>
                      <span disabled={true} onClick={() => alert("clicked")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          style={{ transform: "translateY(-1px)" }}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-info"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>{" "}
                        {`${
                          (Math.round(busineess_hrs - added_hrs) * 100) / 100
                        } more hours to enter`}
                      </span>
                    </Box>
                  ) : null}
                  {added_hrs >= busineess_hrs ? (
                    <Button
                      className="ms-auto"
                      {...register("status")}
                      value={empstatus}
                      onClick={(e) => {
                        onSubmitHandler({ status: "Submitted" });
                      }}
                    >
                      Submit for approval
                    </Button>
                  ) : null}
                </Stack>
              ) : (
                <Box>
                  <Stack>
                    <Badge
                      bg={timesheetStatusColors[timesheetstatus]}
                      className="f-12 mx-2"
                    >
                      {timesheetstatus}
                    </Badge>
                    <Badge bg="dark" className="f-12 mx-2">
                      {`Total days: ${total_days}`}
                    </Badge>
                    <Badge bg="dark" className="f-12 mx-2">
                      {`Business days: ${busineess_days}`}
                    </Badge>
                    <Badge bg="dark" className="f-12 mx-2">
                      {`Business hours: ${busineess_hrs}`}
                    </Badge>
                    <Badge bg="dark" className="f-12 mx-2">
                      {` Added hours:
                    ${Math.round(added_hrs * 100) / 100}`}
                    </Badge>
                    {timesheetstatus != "Approved" &&
                    timesheetstatus != "Submitted" &&
                    added_hrs >= busineess_hrs ? (
                      <Button
                        className="mx-2"
                        onClick={(e) =>
                          onSubmitHandler({ status: "Submitted" })
                        }
                      >
                        {" "}
                        Submit for approval
                      </Button>
                    ) : (
                      <Button
                        className="mx-2"
                        disabled={true}
                        onClick={() => alert("clicked")}
                      >
                        {" "}
                        Timesheet is {timesheetstatus}
                      </Button>
                    )}
                  </Stack>
                </Box>
              )}
              <Calendar
                {...props}
                time_entry_date_start={new Date(time_entry_date_start)
                  .toISOString()
                  .slice(0, 10)}
                time_entry_date_end={new Date(
                  moment(time_entry_date_end).add(2, "days")
                )
                  .toISOString()
                  .slice(0, 10)}
                timesheetId={tsId}
                timesheetstatus={timesheetstatus}
              />
            </Modal.Body>
          </Modal>
        </Container>
      )}
      {/*Calendar stuff end */}
      {/*adding new stuff*/}
      <Modal
        show={`${showSaveTimesheets ? "show fade" : ""}`}
        onHide={onCloseTimeSheetForm}
        backdrop="static"
        animation={true}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Starting date</Form.Label>
                    <DatePicker
                      placeholderText="MM-DD-YYYY"
                      selected={addeditstat ? ds1 : ds}
                      disabled={!addeditstat}
                      className="form-control"
                      onSelect={(date) => {
                        setDS(date);
                        setDS1(date);
                        setValue("date_start", new Date(date));
                      }}
                      dateFormat="dd-MMM-yyyy"
                      includeDates={addeditstat && [new Date(ds1)]}
                    />
                    <ErrorMsg errorMessage={errors.date_start?.message} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ending date</Form.Label>
                    <DatePicker
                      placeholderText="MM-DD-YYYY"
                      selected={addeditstat ? de1 : de}
                      className="form-control"
                      onSelect={(date) => {
                        setDE(date);
                        setDE1(date);
                        setValue("date_end", date ? new Date(date) : de1);
                      }}
                      dateFormat="dd-MMM-yyyy"
                      minDate={
                        addeditstat ? moment(de1).toDate() : moment(ds).toDate()
                      }
                    />
                    <ErrorMsg errorMessage={errors.date_end?.message} />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Stack
                    direction="horizontal"
                    className="mt-3 justify-content-end"
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
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button
                      variant="outlineDark"
                      onClick={onCloseTimeSheetForm}
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
                      </svg>
                      Discard
                    </Button>
                  </Stack>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
export default TSEmp;
