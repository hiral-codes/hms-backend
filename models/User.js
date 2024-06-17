const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'warden', 'class_coordinator', 'principal'], required: true },
    isApproved: { type: Boolean, default: false },
    branch: { type: String },         
    enrollmentNo: { type: String },   
    semester: { type: String },       
    roomNo: { type: String },     
    mobileNo: { type: String },       
    dob: { type: Date },
    image: { type: Buffer },
    address: {type:String}
});

module.exports = mongoose.model('User', userSchema);
