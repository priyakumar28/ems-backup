
import { create,remove,update,list,getById } from '../controllers/employeeprojects';


describe('testing employeeprojects route', () => {
    
    const testData = [
        {
            employee: 4,
            project: 4,
            date_start: "09/24/2022",
            date_end: "10/15/2022",
            status: "Current",
            details: "Grandfather",
            bill_type: "Billable",
            bill_percent: "9009",
            comments: "kjhgfdytdtyfdf"
        },
        {
            employee: "Kotachari",
            bill_type: "2",
            project: "AP",
            date_start: "KNL",
            date_end: "KKL",
            status: "8988765678",
            details: "Grandfather",
            bill_percent: "",
            comments:""
        },
        {
            employee: "Nani",
            bill_type: "2",
            project: "AP",
            date_start: "KNL",
            date_end: "KKL",
            status: "8988765678",
            details: "Grandfather",
            bill_percent: "",
            comments:""
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


    test("GetbyId of employeeprojects", async () => {
        let id = 5;
        let result = await getById(id);
        (result,"employeeprojects with respective id")
        expect(result.code).toBe(200);
    });


    test("Create employeeprojects with correct data", async () => {
        let result = await create(testData[0]);
        expect(result.code).toBe(200);
    });

    test("Update employeeprojects with correct data", async () => {
        let id = 7;
        let result = await update(testData[0],id,user);
        expect(result.code).toBe(200);
    });

    test("Delete employeeprojects with correct data", async () => {
        let id = 5;
        let result = await remove(id);
        expect(result.code).toBe(200);
    });

    test("List of employeeprojects", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });

// when giving wrong data (422, 500)........
    
    test("GetbyId of employeeprojects", async () => {
        let id = 101;
        let result = await getById(id);
        expect(result.code).toBe(400);
    });

    test("Delete employeeprojects with wrong data", async () => {
        let id = 105;
        let result = await remove(id);
        expect(result.code).toBe(400);
    });

    test("Update employeeprojects with wrong data", async () => {
        let id = 107;
        let result = await update(testData[0],id);
        expect(result.code).toBe(400);
    });

    test("Update employeeprojects with wrong data", async () => {
        let id = 3;
        let result = await update(testData[1],id);
        expect(result.code).toBe(422);
    });

    test("Create employeeprojects with correct data", async () => {
        let result = await create(testData[2]);
        expect(result.code).toBe(422);
    });




});