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
import { bankDetailsSchema } from "../../lib/yupHelpers";
import { EMPLOYEE_STATUSES,BANK_DETAIL_STATUSES,ACCOUNT_TYPE } from "../../lib/helpers";
import ReactDataTable from "../Shared/ReactDataTable";
import Span from "../Shared/Span";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
const schema = yup.object().shape(bankDetailsSchema);

function ExportBankDetails(props) {
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
  const [allbankDetails,setAllBankDetails] = useState();
  const [selectedbankdetails,setselectedbankdetails]=useState(false);
  const [employees,setEmployees] = useState([]);
  const[bankdetailsId]=useState(false)
  const[selectedemployee,setSelectedEmployee]=useState(false)
  
  const [data, setData] = useState([]);
  const [selectedExpBankStatus, setselectedExpBankStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "employee_employee.employee_id", title: "Employee Code" },
    {
      data: {
        first_name: "employee.first_name",
        last_name: "employee.last_name",
      },
      mRender: function (data1, _type, _full) {
        return data1.employee_employee.first_name + " " + data1.employee_employee.last_name;
      },
      title: "Employee Name",
    },
    {data:"employee_employee.work_email",title:"Email"},
    {data:"employee_employee.status",title:"Employee Status"},
    { data: "account_type", title: "Account Type" },
    { data: "bank_name", title: "Bank Name"},
    { data: "branch", title: "Branch",visible:false },
    { data: "account_number", title: "Account Number" },
    { data: "ifsc", title: "IFSC" },
    { data: "status", title: "Status" },
    { data: "reason_for_rejection", title: "Reason For Rejection",visible:false },
  ]);

  
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      axios
        .get(endpoint, config)
        .then((response) => {
          setEmployees(response.data.data);
        })
        .catch((_err) => {
          setEmployees([]);
        });
    } catch (err) {
      setEmployees([]);
    }
  }, []);

  useEffect(() => {
    let bankdetails = bankdetailsId
      ? allbankDetails.find((x) => x.id == bankdetailsId)
      : false;
      setselectedbankdetails(bankdetails);
    if (bankdetails) {
      let assocs = ["employees"];
      for (const property in bankdetails) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, bankdetails[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, bankdetails[property]);
        }
      }
    }
  }, [bankdetailsId]);

  const exportBankDetails = async () => {
    try {
      const { column, value } = selectedExpBankStatus;

      let emp_id = selectedemployee;
      let endpoint = getAbsoluteURL(
        `controllers/bankdetails/exportBankDetails?column=${column}&value=${value}&employeeId=${emp_id}`
      );
      
      setSubmitting(true); 
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        data: {
            employeeId: emp_id,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
        setData([...response.data.data]);
          } else {
            setData([]);
            notify({ success: false, message: "BankDetails list is empty" });
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
      notify({ success: false, message: "Error in fetching Bankdetails list" });
    }
  };

  return (
    <>
      {mode && (
        <Box>
          <Row className="justify-content-start">
            <Col sm={6} className="form-grid ems-form md-1 align-items-end">
              <Form.Group className="position-relative">
              <Form.Label>Employee status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                      setselectedExpBankStatus({
                      ...{ column: datatype, value },
                    });
                  }}
                  className="form-control"
                >
                  <option value={"all"}>All</option>
                  
                  <optgroup
                    label="Status-------"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {EMPLOYEE_STATUSES.map(({ status }, index) => (
                      <option datatype="status" value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>

                <ErrorMsg errorMessage={errors.employees?.message} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Bank Account Status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                      setselectedExpBankStatus({
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
                    {BANK_DETAIL_STATUSES.map(({ status }, index) => (
                      <option datatype="status" value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                <Span className="error-msg">
                  {errors.export_bankdetails?.message}
                </Span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Select account type</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                      setselectedExpBankStatus({
                      ...{ column: datatype, value },
                    });
                  }}
                  className="form-control"
                >
                  <option value={"all"}>All</option>
                  <optgroup
                    label="Account Type"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {ACCOUNT_TYPE.map(({ value }, index) => (
                      <option datatype="status" value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                <Span className="error-msg">
                  {errors.export_bankdetails?.message}
                </Span>
              </Form.Group>
              <Col className ="align-items-end">
                <Button
                  variant="save"
                  disabled={submitting}
                  onClick={exportBankDetails}
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
            emptyTableMessage={"No matched reports found"}
          />
        </Box>
      )}
    </>
  );
}
export default ExportBankDetails;
