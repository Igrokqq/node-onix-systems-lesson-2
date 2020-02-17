const UserService = require('./service');
const validationSchemas = require('./validation');
const Joi = require('@hapi/joi');
const ValidationError = require('../../exceptions/ValidationError');
const UserDoesExist = require('../../exceptions/UserDoesExist');
const UserDoesNotExistError = require('../../exceptions/UserDoesNotExistError');
const MongoCreateError = require('../../exceptions/MongoCreateError');
const MongoReadError = require('../../exceptions/MongoReadError');
const MongoUpdateError = require('../../exceptions/MongoUpdateError');
const MongoDeleteError = require('../../exceptions/MongoDeleteError');

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

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        await UserService.findById(id)
            .then(user => res.status(200).json(user))
            .catch(err => {
                throw new MongoReadError(err);
            });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json(error.message);
        }

        if (error instanceof MongoReadError) {
            return res.status(400).json(error.message);
        }

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

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const userDoesExist = await UserService.findByEmail(email)
            .then(foundUser => foundUser != null)
            .catch(err => {
                throw new MongoReadError(err);
            });

        if (userDoesExist) {
            throw new UserDoesExist('Such user already exists');
        }

        await UserService.create({
            fullName,
            email
        })
            .then(() => {
                res.status(200).json('User was successfully added to database');
            })
            .catch(err => {
                throw new MongoCreateError(err);
            });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json(error.message);
        }

        if (
            error instanceof UserDoesExist ||
            error instanceof MongoCreateError ||
            error instanceof MongoReadError
        ) {
            return res.status(400).json(error.message);
        }

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

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        await UserService.findById(id)
            .then(user => {
                if (user == null) {
                    throw new UserDoesNotExistError('The user was not found');
                }
            })
            .catch(err => {
                throw new MongoReadError(err);
            });

        await UserService.updateById(id, fullName)
            .then(() =>
                res
                    .status(200)
                    .json(`User's profile ${id} was successfully updated`)
            )
            .catch(err => {
                throw new MongoUpdateError(err);
            });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json(error.message);
        }

        if (
            error instanceof UserDoesNotExistError ||
            error instanceof MongoUpdateError ||
            error instanceof MongoReadError
        ) {
            return res.status(404).json(error.message);
        }

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
        const { error } = validationSchemas.deleteByIdSchema.validate({ id });

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        await UserService.findById(id)
            .then(user => {
                if (user == null) {
                    throw new UserDoesNotExistError('The user was not found');
                }
            })
            .catch(err => {
                throw new MongoReadError(err);
            });

        await UserService.deleteById(id)
            .then(() =>
                res.status(200).json(`User ${id} was successfully deleted`)
            )
            .catch(err => {
                throw new MongoDeleteError(err);
            });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json(error.message);
        }

        if (
            error instanceof MongoReadError ||
            error instanceof MongoDeleteError ||
            error instanceof UserDoesNotExistError
        ) {
            return res.status(404).json(error.message);
        }

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
