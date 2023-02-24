import "dotenv/config";
import express, { NextFunction, Request, Response, Application } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import fileUpload from 'express-fileupload';
import cookieParser from "cookie-parser"
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import classRoutes from "./routes/classRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import overViewRoutes from "./routes/overViewRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";


const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true,}));
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],credentials: true,}));
app.use(fileUpload({useTempFiles: true}));

app.use("/api/users", userRoutes);
app.use("/api/overview", overViewRoutes);
app.use("/api/class", classRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/schedule", scheduleRoutes);



app.use((req:Request, res: express.Response, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;