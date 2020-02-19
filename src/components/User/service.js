const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
async function findAll() {
    return await UserModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
async function findById(id) {
    return await UserModel.findById(id).exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
async function create(profile) {
    return await UserModel.create(profile);
}

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
async function findByEmail(email) {
    return await UserModel.findOne({ email }).exec();
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
async function updateById(_id, newProfile) {
    return await UserModel.updateOne({ _id }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
async function deleteById(_id) {
    return await UserModel.deleteOne({ _id }).exec();
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById
};
