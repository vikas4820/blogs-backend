import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

export interface SendMailOptions {
  to: string | string[];
  subject: string;

  from?: string;
  text?: string;

  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Attachment[];
}

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // 🔥 CORE: Compile ANY HBS template dynamically
  private async generateTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      'email-templates',
      `${templateName}.hbs`,
    );

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);

    return compiledTemplate(context);
  }

  // 🔥 CORE: Send ANY template email
  async sendTemplateEmail(
    templateName: string,
    context: Record<string, any>,
    mailOptions: SendMailOptions,
  ): Promise<boolean> {
    try {
      const html = await this.generateTemplate(templateName, context);

      return await new Promise((resolve) => {
        this.transporter.sendMail(
          {
            from: mailOptions.from ?? `"Support" <${process.env.SMTP_FROM}>`,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html,
            text: mailOptions.text,
            cc: mailOptions.cc,
            bcc: mailOptions.bcc,
            replyTo: mailOptions.replyTo,
            attachments: mailOptions.attachments,
          },
          (error) => resolve(!error),
        );
      });
    } catch (error) {
      console.error('Template email failed:', error);
      return false;
    }
  }
}
