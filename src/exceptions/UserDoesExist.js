class UserDoesExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserDoesExist';
    }
}

module.exports = UserDoesExist;
