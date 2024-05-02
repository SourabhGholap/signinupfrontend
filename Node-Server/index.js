const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const sendmail = require('./sendmail');
const nodemailer = require('nodemailer');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.post('/demo',async (req,res)=>{
    console.log(req.body.email);
    let otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    res.json({otp:otp});
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'freda42@ethereal.email',
            pass: 'UmYcvCEyEPjScmZpxb'
        }
    });
    // make a string which contains value of otp
    let msg = "OTP FOR LOGIN IS : " + otp;
   
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <freda42@ethereal.email>', // sender address
        to:req.body.email, // list of receivers
        subject: "Login OTP for demo app", // Subject line
        text: msg, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
      res.json('Mail sent');  
})

// server.get('/mail',sendmail);

server.listen(8080, () => {
  console.log('Server is running...');
});