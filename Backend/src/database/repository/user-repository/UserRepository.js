const { UserModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class UserRepository {
    constructor() { }

    async findUser(email) {
        try {
            const user = await UserModel.findOne({ email:email });

            return user;

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User')
        }
    }
    


}

module.exports =UserRepository;