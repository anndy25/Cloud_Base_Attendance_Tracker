import "dotenv/config";
import express, { NextFunction, Request, Response, Application } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import fileUpload from 'express-fileupload';
import cors from "cors";


import userRoutes from "./routes/userRoutes";
import classRoutes from "./routes/classRoutes";

const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1mb'}));
app.use(cors({origin: "*",credentials: true,}));
app.use(fileUpload({useTempFiles: true}));

app.use("/api/users", userRoutes);
app.use("/api/class", classRoutes);


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