import {
  list,
  getById,
  getByProjectIdAndEmployeeId,
  update,
  create,
  remove,
} from "../controllers/permissions";
/**Sanjeev's permissions unit test
 * 200089
 * @public */

describe("Testing permissions endpoint", () => {
  /**correct data
   * 200089
   * @public */
  const testdata1 = [
    {
      user_level: "Employee",
      user_role: 8,
      module_id: 20,
    },
    {
      user_level: "Employee",
      user_role: 8,
      module_id: 20,
    },
    {
      user_level: "Employee",
      user_role: 8,
      module_id: 20,
    },
  ];
  /**incorrect data
   * 200089
   * @public */
  const testdata2 = [
    {
      user_level: "God",
      user_role: 8,
      module_id: 20,
    },
    {
      user_level: "Employee",
      user_role: "KJFOIEJF",
      module_id: 20,
    },
    {
      user_level: "Employee",
      user_role: 8,
      module_id: "@*&^#ETYDHUJ",
    },
  ];
  test("GetAll: ", async () => {
    let result = await list();
    expect(result.code).toBe(200);
  });

  for (let i in testdata1) {
    test("Create (correct data): ", async () => {
      let result = await create(testdata1[i]);
      expect(result.code).toBe(200);
    });
  }
  for (let i in testdata1) {
    test("Update (correct data): ", async () => {
      let result = await update(testdata1[i], testdata1.indexOf(testdata1[i]));
      expect(result.code).toBe(200);
    });
  }
  test("Delete: ", async () => {
    let result = await remove(testdata1[1]);
    expect(result.code).toBe(200);
  });

  for (let i in testdata2) {
    test("Create (correct data): ", async () => {
      let result = await create(testdata2[i]);
      expect(result.code).toBe(422);
    });
  }
  for (let i in testdata2) {
    test("Update (correct data): ", async () => {
      let result = await update(testdata2[i], testdata2.indexOf(testdata2[i]));
      expect(result.code).toBe(422);
    });
  }
});
