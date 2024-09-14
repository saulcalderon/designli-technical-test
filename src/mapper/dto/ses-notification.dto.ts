import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

const message = (property: string, type: string) =>
  `${property} must be a ${type}`;

class VerdictStatus {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value;
    throw new BadRequestException(message('status', 'string'));
  })
  status: string;
}

class MailDetails {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value;
    throw new BadRequestException(message('timestamp', 'string date'));
  })
  timestamp: string;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    throw new BadRequestException(message('destination', 'array'));
  })
  @Type(() => String)
  destination: string[];

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value;
    throw new BadRequestException(message('source', 'string'));
  })
  source: string;
}

class ReceiptDetails {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'number') return value;
    throw new BadRequestException(message('processingTimeMillis', 'number'));
  })
  processingTimeMillis: number;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('spamVerdict', 'object'));
  })
  @Type(() => VerdictStatus)
  spamVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('virusVerdict', 'object'));
  })
  @Type(() => VerdictStatus)
  virusVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('spfVerdict', 'object'));
  })
  @Type(() => VerdictStatus)
  spfVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('dkimVerdict', 'object'));
  })
  @Type(() => VerdictStatus)
  dkimVerdict: VerdictStatus;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('dmarcVerdict', 'object'));
  })
  @Type(() => VerdictStatus)
  dmarcVerdict: VerdictStatus;
}

class SESInformation {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('receipt', 'object'));
  })
  @Type(() => ReceiptDetails)
  receipt: ReceiptDetails;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('mail', 'object'));
  })
  @Type(() => MailDetails)
  mail: MailDetails;
}

export class SESNotificationDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'object') return value;
    throw new BadRequestException(message('ses', 'object'));
  })
  @Type(() => SESInformation)
  ses: SESInformation;
}
