import models from '../database/models';
const { user } = models

class UserServices {
    static async findUser(email) {
        try {
            return await user.findOne( { where:{ email } });
        } catch (error) {
            throw error;
        }
    }
}

export default UserServices;