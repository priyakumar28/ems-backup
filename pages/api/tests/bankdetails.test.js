import { create, list, update, remove, getById } from "../controllers/bankdetails";



describe("testing archivedemployee route", () => {
  const testData = [
    {
      fields: {
        bank_name: "SBI",
        branch: "Chennai",
        account_number: "68367465734646",
        ifsc: "SBI009C",
        emp_id: "2",
        createdBy: "2",
        attachment: "https://ems-document.s3.ap-south-1.amazonaws.com/bank_cheque_leafs/employees/35792e63453ead62ec9633000_avatarm3.png",
        status: "Pending"
      }
    },
    
    {
      bank_name: "ICICI",
      branch: "Chennai",
      account_number: "87632456453257",
      ifsc: "ICICI009C",
      emp_id: "2e21eqw",
      createdBy: "2",
      attachment: "https://ems-document.s3.ap-south-1.amazonaws.com/bank_cheque_leafs/employees/35792e63453ead62ec9633000_avatarm3.png",
      status: "Rejected"
    },
    {
      bank_name: "ICICI",
      branch: "Chennai",
      account_number: "87632456453257",
      ifsc: "ICICI009C",
      emp_id: "200002",
      createdBy: "2",
      attachment: "https://ems-document.s3.ap-south-1.amazonaws.com/bank_cheque_leafs/employees/35792e63453ead62ec9633000_avatarm3.png",
      status: "Pending"
    }
  ];


  let user = {
    id: '1',
    username: 'Krishna',
    email: 'girikrishna@bassure.com',
    user_level: 'Admin',
    last_login: null,
    last_update: null,
    lang: null,
    created: null,
    profile_pic: 'https://ems-document.s3.ap-south-1.amazonaws.com/profile_pictures/users/1/e769d3ff3ff8fb99f864a4201_krishna.jpeg',
    roles: [
      {
        id: '2',
        name: 'Employee',
        allocatedModules: [],
        modules: []
      }
    ],
    employee: {
      id: '2',
      employee_id: '200002',
      first_name: 'RadhaKrishna',
      middle_name: '',
      last_name: 'RKK',
      work_phone: '918765456789',
      work_email: 'girikrishna@bassure.com',
      gender: 'Male',
      birthday: '1996-03-13',
      marital_status: 'Married',
      blood_group: 'B +',
      status: 'Active',
      native_state: null,
      religion: 'Hinduism',
      nationality: 'GNB',
      aadhar_number: '************',
      passport_num: null,
      pan_number: null,
      address1: 'kandanchavadi',
      address2: 'omr road',
      city: 'Chennai',
      country: 'IN ',
      state: 'Tamil Nadu',
      zipcode: '600073',
      pre_address1: 'kandanchavadi',
      pre_address2: 'omr road',
      pre_city: 'Chennai',
      pre_country: 'HM',
      pre_state: 'Heard Island and McDonald Islands',
      pre_zipcode: '600073',
      profile_pic: 'https://ems-document.s3.ap-south-1.amazonaws.com/profile_pictures/users/1/e769d3ff3ff8fb99f864a4201_krishna.jpeg',
      joined_date: '2021-10-12',
      height: 200,
      weight: 100,
      department: 'it_services',
      designation: 'senior_software_engineer',
      probation: 'Completion',
      reason: 'New employee',
      emergency_contacts: [ [Object], [Object] ],
      bank_details: {
        id: '16',
        bank_name: 'TYY',
        branch: 'lji',
        account_number: '9876********7',
        ifsc: 'TYY70098',
        status: 'Approved',
        attachment: 'https://ems-document.s3.ap-south-1.amazonaws.com/bank_cheque_leafs/employees/e9114b286362ec96815177502_plantuml%20%282%29.png',
        employee: undefined
      },
      documents: [ [Object], [Object] ],
      employment_history: [ [Object], [Object], [Object] ],
      educations: [ [Object] ],
      skills: [ [Object] ],
      certifications: [],
      training_sessions: [],
      supervisor: undefined,
      present_and_permanent_addres_same: true,
      nominee_details: [
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object]
      ],
      user: [],
      is_reporting_manager: false
    }
}

  test("Getbyid bankdetails with Correct status", async () => {
    let id = 15;
    let result = await getById(id);
    console.log("Bank details fetched successfully ", result);
    expect(result.code).toBe(200);
  });
  
  test("Create bankdetails with Correct status", async () => {
    let result = await create(testData[0], user);
    expect(result.code).toBe(200);
  });

  test("Update bankdetails with Correct status", async () => {
    let result = await update(testData[0], user);
    console.log("Bank details Update", result);
    expect(result.code).toBe(200);
  });

  // test("Remove bankdetails with Correct status", async () => {
  //   let result = await remove(testData[0], user);
  //   console.log("Bank details Remove", result);
  //   expect(result.code).toBe(200);
  // });

  test("List bankdetails with Correct status", async () => {
    let result = await list(testData[0], user);
    console.log("Bank details List", result);
    expect(result.code).toBe(200);
  });

  // When giving wrong data.......

  test("Create bankdetails with wrong employee id", async () => {
    let result = await create(testData[1],user);
    expect(result.code).toBe(404);
  });

  test("Create bankdetails with correct employee id", async () => {
    let result = await list(user);
    console.log(result);
    expect(result.code).toBe(200);
  });



  
});
