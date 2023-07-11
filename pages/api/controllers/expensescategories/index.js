const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/expensescategories');
const requireAuth = require('../../middlewares/_requireAuth');

const {
    create: createExpensesCategoriesSchema,
    update: updateExpensesCategoriesSchema,
    delete: deleteExpensesCategoriesSchema,
    getById: getExpensesCategoriesSchema,
} = require('../../validations/expensescategories');

export default requireAuth(async (req, res) => {
    const {
        query: {
            id
        },
        method
    } = req;


    let result = response(UNAUTHORIZED, "Unauthorized to access this service");
    switch (method) {
        case "POST":
            result = await create(req, res);
            break;
        case "PUT":
            result = await update(req, res);
            break;
        case "DELETE":
            result = await remove(req, res);
            break;
        case "GET":
            if (id) {
                result = await getById(req, res);
            } else {
                result = await list(req, res)
            }
            break;
        default:
            res.setHeader("Allow", ["POST", "PUT", "DELETE", "GET"]);
            result = response(false, `method  ${method} Not Allowed`);

    }
    return res.json(result);
});

const create = async (req, res) => {
    try {
        let payload = req.body;
        const { error } = createExpensesCategoriesSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        let { code, ...expensesCategoriesObj } = await basic.create(payload);
        return res.status(code).send(expensesCategoriesObj);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });


    }
};

const update = async (req, res) => {
    try {
        let payload = req.body;
        let id = req.query.id;

        const { error } = updateExpensesCategoriesSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        let { code, ...expensesCategoriesObj } = await basic.update(id, payload);
        return res.status(code).send(expensesCategoriesObj);
    } catch (error) {
        // Return exception
        return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        let id = req.query.id;
        const { error } = deleteExpensesCategoriesSchema.query.validate();
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }

        let { code, ...expensesCategoriesObj } = await basic.remove(id);
        return res.status(code).send(expensesCategoriesObj);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        let id = req.query.id;
        const { error } = getExpensesCategoriesSchema.query.validate();
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        let { code, ...expensesCategoriesObj } = await basic.getById(id);

        return res.status(code).send(expensesCategoriesObj);

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

const list = async (_req, res) => {
    try {


        let { code, ...expensesCategoriesObj } = await basic.list();
        return res.status(code).send(expensesCategoriesObj);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};