// emailRoutes.js
const dotenv = require('dotenv')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the appropriate email service
  auth: {
    user: 'hiralpatel160302@gmail.com',
    pass: 'Prime@160302' 
  }
});

router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'hiralpatel160302@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(`Error sending email: ${error.message}`);
    }
    res.status(200).send(`Email sent: ${info.response}`);
  });
});

module.exports = router;
