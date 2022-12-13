const { body } = require("express-validator");

const basicChecks = [
    body('name', 'Enter a your name!').exists({ checkFalsy: true }),
    body('email', 'Enter a valid email!').isEmail(),
    body('password', 'Enter a password!').isLength({ min: 5 }),
    body('departmentInfo', 'Select a department!').exists({ checkFalsy: true }),
    body('phoneNumber', 'Enter a 10 digit phone number!').exists().isLength({ min: 10 }),
    body('gender', "Select gender from list").isIn(['male', 'female', 'transgender'])
]

const validateFile = (req, res, next) => {

    const acceptedFile = ['png', 'jpg', 'jpeg'];
    if (!req.files) {
        return res.status(400).json({ message: "File not found!" });
    }

    const fileExists = req.files.image.mimetype.split('/').pop();
    if (!acceptedFile.includes(fileExists)) {
        return res.status(404).json({ message: "Image file is invalid!" });
    }

    next();

}

module.exports = {
    basicChecks,
    validateFile
};