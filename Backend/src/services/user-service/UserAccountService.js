const { UserRepository } = require("../../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../../utils/app-errors')


// All Business logic will be here
class UserAccountService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.findUser({ email});

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                } 
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

   
    

}

module.exports = UserAccountService;