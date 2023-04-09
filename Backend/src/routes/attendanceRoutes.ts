import express from "express";
import * as AttendanceController from '../controllers/attendanceController';
import * as Auth from "../middlewares/authorization"

const router = express.Router();

router.put("/setAttendance",AttendanceController.setAttendance);
router.put('/markAttendance',AttendanceController.markAttendance);

router.get('/getInfoT',AttendanceController.getAttendanceInfoT);
router.get('/getInfoS',AttendanceController.getAttendanceInfoS);
router.get('/getDetails',AttendanceController.getAttendanceDetails);
router.get('/absentStudents',AttendanceController.absentStudents);



export default router;