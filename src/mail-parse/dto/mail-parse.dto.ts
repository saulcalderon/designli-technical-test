import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MailParseMethod } from '../constants/mail-parse';
import { ApiProperty } from '@nestjs/swagger';

export class MailParseDto {
  @ApiProperty({ enum: MailParseMethod })
  @IsEnum(MailParseMethod)
  @IsNotEmpty()
  method: MailParseMethod;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  source: string;
}
