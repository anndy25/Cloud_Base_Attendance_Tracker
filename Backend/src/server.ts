import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
const port = process.env.PORT || env.PORT;

mongoose.set("strictQuery", false);
mongoose.connect(env.DB_URL)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);