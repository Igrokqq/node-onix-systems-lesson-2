class UserDoesNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserDoesNotExist';
    }
}

module.exports = UserDoesNotExistError;
