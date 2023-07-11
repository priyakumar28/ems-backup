import React, { useState, useEffect } from 'react'
import { Button, Form, Table, Modal, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import axios from "axios";
import { employeeTrainingSessionSchema } from '../../../lib/yupHelpers';
import SaveIcon from '../../Icons/SaveIcon';
import AddIcon from '../../Icons/AddIcon';
import EditIcon from '../../Icons/EditIcon';
import DeleteIcon from '../../Icons/DeleteIcon';
import CloseIcon from '../../Icons/CloseIcon';
import DeleteAndDiscard from '../../Shared/DeleteAndDiscard';
import { ac } from "../../../lib/helpers";

const schema = yup.object().shape(employeeTrainingSessionSchema);

function TrainingDetail(props) {
    const {
        selectedEmployee, accesstoken, employeeUpdated, notify, userRoles, loggeduseremail,admins,user
    } = props;

    let config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        }
    };
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({ resolver: yupResolver(schema) });


    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = watch(() => console.log());
        return () => subscription.unsubscribe();
    }, [watch]);

    const [showTrainingDetail, setShowTrainingDetail] = useState(false);
    const [trainingDetails, settrainingDetails] = useState([]);
    const [trainingSessions, settrainingSessions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [tdId, settdId] = useState(false);
    const [show, setShow] = useState({});
    useEffect(() => {
        console.log("st",selectedEmployee)
        settrainingDetails(typeof selectedEmployee.training_sessions == 'object' ? selectedEmployee.training_sessions : []);
    }, [selectedEmployee])

    useEffect(() => {
        try {
            let endpoint = getAbsoluteURL(`controllers/trainingsessions?emp=${selectedEmployee.id}`);
            axios.get(endpoint, config).then(response => {
                settrainingSessions(response.data.data);
            }).catch(() => {
                settrainingSessions(false);
            });
        } catch (err) {
            settrainingSessions(false);
        }
    }, [selectedEmployee]);

    useEffect(() => {
        let td = tdId ? trainingDetails.find(x => x.id == tdId) : false;
        console.log("ddddd", td);
        if (td) {
            let assocs = ['trainingsession'];
            for (const property in td) {
                if (schema._nodes.includes(property) && assocs.includes(property)) {
                    console.log("yes", td[property]);
                    setValue(property, td[property]?.id);
                } else if (schema._nodes.includes(property)) {
                    console.log("not", td[property]);
                    setValue(property, td[property]);
                }
            }
        }
    }, [tdId]);

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

    const onShowTrainingDetail = (id = null) => {
        setShowTrainingDetail(true);
        if (id) {
            settdId(id);
        } else {
            reset();
        }
    }

    const onCloseTrainingDetail = () => {
        setShowTrainingDetail(false); settdId(false); reset(); setSubmitting(false);
    }

    const Loader = () => {
        return (
            <div className='loader xs green'></div>
        );
    }


    const closeDeleteTdModal = () => {
        handleClose('delete_training_session'); settdId(false); setSubmitting(false);
    }

    const onSubmitHandler = (data) => {
        for (const property in data) {
            if (data[property] == 'null') data[property] = null;
            if (typeof data[property] == 'string' && data[property]?.trim() == '') data[property] = null;
        }

        data['employee'] = selectedEmployee.id;

        let endpoint = getAbsoluteURL(`controllers/employeetrainingsessions`);

        if (tdId) endpoint = `${endpoint}?id=${tdId}`;

        setSubmitting(true);
        axios(Object.assign({
            method: tdId ? 'PUT' : 'POST',
            url: endpoint,
            data: data
        }, config)).then((response) => {
            notify({ success: (response.data.code === 200), message: response.data.message });
            if (response.data.code === 200) {
                console.log("eeeeee",tdId, response);
                if (tdId) {
                    let tdIndex = trainingDetails.findIndex(x => x.id == tdId);
                    trainingDetails[tdIndex] = response.data.data;
                    settrainingDetails([]);
                } else {
                    trainingDetails.unshift(response.data.data);
                }
                selectedEmployee.training_sessions = trainingDetails;
                employeeUpdated(selectedEmployee);
                setTimeout(() => { settrainingDetails([...trainingDetails]); }, 100);
                onCloseTrainingDetail();
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
    };

    const deleteTd = async () => {
        console.log("haiiii", tdId, selectedEmployee);
        let endpoint = getAbsoluteURL(`controllers/employeetrainingsessions?id=${tdId}&emp=${selectedEmployee.id}`);
        setSubmitting(true);
        axios(Object.assign({
            method: 'DELETE',
            url: endpoint
        }, config)).then((response) => {
            notify({ success: (response.data.code === 200), message: response.data.message });
            if (response.data.code === 200) {
                let ehIndex = trainingDetails.findIndex(x => x.id == tdId);
                if (ehIndex > -1) {
                    trainingDetails.splice(ehIndex, 1);
                }
                settrainingDetails([]);
                selectedEmployee.training_sessions = trainingDetails;
                employeeUpdated(selectedEmployee);
                setTimeout(() => { settrainingDetails([...trainingDetails]); }, 100);
                closeDeleteTdModal();
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
        <div>

            <Table className={`ems-table ${showTrainingDetail ? 'remove' : ''}`} size="lg">
                {(trainingDetails && trainingDetails?.length > 0) ? (
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>
                            
                            </th>
                        </tr>
                    </thead>
                ) : ("")}   
                <tbody>
                    {(trainingDetails && trainingDetails?.length > 0) ? (
                        trainingDetails.map(({ id, feedback, status, trainingsession }, index) => (
                            <tr key={index}>
                                <td data-label="Name">{trainingsession?.name}</td>
                                <td data-label="Status">{status}</td>
                                <td data-label="Feedback">{feedback ? feedback : '-'}</td>
                                <td>
                                    <span className='d-flex justify-content-end'>
                                        <span className='square_wrapper edit' onClick={() => {
                                            if (ac(userRoles, "Update trainings", loggeduseremail, admins) || user.employee.employee_id === selectedEmployee.employee_id) {
                                                onShowTrainingDetail(id)
                                            }
                                            else {
                                                notify({
                                                    success: false, message: 'You dont\'t have permission'
                                                })
                                            }
                                        }}><EditIcon /></span>
                                        <span onClick={() =>{
                                            if (ac(userRoles, "Delete trainings", loggeduseremail, admins) || user.employee.employee_id === selectedEmployee.employee_id) {
                                                handleShow('delete_training_session');
                                                console.log("taanu", id);
                                                settdId(id)
                                            }
                                            else {
                                                notify({
                                                    success: false, message: 'You dont\'t have permission'
                                                })
                                            }
                                        } } className='square_wrapper delete  ms-2'><DeleteIcon /></span>
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className='no-hover'>
                                <td colSpan={4} style={{ textAlign: 'center' }}>
                                    Click &nbsp;<span onClick={() => {
                                        if (ac(userRoles, "Create trainings", loggeduseremail, admins) || user.employee.employee_id === selectedEmployee.employee_id){
                                    onShowTrainingDetail()
                                }
                                else {
                                    notify({
                                        success: false, message: 'You dont\'t have permission'
                                    })
                                }
                            }}><AddIcon /></span> To Add Trainings</td>
                        </tr>
                    )}
                    {(trainingDetails && trainingDetails?.length > 0) && (
                         <tr className="no-hover">
                         <td colSpan={4} style={{ textAlign: "center" }}>
                       <Button style={{height:35, width:175, background:"white"}} onClick={() =>
                         onShowTrainingDetail()}>
                         <span style={{color:"black"}}> Add Training Details</span>
                           </Button>
                           </td>
                     </tr>
                    )}
                </tbody>
            </Table>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className={`edit-form-wrapper ${showTrainingDetail ? 'show' : ''}`}>
                <div className="form-grid ems-form">
                    <Form.Group>
                        <Form.Label>Training <span className="required">*</span></Form.Label>
                        <Form.Select {...register("trainingsession")} className='form-control'>
                            <option value={"null"}>Select Department</option>
                            {trainingSessions && trainingSessions.map(({ id, name }, index) => (
                                <option key={index} value={id}>{name}</option>
                            ))}
                        </Form.Select>
                        <span className="error-msg">{errors.trainingsession?.message}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control {...register("feedback")} />
                        <span className="error-msg">{errors.feedback?.message}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status <span className="required">*</span></Form.Label>
                        <Form.Select {...register("status")} className='form-control'>
                            <option value={"null"}>Select Status</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Attended">Attended</option>
                            <option value="Not-Attended">Not-Attended</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                        <span className="error-msg">{errors.status?.message}</span>
                    </Form.Group>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <Button variant="save" type="submit" className='square_wrapper save'>
                        {submitting ? <Loader /> : <SaveIcon />}
                    </Button>
                    <Button variant="delete" className='square_wrapper delete' onClick={onCloseTrainingDetail}><CloseIcon /></Button>
                </div>
            </Form>

            {/* Training delete Right Modal */}
            <Modal show={show.delete_training_session} onHide={closeDeleteTdModal} backdrop="static" animation={true} fullscreen={true} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete training session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        Are you sure want to delete the selected training session record?
                        <DeleteAndDiscard isSubmitting={submitting} onDelete={deleteTd} onClose={closeDeleteTdModal} />
                    </Container>
                </Modal.Body>
            </Modal>
            {/* End */}

        </div>
    )
}

export default TrainingDetail