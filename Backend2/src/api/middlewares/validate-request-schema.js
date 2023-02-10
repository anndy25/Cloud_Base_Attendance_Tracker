const { body, validationResult } = require("express-validator");

const validateRequestSchema=(req, res, next)=>{
    const error=validationResult(req, res, next);

    if(!error.isEmpty()) {
        return res.status(400).json({message: error.array()});
    }
    next();
}

module.exports = validateRequestSchema;