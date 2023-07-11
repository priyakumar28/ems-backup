import React, { useState, useEffect } from 'react';
import { Modal, Container, Dropdown, Form, Row, Col, Stack, Button, Tabs, Tab } from 'react-bootstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import getAbsoluteURL from '../../utils/getAbsoluteURL';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from '../Icons/SearchIcon';
import MailIcon from '../Icons/MailIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import CloseIcon from '../Icons/CloseIcon';
import CheckIcon from '../Icons/CheckIcon';
import WarningIcon from '../Icons/WarningIcon';
import Meta from '../Meta';
import Span from '../Shared/Span';
import Box from '../Shared/Box';
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import Select from "react-select";
import ErrorMsg from "../Shared/ErrorMsg";
import DeleteAndDiscard from '../Shared/DeleteAndDiscard';
import { ac } from "../../lib/helpers";
import SubTitle from '../Shared/SubTitle';
import AddIcon from '../Icons/AddIcon';
import EmsModal from '../Shared/EmsModal';
import EmsModalHeader from '../Shared/EmsModalHeader';
import EmsModalClose from '../Shared/EmsModalClose';
import EmsModalBody from '../Shared/EmsModalBody';
import SaveIcon from '../Icons/SaveIcon';
import { employerDocumentsSchema } from "../../lib/yupHelpers";

const schema = yup.object().shape(employerDocumentsSchema);

