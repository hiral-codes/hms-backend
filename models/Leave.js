const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    leave_type: { type: String, enum: ['regular', 'emergency'], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reason: { type: String, required: true },
    parent_mobile: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    current_stage: { type: String, enum: ['warden', 'class_coordinator', 'principal', 'approved', 'rejected'], default: 'warden' },
    rejected_by: { type: String } // New field to store who rejected the leave request
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
