import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Nav,
  Container,
  Dropdown,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import SideNav from "./SideNav";
import { ToastContainer, toast } from "react-toastify";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  MsalAuthenticationTemplate,
} from "@azure/msal-react";
import { loginRequest } from "../../lib/authConfig";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import PageLoaderComponent from "./PageLoaderComponent";
import Box from "./Box";
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import CircleLoader from "./CircleLoader";
import LoginErrorMsg from "./LoginErrorMsg";
import SubTitle from "./SubTitle";
import MenuBar from "../Icons/MenuBar";
import Span from "./Span";
import Label from "./Label";

function Layout(props) {
  const router = useRouter();
  const { instance, inProgress } = useMsal();
  const [accesstoken, setAccesstoken] = useState(null);
  const [userAvailable, setUserAvailable] = useState(false);
  const [userAllowed, setUserAllowed] = useState(false);
  const [settings, setSettings] = useState(false);
  const [admins, setAdmins] = useState([]);

  const checkUserAvailable = async (token) => {
    const endpoint = getAbsoluteURL(
      `controllers/users/checkUserAvailability?page=${router.pathname}`
    );
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("bhau", res);
        setAccesstoken(token);
        setUserAllowed(true);
        setAdmins(res.data.admins);
        setUserAvailable(res.data.data);
      })
      .catch((err) => {
        setAccesstoken(null);
        setUserAvailable(false);
        let error_code = "internal_server_error";
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 440) {
            error_code = "login_session_expired";
            frontendLogout(error_code);
          } else if (err.response.status === 404) {
            error_code = "user_not_found";
            frontendLogout(error_code);
          } else if (err.response.status === 403) {
            setAccesstoken(token);
            setUserAvailable(err.response.data.data);
          }
        }
        setUserAllowed(false);
      });
  };
  const frontendLogout = async (error_code) => {
    await instance.logoutRedirect({
      onRedirectNavigate: () => {
        // Return false if you would like to stop navigation after local logout
        return false;
      },
    });
    router.push(`/login?error_code=${error_code}`);
  };
  useEffect(() => {
    if (accesstoken) {
      try {
        let endpoint = getAbsoluteURL("controllers/settings");
        axios
          .get(endpoint, {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          })
          .then((response) => {
            setSettings([...response.data.data]);
            response.data.data.forEach((setting) => {
              if (setting["name"] == "theme_mode")
                document.body.classList.add(setting["value"]);
            });
          })
          .catch((_error) => {
            setSettings(false);
          });
      } catch (err) {
        setSettings(false);
      }
    }
  }, [accesstoken]);
  useEffect(() => {
    if (!accesstoken && inProgress === InteractionStatus.None) {
      msalAuthentication();
    }
    async function msalAuthentication() {
      const request = {
        ...loginRequest,
        account: instance.getActiveAccount(),
      };

      try {
        let ATSResponse = await instance.acquireTokenSilent(request);
        await checkUserAvailable(ATSResponse.accessToken);
      } catch (error) {
        try {
          if (
            [
              "consent_required",
              "interaction_required",
              "login_required",
            ].includes(error?.errorCode)
          ) {
            let ATPResponse = await instance.acquireTokenPopup(request);
            await checkUserAvailable(ATPResponse.accessToken);
          }
        } catch (_error) {
          frontendLogout("internal_server_error");
        }
      }
    }
  }, [inProgress, accesstoken, instance]);

  const toastId = React.useRef(null);

  const notify = ({ message, success, warning }) => {
    if (!toast.isActive(toastId.current)) {
      let type = warning ? "warning" : success ? "success" : "error";
      toastId.current = toast(message, {
        toastId: message,
        autoClose: 5000,
        type: type,
      });
    }
  };
  const openMenu = (e) => {
    e.preventDefault();
    document.body.classList.toggle("expand-menu");
  };
  const SignInButton = () => {
    const handleLogin = async () => {
      await instance.loginRedirect(loginRequest);
    };
    return (
      <Button
        variant="outline-secondary"
        onClick={handleLogin}
        className="ms-2"
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
          className="feather feather-log-in"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>{" "}
        <Span className="d-none d-sm-inline ms-2">Login</Span>
      </Button>
    );
  };
  const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
  const SignOutButton = () => {
    const handleLogout = async () => {
      await instance.logoutRedirect();
    };
    const onDrop = (acceptedFiles) => {
      let endPoint = getAbsoluteURL(
        "controllers/users/currentUserUpdate?update_type=profile_pic"
      );
      let formData = new FormData();
      formData.append("profile_pic", acceptedFiles[0]);
      setProfilePictureUpdate(true);
      axios({
        method: "PUT",
        url: endPoint,
        data: formData,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200) {
            setUserAvailable(Object.assign({}, response.data.data));
          }
          setProfilePictureUpdate(false);
        })
        .catch((error) => {
          //handle error
          let error_msg = "Something went wrong";
          if (error.response) {
            if (error.response.data) {
              error_msg = error.response.data.message;
            }
          }
          notify({ success: false, message: error_msg });
          setProfilePictureUpdate(false);
        });
    };
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="white" className={`p-0`}>
          <Span className="d-flex align-items-center position-relative">
            <CircleLoader
              isLoading={profilePictureUpdate}
              size="sm"
              profile="profile"
            />
            <img
              src={
                userAvailable.profile_pic
                  ? userAvailable.profile_pic
                  : "/images/avatar.jpg"
              }
              alt={userAvailable.username}
              className="avatar "
            />
          </Span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={`pt-0`}>
          <Box className="d-flex justify-content-center mb-3 ">
            <Box className="position-relative">
              <CircleLoader
                isLoading={profilePictureUpdate}
                size="lg"
                profile="profile"
              />
              <ProfilePhotoComponent
                imageUrl={userAvailable.profile_pic}
                user={userAvailable}
                admins={admins}
                onDropFiles={onDrop}
                size="lg"
                isShadow="no-shadow"
              />
            </Box>
          </Box>
          <SubTitle
            className="mt-3  mb-1"
            title={userAvailable.username?.replace(/[^a-zA-Z ]/g, " ")}
          />
          <Label className="m-0">{userAvailable.email}</Label>
          <br />
          <Label className="dark-text">{userAvailable.user_level}</Label>
          <br />
          <Badge bg="outline-secondary" className="my-3 f-14">
            <Link href="/profile">
              <a className="plain-anchor">Manage Your EMS Account</a>
            </Link>
          </Badge>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const ErrorComponent = ({ error }) => {
    return <LoginErrorMsg errorMsg={error?.errorMessage} />;
  };
  const [authloadingMsg] = useState(false);
  const Loading = () => {
    return <PageLoaderComponent isauthLoading={authloadingMsg} />;
  };
  const SignInSignOutButton = () => {
    const isAuthenticated = useIsAuthenticated();
    if (isAuthenticated) {
      return <SignOutButton />;
    } else if (
      inProgress !== InteractionStatus.Startup &&
      inProgress !== InteractionStatus.HandleRedirect
    ) {
      return <SignInButton />;
    } else {
      return null;
    }
  };
  const authRequest = {
    ...loginRequest,
  };
  return (
    <>
      <ToastContainer />
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}
        errorComponent={ErrorComponent}
        loadingComponent={Loading}
      >
        {userAvailable ? (
          <>
            <Navbar bg="ems-navbar" expand="lg" variant="dark">
              <Container fluid className="ps-0">
                <Span className="d-flex align-items-center nav-brand-box">
                  <Navbar.Brand href="/">
                    <img src="/images/logo-blue.svg" className="expand-logo" />
                  </Navbar.Brand>
                  <Navbar.Brand href="/">
                    <img src="/images/logo-icon.png" className="icon-logo" />
                  </Navbar.Brand>
                  <MenuBar className="menu-bar" isClick={openMenu} />
                </Span>
                <Nav className="ms-auto d-flex align-items-center">
                  <img
                    src="/images/brand-logo.png"
                    style={{ width: "120px" }}
                  />
                  <SignInSignOutButton />
                </Nav>
              </Container>
            </Navbar>
            <Box className="main-wrapper">
              <SideNav
                userAvailable={userAvailable}
                accesstoken={accesstoken}
                admins={admins}
                uRoles={userAvailable.roles}
                loggeduseremail={userAvailable.email}
              />
              <Box className="content-wrapper">
                {userAllowed ? (
                  React.cloneElement(props.children, {
                    accesstoken,
                    notify,
                    settings,
                    admins,
                    userAvailable,
                    userRoles: userAvailable.roles,
                    loggeduseremail: userAvailable.email,
                  })
                ) : (
                  <Box className="full_wrapper">
                    <Container>
                      <Row>
                        <Col
                          md={{ span: 8, offset: 2 }}
                          className="text-center"
                        >
                          <Box className="table-wrapper d-flex p-4 align-items-center justify-content-center">
                            <Box className="flex-1">
                              <img
                                src="/images/error.svg"
                                style={{ width: "230px" }}
                              />
                            </Box>
                            <Box className="ms-5 flex-1 text-left">
                              <h6>Unauthorized to view this page</h6>
                              <Button
                                onClick={() => router.back()}
                                variant="outline-secondary"
                                className="delete text-center"
                              >
                                Back
                              </Button>
                            </Box>
                          </Box>
                        </Col>
                      </Row>
                    </Container>
                  </Box>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Loading />
        )}
      </MsalAuthenticationTemplate>
    </>
  );
}
export default Layout;
