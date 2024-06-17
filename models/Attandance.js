const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    meal_preparation: { type: Boolean, default: false }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
