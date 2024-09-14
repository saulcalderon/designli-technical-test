import { ApiProperty } from '@nestjs/swagger';
import { SESNotificationDto } from './ses-notification.dto';

export class SESNotificationRequestDto {
  @ApiProperty({ type: [SESNotificationDto] })
  Records: SESNotificationDto[];
}
