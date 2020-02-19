const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @param {object} data
     * @returns {{Object}}
     */
    findById(data) {
        return this.customJoi
            .object({
                id: this.customJoi.objectId()
            })
            .validate(data);
    }

    /**
     * @param {object} profile
     * @returns {{Object}}
     */
    create(profile) {
        return this.customJoi
            .object({
                email: this.customJoi.string().email(),
                fullName: this.customJoi
                    .string()
                    .min(1)
                    .max(30)
                    .required()
            })
            .validate(profile);
    }

    /**
     * @param {object} data
     * @returns {{Object}}
     */
    updateById(data) {
        return this.customJoi
            .object({
                id: this.customJoi.objectId(),
                fullName: this.customJoi
                    .string()
                    .min(1)
                    .max(30)
                    .required()
            })
            .validate(data);
    }

    /**
     * @param {object} data
     * @returns {{Object}}
     */
    deleteById(data) {
        return this.customJoi
            .object({
                id: this.customJoi.objectId()
            })
            .validate(data);
    }
}

module.exports = new UserValidation();
