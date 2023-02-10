const express = require("express");
const admin = express.Router();
const { STATUS_CODES }= require("../utils/app-errors")
const  UserAuth = require('./middlewares/auth');

const {AdminUserService}=require("../services")

const adminUserservice=new AdminUserService();

admin.post('/registration',async (req,res,next)=> {
    try {
       
        const response = await adminUserservice.registration(req.body,req.files.photo); 
        return res.status(STATUS_CODES.OK).send(response);
        
    } catch (err) {
        next(err)
    }

})




module.exports = admin;