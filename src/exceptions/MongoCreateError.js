class MongoCreateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MongoCreateError';
    }
}

module.exports = MongoCreateError;
