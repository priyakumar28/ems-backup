import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Button,
  Form,
  Modal,
  Table,
  Badge,
  OverlayTrigger,
  Popover,
  Container,
  Stack,
  Tooltip,
  Col,
} from "react-bootstrap";
import EmployeeDataRecord from "./EmployeeDataRecord";
import AddNewEmployee from "./AddNewEmployee";
import axios from "axios";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import {
  EMPLOYEE_STATUSES,
  PROBATION_STATUSES,
  isValidDate,
  changeDateFormat,
  getHumanReadableDate,
  getStatusColor,
  getDeptName,
  getDesignName,
  ac,
  removeURLParameters,
} from "../../lib/helpers";
import GridViewIcon from "../Icons/GridViewIcon";
import ListViewIcon from "../Icons/ListViewIcon";
import FilterIcon from "../Icons/FilterIcon";
import SearchIcon from "../Icons/SearchIcon";
import SliderIcon from "../Icons/SliderIcon";
import xlsxParser from "../../lib/xlsxParser";
import Meta from "../Meta";
import DataSetContainer from "../Shared/DataSetContainer";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import FetchingWrapper from "../Shared/FetchingWrapper";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import DownArrow from "../Icons/DownArrow";
import UpArrow from "../Icons/UpArrow";
import CloseIcon from "../Icons/CloseIcon";
import UserPlusIcon from "../Icons/UserPlusIcon";
import EyeIcon from "../Icons/EyeIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import MailIcon from "../Icons/MailIcon";
import Box from "../Shared/Box";
import ReactDataTable from "../Shared/ReactDataTable";
import DownloadIcon from "../Icons/DownloadIcon";
import Span from "../Shared/Span";
import Divider from "../Shared/Divider";
import P from "../Shared/P";
import SubTitle from "../Shared/SubTitle";
import { useRouter } from "next/router";

