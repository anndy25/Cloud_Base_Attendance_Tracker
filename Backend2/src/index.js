const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');


const app = express();
    
 databaseConnection();

 expressApp(app);

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
}).on('error', (err) => {
    console.log(err);
    process.exit();
})

//  StartServer();