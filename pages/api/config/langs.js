module.exports = {
    // 'en-US': {
    //     "Hello World": "Hello World",
    //     "Hello": "Hello"
    // },
    // 'de-FR': {
    //     "Hello World": "Hallo Welt",
    //     "Hello": "Hallo"
    // }
    'en-US': {

        //** Common Messages for services**//
        "id_found": "Showing details for your requested id",
        "list_found": "Showing list of details for your request",
        "id_not_found": "No data found for your requested id",
        //**common Messages for validations**//
        "name_base": "Name should be in alphabets only",
        "name_required": "Name is required field",
        "employee_base": "Employee field should be in number format",
        "employee_required":"Employee field is must required",
        "description_base": "Description shold be in alphabets,numbers,any symbols",
        "date_base": "Date should be in valid date format (dd/mm/yyyy)",
        "date_required": "Date is must required field",
        "description_min": "Description should  contain minimum of 3 characters",
        "description_max": "Description allows upto 400 characters only",
        "any_required": " is a required field",
        "string_base": "should be a type of string",
        "string_empty": " cannot be an empty field",
        "string_min": " should have a minimum length of ",
        "string_max": " should have a maximum length of ",
        "string_pattern_base": " must contain only",
        "string_alphanum": " must contain only alphabets and numbers",
        "any_valid": " contains invalid values",
        "string_email": " must be a valid one",
        "number_base": " should be a type of number",
        "name_max": "Name allows upto 100 characters only",
        "status_base": "Status should be in alphabets",
        "relationship_base": "Relationship should contains alphabets only",
        "relationship_required": "Relationship is must required",
        "name_min": "Name should contain minimum 3 characters",




        // --------------------------------------------------------------------------------------\\
        // **  Bank details ** //
        "bank_details_created": "Bank details added for the employee",
        "bank_details_exist": "Employee bank details are already exist",
        "bank_details_cheque": "Please provide cancelled cheque leaf",
        "bank_details_updated": "Bank details updated for the Employee",
        "bank_details_removed": "Employee bank details hasbeen deleted",
        //validations forBank details
        "bank_name_base": "Bank name should be in alphabets",
        "bank_name_max": "Bank name allows upto 30 characters only",
        "bank_name_required": "Bank name is must required",
        "branch_base": "Branch should be in alphabets or combination of numbers and special symbols",
        "branch_max": "Branch allows upto 32 characters only",
        "branch_required": "Branch is must required",
        "account_number_base": "Account number should be in numbers",
        "account_number_max": "Account number allows upto 32 characters only",
        "account_number_required": "Account number is must required",
        "ifsc_base": "Ifsc should be in alphabets or numbers",
        "ifsc_max": "Ifsc allows upto 16 characters only",
        "ifsc_required": "Ifsc is must required",
        "emp_id_base": "Employee id should be in numbers ",
        "emp_id_required": "Employee id is must required",
        
        // **  Certifications ** //
        "certification_created": "New Certification has been created",
        "certification_updated": "Certification details has been updated",
        "certification_deleted": "Certification details has been deleted",
        // validations for certifiactions
        "name_certificates_min": "Name sholud contain minimum of 3 characters",
        "name_certificates_max": "Name allows upto 100 characters",


        // ** Courses ** //
        "course_created": "Course hasbeen created",
        "course_updated": " Course details has been updated",
        "course_deleted": "Course details has been deleted",
        //**validations for Courses **//
        "code_base": "Code should be in sequence of alphabets or numbers",
        "code_min": "Code should contain minimum of 1characters",
        "code_max": "code allows upto 16 characters only",
        "code_required": "Code is must required",
        "name_course_max": "Name allows upto maximum 16 characters",
        "trainer_base": "Trainer field should be in sequence of characters",
        "trainer_min": "Trainer field should contain minimum 1 character",
        "trainer_max": "Trainer field allows upto maximum 32 characters",
        "trainer_required": "Trainer field is required",
        "trainer_info_base": "Trainer information shoud be in alphabets",
        "trainer_info_required": "Trainer information is required",
        

        // ** Educations** //
        "education_created": "New education has been created",
        "education_updated": "Education details has been updated",
        "education_deleted": "Eduction details has been deleted",
       
        
        
        // **Emergency Contacts ** //
        "emergency_contact_created": "Emergency contact has been created",
        "emergency_contact_updated": "Emergency contact details has been updated",
        "emergency_contact_deleted": "Emergency contact details has been deleted",
        //** Validations for Emergency Contacts **//
        "name_emergencycontact_max": "Name allows upto 128 characters",
        
        "relationship_max": "Relationship allows upto 128 characters only",
  
        "home_phone_base": "Home phone number should contain numbers only",
        "home_phone_min": "Home phone number should be minimum of 10 numbers",
        "home_phone_max": "Home phone number allows upto maximum 12 numbers",
        "home_phone_required": "Home phone number is must required",
        "work_phone_base": "Work phone number should contain numbers only",
        "work_phone_min": "Work phone number should be minimum of 10 numbers",
        "work_phone_max": "Work phone number allows upto maximum 12 numbers",
        "work_phone_required": "Work phone number is must required",
        "mobile_phone_base": "Mobile phone number should contain numbers only",
        "mobile_phone_min": "Mobile phone number should be minimum of 10 numbers",
        "mobile_phone_max": "Mobile phone number allows upto maximum 12 numbers",
        "mobile_phone_required": "Mobile phone number is must required",
        
        // ** Employee dependents** //
        "employee_dpendent_created": "Employee dependent has been created",
        "employee_dpendent_updated": "Employee dependent details has been updated",
        "employee_dpendent_deleted": "Employee dependent details has been deleted",
        //** validations for Employeedependents**/
        "name_emp_dependents_max": "Name should allows upto maximum of 30 characters",
        "name_pattern":"Name Should be in aplhabets only",
        "dob_base": "Dob should be in valid date format(dd/mm/yyyy)",
        "id_number": "Id number should be in numbers or alphabets",
        "id_number_pattern": "Id numer should be in alphaibets or numbers",
        "id_number_max": "Id number allows upto maximum of 25 characters only",
        "id_number_required":"Id number is a required field",
        
        // **Employee Educations ** //
        "employee_educations_created": "Employee education has been created",
        "employee_educations_updated": "Employee education details has been updated",
        "employee_educations_deleted": "Employee education details has been deleted",
      
    
        // **Employee Empoyeement History ** //
        "employee_employment_history_created": "New Employee employment history hasbeen created",
        "employee_employment_history_updated": "Employee employment history details has been updated",
        "employee_employment_history_deleted": "Employee employment history details has been deleted",
        //valdations for employee_employment_history//
        "employer_name_base": "Employer name should be in alphabets",
        "employer_name_min": "Employer should be minimum of 3 characters",
        "employer_name_max": "Employer should be maximum of 100 characters",
        "employer_name_required": "Employer name is required field",
        "job_title_base": "Job title should be in alphabets",
        "job_title_min": "Job title should be minmum of 3 characters",
        "job_title_max": "Job title should be maximum of 400 characters",
        "employment_type_base": "Employment type should be in alphabets",
        "employment_type_min": "Employment type should be minimum of 3 characters",
        "employment_type_max": "Employment type should be maximum of 400 characters",
        "payroll_type_base": "Payroll type Shold be in alphabets",
        "payroll_type_min": "Payroll type minimum contains 3 characters",
        "payroll_type_max": "Payroll type maximum allows upto 400 characters",
        "payroll_amount_base": "Payroll amount should be in numbers",
        "payroll_amount_required": "Payroll amount is a required field",
        "reason_for_leaving_base": "Reason for leaving should be in alphabets",
        "reason_for_leaving_min": "Reason for leaving should be minimum of 3 characters",
        "reason_for_leaving_max": "Reason for leaving should be maximum of 400 characters",
        "reference_name_base": "Reference name should be in alphabets",
        "reference_name_min": "Reference name should be minimum of 3 characters",
        "reference_name_max": "Reference name allows upto 400 characters only",
        "reference_phno_base": "Reference phone number should be in numbers",
        "reference_phno_min": "Reference phone should be minimum of 10 numbers",
        "reference_phno_max":"Reference phone allows upto  maximum of 12 numbers",

        // **Employee Documents ** //
        "employee_documents_created": "New Employee documents has been created",
        "employee_documents_updated": "Employee documents details has been updated",
        "employee_documents_deleted": "Employee documents details has been deleted",
        // validations for employee docucuments//
        "document_base": "Document should be in numbers",
        
        "max_max":"This field maximum allows upto 255 characters only",
        // **Employer Documents ** //
        "employer_documents_created": "New Employer documents has been created",
        "employer_documents_updated": "Employer documents details has been updated",
        "employer_documents_deleted": "Employer documents details has been deleted",
        // ** Employee Certifications** //
        "employee_certifications_created": "Employee certifications has been created",
        "employee_certifications_updated": "Employee certifications details has been updated",
        "employee_certifications_deleted": "Employee certifications details has been deleted",
        
        
        // **Upload Users ** //
        "upload_users_created": "Upload user has been created",
        "upload_users_updated": "Upload users details has been updated",
        "upload_users_deleted": "Upload users details has been deleted",
        // ** Employee ** //
        "employee_created": "Employee has been created",
        "employee_already_registered": "Employee has been registered",
        "employee_updated": "Employee has been updated",
        "employees_removed": "Employee has been removed",
        "employee_and_User_created": "New Employee and User created",
        // ** Dataentrybackups **//
        "dataentrybackup_created": "Dataentrybackup has been created",
        "dataentrybackup_updated": "Dataentrybackup has been updated",
        "dataentrybackup_removed": "Dataentrybackup has been Deleted",
        // ** validations of Dataentrybackups ** //
        "tabletype_string_base": "Tabletype should be in only alphabets",
        "tabletype_min": "Tabletype must contain minimum of 1 character",
        "tabletype_max": "Tabletype should be accept only 200 characters",
        "tabletype_pattern_base": "Tabletype must contain only alphabets and numbers",
        "dataentrybackups_data_base": "Data should be in alphabets",
        "data_pattern_base": "Data must contain only alphabets and numbers",
        // ** Dataimportfiles ** //
        "dataimportfiles_created": "Dataimportfiles has been created",
        "dataimportfile_updated": "Dataimportfile has been updated",
        "dataimportfile_removed": "Dataimportfile has been deleted",
        // ** Validatios of Dataimportfiles ** //
        "name_max_dataimportfiles": "Name should be accept only 60 characters",
        "name_pattern_base_dataimportfiles": "Name must contain only alphabets",
        "data_import_defination.base": "Dataimport defination should be in alphabets",
        "data_import_defination.max": "Data import defination should be accept only 200 characters",
        "data_import_defination.required": "Data import defination is a required field",
        "status.base": "Status should be in only alphabets",
        "status.max": "Status must contain 15 characters",
        "status.pattern.base": "Status must contain only alphabets and numbers",
        "status.required": "Status is a required field",
        "file.base": "File should be in only alphabets",
        "file.max": "File must contain maximum of 100 characters",
        //"updated_base": "Updated date should be in a date format",
        //"created_base": "Created date should be in a date format",
        // ** Dataimports ** //
        "dataimport_created": "Dataimport has been created",
        "dataimport_updated": "Dataimport has been updated",
        "dataimport_deleted": "Dataimport has been deleted",
        // ** validations of Dataimports ** //
        "name_max_dataimports": "Name should be accept only 200 characters",
        "name_pattern_base_dataimports": "Name must contain only alphabets",
        "datatype_base": "Datatype should be in alphabets",
        "datatype_max": "Datatype should be accept only 60 characters",
        "datatype_required": "Datatype is required field",
        "details_base": "Details should be in alphabets",
        "columns_base": "Columns should be in alphabets",
        // ** Emails ** //
        "email_created": "New Email has been created",
        "email_updated": "Email has been updated",
        "email_removed": "Email has been deleted",
        // ** Employeeapprovals ** //
        "employeeapprovals_created": "New Employeeapprovals has been created",
        "employeeapprovals_updated": "Employeeapprovals has been updated",
        "employeeapprovals_removed": "Employeeapprovals has been removed",
        // ** Validations of Employeeapprovals ** //
        "employeeapprovals_type_base": "Type should be in alphabets",
        "employeeapprovals_type_max": "Type should be allows upto 100 characters",
        "employeeapprovals_type_required": "Type is a required field",
        "element_base": "Element should be in numbers",
        "element_required": "Element is a required field",
        "approver_base": "Approver must be in numbers",
        "level_base": "Level should be in numbers",
        "employeeapprovals_status_base": "Status should be in numbers",
        "active_base": "Active should be in numbers",
        // ** Employeedatahistory ** //
        "employeedatahistory_created": "Employeedatahistory has been created",
        //////////////////////////////////////
        "employeedatahistory_updated": "Employeedatahistory has been updated",
        "employeedatahistory_removed": "Employeedatahistory has been deleted",
        /////////////////////////////////////
        // ** Validations of Employeedatahistory ** //
        "type_base": "Type should be in alphabets",
        "type_max": "Type should be allows upto 100 characters",
        "type_required": "Type is a required field",
        "employee_id_base": "Employee id must be in numbers",
        "employee_id_required": "Employee id is a required field",
        "field_base": "Field should be in characters",
        "field_max": "Field should be allows upto 100 characters",
        "field_required": "Field is must be required",
        "old_value_base": "Old value should  be in characters",
        "old_value_min": "Old value must contain minimum of 1 character",
        "old_value_max": "Old value should be allows upto 500 characters",
        "new_value_base": "New value should  be in characters",
        "new_value_min": "New value must contain minimum of 1 character",
        "new_value_max": "New value should be allows upto 500 characters",
        "user_id_base": "User id should be in number",
        "updated_base": "Updated should be date format",
        "created_base": "Created should be date format",
        // ** EmployeeSkills ** //
        "upload_error": "Certificate upload error",
        "certificate_missing": "Certificate is missing",
        "employeeskill_created": "New Employeeskill has been created",
        "employeeskill_updated": "Employeeskill has been updated",
        "employeeskill_removed": "Employeeskill has been deleted",
        // ** Validations of Employeeskills ** //
       
        "data_base": "should be in date format",
        "date_start_base": "Valid form should be in date format",
        "date_start_required": "Valid form is required",
        "date_end_base": "Valid through should be in date format",
        "date_end_required": "Valid through is a required field",
        // ** Permissions ** //
        "permission_created": "Permission has been created",
        "permission_updated": "Requested permission has been updated",
        "permission_removed": "Requested permission has been Deleted",
        // ** Validations of Permissions ** //
        "number_base_user_role": "User role should be in numbers",
        "number_base_module_id": "Module_id should be in numbers",
        "module_id_required": "Module_id is a required field",
        "string_base_meta": "Meta should be in characters",
        "string_min_meta": "Meta should be contain minimum 1 character",
        "string_max_meta": "Meta should be allows upto 500 characters",
        "string_base_value": "Value should be in characters",
        "string_min_value": "Value should be contain minimum 1 characters",
        "string_max_value": "Value should be allows upto 200 characters",
        // ** Interviews ** //
        "interview_created": "New Interview has been created",
        "interview_updated": "Interview has been updated",
        "interview_removed": "Interview has been deleted",
        // ** Validations of Interviews ** //
        "job_base": "Job should be in numbers",
        "job_required": "Job is required field",
        "candidate_base": "Candidate should be in a number",
        "candidate_required": "Candidate is required field",
        "interviews_level_base": "Level should be in alphabets",
        "level_max": "Level must contain maximum of 100 characters",
        "level_pattern_base": "Level must contain only alphabets",
        "level_required": "Level is a required field",
        "scheduled_base": "Scheduled should be in a date format",
        "location_base": "Location should be in alphabets and numbers",
        "location_max": "Location allows upto 500 characters",
        "mapid_base": "Mapid should be in a numbers",
        "mapid_required": "Mapid is required field",
        "status_base_interviews": "Status should be in a alphabets",
        "status_max": "Status allows upto 100 characters",
        "notes": "Notes should be in alphabets",
        // ** Skills ** //
        "skill_created": "New Skill has been created",
        "skill_updated": "Skill has been Updated",
        "skill_removed": "Skill has been deleted",
        // ** Validations of Skills ** //
       
        "name_pattern_base": "Name allows only alphabets",
        "string_max_skills": "Description should be allows upto 400 characters",
        "string_pattern_skills": "Description should be contain alphabets",
        "required_description": "Description is a required field",
        "string_min_skills": "Description should be contain minimum of 1 characters",
        // ** Employeetrainingsessions ** //
        "employeetrainingsession_created": "Employeetrainingsession has been Created",
        "employeetrainingsession_updated": "Employeetrainingsession has been Updated",
        "employeetrainingsession_removed": "Employeetainingsession has been deleted",
        // ** Validations of Employeetraining sessions ** //
        "trainingsession_base": "Trainingsession should be in numbers",
        // ** Nomineedetails ** //
        "nomineedetails_created": "Nomineedetails has been created",
        "nomineedetails_updated": "Nomineedetails has been updated",
        "nomineedetails_removed": "Nomineedetails has been deleted",
        // ** Validations of Nomineedetails ** //
        //"name_max": "Name should be allows upto 100 characters",
        "employee_nominee_base": "Employee should be in numbers",
        "employee_nominee_required": "Employee field is required",
        "state_required": "State is a required field",
        "state_max": "State should be allows upto 100 characters",
        "state_base": "State should be in alphabets",
        "district_base": "District should be in alphabets",
        "district_max": "District should be allows upto 100 characters",
        "district_required": "District is a required field",
        "address_pincode_base": "This field should be allows alphabets and numbers",
        "address_pincode_max": "This field should be allows upto 200 characters",
        "address_pincode_required": "This field is required",
        "phone_base": "Phone number must be in numbers",
        "phone_max": "Phone should be allows upto 15 characters",
        "phone_required": "Phone number must be required",
        "realationship_max": "Relationship should be allows upto 50 characters",
        // ** Settings ** //
        "settings_created": "Settings has been created",
        "settings_updated": "Settings has been updated",
        "settings_removed": "Settings has been deleted",
        // ** Validations of Settings ** //
        "site_title_base": "Site title must be in alphabets",
        "site_title_min": "Site title should contain minimum of 3 characters",
        "site_title_max": "Site title should be allows upto 100 characters",
        "about_us_base": "About us should be in alphabets",
        "theme_mode_base": "Theme mode should be in alphabets",
        // ** trainingsessions ** //
        "trainingsession_created": "Trainingsession has been created",
        "trainingsession_updated": "Trainingsession has been updated",
        "trainingsession_removed": "Trainingsession has been deleted",
        // ** Validations of trainingsessions ** //
        "training_name_max": "Name should be allows upto 30 characters",
        "course_base": "Course should be in numbers only",
        "course_required": "Course is a required field",
        "training_scheduled_base": "Scheduled should be in date format",



















        //-----------------------------------------------------------------------------

        //** Applications **//
        "application_created": "New Application has been created",
        "application_updated": "Application details has been updated",
        "application_deleted": "Application hasbeen deleted",

        // ** Clients ** //
        "client_created": "New client hasbeen created",
        "client_updated": "Client details has been updated",
        "client_deleted": "Client details has been deleted",

        // ** Company Documents ** //
        "company_documents_created": "Company documents hasbeen created",
        "company_documents_updated": "Company documents details has been updated",
        "company_documents_deleted": "Company documents details has been deleted",
        

    

        


        


       


    }
}