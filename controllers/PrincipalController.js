const User = require("../models/User");
const Leave = require("../models/Leave");
// Get all pending approvals
exports.getPendingApprovals = async (req, res) => {
  try {
    const pendingApprovals = await User.find({
      role: { $in: ["warden", "class_coordinator"] },
      isApproved: false,
    });
    res.json(pendingApprovals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve user
exports.approveUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isApproved = true;
    await user.save();
    res.json({ message: "User approved successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leave requests
exports.getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find({ current_stage: 'principal' });
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
            leaveRequest.current_stage = 'approved';
        } else {
            leaveRequest.current_stage = 'rejected';
        }
        await leaveRequest.save();
        res.json({ message: 'Leave request updated successfully', leaveRequest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
