const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const juice = require('juice');
const util = require('util');
const emailConfig = require('../config/mailtrap');


let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.auth.user, // generated ethereal user
        pass: emailConfig.auth.pass // generated ethereal password
    },
});
let generateHtml = () => {
    return pug.renderFile('./views/emails/resetPassword.pug', {
        name: 'John Doe'
    });
}
// send mail with defined transport object
let info = transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: generateHtml(), // html body
});
transporter.sendMail(info);