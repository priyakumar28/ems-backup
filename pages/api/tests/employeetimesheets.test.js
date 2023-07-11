import {
  list,
  getById,
  update,
  create,
  remove,
} from "../controllers/employeetimesheets";
/**Sanjeev's employeetimesheets unit test
 * 200089
 * @public */
describe("Testing employeeleavedays endpoint", () => {
  /**
   * testdata-valid
   * Sanjeev Gunasekaran 200089
   * @public*/
  const testdata1 = [
    {
      employee: 1,
      date_start: "2023-05-17",
      date_end: "2022-06-17",
      status: "Pending",
      comments: "Simply...",
    },
    {
      employee: 1,
      date_start: "2023-06-18",
      date_end: "2023-07-18",
      status: "Submitted",
    },

    {
      employee: 1,
      date_start: "2023-07-19",
      date_end: "2023-08-19",
    },
  ];
  /**
   * testdata-invalid data
   * Sanjeev Gunasekaran 200089
   * @public*/
  const testdata2 = [
    {
      employee: "fes",
      date_start: "2023-05-17",
      date_end: "2022-06-17",
      status: "Pending",
      comments: "Simply...",
    },
    {
      employee: 1,
      date_start: "2023-06-48",
      date_end: "2023-07-18",
      status: "Submitted",
    },

    {
      employee: 1,
      date_start: "2023-07-19",
      date_end: "2023-23-19",
    },
    {
      date_start: "2023-07-19",
      date_end: "2023-23-19",
    },
  ];
  /**
   * testdata-business logic fail data
   * Sanjeev Gunasekaran 200089
   * @public*/
  const testdata3 = [
    {
      employee: 1,
      date_start: "2022-10-09",
      date_end: "2022-10-12",
      status: "Pending",
      comments: "Condition 1",
    },
    {
      employee: 1,
      date_start: "2022-11-09",
      date_end: "2022-11-12",
      status: "Pending",
      comments: "Condition 2",
    },
    {
      employee: 1,
      date_start: "2022-10-09",
      date_end: "2022-11-12",
      status: "Pending",
      comments: "Condition 3",
    },
    {
      employee: 1,
      date_start: "2022-10-12",
      date_end: "2022-11-09",
      status: "Pending",
      comments: "Condition 4",
    },
    {
      employee: 1,
      date_start: "2022-10-10",
      date_end: "2022-11-10",
      status: "Pending",
      comments: "Condition 5",
    },
  ];

  //   test("GetAll: ", async () => {
  //     let result = await list();
  //     expect(result.code).toBe(200);
  //   });
  //   test("GetById: ", async () => {
  //     let result = await getById(3);
  //     expect(result.code).toBe(200);
  //   });
  //   test("Create (correct data): ", async () => {
  //     let result = await create(testdata1[1]);
  //     expect(result.code).toBe(200);
  //   });
  //   test("Edit (correct data): ", async () => {
  //     let result = await update(testdata1[1], 7);
  //     expect(result.code).toBe(200);
  //   });
  // test("Delete: ", async () => {
  //   let result = await remove(7);
  //   expect(result.code).toBe(200);
  // });

  //   for (let i in testdata2) {
  //     test("Create (invalid data): ", async () => {
  //       let result = await create(testdata2[i]);
  //       expect(result.code).toBe(422);
  //     });
  //   }

  //   for (let i in testdata2) {
  //     test("Edit (invalid data): ", async () => {
  //       let result = await update(testdata2[i], testdata2.indexOf(testdata2[i]));
  //       expect(result.code).toBe(422);
  //     });
  //   }
  for (let i in testdata3) {
    test("Create (fail business logic)", async () => {
      let result = await create(testdata3[i]);
      expect(result.code).toBe(422);
    });
  }
});
////2022-07-2022/////
