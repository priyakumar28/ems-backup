import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Accordion,
  Stack,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  siteSettingsSchema,
  configurationSettingsSchema,
} from "../../lib/yupHelpers";
import axios from "axios";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { isValidURL, ac } from "../../lib/helpers";
import Meta from "../Meta";
import DataSetContainer from "../Shared/DataSetContainer";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import Divider from "../Shared/Divider";
import ErrorMsg from "../Shared/ErrorMsg";
import ConfigurationSettings from "./ConfigurationSettings";
import EmployerDocuments from "./EmployerDocuments";
import Courses from "./Courses";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import Select from "react-select";

import P from "../Shared/P";
//import Input from 'react-select/dist/declarations/src/components/Input';
const schema = yup
  .object()
  .shape(siteSettingsSchema, configurationSettingsSchema);
function Settings(props) {
  const {
    accesstoken,
    notify,
    settings,
    userRoles,
    loggeduseremail,
    employees,
    admins,
    showEDR,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [theme] = useState(false);
  const [favicon, setFavicon] = useState(false);
  const [logo, setLogo] = useState(false);
  const [siteSettings, setsiteSettings] = useState([]);
  const [userrs, setUserrs] = useState([]);
  const [maxdays, setmaxdays] = useState();
  const [selectedusers, setSelectedusers] = useState(false);
  const [users, setUsers] = useState(false);
  const [sending, setSending] = useState(false);
  const [configurationsettings, setconfigurationsettings] = useState([]);
  const [emparr, setEmparr] = useState(employees);
  const [selectedprojemp, setSelectedProjEmp] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  React.useEffect(() => {
    const subscription = watch(() => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);
  const initialFormData = Object.freeze({
    logo: null,
    favicon: null,
  });
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const [formData, updateFormData] = React.useState(initialFormData);

  useEffect(() => {
    setsiteSettings(
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
    if (siteSettings && typeof siteSettings == "object") {
      siteSettings.forEach((siteSetting) => {
        if (schema._nodes.includes(siteSetting["name"])) {
          setValue(siteSetting["name"], siteSetting["value"]);
          if (siteSetting["name"] == "logo") setLogo(siteSetting["value"]);
          if (siteSetting["name"] == "favicon")
            setFavicon(siteSetting["value"]);
        }
      });
    }
  }, [siteSettings]);
  // useEffect(() => {
  //     if (configurationsettings && typeof configurationsettings == "object") {
  //         configurationsettings.forEach(configurationsetting => {
  //             if (schema._nodes.includes(configurationsetting['name'])) {
  //                 setValue(
  //                     configurationsetting['name'],
  //                     configurationsetting['value']
  //                 );
  //                 if (configurationsetting["name"] == "pancard_upload_max_days") {
  //                     setmaxdays(configurationsetting["value"]);

  //                 }
  //             }
  //         });
  //     }
  // }, [configurationsettings]);
  const onSubmitHandler = async (data) => {
    try {
      console.log("jwt malformed");
      if (selectedusers) data["ss_users"] = JSON.stringify(selectedusers);
      const formDataa = new FormData();
      for (const property in data) {
        if (data[property] == "null") data[property] = null;
        if (typeof data[property] == "string" && data[property]?.trim() == "")
          data[property] = null;
        if (data[property]) formDataa.append(property, data[property]);
      }
      if (formData.favicon) {
        formDataa.append("favicon", formData.favicon);
      }
      if (formData.logo) {
        formDataa.append("logo", formData.logo);
      }
      console.log(">>>>>>>", formDataa);
      let endpoint = getAbsoluteURL("controllers/settings");
      setSubmitting(true);
      axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        url: endpoint,
        data: formDataa,
      })
        .then((response) => {
          notify({
            success: response.data.code === 200,
            message: response.data.message
          });
          if (response.data.code === 200) {
            console.log(".......", response);
            //setLogo(response.data.data[2].value);
            setsiteSettings([response.data.data]);
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
    updateFormData({ ...initialFormData });
  };

  const changeTheme = (e) => {
    if (e.target.value === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  const handleChangeImage = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Box>
      <DataSetContainer className="mt-1">
        <Container fluid className="px-0">
          <Meta title="EMS - Settings" />
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
                </Form.Group>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-4">
              <Form.Label column lg="6" className="pt-0">
                <Span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                  Brand name
                </Span>
              </Form.Label>
              <Col lg="6">
                <Form.Control placeholder="" {...register("site_title")} />
                <ErrorMsg errorMessage={errors.site_title?.message} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-4">
              <Form.Label column lg="4" className="pt-0">
                <Span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                  Favicon
                </Span>
                .ico (Maximum resolution should be 17 * 17)
              </Form.Label>
              <Col lg="2" className="text-md-right">
                {isValidURL(favicon) && <img src={favicon} />}
              </Col>
              <Col sm="6">
                <Box>
                  <Form.Control
                    {...register("favicon")}
                    name="favicon"
                    className="form-control"
                    accept="image/x-icon"
                    multiple={false}
                    type="file"
                    onChange={handleChangeImage}
                  />
                </Box>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-4">
              <Form.Label column lg="3" className="pt-0">
                <Span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                  logo
                </Span>
                .svg , .png or .jpg (Max 180 * 50)
              </Form.Label>
              <Col lg="3" className="text-md-right">
                {isValidURL(logo) && <img src={logo} />}
              </Col>
              <Col sm="6">
                <Box>
                  <Form.Control
                    {...register("logo")}
                    name="logo"
                    className="form-control"
                    accept="image/jpg,image/png,image/jpeg,image/svg+xml"
                    multiple={false}
                    type="file"
                    onChange={handleChangeImage}
                  />
                </Box>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-4">
              <Form.Label column lg="6" className="pt-0">
                <Span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                  About us
                </Span>
              </Form.Label>
              <Col lg="6">
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={4}
                  {...register("about_us")}
                  placeholder="About us"
                />
                <ErrorMsg errorMessage={errors.about_us?.message} />
              </Col>
            </Form.Group>
            {/* <Form.Group as={Row} className="mt-4">
              <Form.Label column lg="6" className="pt-0">
                <Span className="f-13 f-500 uppercase mb-0 d-block text-dark">
                  Theme Settings
                </Span>
              </Form.Label>
              <Col lg="6">
                <Form.Select {...register("theme_mode")} onChange={changeTheme}>
                  <option defaultValue={theme == "light"} value={"light"}>
                    Light
                  </option>
                  <option defaultValue={theme == "dark"} value={"dark"}>
                    Dark
                  </option>
                </Form.Select>
                <ErrorMsg errorMessage={errors.theme_mode?.message} />
              </Col>
            </Form.Group> */}
            <Container fluid className="px-0">
              <Stack className="mt-4 pe-2 justify-content-end align-items-end pe-1">
                <Button
                  variant="outlineDark"
                  type="submit"
                  className="save"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </Stack>
            </Container>

            {/* <Box>
                            <Container fluid className='px-0'>
                                {ac(userRoles, "Brand name", loggeduseremail, admins) ?
                                    <>
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
                                                    
                                                </Form.Group>
                                               
                                            </Col>
                                        </Form.Group>

                                    </>
                                    : ""}
                                {ac(userRoles, "Brand name", loggeduseremail, admins) ?
                                    <>
                                        <Form.Group as={Row} className='mt-4'>
                                            <Form.Label column lg="6" className='pt-0'>
                                                <Span className='f-13 f-500 uppercase mb-0 d-block text-dark'>Brand name</Span>
                                            </Form.Label>
                                            <Col lg='6'>
                                                <Form.Control placeholder="" {...register("site_title")} />
                                                <ErrorMsg errorMessage={errors.site_title?.message} />
                                            </Col>
                                        </Form.Group>

                                    </>
                                    : ""}
                                {ac(userRoles, "Favicon", loggeduseremail, admins) ? <>
                                    <Form.Group as={Row} className='mt-4'>
                                        <Form.Label column lg="4" className='pt-0'>
                                            <Span className='f-13 f-500 uppercase mb-0 d-block text-dark'>Favicon</Span>
                                            .ico (Maximum resolution should be 17 * 17)
                                        </Form.Label>
                                        <Col lg="2" className='text-md-right'>
                                            {isValidURL(favicon) && <img src={favicon} />}
                                        </Col>
                                        <Col sm="6">
                                            <Box>
                                                <Form.Control {...register('favicon')} name="favicon" className='form-control' accept='image/x-icon' multiple={false} type="file" onChange={handleChangeImage} />
                                            </Box>
                                        </Col>
                                    </Form.Group>

                                </> : ""}
                                {ac(userRoles, "Logo", loggeduseremail, admins) ? <>
                                    <Form.Group as={Row} className='mt-4'>
                                        <Form.Label column lg="3" className='pt-0'>
                                            <Span className='f-13 f-500 uppercase mb-0 d-block text-dark'>Logo</Span>
                                            .svg , .png or .jpg (Max 180 * 50)
                                        </Form.Label>
                                        <Col lg="3" className='text-md-right'>
                                            {isValidURL(logo) && <img src={logo} />}
                                        </Col>
                                        <Col sm="6">
                                            <Box>
                                                <Form.Control {...register('logo')} name="logo" className='form-control' accept='image/jpg,image/png,image/jpeg,image/svg+xml' multiple={false} type="file" onChange={handleChangeImage} />
                                            </Box>
                                        </Col>
                                    </Form.Group>

                                </> : ""}
                                {ac(userRoles, "About us", loggeduseremail, admins) ? <>
                                    <Form.Group as={Row} className='mt-4'>
                                        <Form.Label column lg="6" className='pt-0'>
                                            <Span className='f-13 f-500 uppercase mb-0 d-block text-dark'>About us</Span>
                                        </Form.Label>
                                        <Col lg='6'>
                                            <Form.Control type="text" as="textarea" rows={4} {...register("about_us")} placeholder="About us" />
                                            <ErrorMsg errorMessage={errors.about_us?.message} />
                                        </Col>
                                    </Form.Group>

                                </> : ""}
                                {ac(userRoles, "Theme settings", loggeduseremail, admins) ?
                                    <Form.Group as={Row} className='mt-4'>
                                        <Form.Label column lg="6" className='pt-0'>
                                            <Span className='f-13 f-500 uppercase mb-0 d-block text-dark'>Theme Settings</Span>
                                        </Form.Label>
                                        <Col lg='6'>
                                            <Form.Select {...register("theme_mode")} onChange={changeTheme}>
                                                <option defaultValue={theme == 'light'} value={'light'}>Light</option>
                                                <option defaultValue={theme == 'dark'} value={'dark'}>Dark</option>
                                            </Form.Select>
                                            <ErrorMsg errorMessage={errors.theme_mode?.message} />
                                        </Col>
                                    </Form.Group> : ""}
                            </Container>
                            <Container fluid className='px-0'>
                                <Stack className='mt-4 pe-2 justify-content-end align-items-end pe-1'>
                                    <Button variant="outlineDark" type="submit" className='save' disabled={submitting}>
                                        {submitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </Stack>
                            </Container>
                        </Box> */}
          </Form>
        </Container>
      </DataSetContainer>
    </Box>
  );
}
export default Settings;
