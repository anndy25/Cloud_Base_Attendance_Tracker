const dotEnv  = require("dotenv");

// if (process.env.NODE_ENV !== 'prod') {
//     const configFile =  `./.env.${process.env.NODE_ENV}`;
//     dotEnv.config({ path:  configFile });
// } else {
// }
dotEnv.config();

module.exports = {

    WEBSITE_URL: process.env.WEBSITE_URL,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,

    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    FOLDER_NAME: process.env.FOLDER_NAME,
    
    APP_SECRET: process.env.APP_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
}
 