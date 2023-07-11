import { update, create, list, remove } from "../controllers/employeeleavedays";
describe("Testing employeeleavedays endpoint", () => {
  const testdata = [
    {
      employee_leave: 25,
      leave_date: "2022-07-21",
      leave_type: "Full Day",
    },
    {
      employee_leave: 24,
      leave_date: "2022-07-23",
      leave_type: "2 Hours - Morning",
    },
    {
      employee_leave: 23,
      leave_date: "2022-08-12",
      leave_type: "3 Hours - Morning",
    },
  ];

  test("GetAll: ", async () => {
    let result = await list();
    expect(result.code).toBe(200);
  });
  test("GetById: ", async () => {});
  test("Create: ", async () => {});
  test("Edit: ", async () => {});
  test("Delete: ", async () => {});
});
