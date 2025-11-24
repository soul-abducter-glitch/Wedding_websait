import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service.js';

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  location: string;
  message: string;
  source?: string;
};

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async handleLead(body: ContactPayload & { honeypot?: string }) {
    if (body.honeypot) {
      this.logger.warn('Honeypot field filled, ignoring submission.');
      return { success: true };
    }

    const lead = await this.prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        weddingDate: body.weddingDate ? new Date(body.weddingDate) : undefined,
        location: body.location,
        message: body.message,
        source: body.source ?? 'contact_form',
      },
    });

    await Promise.allSettled([this.sendTelegram(body), this.sendEmail(body)]);
    return { success: true, leadId: lead.id };
  }

  private formatLeadBody(body: ContactPayload) {
    const fields = [
      `Имя: ${body.name}`,
      `Email: ${body.email}`,
      `Телефон: ${body.phone ?? 'Не указан'}`,
      `Свадебная дата: ${body.weddingDate ?? 'Не указана'}`,
      `Локация: ${body.location}`,
      `Источник: ${body.source ?? 'contact_form'}`,
      `Сообщение: ${body.message}`,
    ];
    return fields.join('\n');
  }

  private async sendTelegram(body: ContactPayload) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
      this.logger.warn('Telegram env vars not set, skipping telegram notification.');
      return;
    }

    const text = ['Новая заявка с сайта', this.formatLeadBody(body)].join('\n\n');
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch (error) {
      this.logger.error('Failed to send telegram message', error as Error);
    }
  }

  private async sendEmail(body: ContactPayload) {
    const host = this.configService.get<string>('SMTP_HOST');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    const from = this.configService.get<string>('SMTP_FROM') ?? 'no-reply@example.com';
    const to = this.configService.get<string>('SMTP_TO') ?? user;
    const port = Number(this.configService.get<string>('SMTP_PORT') ?? 465);

    if (!host || !user || !pass || !to) {
      this.logger.warn('SMTP env vars not set, skipping email notification.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = 'Новая заявка с сайта';
    const text = this.formatLeadBody(body);

    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        text,
      });
    } catch (error) {
      this.logger.error('Failed to send email notification', error as Error);
    }
  }
}
