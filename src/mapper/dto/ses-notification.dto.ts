import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class VerdictStatus {
  @ApiProperty()
  @Expose()
  status: string;
}

class MailDetails {
  @ApiProperty()
  @Expose()
  timestamp: string;

  @ApiProperty()
  @Expose()
  destination: string[];

  @ApiProperty()
  @Expose()
  source: string;
}

class ReceiptDetails {
  @ApiProperty()
  @Expose()
  processingTimeMillis: number;

  @ApiProperty()
  @Expose()
  @Type(() => VerdictStatus)
  spamVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Type(() => VerdictStatus)
  virusVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Type(() => VerdictStatus)
  spfVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Type(() => VerdictStatus)
  dkimVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Type(() => VerdictStatus)
  dmarcVerdict: VerdictStatus;
}

class SESInformation {
  @ApiProperty()
  @Expose()
  @Type(() => ReceiptDetails)
  receipt: ReceiptDetails;

  @ApiProperty()
  @Expose()
  @Type(() => MailDetails)
  mail: MailDetails;
}

export class SESNotificationDto {
  @ApiProperty()
  @Expose()
  @Type(() => SESInformation)
  ses: SESInformation;
}
