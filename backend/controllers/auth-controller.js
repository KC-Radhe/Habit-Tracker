const AuthService = require('../services/auth-services');

const authService = new AuthService();

const register = async (req, res) => {
    try {
        const response = await authService.registerUser(req.body);
        res.status(response.statusCode).json({
            success: true,
            response,
        });
    } catch (error) {
        res.status(error.statusCode || 500). json({
            success: false,
            error: error.message || 'Internal server error!!',
        });
    };
};

const signin = async (req, res) => {
    try {
        const response = await authService.signinUser(req.body);
        req.session.userId = response.response._id;
        res.status(response.statusCode).json({
            success: true,  
            response,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Internal server error!!',
        });
    };
};

const logout = async (req, res) => {
    try {
        const response = await authService.logoutUser(res);
        res.status(response.statusCode).json({
            success: true,
            response,
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Internal server error!!'
        })
    }

}
module.exports = {
    register,
    signin,
    logout
};