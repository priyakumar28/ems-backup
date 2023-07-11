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
import { PROJECT_STATUS } from "../../lib/helpers";
import ReactDataTable from "../Shared/ReactDataTable";
import Span from "../Shared/Span";
import Box from "../Shared/Box";
const schema = yup.object().shape(projectSchema);

function ExportProjects(props) {
  const { accesstoken,notify, mode } = props;
  
  const {
    watch,
    
    formState: { errors },
    
  } = useForm({ resolver: yupResolver(schema) });

  
  React.useEffect(() => {
    const subscription = watch();
    return () => subscription.unsubscribe();
  }, [watch]);

  const [Eshow, setEshow] = useState({});
  
 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode) {
      handleEshow(mode);
      
    }
  }, [mode]);

  const handleEshow = (type) => {
    if (type) {
      setEshow(true);
    }
    
    let showw = Eshow;
    setEshow(false);
    setTimeout(() => {
      setEshow(Object.assign(showw, { [type]: true }));
    }, 100);
    setSubmitting(false);
  };

  

  const [selectedExpProStatus, setselectedExpProStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "id", title: "Project ID"  },
    { data: "name", title: "Project Name" },
    { data: "details", title: "Details", visible: false},
    { data: "client.name", title: "Client" },
    { data: "created", title: "Created" },
    { data: "start_date", title: "Start_date" },
    { data: "end_date", title: "End_date" },
    { data: "status", title: "Status" },
  ]);
  const [data, setData] = useState([]);

  const exportProjects = async () => {
    try {
      const { column, value } = selectedExpProStatus;

      let endpoint = getAbsoluteURL(
        `controllers/projects/exportProjects?column=${column}&value=${value}`
      );
      
      setSubmitting(true); 
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
          } else {
            setData([]);
            notify({ success: false, message: "Project list is empty" });
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
      notify({ success: false, message: "Error in fetching projects list" });
    }
  };
  

  return (
    <>
      {mode && (
        <Box>
          <Row className="justify-content-start align-items-end">
            <Col sm={3} className=" md-1">
              <Form.Group className="position-relative">
                <Form.Label>Select status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                    setselectedExpProStatus({
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
                    {PROJECT_STATUS.map(({ status }, index) => (
                      <option datatype="status" value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                <Span className="error-msg">
                  {errors.export_projects?.message}
                </Span>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="save"
                disabled={submitting}
                onClick={exportProjects}
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
            </Col>
          </Row>
          <ReactDataTable
            columns={columns}
            data={data}
            isExportTrue={true}
            isPagingTrue={true}
            isSearching={true}
            emptyTableMessage={"No matched projects found"}
          />
        </Box>
      )}
    </>
  );
}
export default ExportProjects;
