const UserService = require('./service');
const validationSchemas = require('./validation');
const Joi = require('@hapi/joi');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { id } = req.params;
        const { error } = validationSchemas.findByIdSchema.validate({ id });

        /*
            If we have an error then send 422 HTTP code
            and show first error message which has appeared at
            validation in json view
         */
        if (error != null) {
            return res.status(422).json(error.details[0].message);
        }

        const user = await UserService.findById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { email, fullName } = req.body;

        const { error } = validationSchemas.createSchema.validate({
            email,
            fullName
        });

        if (error != null) {
            return res.status(422).json(error.details[0].message);
        }

        const foundUser = await UserService.findByEmail(email);

        if (Object.keys(foundUser).length > 0) {
            return res.status(404).json('Such user already exists');
        }

        await UserService.create({
            fullName,
            email
        });

        res.status(200).json('User was successfully added to database');
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { id, fullName } = req.body;

        const { error } = validationSchemas.updateByIdSchema.validate({
            id,
            fullName
        });

        if (error != null) {
            return res.status(422).json(error.details[0].message);
        }

        const foundUser = await UserService.findById(id);

        if (foundUser == null) {
            return res.status(404).json('The user was not found');
        }

        await UserService.updateById(id, fullName);

        res.status(200).json(`User's profile ${id} was successfully updated`);
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { id } = req.body;

        const { error } = validationSchemas.deleteById.validate({ id });

        if (error != null) {
            return res.status(422).json(error.details[0].message);
        }

        const foundUser = await UserService.findById(id);

        if (foundUser == null) {
            return res.status(404).json('The user was not found');
        }

        await UserService.deleteById(id);

        res.status(200).json(`User ${id} was successfully deleted`);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
