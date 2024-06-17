// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Adjust the path if necessary

// const insertPrincipal = async () => {
//     await mongoose.connect('mongodb://localhost:27017/hostel', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     const existingPrincipal = await User.findOne({ role: 'principal' });
//     if (existingPrincipal) {
//         console.log('Principal already exists');
//         return;
//     }

//     const hashedPassword = await bcrypt.hash('SSAIET@12309', 10); // Replace with a secure password

//     const principal = new User({
//         name: 'Dipesh Shukla',
//         email: 'principal@ssaiet.com',
//         password: hashedPassword,
//         role: 'principal',
//         isApproved: true
//     });

//     await principal.save();
//     console.log('Principal inserted successfully');
//     mongoose.disconnect();
// };

// insertPrincipal();
