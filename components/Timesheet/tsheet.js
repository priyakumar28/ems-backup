import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Badge,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Meta from "../Meta";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import SearchIcon from "../Icons/SearchIcon";
import EyeIcon from "../Icons/EyeIcon";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { employeetimeentrySchema } from "../../lib/yupHelpers";
import { changeDateFormat, timesheetStatusColors } from "../../lib/helpers";
import axios from "axios";
import Divider from "../Shared/Divider";
import SliderIcon from "../Icons/SliderIcon";
import FetchingWrapper from "../Shared/FetchingWrapper";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import Calendar from "./Calendar";
const moment = require("moment");

const schema = yup.object().shape(employeetimeentrySchema);
function Tsheet(props) {
  const calendarRef = React.createRef();
  const {
    accesstoken,
    notify,
    userAvailable
  } = props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    register,
    handleSubmit,
  } = useForm();
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState(false);
  const [fetchingprojects, setfetchingprojects] = useState([]);
  const [projectId, SetProjectID] = useState(false)
  const [projectEmployees, setProjectEmployees] = useState([])
  const [projectEmployees1, setProjectEmployees1] = useState([])
  const [employees, setEmployees] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState(false);
  const [fetchingemployeetimeentries, setfetchingEmployeeTimeEntries] = useState(false);
  const [selectedEmployeeTimeEntry, setSelectedEmployeeTimeEntry] = useState(false);
  const [viewETdetails, setViewETdetails] = useState(false);
  const viewETdetailsShow = () => setViewETdetails(true);
  const viewETdetailsClose = () => setViewETdetails(false);
  const [showSaveTimeEntries, setShowSaveTimeEntries] = useState(false);
  const [emptimesheets, setEmployeeTimesheet] = useState(false);
  const [fetchingtimesheets, setFetchingTimesheets] = useState(false);
  const [fetchingemployees, setFetchingEmployees] = useState([]);
  const [selectedtimesheet, setSelectedTimesheet] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [empId, setEmpId] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  const [tsId, setTSId] = useState(false);
  const [time_entry_date_start, setTEDS] = useState(new Date());
  const [time_entry_date_end, setTEDE] = useState(new Date());
  const [abc, setAbc] = useState(false);
  const [tsstatus, setTSStatus] = useState("Submitted");
  const [empname, setEmployeeName] = useState("");
  let a = [], b = [], c = 0;


  const getEmployees = async (id, length) => {
    setFetchingEmployees(true);
    let endpoint = getAbsoluteURL(
      `controllers/employeeprojects?projectId=${id}`
    );
    await axios.get(endpoint, config).then((response) => {
      response.data.data.map((x) => {
        if (!b.includes(x.employee.employee_id)) {
          b.push(x.employee.employee_id);
          a.push(x.employee);
        }
      }
      )
    });
    c += 1;
    if (c == length) {
      setProjectEmployees(a);
    }
    setFetchingEmployees(false);
  };

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      axios.get(endpoint, config).then((response) => {
        setEmployees(response.data.data);
      });
    } catch (err) { }
  }, []);

  useEffect(async () => {
    try {
      let pmid = userAvailable.employee.id
      let endpoint = getAbsoluteURL(`controllers/projects?pmid=${pmid}`);
      setfetchingprojects(true);
      await axios
        .get(endpoint, config)
        .then(async (response) => {
          await response.data.projectObj.data.map((x) => {
            getEmployees(x.id, response.data.projectObj.data.length);
          })
          setfetchingprojects(false);
        })
        .catch((err) => {
          setfetchingprojects(false);
        });

    } catch (err) {
      setfetchingprojects(false);
    }
  }, []);

  const onCloseCal = (props) => {
    setOpenCal(false);
  };

  const onSubmitHandler = (data) => {
    let empId = data.employee;
    let endpoint = getAbsoluteURL(
      `controllers/employeetimesheets?empId=${empId}`
    );
    setFetchingTimesheets(true);
    axios.get(endpoint, config).then((response) => {
      if (response.data.code == 200 && response.data.data.length > 0) {
        let b = response.data.data.filter((x) => x.status == tsstatus)
        if (b.length === 0) {
          notify({ success: false, message: `${tsstatus} timesheets are empty` });
        }
        else {
          notify({ success: response.data.code == 200, message: response.data.message});
        }
        setEmployeeTimesheet(b);
        setFetchingTimesheets(false);
      }
      else {
        notify({ success: false, message: "No such timesheet record(s) exist" });
        setFetchingTimesheets(false);
        setEmployeeTimesheet([]);
      }
    })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        } else {
        }
        setFetchingTimesheets(false);
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
  }

  return (
    <Box className="p-3">
      {/* {...........} */}
      <Meta />
      <Form size="large" className="search-form-wrapper" >
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
      {/* <Box className="form-grid ems-form mb-2 "> */}
      <Form onSubmit={handleSubmit(onSubmitHandler)} >
        <Row className="mb-3 align-items-end">
          <Form.Group as={Col}>
            <Form.Label>Employees</Form.Label>
            <Form.Select
              {...register("employee")}
              onChange={(e) => {
                setAbc(e.target.value)
                setEmpId(e.target.value);
              }}
              className="form-control"
            >
              <option value={false}>Select Employee</option>
              {projectEmployees && projectEmployees.map(({ id, work_email, first_name, last_name, employee_id }, index) => (
                (id != userAvailable.employee.id) ?
                  <option key={index} value={id}>{employee_id}-{first_name} {last_name}</option>
                  : null
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...register("status")}
              onChange={(e) => {
                setTSStatus(e.target.value);
              }}
              className="form-control"
            >
              <option value={'Submitted'}>Submitted</option>
              <option value={'Approved'}>Approved</option>
              <option value={'Rejected'}>Rejected</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Button
              variant="save"
              disabled={!abc}
              type="submit"
              className="save"
            >
              {submitting ? "wait..." : "View Time Sheets"}
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Col>
          <Box
            className={`table-wrapper xs-none shadow-wrapper settings ${!showGrid ? "" : "d-none"
              }`}
          >
            <Divider className="mb-0" />
            <Table>
              <thead
                className={`${emptimesheets?.length > 0 ? "" : "d-none"}${fetchingtimesheets ? "d-none" : ""
                  }`}
              >
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
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
                          {index + 1}
                        </Badge>
                      </td>
                      <td>{ts.employee.first_name} {ts.employee.last_name}</td>
                      <td>{changeDateFormat(ts.date_start, "DD-MM-YYYY")}</td>
                      <td>{changeDateFormat(ts.date_end, "DD-MM-YYYY")}</td>
                      <td>
                        <Badge
                          bg={timesheetStatusColors[ts.status]}
                          className="f-12"
                        >
                          {ts.status}
                        </Badge>
                      </td>
                      <td>
                        <Span
                          data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                          isClick={() => {
                            setTEDS(ts.date_start);
                            setTEDE(ts.date_end);
                            setTSId(ts.id);
                            setSelectedTimesheet(ts);
                            setEmployeeName(ts.employee.first_name + " " + ts.employee.last_name)
                            setOpenCal(true);
                          }}

                          className="square_wrapper edit ms-1"
                        >
                          <EyeIcon />
                        </Span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoResultsWrapper
                    title="No timesheets Found!"
                    subtitle={`Select employee,status and click on View Time Sheets`}
                  />
                )}
              </tbody>
            </Table>
          </Box>
        </Col>
      </Row>
      {/* {view time sheet aka calender} */}
      {
        openCal && (
          <>
            <Modal
              show={`${props ? "show fade" : "d-none"}`}
              onHide={onCloseCal}
              backdrop="static"
              animation={true}
              fullscreen={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{`Employee: ${empname}`} </Modal.Title>
              </Modal.Header>
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
                PMId={empId}
                selectedtimesheet={selectedtimesheet}
                getTimeSheets={onSubmitHandler}
                onCloseCalender={onCloseCal}
              />
            </Modal>
          </>
        )
      }
    </Box >
  );
}
export default Tsheet;