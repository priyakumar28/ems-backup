import React, { useState, useEffect} from "react";
import {
  
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { projectSchema } from "../../lib/yupHelpers";
import { EMPLOYEE_PROJECT_STATUS } from "../../lib/helpers";
import ReactDataTable from "../Shared/ReactDataTable";
import Span from "../Shared/Span";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
const schema = yup.object().shape(projectSchema);

function ExportEmployeeProject(props) {
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
  const [employeeprojectsId] = useState(false);
  const [allemployeeprojects] = useState([]);
  const [ setSelectedemployeeprojects] =
    useState(false);
  const [projects, setprojects] = useState([]);
 
  const [selectedemppro] = useState(false);
  const [setclients] = useState([]);
  const [selectedProject, setSelectedProject] = useState(false);
  const [selectedExpEmpProStatus, setselectedExpEmpProStatus] = useState({
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
    { data: "details", title: "Details", visible: false},
    { data: "bill_type", title: "Bill Type" },
    { data: "bill_percent", title: "Bill Percent" },
    { data: "date_start", title: "Start Date" },
    { data: "date_end", title: "End Date" },
    { data: "status", title: "Status" },
    { data: "comments", title: "Comments" , visible: false},
    {
      data: "roles",
      mRender: function (data2, _type, _full) {
        let rolesC = " ";
        for (let i in  data2) {
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
      let endpoint = getAbsoluteURL("controllers/projects");
      axios
        .get(endpoint, config)
        .then((response) => {
          setprojects(response.data.data);
        })
        .catch((_err) => {
          setclients([]);
        });
    } catch (err) {
      setprojects([]);
    }
  }, []);

  useEffect(() => {
    let employeeprojects = employeeprojectsId
      ? allemployeeprojects.find((x) => x.id == employeeprojectsId)
      : false;
    setSelectedemployeeprojects(employeeprojects);
    if (employeeprojects) {
      let assocs = ["projects"];
      for (const property in employeeprojects) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, employeeprojects[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, employeeprojects[property]);
        }
      }
    }
  }, [employeeprojectsId]);

  const exportEmployeeProjects = async () => {
    try {
      const { column, value } = selectedExpEmpProStatus;

      let project_id = selectedProject;
      let endpoint = getAbsoluteURL(
        `controllers/employeeprojects/exportEmployeeProjects?column=${column}&value=${value}&projectId=${project_id}`
      );
      
      setSubmitting(true); 
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        data: {
          projectId: project_id,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
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
      notify({ success: false, message: "Error in fetching Employees list" });
    }
  };

  return (
    <>
      {mode && (
        <Box>
          <Row className="justify-content-start">
            <Col sm={6} className="form-grid ems-form md-1 align-items-end">
              <Form.Group className="position-relative">
                <Form.Label>Select Project</Form.Label>
                {selectedemppro?.id ? (
                  <Form.Control
                    
                    value={selectedemppro.name}
                  />
                ) : (
                  <Form.Select
                    {...register("projects")}
                    className="form-control-select"
                    onChange={(e) => {
                      setSelectedProject(e.target.value);
                    }}
                  >
                    <option value={"null"}>All</option>
                    {projects &&
                      projects.map(({ id, name }, index) => (
                        <option key={index} value={id}>
                          {name}
                        </option>
                      ))}
                  </Form.Select>
                )}

                <ErrorMsg errorMessage={errors.projects?.message} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Select status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                    setselectedExpEmpProStatus({
                      ...{ column: datatype, value },
                    });
                  }}
                  className="form-control"
                >
                  <option value={"all"}>All</option>
                  <optgroup
                    label="Status"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {EMPLOYEE_PROJECT_STATUS.map(({ status }, index) => (
                      <option datatype="status" value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                <Span className="error-msg">
                  {errors.export_employeeprojects?.message}
                </Span>
              </Form.Group>
              <Col>
                <Button
                  variant="save"
                  disabled={submitting}
                  onClick={exportEmployeeProjects}
                  className="save i "
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
export default ExportEmployeeProject;
