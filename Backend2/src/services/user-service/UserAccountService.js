const { UserRepository } = require("../../database");
const {
    FormateData,
    GenerateSignature,
    ValidatePassword,
} = require("../../utils");
const { APIError } = require("../../utils/app-errors");

// All Business logic will be here
class UserAccountService {
    constructor() {
        this.repository = new UserRepository();
    }

    async login(userInputs) {
        const { email, password, isAdmin } = userInputs;
        try {
            const user = await this.repository.findUser(email);
            
            if (!user || (isAdmin === true && user.isAdmin === false)) {
                return FormateData({ message: "User Not Found !!" });
            }
            else {
                
                const validPassword = await ValidatePassword(
                    password,
                    user.password
                    );
                    
                    if (validPassword) {
                    const { _id, name, gender, dob, image, phoneNumber, role, department_id } = user;
                    const token = await GenerateSignature({ _id, name, email, gender, dob, image, phoneNumber, role, department_id, isAdmin });
                    return FormateData({ token });
                }
                return FormateData({ message: "User Not Found !!" });
            }

            
        } catch (err) {
            throw new APIError("Data Not found", err);
        }
    }


}

module.exports = UserAccountService;
