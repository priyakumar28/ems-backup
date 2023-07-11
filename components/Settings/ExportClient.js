  import React, { useState, useEffect} from "react";
import {
  Button,
  Col,
  Form,
  Row
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { clientdetailsSchema } from "../../lib/yupHelpers";
import { CLIENT_STATUSES } from "../../lib/helpers";
import ReactDataTable from "../Shared/ReactDataTable";
import Span from "../Shared/Span";
import Box from "../Shared/Box";
const schema = yup.object().shape(clientdetailsSchema);

function ExportClient(props) {
  const { accesstoken, notify, mode } = props;
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

 

  const handleEshow = (type) => {
    if (type) { useEffect(() => {
    if (mode) {
      handleEshow(mode);
    }
  }, [mode]);
      setEshow(true);
    }
    let showw = Eshow;
    setEshow(false);
    setTimeout(() => {
      setEshow(Object.assign(showw, { [type]: true }));
    }, 100);
    setSubmitting(false);
  };
  const [selectedExpCliStatus, setselectedExpCliStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "id", title: "Client ID" },
    { data: "name", title: "Client Name" },
    { data: "details", title: "Details", visible: false },
    { data: "first_contact_date", title: "First Contact Date" },
    { data: "created", title: "Created", visible: false },
    { data: "address", title: "Address", visible: false },
    { data: "contact_number", title: "Contact Number" },
    { data: "contact_email", title: "Contact Email" },
    { data: "company_url", title: "Company url" },
    { data: "status", title: "Status" },
  ]);
  const [data, setData] = useState([]);

  const exportClients = async () => {
    try {
      const { column, value } = selectedExpCliStatus;

      let endpoint = getAbsoluteURL(
        `controllers/clients/exportClients?column=${column}&value=${value}`
      );

      setSubmitting(true);
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
            notify({ success: true, message: "Clients list retrieved" });
          } else {
            setData([]);
            notify({ success: false, message: "Clients list is empty" });
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
      notify({ success: false, message: "Error in fetching Clients list" });
    }
  };
  

  return (
    <>
      {mode && (
        <Box>
          <Row className="justify-content-start align-items-end">
            <Col sm={3} className="mt-1">
              <Form.Group className="position-relative">
                <Form.Label>Select status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    let index = e.target.selectedIndex;
                    let value = e.target.options[index].value;
                    let datatype =
                      e.target.options[index].getAttribute("datatype");
                    setselectedExpCliStatus({
                      ...{ column: datatype, value },
                    });
                  }}
                  className="form-control"
                >
                  <option value={"all"}>All</option>

                  <optgroup
                    label="status"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {CLIENT_STATUSES.map(({ status }, index) => (
                      <option datatype="status" value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                <Span className="error-msg">
                  {errors.export_clients?.message}
                </Span>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="save"
                disabled={submitting}
                onClick={exportClients}
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
            emptyTableMessage={"No matched Clients found"}
          />
        </Box>
      )}
    </>
  );
}
export default ExportClient;
