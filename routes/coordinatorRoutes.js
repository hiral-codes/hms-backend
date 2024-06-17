const express = require('express');
const router = express.Router();
const classCoordinatorController = require('../controllers/CoordinatorController');
const authMiddleware = require('../middleware/Authmiddleware');

// Middleware to ensure the user is a class coordinator
// const ensureCoordinator = (req, res, next) => {
//     if (req.user.role !== 'class_coordinator') {
//         return res.status(403).json({ error: 'Access denied. Not a class coordinator.' });
//     }
//     next();
// };

// Use authMiddleware and ensureCoordinator for all routes
// router.use(authMiddleware, ensureCoordinator);

// Get all leave requests for approval
router.get('/leave-requests', classCoordinatorController.getLeaveRequests);

// Approve or reject a leave request
router.post('/leave-requests/:id', classCoordinatorController.updateLeaveRequest);

module.exports = router;
