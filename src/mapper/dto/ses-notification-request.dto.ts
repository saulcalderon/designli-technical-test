import { ApiProperty } from '@nestjs/swagger';
import { SESNotificationDto } from './ses-notification.dto';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SESNotificationRequestDto {
  @ApiProperty({ type: [SESNotificationDto] })
  @Type(() => SESNotificationDto)
  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  Records: SESNotificationDto[];
}
