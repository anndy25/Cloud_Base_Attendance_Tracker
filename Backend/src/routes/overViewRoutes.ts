import express from "express";
import * as OverOverview from "../controllers/overViewController";
import * as Auth from "../middlewares/authorization"



const router = express.Router();


router.get('/admin',Auth.adminAuth,OverOverview.adminOverview);



export default router;