import {
  Controller,
  Post,
  Body,
  StreamableFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MailParseService } from './mail-parse.service';
import { MailParseDto } from './dto/mail-parse.dto';

@ApiTags('Mail Parse - Real Challenge')
@Controller('mail-parse')
export class MailParseController {
  constructor(private readonly mailParseService: MailParseService) {}

  @ApiOperation({ summary: 'Parse an email and extract the attachment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The attachment has been successfully parsed and returned',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something went wrong parsing the email',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() mailParseDto: MailParseDto): Promise<StreamableFile> {
    return this.mailParseService.extractEmailAttachment(mailParseDto);
  }
}
