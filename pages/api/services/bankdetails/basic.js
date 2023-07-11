const {
	OK,
	INTERNAL_SERVER_ERROR,
	BAD_REQUEST,
	UNPROCESSABLE_ENTITY
} = require("../../config/status_codes");

const {
	models: { bankdetails: BankDetails, employees: Employees },
} = require("../../models");
const { upload, download } = require('../../services/upload');
const { ALLOWED_CANCELLED_CHEQUE_LEAF_TYPES, ALLOWED_CANCELLED_CHEQUE_LEAF_SIZE } = require('../../helpers');
const { isValidURL } = require('../../../../lib/helpers');
const { eh } = require('../../config/emphistory');
const { EmpDHC } = require('../../helpers');
const bank = require("../../resources/bankdetails")
const EmployeeEventEmitter = require('../../events/employee/basic');
const { module_helpers } = require('../../config/module_helpers');
let { VIEW_EMPLOYEES, APPROVE_BANK_DETAILS } = module_helpers["Employee management"];

exports.getById = async (id) => {
	try {
		let associations = [];
		if (permission[VIEW_EMPLOYEES]) {
			associations.push('employee_employee')
		}
		let employeeObj = await BankDetails.findOne({
			where: { id: id },
			include: associations,
		});
		if (!employeeObj) {
			return response(BAD_REQUEST, "No data found for your requested id");
		}
		return response(OK, "Showing details for your requested id" + id, bank.transform(employeeObj));
	} catch (error) {
		return response(INTERNAL_SERVER_ERROR, error.message);
	}
};

exports.create = async (payload, usrr, permission) => {
	try {
		payload.fields.createdBy = usrr.employee.id;
		let bankDetailsObj = await BankDetails.findOne({
			where: { emp_id: payload.fields.emp_id, account_type: payload.fields.account_type},
		});
		if (bankDetailsObj) {
			return response(BAD_REQUEST, "Employee bank details already exist");
		}
		if (payload.files.attachment) {
			let file = payload.files.attachment;
			let path = `bank_cheque_leafs/employees`;
			let { success, ...res } = await upload(file, path, ALLOWED_CANCELLED_CHEQUE_LEAF_TYPES, ALLOWED_CANCELLED_CHEQUE_LEAF_SIZE, false);
			if (success) {
				payload.fields.attachment = res.url;
			} else {
				return response(INTERNAL_SERVER_ERROR, res.message);
			}
		} else {
			return response(BAD_REQUEST, "Please provide cancelled cheque leaf");
		}
		payload = payload.fields;
		if (!permission[APPROVE_BANK_DETAILS]) {
			delete payload['status'];
			delete payload['reason_for_rejection'];
		}
		bankDetailsObj = await BankDetails.create(payload);
		let employeeObj = await this.getById(bankDetailsObj.id, permission);
		eh("create", usrr, EmpDHC.bank_create, employeeObj);
		return response(OK, "Bank details added for the employee", bankDetailsObj);
	} catch (error) {
		return response(INTERNAL_SERVER_ERROR, error.message);
	}
};

exports.update = async (payload, id, usrr, permission, a) => {
	let b, bankDetails;
	try {
		let associations = [];
		if (permission[VIEW_EMPLOYEES]) {
			associations.push('employee_employee')
		}
		bankDetails = await BankDetails.findAll({
			where: { emp_id: payload.fields.emp_id },
			include: associations
		});
		let currentBankDetail = bankDetails.find(x => x.id == id);
		let otherBankDetail = bankDetails.find(x => x.id != id && x.account_type == payload.fields.account_type);
		if (!currentBankDetail) {
			return response(BAD_REQUEST, "No data found");
		}
		if (otherBankDetail) {
			return response(BAD_REQUEST, "Bank details with same account type already exists");
		}
		if (payload.files.attachment) {
			let file = payload.files.attachment;
			
			let path = `bank_cheque_leafs/employees`;
			let { success, ...res } = await upload(file, path, ALLOWED_CANCELLED_CHEQUE_LEAF_TYPES, ALLOWED_CANCELLED_CHEQUE_LEAF_SIZE, false);

			if (success) {
				payload.fields.attachment = res.url;

			} else {
				return response(BAD_REQUEST, "Cheque upload error");
			}
		} else {
			delete payload.fields.attachment;
		}
		payload = payload.fields;
		if (!permission[APPROVE_BANK_DETAILS]) {
			delete payload['status'];
			delete payload['reason_for_rejection'];
		}
		await BankDetails.update(payload, { where: { id: id },returning: true });
		b = await BankDetails.findOne({ where: { id } });
		eh("update", usrr, EmpDHC.bank_update, bankDetails, b);
		
		EmployeeEventEmitter.emit("bankdetails_updated", a)
		return response(OK, "Bank details updated for the Employee", bank.transform(b));


	} catch (error) {
		eh("update_failed", usrr, EmpDHC.bank_update, bankDetails, b)
		return response(INTERNAL_SERVER_ERROR, error.message);

	}
};

exports.list = async (whereObj = null) => {
	try {
		let options={order: [['id', 'DESC']],
		include:[
			"employee_employee"
		]}
		if (whereObj !== "all") {
			options["where"] = whereObj;
		  }
		let bankDetailsObj = await BankDetails.findAll(options);
		const x = bankDetailsObj.map((x) =>{
			if(x.account_number[0] == 0){			
				x.account_number = "-"+x.account_number
			}
			return x;
		})
		return response(OK, "Showing list of details for your request",x);
	} catch (error) {
		return response(INTERNAL_SERVER_ERROR, error.message);
	}
};

exports.sendBankDetailsToMail = async (id, user) => {
	try {
		let document = await BankDetails.findOne({ where: { id: id }, include: ["employee_employee"] });
		if (!document) {
			return response(NOT_FOUND, "Requested document not found");
		}
		let data = {};
		let attachments = await download(document.attachment);

		data["username"] = user.username;
		data["work_email"] = user.email;
		data["employee_code"] = document.employee_employee.employee_id,
		data["employee_email"] = document.employee_employee.work_email,
		data["employee_name"] = `${document.employee_employee.first_name} ${document.employee_employee.last_name}`,
		data["account_status"] = document.status;
		data["account_type"] = document.account_type;
		data["ifsc"] = document.ifsc;
		data["branch"] = document.branch;
		data["bank_name"] = document.bank_name;
		data["account_number"] = document.account_number;
		data["reason_for_rejection"] = document.status == "Rejected" ? document.reason_for_rejection : null;
		data["attachments"] = [attachments];
		EmployeeEventEmitter.emit("send_bank_details_to_email", data);

		return response(OK, "Bank details has been sent to your email");
	}
	catch (error) {
		//console.log(error);
		return response(INTERNAL_SERVER_ERROR, "Something went wrong");
	}
}

const response = (code, message, data = {}) => {
	return { code, message, data };
};
