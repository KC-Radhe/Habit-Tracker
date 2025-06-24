const AuthService = require('../services/auth-services');
const { successResponse, errorResponse } = require('../utils/controller-response');

const authService = new AuthService();

const register = async (req, res) => {
    try {
        const response = await authService.registerUser(req.body);
        res.status(response.statusCode).json(successResponse(response));
    } catch (error) {
        res.status(error.statusCode || 500). json(errorResponse(error));
    };
};

const signin = async (req, res) => {
    try {
        const response = await authService.signinUser(req, res);
        req.session.userId = response.response._id;
        res.status(response.statusCode).json(successResponse(response));
    } catch (error) {
        res.status(error.statusCode || 500). json(errorResponse(error));
    };
};

const logout = async (req, res) => {
    try {
        const response = await authService.logoutUser(req, res);
        res.status(response.statusCode).json(successResponse(response));
    } catch (error) {
        res.status(error.statusCode || 500). json(errorResponse(error));
    }

}
module.exports = {
    register,
    signin,
    logout
};