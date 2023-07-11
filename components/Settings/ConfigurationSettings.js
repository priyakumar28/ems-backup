import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { configurationSettingsSchema } from "../../lib/yupHelpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import Meta from "../Meta";
import SubTitle from "../Shared/SubTitle";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
import Divider from "../Shared/Divider";
import Select from "react-select";
import Label from "../Shared/Label";

const schema = yup.object().shape(configurationSettingsSchema);

function ConfigurationSettings(props) {
  console.log(props, 'from configuration settings');
  const { accesstoken, settings, notify } = props;
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [maxdays, setmaxdays] = useState();
  const [mailsend, setMailSend] = useState(false);
  const [selectedusers, setSelectedusers] = useState([]);
  const [users, setUsers] = useState([])
  const [change, setChange] = useState(false);
  const [configurationsettings, setconfigurationsettings] = useState([]);
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  
 

  useEffect(() => {
    setconfigurationsettings(
      settings && typeof settings === "object" ? [...settings] : []
    );
  }, [settings]);

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/users");

      axios.get(endpoint, config).then((response) => {
        const transformed = response.data?.data?.map(({ id, email }) => ({
          value: id,
          label: email,
        }));
        setUsers(transformed);
      });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (configurationsettings && typeof configurationsettings == "object") {
      configurationsettings.forEach((configurationsetting) => {
        if (schema._nodes.includes(configurationsetting["name"])) {
          setValue(configurationsetting["name"], configurationsetting["value"]);
          if (configurationsetting["name"] == "pancard_upload_max_days") {
            setmaxdays(configurationsetting["value"]);
          }
          if (configurationsetting["name"] == "change") {
            setMailSend(configurationsetting["value"]);
          }
        }
      });
    }
  }, [configurationsettings]);

  const onSubmitHandler = async (data) => {
    try {
      if (selectedusers) data["pc_users"] = selectedusers;
      let endpoint = getAbsoluteURL("controllers/settings");
      setSubmitting(true);
      axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        url: endpoint,
        data: data,
      })
        .then((response) => {
          console.log("Settings data: Client side", response.data.data);
          notify({
            success: response.data.code === 200,
            message: response.data.message,
          });
          if (response.data.code === 200) {
            setconfigurationsettings([response.data.data]);
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
    } catch (error) {
      notify({ success: false, message: "Something went wrong" });
    }
  };

  return (
    <Box>
      
      <Container fluid className="px-0">
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group as={Row}>
          
            <Form.Label column lg="6" className="py-0">
              <span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                Mail to be send
              </span>
            </Form.Label>
            <Col lg="6" className="py-0">
              <Form.Group className="position-relative">
                <Select
                  menuPlacement="auto"
                  closeMenuOnSelect={false}
                  isMulti
                  value={selectedusers}
                  onChange={setSelectedusers}
                  options={users}
                  noOptionsMessage={() => "No users found!"}
                />
                {/* <option value={"null"}>Select Users</option>
                    {users && users.map(({ id, email }, index) => (
                      <option key={index} value={id}>
                        {email}
                      </option>
                    ))} */}
                {/* </Form.Select> */}
                {/* )} */}
                {/* <ErrorMsg errorMessage={errors.selectedusers?.message} /> */}
              </Form.Group>
              {/* <Stack className=" mt-3  justify-content-end align-items-end ">
              <Button variant="outlineDark" type="submit" className='save' disabled={sending}>
                {sending ? "sending..." : "Send "}
              </Button>
              </Stack> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column lg="6" className="py-0">
              <span className="f-10 f-500 uppercase mb-1 d-block text-dark">
                PAN card configuration
              </span>
              (Max days to upload Employee PAN card attachment)
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                {...register("pancard_upload_max_days")}
              />
              <span className="error-msg">
                {errors.pancard_upload_max_days?.message}
              </span>
            </Col>
            {/* <Form.Label column lg="6" className="py-0">

<span className="f-13 f-500 uppercase mb-4 d-block text-dark">

 Trigger welcome email on employee onboard

</span>

</Form.Label>

<Col lg="6" className="py-0">

<Form.Select

            {...register("change")}

            className="form-control-select"

          >

            <option value={"null"}>Select Option</option>

            <option value={true}>Yes</option>

            <option value={false}>No</option>

            </Form.Select>

</Col> */}
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column lg="6" className="py-0">
              <span className="f-13 f-500 uppercase mb-4 d-block text-dark">
                Trigger welcome email on employee onboard
              </span>
            </Form.Label>
            <Col lg="6" className="py-0">
              <Form.Select
                {...register("change")}
                className="form-control-select"
              >
                <option value={"null"}>Select Option</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Stack className="mt-3 justify-content-end align-items-end">
            <Button
              variant="outlineDark"
              type="submit"
              className="save"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </Form>
      </Container>
    </Box>
  );
}

export default ConfigurationSettings;


