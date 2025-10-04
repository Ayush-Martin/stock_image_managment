import { injectable } from "inversify";
import { IEmailService } from "../../application/interface/services/IEmail.service";
import { createTransport } from "nodemailer";
import { envConfig } from "../../shared/configs/env";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: envConfig.NODEMAILER_USER,
    pass: envConfig.NODEMAILER_PASSWORD,
  },
});

@injectable()
class EmailService implements IEmailService {
  /**
   * method to send email
   * @param to 
   * @param subject 
   * @param text 
   * @param html 
   */
  public async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const message = {
      from: envConfig.NODEMAILER_USER,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(message);
  }
}

export default EmailService;
