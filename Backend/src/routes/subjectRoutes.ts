import express from "express";
import * as SubjectController from "../controllers/subjectController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

router.post("/add-subject",Auth.adminAuth, SubjectController.addSubject);

export default router;