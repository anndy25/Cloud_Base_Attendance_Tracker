require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const mongoDBConnection = require("./db");

const fileUpload = require("express-fileupload");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const teacherRouter = require("./routers/teacherRouter");
const studentRouter = require("./routers/studentRouter");
const PORT = process.env.PORT || 8080;
app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // 
};

app.use(fileUpload({
    useTempFiles: true,
}));
app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

// app.use("/api/teacher", teacherRouter);

mongoDBConnection();

server.listen(PORT, () => {
    console.log(`server is running on port on ${PORT}`)
});