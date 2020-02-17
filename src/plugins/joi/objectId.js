function objectId(joi) {
    return {
        type: 'objectId',
        base: joi.string(),
        messages: {
            'objectId.base': '{{#label}} Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
        },
        validate(value, helpers) {
            if (!Types.ObjectId.isValid(value)) {
                return {
                    value,
                    errors: helpers.error('objectId.base')
                };
            }
        },
    }
}

module.exports = objectId;
