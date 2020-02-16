const UserModel = require("./model");

module.exports = {
  /**
   * @exports
   * @method findAll
   * @param {}
   * @summary get list of all users
   * @returns Promise<UserModel[]>
   */
  async findAll() {
    return await UserModel.find({});
  },

  /**
   * @exports
   * @method findById
   * @param {string} id
   * @summary get a user
   * @returns {Promise<UserModel>}
   */
  async findById(id) {
    return await UserModel.findById(id);
  },

  /**
   * @exports
   * @method create
   * @param {object} profile
   * @summary create a new user
   * @returns {Promise<void>}
   */
  async create(profile) {
    await UserModel.create(profile);
  },

  /**
   * @exports
   * @method findByEmail
   * @param {string} email
   * @summary get a user
   * @returns {Promise<UserModel>}
   */
  async findByEmail(email) {
    return await UserModel.find({ email });
  },

  /**
   * @exports
   * @method updateById
   * @param {string} id
   * @param {string} fullName
   * @summary update a user's profile
   * @returns {Promise<void>}
   */
  async updateById(id, fullName) {
    await UserModel.findByIdAndUpdate(id, { fullName });
  },

  /**
   * @exports
   * @method deleteById
   * @param {string} id
   * @summary delete a user from database
   * @returns {Promise<void>}
   */
  async deleteById(id) {
    await UserModel.findByIdAndDelete(id);
  }
};
