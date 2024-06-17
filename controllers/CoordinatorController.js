const Leave = require('../models/Leave');
const User = require('../models/User');

// Get all leave requests for approval
exports.getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find({ current_stage: 'class_coordinator' });
        res.json(leaveRequests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve a leave request
exports.updateLeaveRequest = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const leaveRequest = await Leave.findById(id);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        leaveRequest.status = status;
        if (status === 'approved') {
            leaveRequest.current_stage = 'principal';
        } else {
            leaveRequest.current_stage = 'rejected';
        }
        await leaveRequest.save();
        res.json({ message: 'Leave request updated successfully', leaveRequest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};