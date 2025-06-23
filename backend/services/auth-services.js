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
            req.session.userId = user._id;
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

    async signinUser(data) {
        try {
            if(!data.email || !data.password) throw {
                statusCode: 400,
                message: 'Credentials Empty!!!',
            };
            const user = await this.userRepo.getBy({ email: data.email });
            if(!user) throw {
                statusCode: 404,
                message: 'Email does not exists'
            };

            const passwordCompare = bcrypt.compareSync(data.password, user.password);
            if(!passwordCompare) throw {
                statuscode: 401,
                message: 'Incorrect Password!!'
            };
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

    async logoutUser(res) {
        try {
            await new Promise((resolve, reject) => {
                res.session.destroy((err) => {
                    if(err) return reject(err);
                    res.clearCookie('connect.sid');
                    resolve();
                });
            });
            return {
               statusCode: 200,
               message: 'Lougout successfully', 
            }
        } catch (error) {
           throw error;
        }
    }
};

module.exports = authService