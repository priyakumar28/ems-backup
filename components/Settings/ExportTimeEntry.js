import React, { useState, useEffect} from "react";
import {
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { employeeSchema} from "../../lib/yupHelpers";

import ReactDataTable from "../Shared/ReactDataTable";

import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
const schema = yup.object().shape(employeeSchema);

function ExportTimeEntry(props) {
  const { accesstoken, notify, mode } = props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    
    register,
    
    formState: { errors },
    setValue,
    
  } = useForm({ resolver: yupResolver(schema) });

  const [submitting, setSubmitting] = useState(false);
  const [employeeId] = useState(false);
  
  const [setSelectedemployees] =useState(false);
  const [employees, setemployees] = useState([]);
  
  const [selectedemp] = useState(false);
  const [setclients] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [selectedExpEmpdate] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "employee.employee_id", title: "Employee Code" },
    {
      data: {
        first_name: "employee.first_name",
        last_name: "employee.last_name",
      },
      mRender: function (data1, _type, _full) {
        return data1.employee.first_name + " " + data1.employee.last_name;
      },
      title: "Employee Name",
    },
    { data: "project.name", title: "Project Name" },
    { data: "timesheet", title: "timesheet" },
    { data: "details", title: "Details" },
    { data: "created", title: "Created" },
    { data: "date_start", title: "Start Date" },
    { data: "time_start", title: "Start Time" },
    { data: "date_end", title: "End Date" },
    { data: "time_end", title: "End Time" },
    {
      data: "roles",
      mRender: function (data2, _type, _full) {
        let rolesC = " ";
        for (let i in data2) {
          rolesC = rolesC + data2[i].name + " ";
        }
        return rolesC;
      },
      title: "Roles",
    },
  ]);
  const [data, setData] = useState([]);

  
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      axios
        .get(endpoint, config)
        .then((response) => {
          setemployees(response.data.data);
        })
        .catch((_err) => {
          setclients([]);
        });
    } catch (err) {
      setemployees([]);
    }
  }, []);

  useEffect(() => {
    let Employees = employeeId
      ? allemployees.find((x) => x.id == employeeId)
      : false;
    setSelectedemployees(Employees);
    if (Employees) {
      let assocs = ["employees"];
      for (const property in Employees) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, Employees[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, Employees[property]);
        }
      }
    }
  }, [employeeId]);

  const exportTimeEntry= async () => {
    try {
     const { column, value } = selectedExpEmpdate;

      let employee_id = selectedEmployee;
      let endpoint = getAbsoluteURL(
        `controllers/employeetimeentry/exportEmployeetimeEntry?column=${column}&value=${value}&employeeId=${employee_id}`
      );
      
      setSubmitting(true); 
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        data: {
          employeeId: employee_id,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
          } else {
            setData([]);
            notify({ success: false, message: "Employees time entry is empty" });
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
      notify({ success: false, message: "Error in fetching Employees time entry" });
    }
  };

  return (
    <>
      {mode && (
        <Box>
          <Row className="justify-content-start">
            <Col sm={4} className="form-grid ems-form md-1 align-items-end">
              <Form.Group className="position-relative">
                <Form.Label>Select Employee</Form.Label>
                {selectedemp?.id ? (
                  <Form.Control value={selectedemp.work_email} />
                ) : (
                  <Form.Select
                    {...register("employees")}
                    className="form-control-select"
                    onChange={(e) => {
                      setSelectedEmployee(e.target.value);
                    }}
                  >
                    <option value={"null"}>All</option>
                    {employees &&
                      employees.map(({ id, work_email }, index) => (
                        <option key={index} value={id}>
                          {work_email}
                        </option>
                      ))}
                  </Form.Select>
                )}

                <ErrorMsg errorMessage={errors.employees?.message} />
              </Form.Group>

              <Button
                variant="save"
                disabled={submitting}
                onClick={exportTimeEntry}
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
                {submitting ? "Previewing..." : "Preview"}
              </Button>
            </Col>
          </Row>

          
          <ReactDataTable
            columns={columns}
            data={data}
            isExportTrue={true}
            isPagingTrue={true}
            isSearching={true}
            emptyTableMessage={"No matched employees found"}
          />
        </Box>
      )}
    </>
  );
}
export default ExportTimeEntry;
