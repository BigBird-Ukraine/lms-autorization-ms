import * as nodemailer from 'nodemailer';
import { config } from '../../configs';

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

class MailService {
  async sendEmail(to: string, subject: string, url: string): Promise<void> {

    await transporter.sendMail({
      from: `OktenWeb <${config.ROOT_EMAIL}>`,
      to,
      subject,
      html: `<h1>Welcome to Okten Web UniversITy System </h1>
             <h3>Please, visit on this link :</h3>
        <a href="${url}">Press here</a>`
    });
  }
}

export const mailService = new MailService();
