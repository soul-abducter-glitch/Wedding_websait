import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto.js';
import { ContactService } from './contact.service.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submit(@Body() body: ContactDto) {
    return this.contactService.handleLead(body);
  }
}
