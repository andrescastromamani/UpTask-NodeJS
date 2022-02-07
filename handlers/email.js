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
let generateHtml = (file, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
    return juice(html);
}
exports.send = async (options) => {
    const html = generateHtml(options.file, options);
    const text = htmlToText.fromString(html);
    let info = {
        from: '"UpTask " <info@uptask.com>', // sender address
        to: options.user.email, // list of receivers
        subject: options.subject, // Subject line
        text,
        html
    };
    const sendEmail = util.promisify(transporter.sendMail, transporter)
    return sendEmail.call(transporter, info);
}
