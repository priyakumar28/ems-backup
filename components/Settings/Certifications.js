import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Form, Table, Badge, Stack, Modal } from 'react-bootstrap'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getUniqueListBy } from '../../lib/helpers';
import CloseLgIcon from '../Icons/CloseLgIcon';

const schema = yup.object().shape({
    name: yup.string().required().max(100).label("Name"),
    description: yup.string().nullable().max(400).label("Description")
});

function Certifications(props) {
    const { accesstoken, addcertification, notify } = props;
    let config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`
        }
    };
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [showSaveCertification, setShowSaveCertification] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [allCertifications, setallCertifications] = useState([]);
    const [foundCertifications, setfoundCertifications] = useState([]);
    const [fetchingCertifications, setfetchingCertifications] = useState(false);
    const [certificationId, setcertificationId] = useState(false);
    const [show, setShow] = useState({});
    useEffect(() => {
        try {
            let endpoint = getAbsoluteURL('controllers/certifications');
            setfetchingCertifications(true);
            axios.get(endpoint, config).then(response => {
                setallCertifications(response.data.data);
                setfoundCertifications(response.data.data);
                setfetchingCertifications(false);
            }).catch(() => {
                setfetchingCertifications(false);
            });
        } catch (err) {
            setfetchingCertifications(false);
        }
    }, []);
    useEffect(() => {
        let certification = certificationId ? allCertifications.find(x => x.id == certificationId) : false;
        if (certification) {
            for (const property in certification) {
                if (schema._nodes.includes(property)) {
                    setValue(property, certification[property]);
                }
            }
        }
    }, [certificationId]);
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = allCertifications.filter((certification) => {
                return certification.name?.toLowerCase().includes(keyword.toLowerCase()) ||
                    certification.id?.toLowerCase().includes(keyword.toLowerCase()) ||
                    certification.description?.toLowerCase().includes(keyword.toLowerCase())
            });
            setfoundCertifications([...results]);
        } else {
            setfoundCertifications([...allCertifications]);
        }
    };
    const onOpenCertificationForm = (id = null) => {
        setShowSaveCertification(true);
        if (id) {
            setcertificationId(id);
        } else {
            reset(); setcertificationId(false);
        }
    }
    const onCloseCertificationForm = () => {
        setShowSaveCertification(false);
        setcertificationId(false);
        reset();
    }
    const handleShow = (type) => {
        let showw = show;
        setShow(false);
        setTimeout(() => { setShow(Object.assign(showw, { [type]: true })); }, 100);
    }
    const handleClose = (type) => {
        let showw = show;
        setShow(false);
        setTimeout(() => { setShow(Object.assign(showw, { [type]: false })); }, 100);
    }
    const closeDeleteCertificateModal = () => {
        handleClose('delete_certification'); setcertificationId(false);
    }
    const deleteCertificate = async () => {
        let endpoint = getAbsoluteURL(`controllers/certifications?id=${certificationId}`);
        setSubmitting(true);
        axios(Object.assign({
            method: 'DELETE',
            url: endpoint
        }, config)).then((response) => {
            notify({ success: (response.data.code === 200), message: response.data.message });
            if (response.data.code === 200) {
                let acIndex = allCertifications.findIndex(x => x.id == certificationId);
                let fcIndex = foundCertifications.findIndex(x => x.id == certificationId);
                if (acIndex > -1) allCertifications.splice(acIndex, 1);
                if (fcIndex > -1) foundCertifications.splice(fcIndex, 1);
                setTimeout(() => {
                    setallCertifications([...getUniqueListBy(allCertifications, 'id')]);
                    setfoundCertifications([...getUniqueListBy(foundCertifications, 'id')]);
                }, 100);
                closeDeleteCertificateModal();
            }
            setSubmitting(false);
        }).catch((error) => {
            let error_msg = 'Something went wrong';
            if (error.response) {
                error_msg = error.response.data.message;
            } 
            setSubmitting(false);
            notify({ success: false, message: error_msg });
        });
    }
    useEffect(() => {
        reset(); setSubmitting(false);
    }, [addcertification]);
    const onSubmitHandler = async (data) => {
        for (const property in data) {
            if (data[property] == 'null') data[property] = null;
            if (typeof data[property] == 'string' && data[property]?.trim() == '') data[property] = null;
        }
        let endpoint = getAbsoluteURL('controllers/certifications');
        if (certificationId) {
            endpoint = `${endpoint}?id=${certificationId}`;
        }
        // post data in axios
        setSubmitting(true);
        axios(Object.assign({
            method: certificationId ? 'PUT' : 'POST',
            url: endpoint,
            data: data
        }, config)).then((response) => {
            notify({ success: (response.data.code === 200), message: response.data.message });
            if (response.data.code === 200) {
                setShowSaveCertification(false);
                if (certificationId) {
                    let acertificationIndex = allCertifications.findIndex(x => x.id == certificationId);
                    allCertifications[acertificationIndex] = response.data.data;
                    let fcertificationIndex = foundCertifications.findIndex(x => x.id == certificationId);
                    foundCertifications[fcertificationIndex] = response.data.data;
                } else {
                    allCertifications.unshift(response.data.data);
                    foundCertifications.unshift(response.data.data);
                }
                setTimeout(() => {
                    setallCertifications([...getUniqueListBy(allCertifications, 'id')]);
                    setfoundCertifications([...getUniqueListBy(foundCertifications, 'id')]);
                }, 100);
                setcertificationId(false);
            }
            setSubmitting(false);
        }).catch((error) => {
            let error_msg = 'Something went wrong';
            if (error.response) {
                error_msg = error.response.data.message;
            } 
            setSubmitting(false);
            notify({ success: false, message: error_msg });
        });
    }
    return (
        <div className="p-3 ">
            <Container fluid className='px-0'>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <>
                                <Form size="large" className='search-form-wrapper'>
                                    <Form.Group className="mb-0 position-relative search-form" controlId="formBasicEmail">
                                        <Form.Control placeholder="Search" type="search" className="input" onChange={filter} />
                                        <span className='search-icon-btn'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search search-icon"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></span>
                                    </Form.Group>
                                </Form>
                            </>
                            <span>
                                <h6 className='f-14 mb-0 d-none d-xl-block'>Certifications</h6>
                            </span>
                            <span className='d-flex Zy49_xyt'>
                                <Button variant="outlineDark" onClick={() => onOpenCertificationForm()} className="ms-2 ms-md-2 border-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus text-white"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> <span className='d-none d-sm-inline ms-1'>New</span></Button>{' '}
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={`table-wrapper xs-none shadow-wrapper settings ${!showGrid ? '' : ' d-none'}`}>
                            <hr className='mb-0' />
                            <Table>
                                <thead className={` ${foundCertifications?.length > 0 ? '' : 'd-none'}`}>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchingCertifications ? (
                                        <div style={{ paddingTop: '40px', textAlign: 'center' }}>
                                            <div className="loader-item mb-4">
                                                <div className="loader-box">
                                                    <div className="line-scale">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6>Fetching certifications...</h6>
                                        </div>
                                    ) : (foundCertifications && foundCertifications.length > 0) ? (
                                        foundCertifications.map((certification, index) => (
                                            <tr key={index} id={`emp_${certification.id}`}>
                                                <td><Badge bg="light" text="dark" className="f-12">{index + 1}</Badge></td>
                                                <td>{certification.name}</td>
                                                <td>{certification.description ? certification.description : '-'}</td>
                                                <td>
                                                    <span onClick={() => onOpenCertificationForm(certification.id)} className='square_wrapper edit'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></span>
                                                    <span onClick={() => {
                                                        setcertificationId(certification.id);
                                                        handleShow('delete_certification');
                                                    }} className='square_wrapper delete  ms-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <div className='flex_wrapper grid-gap-30 pt-4'>
                                            <img src='/images/no-data.svg' style={{ maxWidth: '240px' }} className="mb-4" />
                                            <div>
                                                <h6>No Certifications found!</h6>
                                                <label>Click  new  button to add certifications</label>
                                            </div>
                                        </div>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div style={{ display: 'none' }} className={`mt-3 responsive-view ${!showGrid ? '' : ' d-block'}`}>
                            <div className={`employee_Card_Container row-gap-15 mt-0  position-relative ${foundCertifications?.length > 0 ? '' : 'grid-remover-class'} ${fetchingCertifications ? 'grid-remover-class' : ''}`}>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* Add Certification */}
            <div className={`ems_Right_Modal_Popup ${showSaveCertification ? 'show fade' : ''}`} >
                <div className='ems-modal-header'>
                    <div className='d-flex align-items-center'>
                        <h6 className='m-0'>Certifications</h6>
                    </div>
                    <span className="d-flex align-items-center">
                        <span className='close-modal' onClick={onCloseCertificationForm}><CloseLgIcon /></span>
                    </span>
                </div>
                <div className="p-sm-3 py-3">
                    <div className='data-set-container lg'>
                        <Container>
                            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
                                <Row className='row-gap-10 '>
                                    <Form.Group>
                                        <Form.Label>Certification Name <span className="required">*</span></Form.Label>
                                        <Form.Control placeholder="" {...register("name")} />
                                        <span className="error-msg">{errors.name?.message}</span>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description </Form.Label>
                                        <Form.Control as="textarea" rows={5} {...register("description")} placeholder="" />
                                        <span className="error-msg">{errors.description?.message}</span>
                                    </Form.Group>
                                </Row>
                                <Stack direction="horizontal" className='pt-3 justify-content-end'>
                                    <Button variant="save" type="submit" disabled={submitting} className='save'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save me-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg> {submitting ? 'Saving...' : 'Save'}</Button>{' '}
                                    <Button variant="outlineDark" onClick={onCloseCertificationForm} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x me-2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> Discard</Button>{' '}
                                </Stack>
                            </Form>
                        </Container>
                    </div>
                </div>
                <div className='p-3 xHe-wrapper'>
                </div>
            </div>
            {/* End */}
            {/* Delete certifications */}
            <Modal show={show.delete_certification} onHide={closeDeleteCertificateModal} backdrop="static" animation={true} fullscreen={true} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        Are you sure want to delete the selected certification?
                        <Stack direction="horizontal" className='pt-3'>
                            <Button variant="delete" disabled={submitting} onClick={deleteCertificate} className='delete flex'> {submitting ? 'Deleting...' : 'Delete'}</Button>
                            <Button variant="outlineDark" onClick={closeDeleteCertificateModal}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x me-2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> Discard</Button>{' '}
                        </Stack>
                    </Container>
                </Modal.Body>
            </Modal>
            {/* End */}
        </div>
    )
}
export default Certifications