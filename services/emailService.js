const nodemailer = require("nodemailer");
const ejs = require("ejs");


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    logger: true,
    debug: true,
    auth: {
        user: 'sheladiyabansariteqheal@gmail.com',
        pass: 'tkgi iirn auvv gfts'
    },
    tls: {
        rejectUnauthorized: true
    }
});


async function sendEmail() {
    let OTP = Math.floor(100000 + Math.random() * 900000);
    const html = await ejs.renderFile("emailtemplates/demo.ejs", {
        otp:OTP
    });
    const info = await transporter.sendMail({
        from: '"Sheladiya bansari 👻" <sheladiyabansariteqheal@gmail.com>',
        to: "bansari@mailinator.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: html,
    });
    console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
