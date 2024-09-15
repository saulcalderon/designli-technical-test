import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class VerdictStatus {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}

class MailDetails {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  destination: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  source: string;
}

class ReceiptDetails {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  processingTimeMillis: number;

  @ApiProperty()
  @Type(() => VerdictStatus)
  @ValidateNested()
  @IsNotEmptyObject()
  spamVerdict: VerdictStatus;

  @ApiProperty()
  @Type(() => VerdictStatus)
  @ValidateNested()
  @IsNotEmptyObject()
  virusVerdict: VerdictStatus;

  @ApiProperty()
  @Type(() => VerdictStatus)
  @ValidateNested()
  @IsNotEmptyObject()
  spfVerdict: VerdictStatus;

  @ApiProperty()
  @Type(() => VerdictStatus)
  @ValidateNested()
  @IsNotEmptyObject()
  dkimVerdict: VerdictStatus;

  @ApiProperty()
  @Type(() => VerdictStatus)
  @ValidateNested()
  @IsNotEmptyObject()
  dmarcVerdict: VerdictStatus;
}

class SESInformation {
  @ApiProperty()
  @Type(() => ReceiptDetails)
  @ValidateNested()
  @IsNotEmptyObject()
  receipt: ReceiptDetails;

  @ApiProperty()
  @Type(() => MailDetails)
  @ValidateNested()
  @IsNotEmptyObject()
  mail: MailDetails;
}

export class SESNotificationDto {
  @ApiProperty()
  @Type(() => SESInformation)
  @ValidateNested()
  @IsNotEmptyObject()
  ses: SESInformation;
}
