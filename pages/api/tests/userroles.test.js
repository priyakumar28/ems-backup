import { createOrUpdate, list, getById, remove } from '../controllers/users/userroles';


describe('testing userroles route', () => {
    const testData = [
        {
                name:"admiOne"
        },
        {
            
            name: "admiOneee",
            id: 18,
            mod_arr: [],
            modules:[]
        }
    ]

    let permission={'Create roles': true,
                'View roles': true,
                'Update roles': true,
                'Set permissions for roles': true,
                'Delete roles': true
                }
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
        ],}


    test("get the userroles with expect id", async () => {
        let id = 2;
        let result = await getById(id);
        expect(result.code).toBe(200);
    })

    test("userroles createOrupdate with correct data", async () => {
        let result = await createOrUpdate(testData[0],user,permission);
        expect(result.code).toBe(200);
    })
    
    test("userroles createOrupdate with correct data", async () => {
        let result = await createOrUpdate(testData[1],user,permission);
        expect(result.code).toBe(200);
    })

    test("get the all userroles", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    })

    test("remove the userroles with expected id", async () => {
        let id = 23;
        let result = await remove(id);
        expect(result.code).toBe(200);
    })


    // Giving wrong data

    test("get the userroles with eexpect id", async () => {
        let id = 130;
        let result = await getById(id);
        expect(result.code).toBe(404);
    })
}) 