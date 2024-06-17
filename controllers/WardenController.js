const Leave = require("../models/Leave.js");
const User = require("../models/User.js");
const Attendance = require("../models/Attandance.js");

// Get all leave requests
exports.getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find({ current_stage: "warden" });
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve or reject leave request
exports.updateLeaveRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const leaveRequest = await Leave.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    leaveRequest.status = status;
    if (status === "approved") {
      leaveRequest.current_stage = "class_coordinator";
    } else if (status === "rejected") {
      leaveRequest.current_stage = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid status value" });
    }
    await leaveRequest.save();
    res.json({ message: "Leave request updated successfully", leaveRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get attendance for meals
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get list of all students
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get individual student profile
exports.getStudentProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await User.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
