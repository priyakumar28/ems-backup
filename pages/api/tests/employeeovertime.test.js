const {
  create,
  list,
  update,
  getById,
  remove,
} = require("../controllers/employeeovertime");

/**Sanjeev's employeeovertime unit test
 * 200089
 * @public */
describe("Testing employeeovertime endpoint ", () => {
  /**correct data
   * @public */
  const testdata1 = [
    {
      employee_id: 1,
      start_time: "2022-07-25 08:30:00.000 +0530",
      end_time: "2022-07-25 09:45:00.000 +0530",
      category_id: 1,
      project: 1,
      notes: "Something to write in notes, kjfiejfiejfiej",
      created: new Date(),
      updated: new Date(),
      status: "Approved",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:30:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 2,
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      category_id: 3,
    },
    {
      employee_id: 1,
      category_id: 4,
    },
  ];
  /**invalid data
   * @public */
  const testdata2 = [
    {
      employee_id: "fne",
      start_time: "2022-07-25 19:30:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 2,
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "konichiwa",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 2,
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 21:45:00.000 +0530",
      end_time: "konichiwa",
      category_id: 2,
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: "blablabla",
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 1,
      project: "skdos",
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 1,
      project: 3,
      notes: 1233,
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 1,
      project: 3,
      notes: "1233",
      created: 938728,
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 1,
      project: 3,
      notes: "1233",
      created: new Date(),
      updated: "#(%&$^#&ETNDM",
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:45:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 1,
      project: 3,
      notes: "1233",
      created: new Date(),
      updated: new Date(),
      status: "Single",
    },
    {
      start_time: "2022-07-25 19:30:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      category_id: 2,
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
    {
      employee_id: 1,
      start_time: "2022-07-25 19:30:00.000 +0530",
      end_time: "2022-07-25 21:45:00.000 +0530",
      project: 1,
      notes: "notesdsdknsfindifeideejdiejdiefefed",
      created: new Date(),
      updated: new Date(),
      status: "Pending",
    },
  ];

  test("GetAll: ", async () => {
    let result = await list();
    expect(result.code).toBe(200);
  });
  test("GetById: ", async () => {
    let result = await getById(1);
    expect(result.code).toBe(200);
  });

  for (let i in testdata1) {
    test("Create (correct data): ", async () => {
      let result = await create(testdata1[i]);
      expect(result.code).toBe(200);
    });
  }
});
