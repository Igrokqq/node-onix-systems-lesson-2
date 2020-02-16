const UserService = require('./service');
const validation = require('./validation');

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
        const { error } = validation.patterns.personId.validate(id);

        // if this data have passed validation
        if (error == null) {
            const user = await UserService.findById(id);

            res.status(200).json(user);
        } else {
            // prepare all errors descriptions in pretty view
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(',');

            res.status(422).json(errorMessage);
        }
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

        const validatedData = {
            personEmail: validation.patterns.email.validate(email),
            personFullName: validation.patterns.fullName.validate(fullName)
        };

        // if this data have passed validation
        if (
            validatedData.personEmail.error == null &&
            validatedData.personFullName.error == null
        ) {
            const foundUser = await UserService.findByEmail(email);

            // if this user does exist
            if (Object.keys(foundUser).length > 0) {
                res.status(404).end('Such user already exists');
            } else {
                await UserService.create({
                    fullName,
                    email
                });

                res.status(200).end('User was successfully added to database');
            }
        } else {
            // prepare all errors descriptions in pretty view
            const personEmail = validatedData.personEmail.error.details
                .map(detail => detail.message)
                .join(',');

            const personFullName = validatedData.personFullName.error.details
                .map(detail => detail.message)
                .join(',');

            res.status(422).json({
                personEmail,
                personFullName
            });
        }
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

        const validatedData = {
            personId: validation.patterns.personId.validate(id),
            personFullName: validation.patterns.fullName.validate(fullName)
        };

        // if this data have passed the validation
        if (
            validatedData.personId.error == null &&
            validatedData.personFullName.error == null
        ) {
            const foundUser = await UserService.findById(id);

            // if this user does exist
            if (Object.keys(foundUser).length > 0) {
                await UserService.updateById(id, fullName);

                res.status(200).end(
                    `User's profile ${id} was successfully updated`
                );
            } else {
                res.status(404).end('This user does not exist');
            }
        } else {
            // prepare all errors descriptions in pretty view
            const personIdErrorDescription = validatedData.personId.error.details
                .map(detail => detail.message)
                .join(',');

            const personFullNameErrorDescription = validatedData.personFullName.error.details
                .map(detail => detail.message)
                .join(',');

            res.status(422).json({
                personIdErrorDescription,
                personFullNameErrorDescription
            });
        }
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

        const { error } = validation.patterns.personId.validate(id);

        // if our data have passed validation
        if (error == null) {
            const foundUser = await UserService.findById(id);

            // if this user does exist
            if (Object.keys(foundUser).length > 0) {
                await UserService.deleteById(id);

                res.status(200).end(`User ${id} was successfully deleted`);
            } else {
                res.status(404).end('This user does not exist');
            }
        } else {
            // prepare all errors descriptions in pretty view
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(',');

            res.status(422).json(errorMessage);
        }
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
