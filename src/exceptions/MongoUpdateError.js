class MongoUpdateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MongoUpdateError';
    }
}

module.exports = MongoUpdateError;
