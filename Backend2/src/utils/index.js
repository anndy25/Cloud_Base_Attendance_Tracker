const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const { APP_SECRET, SALT_ROUNDS, CLOUD_NAME, API_KEY, API_SECRET, FOLDER_NAME, } = require("../config");

cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
});

module.exports.UploadImage = async (imagePath) => {
        const options = {
                width: 300,
                height: 300,
                gravity: "faces",
                crop: "fill",
                use_filename: true,
                unique_filename: true,
                overwrite: true,
                folder: FOLDER_NAME,
        };
    

        const result = await cloudinary.uploader.upload(imagePath.tempFilePath, options);
       
        return {url:result.url,public_id:result.public_id };
};



module.exports.GenerateSalt = async () => {
        return await bcrypt.genSalt(parseInt(SALT_ROUNDS));
}
module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
}

module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
        return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload) => {
        return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
}
module.exports.ValidateSignature = async (req) => {
        const signature = req.get("Authorization");

        console.log(signature);

        if (signature) {
                const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
                req.user = payload;
                return true;
        }

        return false;
};

module.exports.FormateData = (response) => {
        if (response) {
                return { response };
        } else {
                throw new Error("Data Not found!");
        }
};
