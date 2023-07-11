import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import { bankDetailsSchema } from "../../../lib/yupHelpers";
import CloseIcon from "../../Icons/CloseIcon";
import SaveIcon from "../../Icons/SaveIcon";
import AddIcon from "../../Icons/AddIcon";
import EditIcon from "../../Icons/EditIcon";
import MailIcon from "../../Icons/MailIcon";
import Box from "../../Shared/Box";
import Span from "../../Shared/Span";
import ErrorMsg from "../../Shared/ErrorMsg";
import P from "../../Shared/P";
import { ac } from "../../../lib/helpers";
import WarningIcon from "../../Icons/WarningIcon";
import CheckIcon from "../../Icons/CheckIcon";
import { FileIcon, defaultStyles } from "react-file-icon";

const schema = yup.object().shape(bankDetailsSchema);

function BankDetails(props) {
	const { selectedEmployee, accesstoken, notify, userRoles, employeeUpdated, loggeduseremail, admins ,user} = props;

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		setError, clearErrors, setValue, reset
	} = useForm({ resolver: yupResolver(schema) });

	const watchFields = watch(["status", "attachment"]);
	// Callback version of watch.  It's your responsibility to unsubscribe when done.
	React.useEffect(() => {
		const subscription = watch((value, { name, type }) => console.log(value, name, type));
		return () => subscription.unsubscribe();
	}, [watchFields]);
	
	const formRef = useRef(null);
	const [submitting, setSubmitting] = useState(false);
	const [sendingMail, setSendingMail] = useState(false);
	const [showBankDetail, setShowBankDetail] = useState(false);
	const [bankDetails, setBankDetails] = useState([]);
	const [ifscCode, setifscCode] = useState("");
	const [selectedBankDetailId, setSelectedBankDetailId] = useState(false);
	const [selectedBankDetail, setSelectedBankDetail] = useState({});
	const [accountTypes] = useState(["Personal", "Salaried"]);

	const onshowBankDetail = (id) => {
		setShowBankDetail(true);
		if (id) {
			setSelectedBankDetailId(id);
		} else {
			reset();
		}
	};

	useEffect(() => {
		setBankDetails(selectedEmployee.bank_details);
	}, [selectedEmployee])

	useEffect(() => {
		if (ifscCode != "") {
			const delayDebounceFn = setTimeout(() => {
				fetch(`https://ifsc.razorpay.com/${ifscCode}`)
					.then(async (response) => {
						response = await response.json();
						setValue("branch", "");
						setValue("bank_name", "");
						if (typeof response === "object" && response.hasOwnProperty("BRANCH") && response.hasOwnProperty("BRANCH")) {
							setValue("branch", response.BRANCH);
							setValue("bank_name", response.BANK);
						} else {
							setError('ifsc', { type: 'custom', message: 'Please enter valid IFSC Code' });
						}
					})
					.catch((error) => console.log(error, 'from error'));
			}, 1000);
			clearErrors(["ifsc", "branch", "bank_name"]);
			setValue("ifsc", ifscCode?.toUpperCase());
			return () => clearTimeout(delayDebounceFn);
		}
	}, [ifscCode]);
	
	useEffect(() => {
		if (selectedBankDetailId) {
			setSelectedBankDetail({ ...bankDetails.find(x => x.id == selectedBankDetailId) });
		} else {
			setSelectedBankDetail({...{}});
		}
	}, [selectedBankDetailId]);

	useEffect(() => {
		for (const property in selectedBankDetail) {
			if (schema._nodes.includes(property)) {
				let value = selectedBankDetail[property];
				value = typeof value === "string" ? value.trim() : value;
				setValue(property, value);
			}
		}
	}, [selectedBankDetail])

	const onCloseBankDetail = () => {
		setShowBankDetail(false);
		reset();
		setSubmitting(false);
		setSelectedBankDetailId(false);
	}

	const Loader = () => {
		return <div className="loader xs green"></div>;
	};

	const getStatusIcon = (status) => {
		if (status == "Pending") {
			return <WarningIcon />;
		} else if (status == "Approved") {
			return <CheckIcon />;
		} else {
			return <CloseIcon />;
		}
	}

	const fileExt = (filename) => {
        return filename?.split('.')?.pop()?.toLowerCase();
    }
	
	const onlyNumberKey = (value) => {
		return value.replace(/\D/g,'').substring(0,18);
	}
	
	const mailTheBankDetails = (id, resetId = true) => {
		let endpoint = getAbsoluteURL(`controllers/bankdetails?id=${id}&emp_id=${selectedEmployee.id}&type=sendmail`);
		let config = {
			headers: {
				Authorization: `Bearer ${accesstoken}`
			},
		};
		setSendingMail(true);
		setSelectedBankDetailId(id);
		axios(
			Object.assign({ url: endpoint }, config)
		).then((response) => {
			notify({
				success: response.data.code === 200,
				message: response.data.message,
			});
			if (resetId) setSelectedBankDetailId(false);
			setSendingMail(false);
		}).catch((error) => {
			console.log(error)
			let error_msg = "Something went wrong";
			if (error.response) {
				error_msg = error.response.data.message;
			}
			if (resetId) setSelectedBankDetailId(false);
			setSendingMail(false);
			notify({ success: false, message: error_msg });
		});
	}
	
	const onSubmitHandler = (data) => {
		const formData = new FormData();
		for (const property in data) {
			if (data[property] == 'null') data[property] = null;
			if (typeof data[property] == 'string' && data[property]?.trim() == '') data[property] = null;
			if (property == "attachment" && typeof data[property] === "object") {
				data[property] = data[property][0];
			}
			formData.append(property, data[property]);
		}
		formData.append("emp_id", selectedEmployee.id);
		let config = {
			headers: {
				Authorization: `Bearer ${accesstoken}`,
				'Content-Type': `multipart/form-data;`
			},
		};
		let endpoint = getAbsoluteURL(`controllers/bankdetails`);
		let method = "POST";
		if (selectedBankDetailId) {
			endpoint = `${endpoint}?id=${selectedBankDetailId}`;
			method = "PUT";
			formData.append("email", selectedEmployee.work_email);
			formData.append("name", selectedEmployee.first_name);
		}
		setSubmitting(true);
		axios(
			Object.assign(
				{
					method: method,
					url: endpoint,
					data: formData,
				},
				config
			)
		).then((response) => {
			notify({
				success: response.data.code === 200,
				message: response.data.message,
			});
			if (response.data.code === 200) {
				if (selectedBankDetailId) {
					let bdIndex = bankDetails.findIndex((x) => x.id == selectedBankDetailId);
					bankDetails[bdIndex] = response.data.data;
					setBankDetails([]);
				} else {
					bankDetails.unshift(response.data.data);
				}

				selectedEmployee.bank_details = bankDetails;
				employeeUpdated(selectedEmployee);

				setTimeout(() => {
					setBankDetails([...bankDetails]);
				}, 100);
				onCloseBankDetail();

			}
			setSubmitting(false);
		}).catch((error) => {
			console.log(error)
			let error_msg = "Something went wrong";
			if (error.response) {
				error_msg = error.response.data.message;
			}
			setSubmitting(false);
			notify({ success: false, message: error_msg });
		});
	};

	return (
		<Box className="position-relative">
			<Box className={`employee-info ${showBankDetail ? "remove" : ""}`}>
				<Box className="add-info">
					{
						typeof bankDetails == "object" &&
						bankDetails.length < accountTypes.length && (
							<Span isClick={() => {
								if (ac(userRoles, "Create bank details", loggeduseremail, admins)
								||(user.employee.employee_id === selectedEmployee.employee_id)
								) {
									onshowBankDetail()
								}
								else {
									notify({
										success: false, message: 'You dont\'t have permission'
									})
								}
							}}><AddIcon /></Span>
						)
					}
				</Box>
				{bankDetails && bankDetails?.length > 0 ? (
					<Table className={`ems-table ${showBankDetail ? "remove" : ""}`} size="lg">
						<thead>
							<tr>
								<th>#</th>
								<th>Account Type</th>
								<th>IFSC Code</th>
								<th>Branch Name</th>
								<th>Bank Name</th>
								<th>Account Number</th>
								<th></th>
							</tr>	
						</thead>
						<tbody>
							{bankDetails.map(({ id, account_type, ifsc, branch, bank_name, account_number, status }, index) => (
								<tr key={index}>
									<td>
										{getStatusIcon(status)}
									</td>
									<td>{account_type}</td>
									<td>{ifsc}</td>
									<td>{branch}</td>
									<td>{bank_name}</td>
									<td>{account_number}</td>
									<td>
										<Span className="d-flex justify-content-end">
											<Span className="square_wrapper edit" isClick={() => mailTheBankDetails(id)}>
												{(sendingMail && selectedBankDetailId == id) ? <Loader /> : <MailIcon />}
											</Span>
											<Span className="square_wrapper edit ml-5" isClick={() => onshowBankDetail(id)}>
												<EditIcon />
											</Span>
										</Span>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<Span className='profile-bg'>
						<P className='text-center my-0 py-1 f-15'>
							Click &nbsp;
							<Span isClick={() => {
									if (ac(userRoles, "Create bank details ", loggeduseremail, admins)
										|| (user.employee.employee_id === selectedEmployee.employee_id)
									) {
									onshowBankDetail()
								}
								else {
									notify({
										success: false, message: 'You dont\'t have permission'
									})
								}
							}}><AddIcon /></Span> To Add BankDetails</P>
					</Span>	
				)}
			</Box>

			<Form onSubmit={handleSubmit(onSubmitHandler)} ref={formRef} className={`edit-form-wrapper  ${showBankDetail ? "show" : ""}`}>
				<span>
					<strong>Note:</strong> Cancelled cheque leaf should be jpg, jpeg, png with size of maximum 200KB
				</span>
				<Box className="form-grid ems-form mt-3">
					<Form.Group>
						<Form.Label>
							Account Type <Span className="required">*</Span>
						</Form.Label>
						<Form.Select
							{...register("account_type")}
							onChange={(e) => console.log()}
							className="form-control"
						>
							<option value="Personal">Personal</option>
							<option value="Salaried">Salaried</option>
						</Form.Select>
						<ErrorMsg errorMessage={errors.account_type?.message} />
					</Form.Group>
					<Form.Group>
						<Form.Label>
							IFSC Code <Span className="required">*</Span>
						</Form.Label>
						<Form.Control
							{...register("ifsc")}
							placeholder=""
							onChange={(e) => setifscCode(e.target.value)}
						/>
						<ErrorMsg errorMessage={errors.ifsc?.message} />
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Branch Name <Span className="required">*</Span>
						</Form.Label>
						<Form.Control {...register("branch")} placeholder="" readOnly />
						<ErrorMsg errorMessage={errors.branch?.message} />
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Bank Name <Span className="required">*</Span>
						</Form.Label>
						<Form.Control {...register("bank_name")} placeholder="" readOnly />
						<ErrorMsg errorMessage={errors.bank_name?.message} />
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Account Number <Span className="required">*</Span>
						</Form.Label>
						<Form.Control
							{...register("account_number")}
							placeholder=""
							onChange={(evt) => {
								evt.target.value = onlyNumberKey(evt.target.value);
							}}
						/>
						<ErrorMsg errorMessage={errors.account_number?.message} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Cancelled Cheque Leaf {!selectedBankDetailId && <Span className="required">*</Span>}</Form.Label>
						<Form.Control type="file"
							onChange={(e) => {
								if (e.target.files.length > 0) {
									setValue('attachment', e.target.files[0])
								}
							}}
							{...register('attachment')}
							className='form-control'
							multiple={false}
							accept=".jpg,.jpeg,.png"/>
						<ErrorMsg errorMessage={errors.attachment?.message} />
					</Form.Group>
					{ac(userRoles, "Approve bank details", loggeduseremail, admins) && (
						<>
							<Form.Group>
								<Form.Label>
									Status <Span className="required">*</Span>
								</Form.Label>
								<Form.Select
									{...register("status")}
									onChange={(e) => {
										setValue("status", e.target.value);
										clearErrors(["reason_for_rejection"]);
									}}
									className="form-control"
								>
									<option value="Pending">Pending</option>
									<option value="Approved">Approved</option>
									<option value="Rejected">Rejected</option>
								</Form.Select>
								<ErrorMsg errorMessage={errors.status?.message} />
							</Form.Group>
							{watch("status") == "Rejected" && (
								<Form.Group>
									<Form.Label>
										Reason for rejection <Span className="required">*</Span>
									</Form.Label>
									<Form.Control {...register("reason_for_rejection")} as="textarea" rows={3} placeholder="" />
									<ErrorMsg errorMessage={errors.reason_for_rejection?.message} />
								</Form.Group>
							)}
						</>
					)}
				</Box>
				{selectedBankDetailId && (
					<Box className={`mt-3 employee_Data_Record_Container documents`} style={{ marginBottom: "5px" }}>
						<Box className="position-relative">
							<p className="mt-3">
								<span>Cancelled cheque leaf:</span>
							</p>
							<Box title={selectedBankDetail.attachment} className="doc-upload">
								<label className="d-block">{selectedBankDetail.attachment}</label>
								<FileIcon
									extension={fileExt(selectedBankDetail.attachment)}
									{...defaultStyles[fileExt(selectedBankDetail.attachment)]}
									style={{ width: "150px" }}
								/>
								<Box className="document-action-wrapper">
									<Span className="action-wrapper" isClick={() => mailTheBankDetails(selectedBankDetailId, false)}>
										{sendingMail ? <Loader /> : <MailIcon />}
									</Span>
								</Box>
							</Box>
						</Box>
					</Box>
				)}
				<Box className="d-flex justify-content-end mt-4">
					<Button variant="save" type="submit" className="square_wrapper save">
						{submitting ? <Loader /> : <SaveIcon />}
					</Button>
					<Button variant="delete" className="square_wrapper delete ms-1" onClick={onCloseBankDetail}>
						<CloseIcon />
					</Button>
				</Box>
			</Form>
		</Box>
	);
}

export default BankDetails;
