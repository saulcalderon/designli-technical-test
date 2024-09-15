import { Module } from '@nestjs/common';
import { MapperModule } from './mapper/mapper.module';
import { MailParseModule } from './mail-parse/mail-parse.module';

@Module({
  imports: [MapperModule, MailParseModule],
})
export class AppModule {}