function Employees(props) {
  const { accesstoken, notify, userRoles, userAvailable, loggeduseremail, admins } = props;

  const router = useRouter();

  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  const getStartedOn = (date) => {
    if (isValidDate(date)) {
      let readableDate = getHumanReadableDate(date);
      readableDate = readableDate == "null" ? "-" : readableDate;
      return `${changeDateFormat(date)} | ${readableDate}`;
    }
    return "Join date not added";
  };

  const phone_popover = (phno) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>{phno ? phno : "No phone added"}</Popover.Body>
      </Popover>
    );
  };

  const mail_popover = (mailid) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>{mailid ? mailid : "No mail added"}</Popover.Body>
      </Popover>
    );
  };

  const reporting_popover = (reporting_to) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>
          {reporting_to ? reporting_to : "No reporting manager assigned"}
        </Popover.Body>
      </Popover>
    );
  };

  const asset_popover = (managed_devices) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>
          {managed_devices ? (
            <Box className="d-flex flex-column">
              {managed_devices &&
                managed_devices.map((device, index) => (
                  <Box key={index}>
                    <Span>{device}</Span>
                  </Box>
                ))}
            </Box>
          ) : (
            <>{"No devices assigned"}</>
          )}
        </Popover.Body>
      </Popover>
    );
  };

  const cost_popover = (costcenter) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>{costcenter ? costcenter : "Not assigned"}</Popover.Body>
      </Popover>
    );
  };

  // the search result
  const [fetchingEmployees, setfetchingEmployees] = useState(false);
  const [fetchingEmployeesMsg, setfetchingEmployeesMsg] = useState(
    "Fetching employees..."
  );
  const [allEmployees, setallEmployees] = useState([]);
  const [rms, setRMS] = useState([]);
  const [employeeId, setemployeeId] = useState(false);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedStatus, setselectedStatus] = useState(false);
  const [selectedEmployee, setselectedEmployee] = useState(false);
  const [foundEmployees, setfoundEmployees] = useState([]);
  const [showEDR, setshowEDR] = useState(false);
  const [roles, setRoles] = useState([]);
  const [importedEmployeeErrors, setImportEmployeeErrors] = useState([]);
  const [employeelist, setEmployeelist] = useState({});
  const [show, setShow] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [longAbsenceFrom, setLongAbsenceFrom] = useState(null);
  const [longAbsenceTo, setLongAbsenceTo] = useState(null);
  const [resignedOn, setResignedOn] = useState(null);
  const [terminatedOn, setTerminatedOn] = useState(null);
  const [lastWorkingDay, setLastWorkingDay] = useState(null);
  const [probationCompletionDate, setProbationCompletionDate] = useState(null);


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
    setReason("");
    setLongAbsenceFrom(null);
    setLongAbsenceTo(null);
    setTerminatedOn(null);
    setResignedOn(null);
    setLastWorkingDay(null);
    setProbationCompletionDate(null);
    setErrors({});
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: false }));
    }, 100);
  };



  const newEmployeeAdded = (employeeObj) => {
    allEmployees.unshift(employeeObj);
    setallEmployees([...allEmployees]);
  };

  const employeeUpdated = (employeeObj) => {
    let allEmp = allEmployees;
    let foundEmp = foundEmployees;
    let aindex = allEmp.findIndex((x) => x.id == employeeObj.id);
    let findex = foundEmp.findIndex((x) => x.id == employeeObj.id);
    allEmp[aindex] = employeeObj;
    setallEmployees([...allEmp]);
    if (findex > -1) {
      foundEmp[findex] = employeeObj;
      setfoundEmployees([...foundEmp]);
    }
    if (employeeId) setselectedEmployee(Object.assign({}, employeeObj));
  };

  const changeEmployeeStatus = async () => {
    try {
      let data = {
        status: selectedStatus,
        reason: reason.trim() == "" ? null : reason.trim(),
        long_absence_from: longAbsenceFrom ? longAbsenceFrom : null,
        long_absence_to: longAbsenceTo ? longAbsenceTo : null,
        terminated_on: terminatedOn ? terminatedOn : null,
        resigned_on: resignedOn ? resignedOn : null,
        last_working_day: lastWorkingDay ? lastWorkingDay : null,
        probation_completion_date: probationCompletionDate ? probationCompletionDate : null
      };
      if (selectedStatus == "Active" && ((selectedEmployee.status == "Probation") ? (!data.reason || !data.probation_completion_date) : !data.reason)) {
        setErrors({
          change_emp_status: { message: "Reason is required" },
          change_probation_completion_date: { message: "Probation Completed Date is required" }
        });
        return;
      }
      if (selectedStatus == "Long absence" && (!data.reason || !data.long_absence_from)) {
        setErrors({
          change_emp_status: { message: "Reason is required" },
          change_long_absence_from: { message: "From Date is required" }
        });
        return;
      }
      if (selectedStatus == "Terminated" && (!data.reason || !data.terminated_on)) {
        setErrors({
          change_emp_status: { message: "Reason is required" },
          change_terminated_on: { message: "Terminated Date is required" }
        });
        return;
      }
      if (selectedStatus == "Resigned" && (!data.reason || !data.resigned_on || !data.last_working_day)) {
        setErrors({
          change_emp_status: { message: "Reason is required" },
          change_resigned_on: { message: "Resigned Date is required" },
          change_last_working_day: { message: "Last Working Day is required" }
        });
        return;
      }

      if (!data.reason) {
        setErrors({
          change_emp_status: { message: "Reason is required" }
        });
        return;
      }
      let emp = allEmployees.find((x) => x.employee_id == employeeId);
      let endpoint = getAbsoluteURL(`controllers/employees?id=${emp?.id}`);
      setSubmitting(true);
      axios
        .put(endpoint, data, config)
        .then((response) => {
          setSubmitting(false);
          if (response.data.code == 200) {
            handleClose("change_employee_status");
            employeeUpdated(response.data.data);
          }
          notify({
            success: response.data.code == 200,
            message: response.data.message,
          });
        })
        .catch((error) => {
          notify({
            success: false,
            message: error.response?.data
              ? error.response.data.message
              : "Something went wrong..........",
          });
          setSubmitting(false);
        });
    } catch (err) {
      notify({ success: false, message: "Something went wrong" });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      setfetchingEmployeesMsg("Fetching employees...");
      setfetchingEmployees(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setfetchingEmployees(false);
          if (response.data.code == 200) {
            let employeesList = response.data.data;
            setallEmployees(employeesList);
            if (router.query.status) {
              setIsFilter(router.query.status);
              setfilterType("es");
              employeesList = employeesList.filter(
                (employee) => employee.status == router.query.status
              );
            }
            setfoundEmployees(employeesList);
            let rmsList = employeesList.filter(
              (x) => x.is_reporting_manager === true
            );
            setRMS(typeof rmsList === "object" ? rmsList : []);
          }
          removeURLParameters(['status']);
        })
        .catch(() => {
          setfetchingEmployees(false);
        });
    } catch (err) {
      setfetchingEmployees(false);
    }
    try {
      let endpoint = getAbsoluteURL(`controllers/users/userroles`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            const transformed = response.data.data.map(({ id, name }) => ({
              value: id,
              label: name,
            }));
            setRoles(transformed);
          } else {
            setRoles([]);
          }
        })
        .catch((error) => { });
    } catch (err) { }
    try {
      let endpoint = getAbsoluteURL(`controllers/department`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            setDepartments(response.data.data);
          } else {
            setDepartments([]);
          }
        })
        .catch((error) => { });
    } catch (err) { }
    try {
      let endpoint = getAbsoluteURL(`controllers/designation`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            setDesignations(response.data.data);
          } else {
            setDesignations([]);
          }
        })
        .catch((error) => { });
    } catch (err) { }
  }, []);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allEmployees.filter((employee) => {
        return (
          employee.first_name?.toLowerCase()?.includes(keyword.toLowerCase()) ||
          employee.last_name?.toLowerCase()?.includes(keyword.toLowerCase()) ||
          (employee.first_name + " " + employee.last_name)
            ?.toLowerCase()
            ?.includes(keyword.toLowerCase()) ||
          employee.employee_id?.toLowerCase().includes(keyword.toLowerCase()) ||
          employee.status?.toLowerCase().includes(keyword.toLowerCase()) ||
          employee.designation?.name
            ?.toLowerCase()
            ?.split("_")
            ?.join(" ")
            ?.includes(keyword.toLowerCase()) ||
          employee?.department?.name
            ?.toLowerCase()
            ?.split("_")
            ?.join(" ")
            ?.includes(keyword.toLowerCase())
        );
      });
      setfoundEmployees([...results]);
    } else {
      setfoundEmployees([...allEmployees]);
    }
  };

  const fetchEmployeeDetails = (e, id, employee_id) => {
    e.preventDefault();
    try {
      let endpoint = getAbsoluteURL(`controllers/employees?id=${id}`);
      setfetchingEmployeesMsg("Fetching employee details...");
      setfetchingEmployees(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setfetchingEmployees(false);
          setselectedEmployee({});
          if (response.data.code == 200) {
            setshowEDR(true);
            document.body.classList.add("hidden");
            setemployeeId(employee_id);
            setTimeout(() => {
              setselectedEmployee(response.data.data);
            }, 100);
          }
        })
        .catch((error) => {
          setfetchingEmployees(false);
          let error_msg = "Error in fetching employee details";
          if (error.response) {
            error_msg = error?.response?.data?.message;
          }
          notify({ success: false, message: error_msg });
        });
    } catch (error) {
      setfetchingEmployees(false);
    }
  };

  useEffect(() => {
    setselectedEmployee(
      employeeId
        ? allEmployees.find((x) => x.employee_id === employeeId)
        : false
    );
  }, [employeeId]);

  const [isCopied, setIsCopied] = useState({});

  const copyfunc = (key) => {
    setIsCopied(Object.assign({}, { [key]: true }));
    setTimeout(() => {
      setIsCopied(Object.assign({}, {}));
    }, 1500);
  };

  const [isFilter, setIsFilter] = useState("");
  const [filterType, setfilterType] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [downloading, setdownloading] = useState(false);

  function togglebtn() {
    setShowGrid(!showGrid);
  }

  const onDdChange = (value, filterTypee = false) => {
    setIsFilter(value);
    setfilterType(filterTypee);
    if (value != "All") {
      let filteredUsers = allEmployees.filter(
        (employee) => employee.status == value
      );
      setfoundEmployees(filteredUsers);
    } else {
      setfoundEmployees(allEmployees);
    }
  };

  const closeStatusChangeModal = () => {
    handleClose("change_employee_status");
    setemployeeId(false);
    setLongAbsenceFrom(null);
    setLongAbsenceTo(null);
    setErrors({});
  };

  // Add New Employeee -------
  const [addNewEmployee, setAddNewEmployee] = useState(false);
  const onOpenAddNewEmployeeForm = () => {
    setAddNewEmployee(true);
  };
  // End -------

  // Expand Table row
  const expandAndCollapseEmployeeTable = (emp_id) => {
    document.getElementById("emp_" + emp_id).classList.toggle("open");
  };
  // End---------------

  // Import Employeee Details -------
  const [importEmployeeDetail, setImportEmployeeDetail] = useState(false);
  const onOpenImportEmployeeDetail = () => {
    setImportEmployeeDetail(true);
  };
  // End -------


  const sendMail = async (emp) => {
    try {
      let data = {};
      data.first_name = emp.first_name;
      data.id = emp.id;
      data.work_email = emp.work_email;
      let endpoint = getAbsoluteURL(
        "controllers/employees/resendWelcomeEmail"
      );
      setSubmitting(true); //set statev
      axios({
        method: "POST",
        url: endpoint,
        data: data,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          console.log("ssssss", response)
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && Object.keys(response?.data?.data).length > 0) {
            employeeUpdated(response.data.data);
          }
          setSubmitting(false);
        })
        .catch((error) => {
          let error_msg = "Something went wrong";
          if (error.response) {
            if (error.response.data) {
              error_msg = error.response.data.message;
            }
          }
          notify({ success: false, message: error_msg });
          setSubmitting(false);
        });
    } catch (e) {
      setSubmitting(false);
      notify({ success: false, message: "Error in fetching employees list" });
    }
  };

  const importEmployees = async (dataImport) => {
    let endPoint = getAbsoluteURL("controllers/employees/importEmployees");
    // let formData = new FormData();
    // formData.append("sample_employee_imports.xlsx",e.target.files);
    //set statev
    axios({
      method: "POST",
      url: endPoint,
      data: dataImport,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        // "Content-Type": "multipart/form-data"
      },
    })
      .then((response) => {
        if (response.data.code === 200) {
          let message = response.data.message;
          let resData = response.data.data;
          if (message === "all_records_are_created") {
            notify({
              success: true,
              message: "All employees are imported succesfully",
            });
          } else if (message === "no_records_are_created") {
            setImportEmployeeErrors(resData);
            notify({
              success: false,
              message: "No employee created,bulk import failed",
            });
          } else if (message === "partial_records_are_created") {
            setImportEmployeeErrors(resData);
            notify({ warning: true, message: `Partial employees created` });
          }
        }
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          if (error.response.data) {
            error_msg = error.response.data.message;
          }
        }
        notify({ success: false, message: error_msg });
      });
  };

  const downloadSample = async () => {
    try {
      setdownloading(true);
      let endpoint = getAbsoluteURL("controllers/employees/downloadSample");
      const ftch = await fetch(endpoint, config);
      const fileBlob = await ftch.blob();
      setdownloading(false);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(fileBlob);
      link.download = "employees_import_sample_format.xlsx";
      link.click();
      link.remove();
    } catch (e) {
      notify({ success: false, message: "Error in downloading sample file" });
    }
  };

  const [selectedExpEmpStatus, setselectedExpEmpStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "employee_id", title: "Employee ID" },
    {
      data: { first_name: "first_name", last_name: "last_name" },
      mRender: function (c_data) {
        return c_data.first_name + " " + c_data.last_name;
      },
      title: "Employee name",
    },
    { data: "work_email", title: "Email ID" },
    { data: "work_phone", title: "Phone number" },
    //{ data: "probation", title: "Probation" },
    { data: "status", title: "Status" },
  ]);
  const [data, setData] = useState([]);

  const exportEmployees = async () => {
    try {
      const { column, value } = selectedExpEmpStatus;
      let endpoint = getAbsoluteURL(
        `controllers/employees/exportEmployees?column=${column}&value=${value}`
      );
      setSubmitting(true); //set statev
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
            notify({ success: true, message: "Employees list retrieved" });
          } else {
            setData([]);
            notify({ success: false, message: "Employees list is empty" });
          }
          setSubmitting(false);
        })
        .catch((error) => {
          let error_msg = "Something went wrong";
          if (error.response) {
            if (error.response.data) {
              error_msg = error.response.data.message;
            }
          }
          notify({ success: false, message: error_msg });
          setSubmitting(false);
        });
    } catch (e) {
      setSubmitting(false);
      notify({ success: false, message: "Error in fetching employees list" });
    }
  };

  return (
    <Box className="p-3">
      <Meta />
      <Box className="d-flex justify-content-between align-items-center position-relative">
        <Form size="large" className="search-form-wrapper">
          <Form.Group
            className="mb-0 position-relative search-form"
            controlId="formBasicEmail"
          >
            <Form.Control
              placeholder="Search..."
              type="input"
              onChange={filter}
              className="input"
            />
            <SearchIcon className="search-icon" />
          </Form.Group>
        </Form>
        <SubTitle
          className="d-none d-xl-flex align-items-center"
          title="Employees List"
        />
        <Box className="d-flex Zy49_xyt Zy49_xyt-max ">
          <Button
            variant="white"
            className=" px-1 svg d-r-none"
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
          <Box>
            <Dropdown className="filter">
              <Dropdown.Toggle
                variant="white"
                id="dropdown-basic"
                className="svg filter"
              >
                <Span>{isFilter == "All" ? "All employees" : ""}</Span>
                {/* <Span>
                  {isFilter == "Pending Approval" ? "Pending Approval" : ""}
                </Span> */}
                {EMPLOYEE_STATUSES &&
                  EMPLOYEE_STATUSES.map(({ status }, es_index) => (
                    <Span key={es_index}>
                      {isFilter == status && filterType == "es" ? status : ""}
                    </Span>
                  ))}
                {PROBATION_STATUSES &&
                  PROBATION_STATUSES.map(({ status }, ps_index) => (
                    <Span key={ps_index}>
                      {isFilter == status && filterType == "ps"
                        ? `Probation ${status}`
                        : ""}
                    </Span>
                  ))}
                <FilterIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="javascript:void(0);"
                  onClick={() => {
                    onDdChange("All");
                  }}
                >
                  All Employees
                </Dropdown.Item>
                <Box className="grouped">
                  <h6>Regular</h6>
                  {EMPLOYEE_STATUSES &&
                    EMPLOYEE_STATUSES.map(({ status }, es3_index) => (
                      <Dropdown.Item
                        key={es3_index}
                        href="javascript:void(0);"
                        onClick={() => {
                          onDdChange(status, "es");
                        }}
                      >
                        {status}
                      </Dropdown.Item>
                    ))}
                </Box>
                {/* <Divider className="mb-2" /> */}
                {/* <Dropdown.Item
                  href="javascript:void(0);"
                  onClick={() => {
                    onDdChange("Pending Approval");
                  }}
                >
                  <Span>Pending Approval</Span>
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Box>
          <Box className="ms-2">
            <Button
              variant="white"
              onClick={() => handleShow("export_employees")}
              className=" px-1"
              title="Export employees"
              style={{ lineHeight: "1" }}
            >
              <UpArrow className="lg" />
            </Button>
            <Button
              variant="white"
              onClick={() => {
                if (
                  ac(userRoles, "Import employees", loggeduseremail, admins)
                ) {
                  onOpenImportEmployeeDetail();
                } else {
                  notify({
                    success: false,
                    message: "You dont't have permission",
                  });
                }
              }}
              //onClick={onOpenImportEmployeeDetail}
              className=" px-1"
              title="Import employees"
              style={{ lineHeight: "1" }}
            >
              <DownArrow className="lg" />
            </Button>

            <Button
              variant="white"
              onClick={() => {
                if (
                  ac(userRoles, "Create employees", loggeduseremail, admins)
                ) {
                  onOpenAddNewEmployeeForm();
                } else {
                  notify({
                    success: false,
                    message: "You dont't have permission",
                  });
                }
              }}
              className="add border-0"
            >
              <UserPlusIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Employee Details Table View */}

      <Box className={`table-wrapper xs-none  ${!showGrid ? "" : " d-none"}`}>
        <Divider className={`mb-0`} />
        {ac(userRoles, "View employees", loggeduseremail, admins) ? (
          <Table
            className={`employee-table  ${foundEmployees?.length > 0 ? "" : "grid-remover-class-table "
              } ${fetchingEmployees ? "" : "grid-remover-class-table "}`}
          >
            <thead
              className={`${foundEmployees?.length > 0 ? "" : "d-none"} ${fetchingEmployees ? "d-none" : ""
                }`}
            >
              <tr>
                <th>Employee</th>
                <th>Code</th>
                <th>Department</th>
                <th>Started On</th>
                <th>Phone</th>
                <th>Mail</th>
                <th style={{ textAlign: "right" }}>Status</th>
                <th style={{ textAlign: "right" }}>
                  <SliderIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchingEmployees ? (
                <FetchingWrapper
                  title={fetchingEmployeesMsg}
                  className="mh-60"
                />
              ) : foundEmployees && foundEmployees.length > 0 ? (
                foundEmployees.map((employee, index) => (
                  <tr key={index} id={`emp_${employee.employee_id}`}>
                    <td>
                      <Box className="d-flex align-items-center">
                        <Box className="position-relative">
                          <img
                            src={
                              employee.profile_pic
                                ? employee.profile_pic
                                : "/images/avatar.jpg"
                            }
                            alt={`${employee.first_name} ${employee.last_name}`}
                            className="avatar shadow me-2"
                          />
                        </Box>
                        <Span>
                          <h6
                            // onClick={() =>
                            //   expandAndCollapseEmployeeTable(
                            //     employee.employee_id
                            //   )
                            // }
                            className="dark-text mb-0 f-16 d-flex align-items-center pointer"
                          >
                            {`${employee.first_name} ${employee.last_name}`}{" "}
                          </h6>
                          <Span
                            className="elipsis-td light-text"
                            title={employee?.designation?.name}
                          >
                            {employee?.designation?.name}
                          </Span>
                        </Span>
                      </Box>
                    </td>
                    <td>
                      <Badge bg="light" text="dark" className="f-12">
                        {employee.employee_id}
                      </Badge>
                    </td>
                    <td>{employee?.department?.name ? employee?.department.name : '-Nil-'}</td>
                    <td>{getStartedOn(employee?.joined_date)}</td>
                    <td>
                      <Box className="position-relative">
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="auto"
                          overlay={phone_popover(employee?.work_phone)}
                        >
                          <Span
                            isClick={() => {
                              copyfunc(`work_phone_${index}`);
                              navigator.clipboard.writeText(
                                employee.work_phone
                              );
                            }}
                            className="circle-wrapper blue me-2"
                          >
                            <PhoneIcon />
                          </Span>
                        </OverlayTrigger>
                        {isCopied?.hasOwnProperty(`work_phone_${index}`) && (
                          <Span className="copy-btn">Copied</Span>
                        )}
                      </Box>
                    </td>
                    <td>
                      <Box className="position-relative">
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="auto"
                          overlay={mail_popover(employee.work_email)}
                        >
                          <Span
                            isClick={() => {
                              copyfunc(`work_email_${index}`);
                              navigator.clipboard.writeText(
                                employee.work_email
                              );
                            }}
                            className="circle-wrapper red"
                          >
                            <MailIcon />
                          </Span>
                        </OverlayTrigger>
                        {isCopied?.hasOwnProperty(`work_email_${index}`) && (
                          <Span className="copy-btn">Copied</Span>
                        )}
                      </Box>
                    </td>
                    {/* <td> */}
                    {/* <Span> */}
                    {/* <Button style={{ height: "25px", fontSize: "12px" }} disabled={employee.is_welcome_email_sent} onClick={(e) => { sendMail(employee) }}>send</Button> */}
                    {/* </Span> */}
                    {/* </td> */}
                    <td style={{ textAlign: "right" }}>
                      <Span className="d-flex justify-content-end">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant={getStatusColor(employee.status)}
                            id="dropdown-basic"
                            className="p-0  "
                          >
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="tooltip">
                                  {employee.status}
                                </Tooltip>
                              }
                            >
                              <Badge
                                bg={getStatusColor(employee.status)}
                                className="pe-4 status-dropdown"
                                style={{ fontSize: "12px" }}
                              >
                                {employee.status}
                              </Badge>
                            </OverlayTrigger>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {EMPLOYEE_STATUSES &&
                              EMPLOYEE_STATUSES.map(({ status }, es4_index) => (
                                <Dropdown.Item
                                  disabled={employee.status == status}
                                  key={es4_index}
                                  onClick={(e) => {
                                    if (
                                      ac(
                                        userRoles,
                                        "Change employee status",
                                        loggeduseremail,
                                        admins
                                      )
                                    ) {
                                      setselectedStatus(e.target.id);
                                      //changeEmployeeStatus();
                                      handleShow("change_employee_status");
                                      setemployeeId(employee.employee_id);
                                    } else {
                                      notify({
                                        success: false,
                                        message: "You dont't have permission",
                                      });
                                    }
                                  }}
                                  id={status}
                                >
                                  {status}
                                </Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Span>
                        <Span title={!employee.is_welcome_email_sent ? 'Send Welcome Email':'Welcome Mail already sent'} isClick={() => {
                          !employee.is_welcome_email_sent ? sendMail(employee) : notify({
                            success: false,
                            message: 'Welcome mail already sent',
                          });
                        }}>
                          <MailIcon />
                        </Span>
                        <Span
                          className="ml-5"
                          isClick={(e) =>
                            fetchEmployeeDetails(
                              e,
                              employee.id,
                              employee.employee_id
                            )
                          }
                        >
                          <EyeIcon />
                        </Span>
                      </Span>
                    </td>
                    {/* <Box
                      id={`footer_${employee.employee_id}`}
                      className={`footer-td align-items-center  w-100`}
                    ></Box> */}
                  </tr>
                ))
              ) : (
                <NoResultsWrapper
                  title="No results found!"
                  subtitle="Click + new button to add employee"
                />
              )}
            </tbody>
          </Table>
        ) : (
          <Box>
            <h6>You dont have access to view employees</h6>
          </Box>
        )}
      </Box>
      {/* Employee Details Table View End ------------- */}

      {/* Employee Details Grid View */}

      <Box
        style={{ display: "none" }}
        className={`mt-4 responsive-view ${!showGrid ? "" : " d-block"}`}
      >
        {ac(userRoles, "View employees", loggeduseremail, admins) ? (
          <Box
            className={`employee_Card_Container position-relative ${foundEmployees?.length > 0 ? "" : "grid-remover-class"
              }  ${fetchingEmployees ? "grid-remover-class" : ""}`}
          >
            {fetchingEmployees ? (
              <FetchingWrapper title={fetchingEmployeesMsg} className="mh-60" />
            ) : foundEmployees && foundEmployees.length > 0 ? (
              foundEmployees.map((employee, index) => (
                <Box
                  key={index}
                  className="employee_Card"
                  id={`emp_${employee.employee_id}`}
                >
                  <Box
                    onClick={(e) =>
                      fetchEmployeeDetails(e, employee.id, employee.employee_id)
                    }
                  >
                    <Box className="avatar absolute">
                      <img
                        src={
                          employee.profile_pic
                            ? employee.profile_pic
                            : "/images/avatar.jpg"
                        }
                        alt={`${employee.first_name} ${employee.last_name}`}
                        className="avatar card-avatar"
                      />
                    </Box>
                    <Box className="d-flex align-items-start justify-content-between employee_Card_Header mt-3 mt-md-4">
                      <Box>
                        <SubTitle
                          className="mb-1"
                          title={`${employee.first_name} ${employee.last_name}`}
                        />
                        <P
                          className="secondary-text-label elipsis-td"
                          title={employee?.designation?.name}
                        >
                          {employee?.designation?.name}
                        </P>
                        {employee.joined_date ? (
                          <P className="dark-text-label">
                            Started on {employee.joined_date}
                            <br className="d-block d-xl-none" /> (
                            {getHumanReadableDate(employee.joined_date) ==
                              "null"
                              ? "-"
                              : getHumanReadableDate(employee.joined_date)}
                            )
                          </P>
                        ) : (
                          <P className="dark-text-label">Join date not added</P>
                        )}
                      </Box>
                    </Box>
                    <Box className="mt-3">
                      <P className="secondary-text-label">Department</P>
                      <P className="dark-text-label">
                        {employee?.department?.name ? employee?.department.name : '-Nil-'}
                      </P>
                    </Box>
                  </Box>
                  <Box className="id_And_Status_Container d-flex">
                    <Badge bg="light" text="dark">
                      {employee.employee_id}
                    </Badge>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant={getStatusColor(employee.status)}
                        id="dropdown-basic"
                        className="p-0  "
                      >
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip">{employee.status}</Tooltip>
                          }
                          placement="top"
                        >
                          <Badge
                            bg={getStatusColor(employee.status)}
                            className="pe-4 status-dropdown"
                            style={{ fontSize: "12px" }}
                          >
                            {employee.status}
                          </Badge>
                        </OverlayTrigger>
                      </Dropdown.Toggle>
                      {/* ////////////////////////// */}
                      <Dropdown.Menu>
                        {EMPLOYEE_STATUSES &&
                          EMPLOYEE_STATUSES.map(({ status }, es5_index) => (
                            <Dropdown.Item
                              key={es5_index}
                              disabled={employee.status == status}
                              onClick={(e) => {
                                handleShow("change_employee_status");
                                setemployeeId(employee.employee_id);
                                setselectedStatus(e.target.id);
                              }}
                              id={status}
                            >
                              {status}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Box>
                  <Box>
                    <Divider />
                    <Box className="d-flex flex-column flex-sm-row justify-content-between pt-0 align-items-center">
                      <Box className="d-flex">
                        <Box className="position-relative">
                          <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="auto"
                            overlay={phone_popover(employee.work_phone)}
                          >
                            <Span
                              isClick={() => {
                                copyfunc(`work_phone_${index}`);
                                navigator.clipboard.writeText(
                                  employee.work_phone
                                );
                              }}
                              className="circle-wrapper blue me-2"
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
                                className="feather feather-phone"
                              >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </Span>
                          </OverlayTrigger>
                          {isCopied?.hasOwnProperty(`work_phone_${index}`) && (
                            <Span className="copy-btn">Copied</Span>
                          )}
                        </Box>
                        <Box className="position-relative">
                          <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="auto"
                            overlay={mail_popover(employee.work_email)}
                          >
                            <Span
                              isClick={() => {
                                copyfunc(`work_email_${index}`);
                                navigator.clipboard.writeText(
                                  employee.work_email
                                );
                              }}
                              className="circle-wrapper red"
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
                                className="feather feather-mail"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                            </Span>
                          </OverlayTrigger>
                          {isCopied?.hasOwnProperty(`mail_${index}`) && (
                            <Span className="copy-btn">Copied</Span>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <NoResultsWrapper
                title="No results found!"
                subtitle="Click + new button to add employee"
              />
            )}
          </Box>
        ) : (
          <Box>
            <h6>You dont have access to view employees</h6>
          </Box>
        )}
      </Box>
      {/* Employee Details Grid View End ------------- */}

      <EmployeeDataRecord
        selectedEmployee={selectedEmployee}
        accesstoken={accesstoken}
        employeeUpdated={employeeUpdated}
        notify={notify}
        showEDR={showEDR}
        setshowEDR={setshowEDR}
        setemployeeId={setemployeeId}
        rms={rms}
        roles={roles}
        userRoles={userRoles}
        loggeduseremail={loggeduseremail}
        admins={admins}
        designations={designations}
        departments={departments}
        user={userAvailable}
      />

      {/* Add New Employee Right Modal */}
      <EmsModal className={`${addNewEmployee ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Add new employee" />
          </Stack>
          <EmsModalClose isClose={() => setAddNewEmployee(false)} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <AddNewEmployee
            accesstoken={accesstoken}
            setAddNewEmployee={setAddNewEmployee}
            addNewEmployee={addNewEmployee}
            newEmployeeAdded={newEmployeeAdded}
            notify={notify}
            rms={rms}
            roles={roles}
            userRoles={userRoles}
            loggeduseremail={loggeduseremail}
            admins={admins}
            designations={designations}
            departments={departments}
          />
        </EmsModalBody>
      </EmsModal>
      {/* End */}

      {/* Employees status change Right Modal */}
      <Modal
        show={show.change_employee_status}
        onHide={closeStatusChangeModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to change{" "}
            <Span className="f-500">{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</Span>{" "}
            status from <Span className="f-500">{selectedEmployee.status}</Span>{" "}
            to <Span className="f-500">{selectedStatus}</Span>?
            {(selectedEmployee.status == "Probation" && selectedStatus == "Active") &&
              <Form.Group className="position-relative">
                <Form.Label>Probation Completed date</Form.Label>
                <Form.Control
                  className="form-control"
                  type="date"
                  pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                  name="probation_completion_date"
                  onChange={(e) => {
                    setProbationCompletionDate(e.target.valueAsDate);
                  }}
                />
                <Span className="error-msg">
                  {!probationCompletionDate && errors.change_probation_completion_date?.message}
                </Span>
              </Form.Group>
            }
            {selectedStatus == "Long absence" &&
              <>
                <Form.Group className="position-relative">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="date"
                    pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                    name="long_absence_from"
                    onChange={(e) => {
                      setLongAbsenceFrom(e.target.valueAsDate);
                    }}
                  />
                  <Span className="error-msg">
                    {!longAbsenceFrom && errors.change_long_absence_from?.message}
                  </Span>
                </Form.Group>
                <Form.Group className="position-relative">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="date"
                    pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                    name="long_absence_to"
                    onChange={(e) => {
                      setLongAbsenceTo(e.target.valueAsDate);
                    }}
                  />
                </Form.Group>
              </>
            }
            {selectedStatus == "Terminated" &&

              <Form.Group className="position-relative">
                <Form.Label>Terminated On</Form.Label>
                <Form.Control
                  className="form-control"
                  type="date"
                  pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                  name="terminated_on"
                  onChange={(e) => {
                    setTerminatedOn(e.target.valueAsDate);
                  }}
                />
                <Span className="error-msg">
                  {!terminatedOn && errors.change_terminated_on?.message}
                </Span>
              </Form.Group>
            }
            {selectedStatus == "Resigned" &&
              <>
                <Form.Group className="position-relative">
                  <Form.Label>Resigned On</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="date"
                    pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                    name="resigned_on"
                    onChange={(e) => {
                      setResignedOn(e.target.valueAsDate);
                    }}
                  />
                  <Span className="error-msg">
                    {!resignedOn && errors.change_resigned_on?.message}
                  </Span>
                </Form.Group>
                <Form.Group className="position-relative">
                  <Form.Label>Last Working Day</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="date"
                    pattern="\d{1,2}/\d{1,2,3}/\d{4}"
                    name="last_working_day"
                    onChange={(e) => {
                      setLastWorkingDay(e.target.valueAsDate);
                    }}
                  />
                  <Span className="error-msg">
                    {!lastWorkingDay && errors.change_last_working_day?.message}
                  </Span>
                </Form.Group>
              </>
            }
            <Form.Group>
              <Form.Label>
                Reason for <Span className="f-500">{selectedStatus}</Span>{" "}
                <Span className="required">*</Span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <Span className="error-msg">
                {!reason && errors.change_emp_status?.message}
              </Span>
            </Form.Group>
            <Stack direction="horizontal" className="pt-3 justify-content-end">
              <Button
                variant="save"
                disabled={submitting}
                onClick={() => {
                  if (
                    ac(
                      userRoles,
                      "Change employee status",
                      loggeduseremail,
                      admins
                    )
                  ) {
                    changeEmployeeStatus();
                  } else {
                    notify({
                      success: false,
                      message: "You dont't have permission",
                    });
                  }
                }}
                //onClick={changeEmployeeStatus}
                className="save "
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
                  className="feather feather-check me-2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                {submitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
                variant="outlineDark"
                onClick={closeStatusChangeModal}
                className="delete"
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
      </Modal>
      {/* End */}

      {/* Export employees */}
      <Modal
        show={show.export_employees}
        onHide={() => handleClose("export_employees")}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Export employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>

            <Form.Group>
              <Form.Label>Select status</Form.Label>
              <Form.Select
                onChange={(e) => {
                  let index = e.target.selectedIndex;
                  let value = e.target.options[index].value;
                  let datatype =
                    e.target.options[index].getAttribute("datatype");
                  setselectedExpEmpStatus({ ...{ column: datatype, value } });
                }}
                className="form-control"
              >
                <option value={"all"}>All</option>

                <optgroup
                  label="Status ---------"
                  style={{ fontSize: "15px", fontWeight: "500" }}
                >
                  {EMPLOYEE_STATUSES.map(({ status }, index) => (
                    <option datatype="status" value={status} key={index}>
                      {status}
                    </option>
                  ))}
                </optgroup>
              </Form.Select>
              <Span className="error-msg">
                {errors.export_employees?.message}
              </Span>
            </Form.Group>
            <Stack direction="horizontal" className="pt-3 justify-content-end">
              <Button
                variant="save"
                disabled={submitting}
                onClick={exportEmployees}
                className="save i"
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
                  className="feather feather-check me-2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                {submitting ? "Previewing..." : "Preview"}
              </Button>
              {/* <Button
                variant="outlineDark"
                onClick={() => handleClose("export_employees")}
                className="delete"
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
              </Button>{" "} */}
            </Stack>
            <ReactDataTable
              columns={columns}
              data={data}
              isExportTrue={true}
              isPagingTrue={true}
              isSearching={true}
              emptyTableMessage={"No matched employees found"}
            />

          </Container>

        </Modal.Body>l
      </Modal>

      {/* End */}

      {/* Import Employess Right Modal */}
      <EmsModal className={`${importEmployeeDetail ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Import Employees" />
          </Stack>
          <EmsModalClose isClose={() => setImportEmployeeDetail(false)} />
        </EmsModalHeader>

        <EmsModalBody className="p-sm-3 py-3">
          <DataSetContainer className="lg">
            <Container>
              <Box className="table-wrapper  border-0 import-employees mt-0">
                <Table>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Is Required</th>
                      <th style={{ width: "auto" }}>
                        Possible values / Format
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Employee Code</td>
                      <td>Yes</td>
                      <td>2XXXXX</td>
                    </tr>
                    <tr>
                      <td>First Name</td>
                      <td>Yes</td>
                      <td>Tyler (eg)</td>
                    </tr>
                    <tr>
                      <td>Middle Name</td>
                      <td>No</td>
                      <td>Cole (eg)</td>
                    </tr>
                    <tr>
                      <td>Last Name</td>
                      <td>Yes</td>
                      <td>Braxton (eg)</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>No</td>
                      <td>91 9876543210 (eg)</td>
                    </tr>
                    <tr>
                      <td>Office Email Id</td>
                      <td>Yes</td>
                      <td>tyler.cole@bassure.com (eg)</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>Yes</td>
                      <td>
                        Active, Long absence, Terminated, Deceased, Resigned
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
              <Form.Group as={Col} md={{ span: 4, offset: 8 }}>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    try {
                      if (e.target.files.length > 0) {
                        xlsxParser
                          .onFileSelection(e.target.files[0])
                          .then((sheetData) => {
                            setEmployeelist(sheetData);
                          })
                          .catch(() => {
                            setEmployeelist([]);
                            notify({
                              success: false,
                              message: "Error in parsing the excel file",
                            });
                          });
                      } else {
                        setEmployeelist([]);
                      }
                    } catch {
                      setEmployeelist([]);
                      notify({
                        success: false,
                        message: "Error in parsing the excel file",
                      });
                    }
                  }}
                />

                <Span className="error-msg">
                  {errors.change_emp_status?.message}
                </Span>
              </Form.Group>

              <Box className="d-flex justify-content-end mt-4">
                <Button
                  variant="outlineDark"
                  disabled={downloading}
                  onClick={downloadSample}
                >
                  <DownloadIcon className="me-2" />{" "}
                  {downloading ? "Downloading..." : "Download Modal"}
                </Button>
                <Button
                  variant="outlineDark"
                  onClick={() => {
                    importEmployees(employeelist);
                  }}
                >
                  <DownArrow className="me-2" /> Import Employees
                </Button>
                <Button
                  variant="outlineDark"
                  onClick={() => setImportEmployeeDetail(false)}
                  className="delete"
                >
                  <CloseIcon className="me-2 " /> Discard
                </Button>
              </Box>

              <Box
                className={`${importedEmployeeErrors
                  ? ""
                  : "bg-light-red p-3 error-wrapper mt-4"
                  }`}
              >
                <ul className={`${importedEmployeeErrors ? "" : "error-list"}`}>
                  {importedEmployeeErrors
                    ? importedEmployeeErrors.map((x) => (
                      <li>
                        <span className="error-msg f-15">{x.message}</span>
                      </li>
                    ))
                    : null}
                </ul>
              </Box>
            </Container>
          </DataSetContainer>
        </EmsModalBody>
      </EmsModal>
      {/* End */}
    </Box>
  );
}

export default Employees;
