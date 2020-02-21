const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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

        res.status(200).json({
            message: '',
            data: users,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: null,
            statusCode: 500
        });

        return next(error);
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
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.params.id);

        res.status(200).json({
            message: 'User successfully was found',
            data: user,
            statusCode: 200
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
                statusCode: 422
            });
        }

        res.status(500).json({
            message: error.message,
            details: null,
            statusCode: 500
        });

        return next(error);
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
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.create(req.body);

        return res.status(200).json({
            message: 'User was successfully created',
            data: user,
            statusCode: 200
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
                statusCode: 422
            });
        }

        res.status(500).json({
            message: error.message,
            details: null,
            statusCode: 500
        });

        return next(error);
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
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const updatedUser = await UserService.updateById(req.body.id, {
            fullName: req.body.fullName
        });

        return res.status(200).json({
            message: 'User was successfully updated',
            data: updatedUser,
            statusCode: 200
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
                statusCode: 422
            });
        }

        res.status(500).json({
            message: error.message,
            details: null,
            statusCode: 500
        });

        return next(error);
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
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const deletedUser = await UserService.deleteById(req.body.id);

        return res.status(200).json({
            message: 'User was successfully deleted',
            data: deletedUser,
            statusCode: 200
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
                statusCode: 422
            });
        }

        res.status(500).json({
            message: error.message,
            details: null,
            statusCode: 500
        });

        return next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
