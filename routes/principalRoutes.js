const express = require('express');
const router = express.Router();
const principalController = require('../controllers/PrincipalController');
const authMiddleware = require('../middleware/Authmiddleware');

// Get all pending approvals
router.get('/pending-approvals', principalController.getPendingApprovals);

// Approve user
router.post('/approve-user/:id', principalController.approveUser);

router.get('/leave-requests',  principalController.getLeaveRequests);
// Approve or reject a leave request
router.post('/leave-requests/:id', principalController.updateLeaveRequest);

module.exports = router;
