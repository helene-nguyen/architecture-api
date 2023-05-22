//~ Import modules
import 'dotenv/config';
import debug from 'debug';
const logger = debug('NodeMailer');
import nodemailer from 'nodemailer';
import dataMailer from './dataMail.json' assert { type: 'json' };

//~ TRANSPORTER
//& Config transporter "Hostinger"
const transporter = nodemailer.createTransport({
  // name: 'www.hostinger.com',
  // host: 'smtp.hostinger.com',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASSWORD_MAILER,
  }
});

//& Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    logger(error);
  } else {
    logger('\x1b[1;34m📧 Server is ready to take our messages.\x1b[0m');
  }
});

//~ EMAIL CONTENT
//& Config content email
const sendEmail = {
  toUser: (email: string, context: string) => {
    const typedDataMailer: IDataMailer = dataMailer;

    return transporter.sendMail(
      {
        from: `"Yumedo 🌿" <"${process.env.USER_MAILER}">`, // sender address
        to: `${email}`, // list of receivers
        subject: typedDataMailer[context].subject, // Subject line
        html: typedDataMailer[context].html, // html body
        //   text: typedDataMailer[`${context}`].text, // plain text body
        // attachments: [
        //   {   // utf-8 string as an attachment
        //       filename: 'text.txt',
        //       content: 'Attachments'
        //   },
        // {
        //   filename: 'logo',
        //   path: 'newlogo.png'
        // }
        // ]
      },
      (err) => {
        if (err) {
          return logger('❌ Error while sending email: ' + err);
        } else return logger('✅ Email sent successfully');
      }
    );
  },
};

export { sendEmail };
