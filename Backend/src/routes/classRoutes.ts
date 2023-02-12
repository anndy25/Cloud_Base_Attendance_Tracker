import express from "express";
import * as ClassController from "../controllers/classController";

const router = express.Router();

router.post("/add-class", ClassController.addClass);

export default router;