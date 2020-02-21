const { Types } = require('mongoose');
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
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
async function updateById(id, newProfile) {
    return await UserModel.updateOne(
        { _id: Types.ObjectId(id) },
        {
            $set: newProfile
        }
    ).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    return await UserModel.deleteOne({ _id: Types.ObjectId(id) }).exec();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
