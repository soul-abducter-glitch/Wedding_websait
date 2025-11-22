import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';

type ContactPayload = {
  name: string;
  date: string;
  messenger: string;
  contact: string;
  details: string;
};

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async handleLead(body: ContactPayload) {
    const lead = await this.prisma.lead.create({ data: body });
    await Promise.allSettled([this.sendTelegram(body), this.sendEmail(body)]);
    return { status: 'ok', leadId: lead.id };
  }

  private async sendTelegram(body: ContactPayload) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
      this.logger.warn('Telegram env vars not set, skipping telegram notification.');
      return;
    }
    const text = [
      '🔥 Новая заявка с сайта!',
      `Имена: ${body.name}`,
      `Дата: ${body.date}`,
      `Связь: ${body.messenger} (${body.contact})`,
      `Сообщение: ${body.details}`,
    ].join('\n');
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
    const text = [
      '🔥 Новая заявка с сайта!',
      `Имена: ${body.name}`,
      `Дата: ${body.date}`,
      `Связь: ${body.messenger} (${body.contact})`,
      `Сообщение: ${body.details}`,
    ].join('\n');

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
