const User = require('../models/User');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attandance');
const bcrypt = require("bcryptjs");

// Apply for leave
exports.applyLeave = async (req, res) => {
    const { student_id, leave_type, start_date, end_date, reason, parent_mobile } = req.body;
    const leave = new Leave({ student_id, leave_type, start_date, end_date, reason, parent_mobile });

    try {
        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Track leave status
exports.trackLeaveStatus = async (req, res) => {
    const { student_id } = req.params;

    try {
        const leaves = await Leave.find({ student_id });
        res.status(200).json(leaves);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
    const { student_id, date, meal_preparation } = req.body;
    const attendance = new Attendance({ student_id, date, meal_preparation });

    try {
        const savedAttendance = await attendance.save();
        res.status(201).json(savedAttendance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Apply for emergency leave
exports.applyEmergencyLeave = async (req, res) => {
    const { student_id, start_date, end_date, reason, parent_mobile } = req.body;
    const leave = new Leave({ student_id, leave_type: 'emergency', start_date, end_date, reason, current_stage: 'principal', parent_mobile });

    try {
        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get student profile
exports.getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure the user is a student
        if (user.role !== 'student') {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update student profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { branch, enrollmentNo, semester, roomNo, mobileNo, dob,address } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure the user is a student
        if (user.role !== 'student') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update fields
        if (branch) user.branch = branch;
        if (enrollmentNo) user.enrollmentNo = enrollmentNo;
        if (semester) user.semester = semester;
        if (roomNo) user.roomNo = roomNo;
        if (mobileNo) user.mobileNo = mobileNo;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        // Handle image upload
        if (req.file) {
            user.image = req.file.buffer;
        }
        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get leave history
exports.getLeaveHistory = async (req, res) => {
    const { studentId } = req.params;

    try {
        const leaveHistory = await Leave.find({ student_id: studentId });
        res.json(leaveHistory);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leave history' });
    }
};
