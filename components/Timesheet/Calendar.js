import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import TimePicker from "react-time-picker-input";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Meta from "../Meta";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import Label from "../Shared/Label";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { employeetimeentrySchema } from "../../lib/yupHelpers";
import {
  getUniqueListBy,
  changeDateFormat,
  getWorkingHours,
} from "../../lib/helpers";
import ErrorMsg from "../Shared/ErrorMsg";
import axios from "axios";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
import FilterIcon from "../Icons/FilterIcon";
import Divider from "../Shared/Divider";
const schema = yup.object().shape(employeetimeentrySchema);
function Calendar(props) {
  const calendarRef = React.createRef();
  const changeCalendarView = (view) => {
    setTimeout(() => {
      let calendarApi = calendarRef.current.getApi(); // linter will complain it's possibly null
      calendarApi.changeView(view); // the actual view we want
    }, 100);
  };
  const {
    accesstoken,
    addemployeetimeentry,
    notify,
    userAvailable,
    time_entry_date_start,
    time_entry_date_end,
    timesheetId,
    PMId,
    getTimeSheets,
    selectedtimesheet,
    onCloseCalender,
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
  const [show, setShow] = useState(false);
  //employeetimeentries//
  const [viewETdetails, setViewETdetails] = useState(false);
  const viewETdetailsShow = () => setViewETdetails(true);
  const viewETdetailsClose = () => setViewETdetails(false);
  const [showSaveTimeEntries, setShowSaveTimeEntries] = useState(false);
  const [allemployeetimeentries, setAllemployeetimeentries] = useState([]);
  const [showApproveTimeSheet, setShowApproveTimeSheet] = useState(false);
  const [selectedEmployeeTimeEntry, setSelectedEmployeeTimeEntry] =
    useState(false);
  const [foundemployeetimeentries, setFoundemployeetimeentries] = useState([]);
  const [employeetimeentryId, setEmployeetimeEntryId] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [time_start, setTimeStart] = useState("");
  const [time_end, setTimeEnd] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  //employeeprojects/////////////
  const [projects, setprojects] = useState([]);

  const [timesheetstatus, setTimeSheetStatus] = useState("");
  const [reason, setReason] = useState("");
  /////Opens up the form to enter new TS////////////////////
  const onOpenTimeEntryForm = (id = null) => {
    setShowSaveTimeEntries(true);
    if (id) {
      setEmployeetimeEntryId(id);
    } else {
      setEmployeetimeEntryId(false);
    }
  };
  const onCloseTimeEntryForm = () => {
    setShowSaveTimeEntries(false);
    setEmployeetimeEntryId(false);
    reset();
  };
  ////////////////////////End///////////////////////////////////
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
  /////////////////////////Opens details of the Timesheet///////////////////
  //////////////////////////////End/////////////////////////////////
  const closeDeleteEmployeeTimeentriesModal = () => {
    handleClose("delete_employeetimeentries");
    setEmployeetimeEntryId(false);
    viewETdetailsClose();
  };
  const onOpenApproveTimesheetForm = () => {
    setShowApproveTimeSheet(true);
  };
  const onCloseApproveTimesheetForm = () => {
    setShowApproveTimeSheet(false);
    reset();
  };
  //////////////////////////view all employeeprojects////////////
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employeeprojects");
      axios
        .get(endpoint, config)
        .then((response) => {
          let a = response.data.data;
          let b = a.filter(
            (x) => x.employee.work_email === userAvailable.email
          );
          setprojects(b);
        })
        .catch((err) => {
          setprojects([]);
        });
    } catch (error) {
      setprojects([]);
    }
  }, []);
  ///////////////Use effect to setValue in the forms//////////////////////
  useEffect(() => {
    if (
      selectedEmployeeTimeEntry &&
      typeof selectedEmployeeTimeEntry === "object"
    ) {
      for (const property in selectedEmployeeTimeEntry) {
        if (schema._nodes.includes(property)) {
          let value = selectedEmployeeTimeEntry[property];
          value = typeof value === "string" ? value.trim() : value;
          if (property === "time_start") {
            setTimeStart(value);
            setValue(property, value);
          } else if (property === "time_end") {
            setTimeEnd(value);
            setValue(property, value);
          } else {
            setValue(property, value);
          }
        }
      }
    }
  }, [selectedEmployeeTimeEntry]);
  ///////////////Use effect to setValue in the forms//////////////////////
  ////delete timeentry/////////////////////////
  const deleteemployeetimeentry = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeetimeentry?id=${employeetimeentryId}`
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
          let atimeIndex = allemployeetimeentries.findIndex(
            (x) => x.id == employeetimeentryId
          );
          let foundtimeentryIndex = foundemployeetimeentries.findIndex(
            (x) => x.id == employeetimeentryId
          );
          if (atimeIndex > -1) allemployeetimeentries.splice(atimeIndex, 1);
          if (foundtimeentryIndex > -1)
            foundemployeetimeentries.splice(foundtimeentryIndex, 1);
          setTimeout(() => {
            setAllemployeetimeentries([
              ...getUniqueListBy(allemployeetimeentries, "id"),
            ]);
            setFoundemployeetimeentries([
              ...getUniqueListBy(foundemployeetimeentries, "id"),
            ]);
          }, 100);
          closeDeleteEmployeeTimeentriesModal();
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
  /////////Add timeentry useeffect/////////////////////
  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [addemployeetimeentry]);
  ///////////////post and put employeetimeentry handler/////////////////////////////
  const onSubmitHandler = async (data) => {
    data["date_start"] = selectedDate;
    data["date_end"] = selectedDate;
    data["employee"] = parseInt(userAvailable.employee.id);
    data["timesheet"] = parseInt(timesheetId);
    let endpoint = getAbsoluteURL("controllers/employeetimeentry");
    if (employeetimeentryId) {
      endpoint = `${endpoint}?id=${employeetimeentryId}`;
    }
    //see how the data looks like??////
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: employeetimeentryId ? "PUT" : "POST",
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
          setShowSaveTimeEntries(false);
          if (employeetimeentryId) {
            let atimeIndex = allemployeetimeentries.findIndex(
              (a) => a.id == employeetimeentryId
            );
            allemployeetimeentries[atimeIndex] = response.data.data;
            let eventIndex = events.findIndex(
              (a) => a.id == employeetimeentryId
            );
            events[eventIndex] = response.data.data;
            let foundtimeentryIndex = foundemployeetimeentries.findIndex(
              (x) => x.id == employeetimeentryId
            );
            foundemployeetimeentries[foundtimeentryIndex] = response.data.data;
          } else {
            allemployeetimeentries.unshift(response.data.data);
            foundemployeetimeentries.unshift(response.data.data);
            events.unshift(response.data.data);
          }
          setTimeout(() => {
            setAllemployeetimeentries([
              ...getUniqueListBy(allemployeetimeentries, "id"),
            ]);
            setFoundemployeetimeentries([
              ...getUniqueListBy(foundemployeetimeentries, "id"),
            ]);
            setEvents([...getUniqueListBy(events, "id")]);
          }, 100);
          setEmployeetimeEntryId(false);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        notify({ success: false, message: error_msg });
        setSubmitting(false);
      });
  };
  ////////Fetch all employeetimeentries getAll (useEffect)///////////
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employeetimeentry");
      axios
        .get(endpoint, config)
        .then((response) => {
          let allentries = response.data.data;
          let myentries = allentries.filter(
            (x) => x.employee.work_email == userAvailable.email
          );
          setEvents(myentries);
          setAllemployeetimeentries(myentries);
          setFoundemployeetimeentries(myentries);
        })
        .catch((err) => {
        });
    } catch (error) {}
  }, []);
  //////Fetch by id and display them in the full calendar/////
  const fetchEmployeeTimeEntries = (id) => {
    try {
      let endpoint = getAbsoluteURL(`controllers/employeetimeentry?id=${id}`);
      axios
        .get(endpoint, config)
        .then((response) => {
          //this is the one////
          let kya = response.data.data;
          setSelectedDate(response.data.data.date_start);
          setSelectedEmployeeTimeEntry(kya);
          viewETdetailsShow();
        })
        .catch((error) => {
          let error_msg = "Error in fetching time entries";
          if (error.response) {
            error_msg = error?.response?.data?.message;
          }
          notify({ success: false, message: error_msg });
        });
    } catch (error) {}
  };
  ////Different views for the calendar events/////////////////////////
  const CalendarViewlist = () => {
    return (
      <Dropdown className="filter">
        <Dropdown.Toggle id="dropdown-basic" className="svg filter">
          <Span>Day</Span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#"
            onClick={() => changeCalendarView("timeGridDay")}
          >
            Day
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={() => changeCalendarView("timeGridWeek")}
          >
            Week
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={() => changeCalendarView("dayGridMonth")}
          >
            Month
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const FilterWala = () => {
    return (
      <>
        <Dropdown className="filter">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="svg filter"
          >
            <Span>
              Filter <FilterIcon />
            </Span>
            <Dropdown.Menu>
              <Dropdown.Item>All</Dropdown.Item>
              {projects &&
                projects.map((emp_project) => (
                  <Dropdown.Item
                    href="#"
                    onClick={() => {
                      onFilterChange(emp_project.id);
                    }}
                  >
                    {emp_project?.project?.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </>
    );
  };
  const Thanos = () => {
    return (
      <>
        <Badge bg={timesheetStatusColors[timesheetstatus]}>
          {timesheetstatus}
        </Badge>
      </>
    );
  };
  const StatusDropDown = () => {
    return (
      <>
        <Form.Select
          onChange={(e) => {
            setTimeSheetStatus(e.target.value);
            onOpenApproveTimesheetForm();
          }}
          aria-label="Default select example"
          defaultValue={selectedtimesheet.status}
        >
          {selectedtimesheet.status === "Submitted" && (
            <option>Approve/Reject</option>
          )}
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>
      </>
    );
  };
  ///////approvetimesheet handler////
  const TimesheetStatusChange = () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeetimesheets?id=${selectedtimesheet.id}`
    );
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: "PUT",
          url: endpoint,
          data: { status: timesheetstatus, comments: reason },
        },
        config
      )
    )
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: `Timesheet submitted`,
        });
        if (response.data.code === 200) {
          setTimeout(() => {
            getTimeSheets({ employee: selectedtimesheet.employee.id });
          }, 100);
          onCloseApproveTimesheetForm();
          onCloseCalender();
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
  const headerToolbarRight = (timesheetstatus, PMId) => {
    if (timesheetstatus != "Approved" && timesheetstatus != "Submitted") {
      return `prev,today,next,${!PMId ? "AddTS" : "ApproveTS"}`;
    } else {
      return `prev,today,next",${PMId && "ApproveTS"}`;
    }
  }
  return (
    <Box className="px-2">
      <Meta />
      <FullCalendar
        innerRef={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin, listPlugin]}
        editable={false}
        selectable={true}
        height={"auto"}
        timeZone={"ISO"}
        aspectRatio={1}
        expandRows={true}
        themeSystem="bootstrap"
        slotMinTime="8:00:00"
        slotMaxTime="22:00:00"
        initialView={PMId ? "list" : "dayGridMonth"}
        showNonCurrentDates={true}
        validRange={{
          start: time_entry_date_start,
          end: time_entry_date_end,
        }}
        weekends={true}
        customButtons={{
          AddTS: {
            text: "Add New Time Entry",
            click: () => {
              onOpenTimeEntryForm();
            },
          },
          ApproveTS: {
            text: <StatusDropDown />,
          },
          Statahs: {
            // text: `${timesheetstatus}`,
            text: <Thanos />,
          },
          calendarViewlist: {
            text: <CalendarViewlist />,
          },
          filterview: {
            text: <FilterWala />,
          },
        }}
        headerToolbar={{
          right: headerToolbarRight(timesheetstatus, PMId),
          center: `title`,
          left: `dayGridMonth,timeGridWeek,timeGridDay,listMonth`,
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
        navLinks={true}
        dayMaxEvents={2}
        eventMaxStack={2}
        navLinkDayClick={(date) => {
          if (timesheetstatus != "Approved" && timesheetstatus != "Submitted") {
            setSelectedDate(date);
            onOpenTimeEntryForm();
          } else {
            notify({
              success: false,
              message: `Cannot add or edit timeentries for ${timesheetstatus} timesheets`,
            });
          }
        }}
        dateClick={(e) => {
          let date = e.date.toISOString();
          if (timesheetstatus != "Approved" && timesheetstatus != "Submitted") {
            onOpenTimeEntryForm();
            setSelectedDate(date);
          } else {
            notify({
              success: false,
              message: `Cannot add or edit timeentries for ${timesheetstatus} timesheets`,
            });
          }
        }}
        progressiveEventRendering={true}
        eventClick={(e) => {
          let targetevent = e.event._def.publicId;
          fetchEmployeeTimeEntries(targetevent);
          setSelectedEmployeeTimeEntry(targetevent);
        }}
        nextDayThreshold="09:00:00"
        events={{
          events,
          daysOfWeek: [0, 6], //Sundays and saturdays
          rendering: "background",
          allDay: true,
          overlap: false,
        }}
        displayEventTime={true}
        displayEventEnd={true}
      />
      {/* Add Employee Time Entries */}
      <Modal
        show={`${showSaveTimeEntries ? "show fade" : ""}`}
        onHide={onCloseTimeEntryForm}
        backdrop="static"
        animation={true}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Time Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row>
                  <Box xs={12} className="form mt-0">
                    <Form.Group>
                      <Form.Label className="form mt-2">Project</Form.Label>
                      <Form.Select
                        {...register("project")}
                        className="form-control-select"
                      >
                        <option value={"null"}>Select Project</option>
                        {projects &&
                          projects.map((emp_project, index) => (
                            <option key={index} value={emp_project?.id}>
                              {emp_project?.project?.name}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="form mt-2">
                        Starting Time
                        <TimePicker
                          onChange={(newtime_start) => {
                            setValue("time_start", newtime_start);
                          }}
                          value={time_start}
                          hour12Format={true}
                          allowDelete={true}
                        />
                      </Form.Label>
                      <ErrorMsg errorMessage={errors.time_start?.message} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="form mt-2">
                        Ending Time
                        <TimePicker
                          onChange={(newtime_end) => {
                            setValue("time_end", newtime_end);
                          }}
                          value={time_end}
                          hour12Format={true}
                          allowDelete={true}
                        />
                      </Form.Label>
                      <ErrorMsg errorMessage={errors.time_end?.message} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="form mt-2">Details</Form.Label>
                      <Form.Control
                        {...register("details")}
                        className="mt-0"
                        as="textarea"
                      />
                      <ErrorMsg errorMessage={errors.details?.message} />
                    </Form.Group>
                  </Box>
                </Row>
                <Span
                  direction="horizontal"
                  className="pt-3 justify-content-end"
                >
                  <Button
                    variant="save"
                    type="submit"
                    disabled={submitting}
                    className="save mt-4"
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
                  </Button>
                  <Button
                    variant="outlineDark"
                    className="mt-4"
                    onClick={onCloseTimeEntryForm}
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
                  </Button>{" "}
                </Span>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/*View One Time Entry Details*/}
      <Modal
        show={viewETdetails}
        onHide={viewETdetailsClose}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
        style={{ width: "400px", left: "inherit", right: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${changeDateFormat(
            selectedEmployeeTimeEntry.date_start,
            "DD-MMM-YYYY"
          )}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box>
            <Row>
              <Col>
                <Row>
                  <Box
                    xs={12}
                    className={`${showSaveTimeEntries ? "d-none" : ""}`}
                  >
                    <Box>
                      <h5>{selectedEmployeeTimeEntry.projname}</h5>
                    </Box>
                    <Box>
                      <Label>
                        Started at{" "}
                        <span className="dark-text">
                          {selectedEmployeeTimeEntry.time_start}
                        </span>{" "}
                        and Ended at{" "}
                        <span className="dark-text">
                          {selectedEmployeeTimeEntry.time_end}
                        </span>{" "}
                        (
                        {Math.round(
                          getWorkingHours(time_start, time_end) * 100
                        ) / 100}{" "}
                        Hr){" "}
                      </Label>
                    </Box>
                    <Divider />
                    <Box>
                      <Label>Details</Label>
                      <p>{`${selectedEmployeeTimeEntry.details}`}</p>
                    </Box>
                    {timesheetstatus != "Approved" &&
                    timesheetstatus != "Submitted" ? (
                      <Stack
                        className="justify-content-end"
                        direction="horizontal"
                      >
                        <Span
                          isClick={() => {
                            onOpenTimeEntryForm(selectedEmployeeTimeEntry.id);
                          }}
                          className="square_wrapper edit ms-1"
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
                        </Span>
                        <Span
                          isClick={() => {
                            setEmployeetimeEntryId(
                              selectedEmployeeTimeEntry.id
                            );
                            handleShow("delete_employeetimeentries");
                          }}
                          className="square_wrapper delete ms-1"
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
                        </Span>
                      </Stack>
                    ) : (
                      ""
                    )}
                  </Box>
                </Row>
              </Col>
            </Row>
          </Box>
        </Modal.Body>
      </Modal>
      {/*View One Time Entry Details*/}
      {/*Delete time entry */}
      <Modal
        show={show.delete_employeetimeentries}
        onHide={closeDeleteEmployeeTimeentriesModal}
        backdrop="static"
        animation={true}
        fullscreen={false}
        keyboard={true}
      >
        <Modal.Body>
          <Container>
            Are you sure you want to delete this time entry?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteemployeetimeentry}
              onClose={closeDeleteEmployeeTimeentriesModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* Approve Timesheet Model */}
      <Modal
        show={`${showApproveTimeSheet ? "show fade" : ""}`}
        onHide={onCloseApproveTimesheetForm}
        backdrop="static"
        animation={true}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          {timesheetstatus === "Approved" ? (
            <Modal.Title>Approve Time Sheet</Modal.Title>
          ) : (
            <Modal.Title>Reject Time Sheet</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              {/* <Form onSubmit={handleSubmit(TimesheetStatusChange)}> */}
              <Form.Group>
                <Form.Label>Comments(If any)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  // defaultValue={selectedtimesheet.comments}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Group>
              <Span direction="horizontal" className="pt-3 justify-content-end">
                <Button
                  variant="save"
                  type="submit"
                  disabled={submitting}
                  className="save mt-4"
                  onClick={TimesheetStatusChange}
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
                </Button>
                <Button
                  variant="outlineDark"
                  className="mt-4"
                  onClick={onCloseApproveTimesheetForm}
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
                </Button>{" "}
              </Span>
              {/* </Form> */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
export default Calendar;
