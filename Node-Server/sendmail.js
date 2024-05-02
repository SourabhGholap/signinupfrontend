const nodemailer = require('nodemailer');
const sendMail = async(req,res) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'freda42@ethereal.email',
            pass: 'UmYcvCEyEPjScmZpxb'
        }
    });
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <freda42@ethereal.email>', // sender address
        to: "sourabhgholap7@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      res.json('Mail sent');  
}
module.exports = sendMail;