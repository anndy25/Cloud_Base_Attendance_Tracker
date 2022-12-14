const express = require("express");
const user = express.Router();
const { STATUS_CODES }= require("../utils/app-errors")
const  UserAuth = require('./middlewares/auth');

const {UserAccountService}=require("../services")

const userAccountService=new UserAccountService();

user.get("/login",async(req,res,next)=>{
    try {
        const response=await userAccountService.login(req.body);
        return res.status(STATUS_CODES.OK).send(response);
        
    } catch (error) {
        next(err);
    }
})

module.exports =user;