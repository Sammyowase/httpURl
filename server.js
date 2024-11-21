require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS   
  }
});


const mailOptions = {
  from: process.env.EMAIL_USER,   
  to: 'alayandeebudola@gmail.com', 
  subject: 'Sending Email using Node.js',
html: "<h1>HEllo,</h1><p>This is your boy <i>Samuel</i> </p>"
};


app.post('/send-email', (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
