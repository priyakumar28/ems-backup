import {
  list,
  getById,
  update,
  create,
  remove,
} from "../controllers/designation";
/**Sanjeev's designation unit test
 * 200089
 * @public */
describe("Testing designation endpoint", () => {
  /**
   * testdata-valid
   * Sanjeev Gunasekaran 200089
   * @public*/
  const testdata1 = [
    {
      code: "DES4",
      name: "HR coordinator",
      department: 1,
      description: "I'm a HR coordinator",
      status: "Active",
    },
    {
      code: "DES5",
      name: "Associate Consultant",
      department: 5,
    },
  ];
  /**
   * testdata-invalid data
   * Sanjeev Gunasekaran 200089
   * @public*/
  const testdata2 = [
    {
      code: "DE127272727272727283929929929",
      name: "Associate consultant",
      department: 5,
    },
    {
      code: 2821.21,
      name: "Associate consultant",
      department: 5,
    },
    {
      code: "DE3",
      name: true,
      department: 5,
    },
    {
      code: "DE4",
      name: "Associate consultant",
      department: "someplacebro",
    },
    {
      code: "DE5",
      name: "Associate consultant",
      department: 5,
      description: false,
    },
    {
      department: 5,
    },
  ];

  //   test("GetAll: ", async () => {
  //     let result = await list();
  //     expect(result.code).toBe(200);
  //   });
  //   test("GetById: ", async () => {
  //     let result = await getById(1);
  //     expect(result.code).toBe(200);
  //   });

  //   for (let i in testdata1) {
  //     test("Create (correct data): ", async () => {
  //       let result = await create(testdata1[i]);
  //       expect(result.code).toBe(200);
  //     });
  //   }

  //   test("Update (correct data): ", async () => {
  //     let result = await update(testdata1[0], testdata1.indexOf(testdata1[0]));
  //     expect(result.code).toBe(200);
  //   });

  //   test("Delete: ", async () => {
  //     let result = await remove(testdata1.indexOf(testdata1[1]));
  //     expect(result.code).toBe(200);
  //   });
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
});
////2022-07-2022/////
