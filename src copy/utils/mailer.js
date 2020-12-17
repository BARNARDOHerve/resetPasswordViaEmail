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
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    let template;
    let subject;
    switch (emailToSend[0]) {
      case 'reset-password':
        template = '../public/templates/resetPassword.ejs';
        subject = 'Reset password';
        break;
      default:
        template = '';
    }
    return ejs.renderFile(path.join(__dirname, template), emailToSend[1], (error, data) => {
      console.log('hello');
        if (error) {
          console.log(error);
        } else {
          const emailOptions = {
            from: '"BAREFOOT NORMAD" <barefootnomard@gmail.com>',
            to: emailToSend[2],
            subject,
            html: data
          };
          console.log(transporter)
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