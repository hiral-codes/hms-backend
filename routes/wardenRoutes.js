const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/WardenController');
const authMiddleware = require('../middleware/Authmiddleware');

// Get all leave requests
router.get('/leave-requests',wardenController.getLeaveRequests);

// Approve or reject leave request
router.post('/leave-requests/:id', wardenController.updateLeaveRequest);

// Get attendance for meals
router.get('/attendance', authMiddleware, wardenController.getAttendance);

// Get list of all students
router.get('/students', authMiddleware, wardenController.getStudents);

// Get individual student profile
router.get('/students/:id', authMiddleware, wardenController.getStudentProfile);

module.exports = router;
