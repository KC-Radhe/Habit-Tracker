const User = require('../models/User');

class userRepository {

    constructor() {
        this.model = User;
    }
    
    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw error;
        }    
    };

    async getBy(elem) {
        try {
            const response = await this.model.findOne(elem);
            return response;
        } catch (error) {
            throw error;
        }
    };

    async update(id, newDAta) {
        try {
            const response = await this.model.findByIdAndUpdate(id, newDAta, {new: true});
            return response;
        } catch(error) {
            throw error;
        }
    };

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = userRepository;