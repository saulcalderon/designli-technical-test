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
  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.spamVerdict.status === 'PASS')
  spam: boolean;

  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.virusVerdict.status === 'PASS')
  virus: boolean;

  @Transform(({ obj }) => obj.ses.receipt.spfVerdict.status)
  spfStatus: string;

  @Transform(({ obj }) => obj.ses.receipt.dkimVerdict.status)
  dkimStatus: string;

  @Transform(({ obj }) => obj.ses.receipt.dmarcVerdict.status)
  dmarcStatus: string;

  @Expose()
  getDns(): boolean {
    return (
      this.spfStatus === 'PASS' &&
      this.dkimStatus === 'PASS' &&
      this.dmarcStatus === 'PASS'
    );
  }
  dns: boolean;

  @Expose()
  @Transform(({ obj }) => {
    return new Date(obj.ses.mail.timestamp).toLocaleString('es', {
      month: 'long',
    });
  })
  mes: string;

  @Expose()
  @Transform(({ obj }) => obj.ses.receipt.processingTimeMillis > 1000)
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }) => {
    const email = obj.ses.mail.source;
    return email.split('@')[0];
  })
  emisor: string;

  @Expose()
  @Transform(({ obj }) => {
    const emails = obj.ses.mail.destination;
    return emails.map((email: string) => email.split('@')[0]);
  })
  receptor: string[];
}
