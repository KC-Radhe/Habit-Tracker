const bcrypt = require('bcrypt');
const userRepository = require('../repository/user-repository');
class authService {
    constructor() {
        this.userRepo = new userRepository();
    }

    async registerUser(data) {
        try {
            if(!data.name || !data.email || !data.password) throw {
                statusCode: 400,
                message: 'Credentials Empty!!!'
            };
            const isEmailExists = await this.userRepo.getBy({ email: data.email });
            if(isEmailExists) throw {
                statusCode: 409,
                message: 'Email already in use!! Try another one.',
            };
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8));

            const user = await this.userRepo.create({
                name: data.name, 
                email: data.email, 
                password: data.password
            });
            user.password = undefined;
            return {
                statusCode: 201,
                message: 'A new user is created',
                response: user,
            };
        } catch (error) {
            throw error;
        };
    };

    async signinUser(req, res) {
        try {
            if(!req.body.email || !req.body.password) throw {
                statusCode: 400,
                message: 'Credentials Empty!!!',
            };
            const user = await this.userRepo.getBy({ email: req.body.email });
            if(!user) throw {
                statusCode: 404,
                message: 'Email does not exists'
            };

            const passwordCompare = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordCompare) throw {
                statuscode: 401,
                message: 'Incorrect Password!!'
            };
            req.session.user = user._id;
            user.password = undefined;
            return {
                statusCode: 200,
                message: 'Login successfully',
                response: user,
            };

        } catch (error) {
            throw error;
        };
    };

    async logoutUser(req, res) {
        try {
            if(!req.session || !req.session.user) {
                return {
                    statusCode: 401,
                    message: 'Session expires or not authenticated'
                }
            }
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if(err) return reject(err);
                    res.clearCookie('connect.sid');
                    resolve();
                });
            });
            return {
               statusCode: 200,
               message: 'Logout successfully', 
            }
        } catch (error) {
           throw error;
        }
    }
};

module.exports = authService