import 'dotenv/config';
import debug from 'debug';
const logger = debug('NodeMailer');
import nodemailer from 'nodemailer';
import dataMailer from './dataMail.json' assert { type: 'json' };
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER,
    },
});
transporter.verify(function (error, success) {
    if (error) {
        logger(error);
    }
    else {
        logger('\x1b[1;34m📧 Server is ready to take our messages.\x1b[0m');
    }
});
const sendEmail = {
    toUser(email, context) {
        const typedDataMailer = dataMailer;
        return transporter.sendMail({
            from: `"Yumedo 🌿" <"${process.env.USER_MAILER}">`,
            to: `${email}`,
            subject: typedDataMailer[context].subject,
            html: typedDataMailer[context].html,
        });
    },
};
export { sendEmail };
//# sourceMappingURL=nodemailerAuto.js.map