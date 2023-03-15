import express from "express";
import * as Overview from "../controllers/overViewController";
import * as Auth from "../middlewares/authorization"



const router = express.Router();


router.get('/admin', Overview.adminOverview);

router.get('/teacher/:id', Overview.teacherOverview);



export default router;