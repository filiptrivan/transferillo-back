const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'filiptrivan5@gmail.com',
        pass: 'gamwyfadrfwhjppg'
    }
});

// send mail with defined transport object
let mailOptions = {
    from: 'filiptrivan5@gmail.com', // sender address
    to: 'recipient@example.com', // list of receivers
    subject: 'Test Email', // Subject line
    text: 'Hello, this is a test email.', // plain text body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        console.log("[0] email not sent!");
    } else {
        console.log('Email sent: ' + info.response);
    }
});
