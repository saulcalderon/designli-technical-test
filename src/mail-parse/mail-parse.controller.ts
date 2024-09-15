import {
  Controller,
  Post,
  Body,
  StreamableFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { MailParseService } from './mail-parse.service';
import { MailParseDto } from './dto/mail-parse.dto';

@Controller('mail-parse')
export class MailParseController {
  constructor(private readonly mailParseService: MailParseService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() mailParseDto: MailParseDto): Promise<StreamableFile> {
    return this.mailParseService.extractEmailAttachment(mailParseDto);
  }
}
