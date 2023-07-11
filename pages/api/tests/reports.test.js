import { create, update, list, remove } from '../controllers/reports';
describe('testing reports route', () => {
    const testdata = [
        {
            name: "dffd",
            details: "dsfdjhdbmhdvbjfdvdnmvd",
            parameters: "jsvdfhjdgudghdg",
            query: "shdvgdhvddbdjhfdvfdhh",
            paramorder: "shdfgshfgd",
            type: "Query",
            report_group: "fygddfgvhv",
            output: "CSV"
        },
        {
            name: "keerthsna"

        },
        { 
            name:3242
        }
    ];
    const testdata1 = [
        { 
            name: 122424,
            details: "dsfdjhdbmhdvbjfdvdnmvd",
            parameters: "jsvdfhjdgudghdg",
            query: "shdvgdhvddbdjhfdvfdhh",
            paramorder: "shdfgshfgd",
            type: "Query",
            report_group: "fygddfgvhv",
            output: "CSV"
        },
        {
            name: "dffd",
            details: "dsfdjhdbmhdvbjfdvdnmvd",
            parameters: "jsvdfhjdgudghdg",
            query: "shdvgdhvddbdjhfdvfdhh",
            paramorder: "shdfgshfgd",
            type: 123324,
            report_group: "fygddfgvhv",
            output: "CSV"
        },
        {
            name: "dffd",
            details: "dsfdjhdbmhdvbjfdvdnmvd",
            parameters: "jsvdfhjdgudghdg",
            query: "shdvgdhvddbdjhfdvfdhh",
            paramorder: "shdfgshfgd",
            type: "Query",
            report_group: "fygddfgvhv",
            output: 13324
        }
    ]
    test("Create reports with correct data", async () => {
        let result = await create(testdata[0]);
        expect(result.code).toBe(200);
    });
    for (let i of testdata1) {
        test("Create reports with incorrect data", async () => {
            let result = await create(i);
            expect(result.code).toBe(422);
        });
    }
    test("Update reports with correct data", async () => {
        let id = 2;
        let result = await update(testdata[1], id);
        expect(result.code).toBe(200);
    });
    test("Update reports with incorrect data", async () => {
        let id = 2;
        let result = await update(testdata[2], id);
        expect(result.code).toBe(422);
    });
    test("Getting list of reports with correct data", async () => {
        let result = await list();
        expect(result.code).toBe(200);
    });
    test("Delete reports with correct data", async () => {
        let id = 1
        let result = await remove(id);
        expect(result.code).toBe(200);
    });
})