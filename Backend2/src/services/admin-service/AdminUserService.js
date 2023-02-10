
const { UserRepository,AdminUserRepository } = require("../../database");
const { FormateData, GeneratePassword, GenerateSalt,  UploadImage } = require("../../utils");
const { APIError } = require("../../utils/app-errors");



class AdminUserService {
    constructor() {

        this.repository = new AdminUserRepository();
        this.userRepo=new UserRepository();
        
    }

    async registration(data,image) {

        let emailPresent=await this.userRepo.findUser(data.email);
       
        if(!emailPresent){

   
            try {
                data.image= await UploadImage(image);
                // create salt  
                let salt = await GenerateSalt();
            
                data.password= await GeneratePassword(data.password, salt);
                
                const response = await this.repository.userRegistration(data);
            
                return FormateData(response);
    
            } catch (err) {
                throw new APIError('Data Not found', err)
            }
        }

        return FormateData({message:"Email Is Already Present !!"});


    };
}





module.exports = AdminUserService;