function EmployerDocuments(props) {
    const {
        accesstoken, notify, userRoles, loggeduseremail, admins
    } = props;
    const [employeralldocuments, setEmployerAllDocuments] = useState([]);
    const [employerdocuments, setEmployerDocuments] = useState([]);
    const [employerdocumentId, setemployerdocumentId] = useState(false);
    const [selectedDocument, setselectedDocument] = useState(false);
    const [show, setShow] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [showAddDocumentModal, setshowAddDocumentModal] = useState(false);
    const [fetchingDocuments, setFetchingDocuments] = useState(false);

    const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		setError, clearErrors, setValue, reset
    } = useForm({ resolver: yupResolver(schema) });
    
    let config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        }
    };

    useEffect(() => {
        try {
            let endpoint = getAbsoluteURL("controllers/employees");
            axios
                .get(endpoint, config)
                .then((response) => {
                    if (response.data.code == 200) {
                        let employeesList = response.data.data;
                        setEmployees(employeesList);
                    }
                })
                .catch(() => { });
        } catch (err) { }
    }, []);
    
    const resetDocs = () => {
        setFetchingDocuments(false);
        setEmployerDocuments([]);
        setEmployerAllDocuments([]);
    }
    
    useEffect(() => {
        try {
            setFetchingDocuments(true);
            let endpoint = getAbsoluteURL('controllers/employerdocuments');
            axios.get(endpoint, config).then(response => {
                setFetchingDocuments(false);
                setEmployerDocuments(response.data.data);
                setEmployerAllDocuments(response.data.data);
            }).catch(_error => {
                resetDocs();
            });
        } catch (err) {
            resetDocs();
        }
    }, []);

    useEffect(() => {
        setselectedDocument(employerdocumentId ? employerdocuments.find(x => x.id == employerdocumentId) : false);
    }, [employerdocumentId]);

    const Loader = () => {
		return <div className="loader xs green"></div>;
	};
    
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = employeralldocuments?.filter((doc) => {
                return (
                    doc.name?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.approval_status?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.doc_type?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.employee.code?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.employee.name?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.employee.email?.toLowerCase()?.includes(keyword.toLowerCase()) ||
                    doc.employee.status?.toLowerCase()?.includes(keyword.toLowerCase())
                );
            });
            setEmployerDocuments([...results]);
        } else {
            setEmployerDocuments([...employeralldocuments]);
        }
    };

    const openAddDocumentModal = () => {
        reset();
        setshowAddDocumentModal(true);
    }

    const onCloseAddDocumentModal = () => {
        setshowAddDocumentModal(false);
    }

    const onSubmitHandler = async (data) => {
        let endPoint = getAbsoluteURL('controllers/employerdocuments');
        let formData = new FormData();

        data.document = data.document[0];
        formData.append(data.document.name, data.document);
        formData.append('doc_type', data.doc_type);
        formData.append('employee', data.employee);
        formData.append('level', data.level);

        setSubmitting(true);
        axios({
            method: "POST",
            url: endPoint,
            data: formData,
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response.data.code === 200) {
                reset();
                onCloseAddDocumentModal();
                let newDoc = response.data.data;
                employerdocuments.push(newDoc);
                setEmployerDocuments([...employerdocuments]);
                setEmployerAllDocuments([...employerdocuments]);
            }
            setSubmitting(false);
            notify({ success: (response.data.code == 200), message: response.data.message });
        }).catch(error => {
            console.log(error);
            let error_msg = 'Something went wrong';
            if (error.response) {
                if (error.response.data) {
                    error_msg = error.response.data.message;
                }
            }
            setSubmitting(false);
            notify({ success: false, message: error_msg });
        });
    }

    const fileExt = (filename) => {
        return filename?.split('.')?.pop()?.toLowerCase();
    }

    const baseName = (str) => {
        if (typeof str !== 'string') return;
        let frags = str.trim().split('.');
        return frags.splice(0, frags.length - 1).join('.').replace(/[^a-zA-Z0-9]/g, " ").replace(/\s{2,}/g, ' ');
    }

    const handleShow = (type) => {
        let showw = show;
        setShow(false);
        setTimeout(() => { setShow({ ...showw, [type]: true }); }, 100);
    }

    const handleClose = (type) => {
        let showw = show;
        setShow(false);
        setTimeout(() => { setShow({ ...showw, [type]: false }); }, 100);
    }
   
    const closeDeleteDocumentModal = () => {
        handleClose('delete_employerdocument'); setemployerdocumentId(false); setSubmitting(false);
    }

    const deleteDocument = async () => {
        let endpoint = getAbsoluteURL(`controllers/employerdocuments?id=${employerdocumentId}&doc_type=${selectedDocument.doc_type}`);
        setSubmitting(true);
        axios(Object.assign({
            method: 'DELETE',
            url: endpoint
        }, config)).then((response) => {
            notify({ success: (response.data.code === 200), message: response.data.message });
            if (response.data.code === 200) {
                let employerdocumentss = employerdocuments;
                let ehIndex = employerdocumentss.findIndex(x => x.id == employerdocumentId);
                if (ehIndex > -1) {
                    employerdocumentss.splice(ehIndex, 1);
                }
                setEmployerDocuments([]);
                setEmployerAllDocuments([]);
                setTimeout(() => { setEmployerDocuments([...employerdocumentss]); }, 100);
                setTimeout(() => { setEmployerAllDocuments([...employerdocumentss]); }, 100);
                closeDeleteDocumentModal();
            }
            setSubmitting(false);
        }).catch((error) => {
            console.log(error);
            let error_msg = 'Something went wrong';
            if (error.response) {
                error_msg = error.response.data.message;
            }
            setSubmitting(false);
            notify({ success: false, message: error_msg });
        });
    }

    const sendDocument = async (id) => {
        let endpoint = getAbsoluteURL(`controllers/employerdocuments?id=${id}`);
        setemployerdocumentId(id);
        setSubmitting(true);
        axios.get(endpoint, config).then(response => {
            notify({ success: (response.data.code == 200), message: response.data.message });
            setSubmitting(false);
            setemployerdocumentId(false);
        }).catch(error => {
            setSubmitting(false);
            setemployerdocumentId(false);
            notify({ success: false, message: "Something went wrong" });
        });
    }

    const handleChangeStatus = async (doc_id, status) => {
        let endPoint = getAbsoluteURL(`controllers/employerdocuments?id=${doc_id}`);
        let formData = new FormData();
        formData.append('doc_status', status);
        handleShow(`doc_${doc_id}`);
        axios({
            method: "PUT",
            url: endPoint,
            data: formData,
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            handleClose(`doc_${doc_id}`);
            if (response.data.code == 200) {
                let existingDocs = employerdocuments;
                let selectedDocIndex = existingDocs.findIndex((x) => x.id == doc_id);
                existingDocs[selectedDocIndex]["approval_status"] = status;
                setEmployerDocuments([]);
                setTimeout(() => { setEmployerDocuments([...existingDocs]); }, 100);
            }
            notify({ success: (response.data.code == 200), message: response.data.message });
        }).catch(error => {
            let error_msg = 'Something went wrong';
            if (error.response) {
                if (error.response.data) {
                    error_msg = error.response.data.message;
                }
            }
            notify({ success: false, message: error_msg });
            handleClose(`doc_${doc_id}`);
        });
    }

    return (
        <Box className="p-3">
            <Meta title="EMS - Employer Documents" />
            <Box className='d-flex position-relative'>
                <Form size="large" className='search-form-wrapper d-flex'>
                    <Form.Group className="mb-0 position-relative search-form" controlId="formBasicEmail">
                        <Form.Control placeholder="Search..." type="input" onChange={filter} className="input" />
                        <Span className='search-icon-btn'>
                            <SearchIcon />
                        </Span>
                    </Form.Group>
                </Form>
            </Box>
            <Container fluid className='px-0'>
                <Row>
                    <Col>
                        <Box className="d-flex justify-content-between align-items-center mb-3">
                            <Span>
                                <SubTitle title="Employer documents" />
                            </Span>
                                {(ac(userRoles, "Create HR assessment forms", loggeduseremail, admins) ||
                                    ac(userRoles, "Create L1 assessment forms", loggeduseremail, admins) ||
                                    ac(userRoles, "Create REX approval forms", loggeduseremail, admins)) &&
                                    <Span className="d-flex Zy49_xyt">
                                        <Button variant="white" onClick={openAddDocumentModal} className="ms-0 border-0">
                                            <AddIcon />
                                        </Button>
                                    </Span>
                                }
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="hr-assessment-forms" className="mb-3">
                        <Tab eventKey="hr-assessment-forms" tabClassName="tab-title-color" title="HR assessment forms">
                            <Box className='employee_Data_Record_Container documents mt-2 mt-lg-0'>
                                {employerdocuments && employerdocuments?.length > 0 && employerdocuments.map(({ id, name, approval_status, doc_type, employee }, index) => (
                                    (doc_type === 'HR assessment forms') ? (
                                        <Box className='position-relative' key={index}>
                                            {ac(userRoles, "View HR assessment forms", loggeduseremail, admins) &&
                                                <div>
                                                    <Box title={name} className='doc-upload'>
                                                        <label className='d-block'>{name}</label>
                                                        <FileIcon extension={fileExt(name)} {...defaultStyles[fileExt(name)]} style={{ width: '150px' }} />
                                                        <Box className="document-action-wrapper">
                                                            {ac(userRoles, "View HR assessment forms", loggeduseremail, admins) &&
                                                                <Span disabled={submitting} title="Send document to my mail" className='action-wrapper' isClick={() => { sendDocument(id)}}>
                                                                    {employerdocumentId == id ? <Loader /> : <MailIcon />}
                                                                </Span>
                                                            }
                                                            {ac(userRoles, "Delete HR assessment forms", loggeduseremail,admins) &&
                                                                <Span title="Delete document" className='action-wrapper' isClick={() => { handleShow('delete_employerdocument'); setTimeout(() => { setemployerdocumentId(id); }, 500); }}>
                                                                    <DeleteIcon />
                                                                </Span>
                                                            }
                                                        </Box>
                                                    </Box>
                                                    <p>Employee name: {employee.name}</p>
                                                    <p>Employee code: {employee.code}</p>
                                                    <p>Employee mail: {employee.email}</p>
                                                    <p>Employee status: {employee.status}</p>
                                                </div>
                                            }
                                            {ac(userRoles, "Update HR assessment form status", loggeduseremail, admins) &&
                                                <Dropdown className='doc-status-dropdown'>
                                                    <Dropdown.Toggle variant="white" id="dropdown-basic" className='doc-sts-btn'>
                                                        <Span className='approved'>{(approval_status == "Approved") ? (<CheckIcon />) : ""}</Span>
                                                        <Span className='rejected'>{approval_status == "Rejected" ? <CloseIcon /> : ""}</Span>
                                                        <Span className='pending'>{approval_status == "Pending" ? <WarningIcon /> : ""}</Span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Approved"} onClick={() => handleChangeStatus(id, "Approved")}><CheckIcon /> Approved</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Rejected"} onClick={() => handleChangeStatus(id, "Rejected")}><CloseIcon /> Rejected</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Pending"} onClick={() => handleChangeStatus(id, "Pending")}><WarningIcon /> Pending</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                        </Box>
                                    ) : (null)
                                ))}
                            </Box>
                            {!employerdocuments || employerdocuments?.filter(x => x.doc_type == 'HR assessment forms')?.length == 0 && (
                                <NoResultsWrapper className="text-center" rotateImageClass={fetchingDocuments ? 'rotate' : ''} title={ fetchingDocuments? "Fetching documents..." : "No documents found"}/>
                            )}
                        </Tab>
                        <Tab eventKey="l1-assessment-forms" tabClassName="tab-title-color" title="L1 assessment forms">
                            <Box className='employee_Data_Record_Container documents mt-2 mt-lg-0'>
                                {employerdocuments && employerdocuments?.length > 0 && employerdocuments.map(({ id, name, approval_status, doc_type, employee }, index) => (
                                    (doc_type === 'L1 assessment forms') ? (
                                        <Box className='position-relative' key={index}>
                                            {ac(userRoles, "View L1 assessment forms", loggeduseremail, admins) &&
                                                <>
                                                    <Box title={name} className='doc-upload'>
                                                        <label className='d-block'>{name}</label>
                                                        <FileIcon extension={fileExt(name)} {...defaultStyles[fileExt(name)]} style={{ width: '150px' }} />
                                                        <Box className="document-action-wrapper">
                                                            {ac(userRoles, "View L1 assessment forms", loggeduseremail, admins) &&
                                                                <Span title="Send document to mail" className='action-wrapper' isClick={() => { sendDocument(id) }}>
                                                                    {employerdocumentId == id ? <Loader /> : <MailIcon />}
                                                                </Span>
                                                            }
                                                            {ac(userRoles, "Delete L1 assessment forms", loggeduseremail,admins) &&
                                                                <Span className='action-wrapper' isClick={() => { handleShow('delete_employerdocument'); setTimeout(() => { setemployerdocumentId(id); }, 500); }}>
                                                                    <DeleteIcon />
                                                                </Span>
                                                            }
                                                        </Box>
                                                    </Box>
                                                    <p>Employee name: {employee.name}</p>
                                                    <p>Employee code: {employee.code}</p>
                                                    <p>Employee mail: {employee.email}</p>
                                                    <p>Employee status: {employee.status}</p>
                                                </>
                                            }
                                            {ac(userRoles, "Update L1 assessment form status", loggeduseremail, admins) &&
                                                <Dropdown className='doc-status-dropdown'>
                                                    <Dropdown.Toggle variant="white" id="dropdown-basic" className='doc-sts-btn'>
                                                        <Span className='approved'>{approval_status == "Approved" ? <CheckIcon /> : ""}</Span>
                                                        <Span className='rejected'>{approval_status == "Rejected" ? <CloseIcon /> : ""}</Span>
                                                        <Span className='pending'>{approval_status == "Pending" ? <WarningIcon /> : ""}</Span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Approved"} onClick={() => handleChangeStatus(id, "Approved")}>Approved</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Rejected"} onClick={() => handleChangeStatus(id, "Rejected")}>Rejected</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Pending"} onClick={() => handleChangeStatus(id, "Pending")}>Pending</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                        </Box>
                                    ) : (null)
                                ))}
                            </Box>
                            {!employerdocuments || employerdocuments?.filter(x => x.doc_type == 'L1 assessment forms')?.length == 0 && (
                                <NoResultsWrapper className="text-center" rotateImageClass={fetchingDocuments ? 'rotate' : ''} title={ fetchingDocuments? "Fetching documents..." : "No documents found"}/>
                            )}
                        </Tab>
                        <Tab eventKey="rex-approval-forms" tabClassName="tab-title-color" title="REX approval forms">
                            <Box className='employee_Data_Record_Container documents mt-2 mt-lg-0'>
                                {employerdocuments && employerdocuments?.length > 0 && employerdocuments.map(({ id, name, approval_status, doc_type, employee }, index) => (
                                    (doc_type === 'REX approval forms') ? (
                                        <Box className='position-relative' key={index}>
                                            {ac(userRoles, "View REX approval forms", loggeduseremail, admins) &&
                                                <>
                                                    <Box title={name} className='doc-upload'>
                                                        <label className='d-block'>{name}</label>
                                                        <FileIcon extension={fileExt(name)} {...defaultStyles[fileExt(name)]} style={{ width: '150px' }} />
                                                        <Box className="document-action-wrapper">
                                                            {ac(userRoles, "View REX approval forms", loggeduseremail, admins) &&
                                                                <Span title="Send document to mail" className='action-wrapper' isClick={() => {sendDocument(id); }}>
                                                                    {employerdocumentId == id ? <Loader /> : <MailIcon />}
                                                                </Span>
                                                            }
                                                            {ac(userRoles, "Delete REX approval forms", loggeduseremail,admins) &&
                                                                <Span className='action-wrapper' isClick={() => { handleShow('delete_employerdocument'); setTimeout(() => { setemployerdocumentId(id); }, 500); }}>
                                                                    <DeleteIcon />
                                                                </Span>
                                                            }
                                                        </Box>
                                                    </Box>
                                                    <p>Employee name: {employee.name}</p>
                                                    <p>Employee code: {employee.code}</p>
                                                    <p>Employee mail: {employee.email}</p>
                                                    <p>Employee status: {employee.status}</p> 
                                                </>
                                            }

                                            {ac(userRoles, "Update REX approval form status", loggeduseremail, admins) &&
                                                <Dropdown className='doc-status-dropdown'>
                                                    <Dropdown.Toggle variant="white" id="dropdown-basic" className='doc-sts-btn'>
                                                        <Span className='approved'>{approval_status == "Approved" ? <CheckIcon /> : ""}</Span>
                                                        <Span className='rejected'>{approval_status == "Rejected" ? <CloseIcon /> : ""}</Span>
                                                        <Span className='pending'>{approval_status == "Pending" ? <WarningIcon /> : ""}</Span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Approved"} onClick={() => handleChangeStatus(id, "Approved")}>Approved</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Rejected"} onClick={() => handleChangeStatus(id, "Rejected")}>Rejected</Dropdown.Item>
                                                        <Dropdown.Item href="javascript:void(0);" disabled={approval_status == "Pending"} onClick={() => handleChangeStatus(id, "Pending")}>Pending</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                        </Box>
                                    ) : (null)
                                ))}
                            </Box>
                            {!employerdocuments || employerdocuments?.filter(x => x.doc_type == 'REX approval forms')?.length == 0 && (
                                <NoResultsWrapper className="text-center" rotateImageClass={fetchingDocuments ? 'rotate' : ''} title={ fetchingDocuments? "Fetching documents..." : "No documents found"}/>
                            )}
                        </Tab>
                    </Tabs>
                </Row>
                <Modal show={show.delete_employerdocument} onHide={closeDeleteDocumentModal} backdrop="static" animation={true} fullscreen={true} keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete employer document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            Are you sure want to delete {baseName(selectedDocument.name)}?
                            <DeleteAndDiscard isSubmitting={submitting} onDelete={deleteDocument} onClose={closeDeleteDocumentModal} />
                        </Container>
                    </Modal.Body>
                </Modal>
                
            </Container>
            <EmsModal className={`${showAddDocumentModal ? "show fade" : ""}`}>
                <EmsModalHeader>
                    <Stack direction="horizontal" className="align-items-center">
                        <SubTitle title="Employer document" />
                    </Stack>
                    <EmsModalClose isClose={onCloseAddDocumentModal} />
                </EmsModalHeader>
                <EmsModalBody className="p-sm-3 py-3">
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
                            <Row>
                                <Col md={12} className="form-grid mt-2">
                                    <Form.Group>
                                        <Form.Label>Select type <Span className="required">*</Span></Form.Label>
                                        <Form.Select className='me-2' onChange={(e) => {}} {...register("doc_type")}>
                                            {ac(userRoles, "Create HR assessment forms", loggeduseremail, admins)&&
                                                <option value="HR assessment forms">HR assessment forms</option>
                                            }
                                            {ac(userRoles, "Create L1 assessment forms", loggeduseremail, admins) &&
                                                <option value="L1 assessment forms">L1 assessment forms</option>
                                            }
                                            {ac(userRoles, "Create REX approval forms", loggeduseremail, admins) &&
                                                <option value="REX approval forms">REX approval forms</option>
                                            }
                                        </Form.Select>
                                        <ErrorMsg errorMessage={errors.doc_type?.message} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Select employee <Span className="required">*</Span></Form.Label>
                                        <Select
                                            menuPlacement="top"
                                            closeMenuOnSelect={true}
                                            onChange={(e) => {
                                                console.log(e);
                                                setValue("employee", e.value);
                                            }}
                                            noOptionsMessage={() => "No employees found!"}
                                            options={employees.map(({ id, work_email }) => ({
                                                value: id,
                                                label: work_email,
                                            }))}
                                        />
                                        <ErrorMsg errorMessage={errors.employee?.message} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Select level <Span className="required">*</Span></Form.Label>
                                        <Select
                                            menuPlacement="top"
                                            closeMenuOnSelect={true}
                                            onChange={(e) => {
                                                console.log(e);
                                                setValue("level", e.label);
                                            }}
                                            noOptionsMessage={() => "No level found!"}
                                            options={[
                                                {value: '1', label: '1'},
                                                {value: '2', label: '2'},
                                                {value: '3', label: '3'},
                                                {value: '4', label: '4'},
                                                {value: '5', label: '5'},
                                                {value: '6', label: '6'},
                                                {value: '7', label: '7'},
                                                {value: '8', label: '8'},
                                                {value: '9', label: '9'},
                                                {value: '10', label: '10'}
                                            ]}
                                        />
                                        <ErrorMsg errorMessage={errors.level?.message} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>
                                            Select document <Span className="required">*</Span>
                                        </Form.Label>
                                        <Form.Control
                                            {...register("document")}
                                            type="file"
                                            accept="application/pdf"
                                        />
                                        <Form.Label>.pdf (Maximum size should be 1 MB)</Form.Label>
                                        <ErrorMsg errorMessage={errors.document?.message} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Stack direction="horizontal" className="pt-3 justify-content-end">
                                <Button variant="save" type="submit" disabled={submitting} className="save">
                                    <SaveIcon className="me-2" />{" "}{submitting ? "Saving..." : "Save"}
                                </Button>
                                <Button variant="outlineDark" onClick={onCloseAddDocumentModal}>
                                    <CloseIcon className="me-2" />Discard
                                </Button>
                            </Stack>
                        </Form>
                    </Container>
                </EmsModalBody>
            </EmsModal>
        </Box>
    )
}
export default EmployerDocuments