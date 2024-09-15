import { Module } from '@nestjs/common';
import { MailParseService } from './mail-parse.service';
import { MailParseController } from './mail-parse.controller';

@Module({
  controllers: [MailParseController],
  providers: [MailParseService],
})
export class MailParseModule {}
