const UserModel = require('./model');
const MongoCreateError = require('../../exceptions/MongoCreateError');
const MongoReadError = require('../../exceptions/MongoReadError');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
async function findAll() {
    return await UserModel.find({});
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
async function findById(id) {
    return await UserModel.findById(id).exec()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(new MongoReadError(err)));
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
async function create(profile) {
    return await UserModel.create(profile)
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(new MongoCreateError(err)));
}

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
async function findByEmail(email) {
    return await UserModel.findOne({ email }).exec()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(new MongoReadError(err)));
}

/**
 * @exports
 * @method updateById
 * @param {string} id
 * @param {string} fullName
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
async function updateById(id, fullName) {
    return await UserModel.updateOne({ id }, { fullName }).exec()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    await UserModel.findByIdAndDelete(id).exec()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById
};
