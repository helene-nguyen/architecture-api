//~ Dotenv
import 'dotenv/config';

//~ Import Debug
import debug from 'debug';
const logger = debug('NodeMailer');

//~ Node Mailer
import nodemailer from 'nodemailer';
import dataMailer from './dataMail.json' assert { type: 'json' };

//~ TRANSPORTER
//& Config transporter "Hostinger"
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASSWORD_MAILER,
  },
});

//& Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    logger(error);
  } else {
    logger('\x1b[1;34m📧 Server is ready to take our messages.\x1b[0m');
  }
});

interface IDataMailer {
  [key: string]: {
    subject: string;
    html: string;
    // text: string;
  };
}

const typedDataMailer: IDataMailer = dataMailer;

//~ EMAIL CONTENT
//& Config content email
const sendEmail = {
  toUser(email: string, context: string) {
    return transporter.sendMail({
      from: `"Yumedo 🌿" <"${process.env.USER_MAILER}">`, // sender address
      to: `${email}`, // list of receivers
      subject: typedDataMailer[context].subject, // Subject line
      html: typedDataMailer[context].html, // html body
      //   text: typedDataMailer[`${context}`].text, // plain text body
    });
  },
};

export { sendEmail };
