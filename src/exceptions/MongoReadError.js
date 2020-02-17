class MongoReadError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MongoReadError';
    }
}

module.exports = MongoReadError;
