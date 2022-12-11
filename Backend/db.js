const mongoose = require("mongoose");

const mongooseURL =process.env.DB_URL;

const mongoDBConnection = () => {
  mongoose
    .connect(mongooseURL)
    .then(() => {
      console.log("connection sucessful with database!");
    })
    .catch((e) => {
      console.log("connection with database failed!");
    });
};

module.exports=mongoDBConnection;