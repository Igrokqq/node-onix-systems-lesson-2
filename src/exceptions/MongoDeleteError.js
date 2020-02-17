class MongoDeleteError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MongoDeleteError';
    }
}

module.exports = MongoDeleteError;
