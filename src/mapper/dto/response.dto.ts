import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

/**
 * @description DTO for the response of the mapping service
 *
 * @property {boolean} spam - Spam verdict
 * @property {boolean} virus - Virus verdict
 * @property {boolean} dns - DNS verdict
 * @property {string} mes - Month as text
 * @property {boolean} retrasado - Processing time in milliseconds
 * @property {string} emisor - Sender email without '@domain.com'
 * @property {string[]} receptor - Receiver emails without '@domain.com'
 */
export class ResponseDto {
  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.spamVerdict.status === 'PASS')
  spam: boolean;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.virusVerdict.status === 'PASS')
  virus: boolean;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return (
      obj.ses.receipt.spfVerdict.status === 'PASS' &&
      obj.ses.receipt.dkimVerdict.status === 'PASS' &&
      obj.ses.receipt.dmarcVerdict.status === 'PASS'
    );
  })
  dns: boolean;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return new Date(obj.ses.mail.timestamp).toLocaleString('es', {
      month: 'long',
    });
  })
  mes: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.processingTimeMillis > 1000)
  retrasado: boolean;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    const email = obj.ses.mail.source;
    return email.split('@')[0];
  })
  emisor: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    const emails = obj.ses.mail.destination;
    return emails.map((email: string) => email.split('@')[0]);
  })
  receptor: string[];
}
