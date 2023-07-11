import {
  list,
  getById,
  getByProjectIdAndEmployeeId,
  update,
  create,
  remove,
} from "../controllers/employeetimeentry";
/**Sanjeev's employeetimeentry unit test
 * 200089
 * @public */
describe("Testing employeetimeentry endpoint", () => {
  /**
   * correct data 200089
   * @public*/
  const testdata1 = [
    {
      project: 1,
      employee: 1,
      timesheet: 6,
      details: "Valid data 1",
      date_start: "2022-08-16",
      date_end: "2022-08-16",
      time_start: "09:30",
      time_end: "17:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 6,
      details: "Valid data 2",
      date_start: "2022-08-17",
      date_end: "2022-08-17",
      time_start: "08:00",
      time_end: "10:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 6,
      details: "Valid data 3",
      date_start: "2022-09-01",
      date_end: "2022-09-01",
      time_start: "08:00",
      time_end: "10:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 6,
      details: "Valid data 4",
      date_start: "2022-09-30",
      date_end: "2022-09-30",
      time_start: "08:00",
      time_end: "10:30",
      status: "Active",
    },
  ];

  /**
   * incorrect data 200089
   * @public*/
  const testdata2 = [
    {
      project: "joj",
      employee: 1,
      timesheet: 2,
      details: "Failed Valid 1",
      date_start: "2022-07-02",
      date_end: "2022-07-02",
      time_start: "09:30",
      time_end: "17:30",
      status: "Active",
    },
    {
      project: 1,
      employee: "moj",
      timesheet: 2,
      details: "Failed Valid 2",
      date_start: "2022-07-3",
      date_end: "2022-07-3",
      time_start: "10:00",
      time_end: "13:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: "koj",
      details: "Failed valid 3",
      date_start: "2022-07-04",
      date_end: "2022-07-04",
      time_start: "10:00",
      time_end: "13:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: 20024,
      date_start: "2022-07-05",
      date_end: "2022-07-05",
      time_start: "14:00",
      time_end: "15:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid 5",
      date_start: "konidncidnine",
      date_end: "2022-07-07",
      time_start: "09:00",
      time_end: "11:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid 6",
      date_start: "2022-07-07",
      date_end: "kuchBHi$$$$",
      time_start: "08:00",
      time_end: "11:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid 7",
      date_start: "2022-07-08",
      date_end: "2022-07-08",
      time_start: "091238",
      time_end: "15:40",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid 8",
      date_start: "2022-07-09",
      date_end: "2022-07-09",
      time_start: "09:00",
      time_end: 87878798,
      status: "Somethingda",
    },
    {
      details: "Failed valid 9",
      date_start: "2022-07-09",
      date_end: "2022-07-09",
      time_start: "09:00",
      time_end: 87878798,
      status: "Somethingda",
    },
  ];
  /**
   * business logic fail data 200089
   * @public*/
  const testdata3 = [
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid business logic 1",
      date_start: "2022-08-04",
      date_end: "2022-08-04",
      time_start: "08:00",
      time_end: "10:30",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid business logic 2",
      date_start: "2022-08-04",
      date_end: "2022-08-04",
      time_start: "12:00",
      time_end: "13:45",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid business logic 3",
      date_start: "2022-08-04",
      date_end: "2022-08-04",
      time_start: "08:00",
      time_end: "13:00",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid business logic 4",
      date_start: "2022-08-04",
      date_end: "2022-08-04",
      time_start: "10:15",
      time_end: "10:20",
      status: "Active",
    },
    {
      project: 1,
      employee: 1,
      timesheet: 2,
      details: "Failed valid business logic 5",
      date_start: "2022-08-04",
      date_end: "2022-08-04",
      time_start: "09:30",
      time_end: "12:30",
      status: "Active",
    },
  ];

  test("GetAll: ", async () => {
    let result = await list();
    expect(result.code).toBe(200);
  });
  test("GetById: ", async () => {
    let result = await getById(3);
    expect(result.code).toBe(200);
  });

  test("Get by project Id and employee Id: ", async () => {
    let result = await getByProjectIdAndEmployeeId(2, 1);
    expect(result.code).toBe(200);
  });

  //   for (let i in testdata1) {
  //     test("Create (valid data): ", async () => {
  //       let result = await create(testdata1[i]);
  //       expect(result.code).toBe(200);
  //     });
  //   }

  test("Edit (valid data): ", async () => {
    let result = await update(testdata1[0], 39);

    expect(result.code).toBe(200);
  });

  //   for (let i in testdata1) {
  //     test("Delete: ", async () => {
  //       let result = await remove(testdata1[i]);
  //       expect(result.code).toBe(200);
  //     });
  //   }
  for (let i in testdata2) {
    test("Create (invalid data): ", async () => {
      let result = await create(testdata2[i]);
      expect(result.code).toBe(422);
    });
  }
  for (let i in testdata2) {
    test("Edit (invalid data): ", async () => {
      let result = await update(testdata2[i], testdata2.indexOf(testdata2[i]));
      expect(result.code).toBe(422);
    });
  }
  for (let i in testdata3) {
    test("Create (fail business logic)", async () => {
      let result = await create(testdata3[i]);
      expect(result.code).toBe(422);
    });
  }
});
