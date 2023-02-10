const express = require('express');
const cors  = require('cors');
const { admin ,user} = require('./api');
const fileUpload = require("express-fileupload");



module.exports = async (app) => {
    var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200, // np
    };

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors(corsOptions));
    // app.use(express.static(__dirname + '/public'))

    //api

    app.use(fileUpload({
        useTempFiles: true,
    }));
    
   app.use("/api/admin",admin);
   app.use("/api/user",user);

    // error handling
    
}