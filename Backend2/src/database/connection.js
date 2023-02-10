const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async () => {

    mongoose
        .connect(DB_URL)
        .then(() => {
            console.log("connection sucessful with database!");
        })
        .catch((e) => {
            console.log("connection with database failed!");
        });

};

