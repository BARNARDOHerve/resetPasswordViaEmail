/* eslint-disable no-console */
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailer = async (emailToSend) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS
      }
    });
    let template;
    let subject;
    switch (emailToSend[0]) {
      case 'sign-up':
        template = '../public/templates/signUp.ejs';
        subject = 'Email Verification';
        break;
      case 'reset-password':
        template = '../public/templates/resetPassword.ejs';
        subject = 'Reset password';
        break;
      default:
        template = '';
    }
    return ejs.renderFile(path.join(__dirname, template), emailToSend[1], (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const emailOptions = {
          from: '"Ubusizi Support" <ibitaborwanda005@gmail.com>',
          to: emailToSend[2],
          subject,
          html: data
        };
        transporter.sendMail(emailOptions)
          .then(() => console.log)
          .catch(() => console.error);
      }
    });
  } catch (error) {
    throw error;
  }
};
export default mailer;
