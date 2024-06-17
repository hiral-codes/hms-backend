const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const studentController = require('../controllers/StudentController');

router.post('/apply-leave', studentController.applyLeave);
router.get('/track-leave-status/:student_id', studentController.trackLeaveStatus);
router.post('/mark-attendance', studentController.markAttendance);
router.post('/apply-emergency-leave', studentController.applyEmergencyLeave);
router.put('/profile/:id', upload.single('image'), studentController.updateProfile);
router.get('/profile/:id', studentController.getProfile);
router.get('/leave-history/:studentId', studentController.getLeaveHistory);

module.exports = router;
