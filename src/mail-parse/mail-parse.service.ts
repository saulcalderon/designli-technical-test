import { readFile } from 'node:fs/promises';
import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { MailParseDto } from './dto/mail-parse.dto';
import { MailParseMethod } from './constants/mail-parse';
import { ParsedMail, simpleParser } from 'mailparser';

@Injectable()
export class MailParseService {
  private async readFileByFilePath(filePath: string): Promise<Buffer> {
    try {
      const file = await readFile(filePath);
      return file;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Error reading file in path ${filePath}`);
    }
  }

  private async parseEmail(fileSource: string | Buffer): Promise<ParsedMail> {
    try {
      return await simpleParser(fileSource);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Error parsing email`);
    }
  }

  private transformAttachmentToStream(attachment: Buffer): StreamableFile {
    try {
      return new StreamableFile(attachment, {
        type: 'application/json',
        disposition: 'attachment; filename="attachment.json"',
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Error transforming attachment`);
    }
  }

  async extractEmailAttachment(
    mailParseDto: MailParseDto,
  ): Promise<StreamableFile> {
    const { method, source } = mailParseDto;
    let file;

    if (method === MailParseMethod.FILE_PATH) {
      file = await this.readFileByFilePath(source);
    } else {
      // TODO: Implement file download from URL
      file = source;
    }

    const { attachments } = await this.parseEmail(file);

    if (!attachments || attachments.length === 0) {
      throw new BadRequestException('No attachments found in the email');
    }

    const attachmentBuffer = attachments[0].content;

    return this.transformAttachmentToStream(attachmentBuffer);
  }
}
