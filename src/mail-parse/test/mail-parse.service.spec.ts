import { Test, TestingModule } from '@nestjs/testing';
import { StreamableFile } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { MailParseService } from '../mail-parse.service';
import { MailParseDto } from '../dto/mail-parse.dto';
import { MailParseMethod } from '../constants/mail-parse';

/**
 * This is a valid URL that contains an email with an attachment for testing purposes.
 *
 * Note: The filebin service used to host this file uses S3 to store the email and attachment, and
 * the URL is valid for a determined short time which can affect the test results if the URL is not updated.
 */
const EXAMPLE_EMAIL_URL =
  'https://s3.filebin.net/filebin/9e565997604a21f81d647f66036738033d03b88adac63fbe5b7bba6e1e3e6407/81bcae317bc8706974bdf6ed9b789a71da256fd304956f4f6a402a493a165093?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=7pMj6hGeoKewqmMQILjm%2F20240915%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240915T190248Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D60&response-content-disposition=filename%3D%22email-example.eml%22&response-content-type=text%2Fplain%3B%20charset%3Dutf-8&X-Amz-Signature=20707c912e79c94c0e580dbce4a0a0340c6898df2d9a5ae1810ab94f2536bd1f';
describe('MailParseService', () => {
  let service: MailParseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailParseService],
    }).compile();

    service = module.get<MailParseService>(MailParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('extractEmailAttachment', () => {
    it('should extract attachment from file path', async () => {
      // Arrange
      const mockDto: MailParseDto = {
        method: MailParseMethod.FILE_PATH,
        source: 'src/mail-parse/fixture/email-example.eml',
      };

      // Act
      const result = await service.extractEmailAttachment(mockDto);

      // Assert
      expect(result).toBeInstanceOf(StreamableFile);
    });

    it('should extract attachment from URL', async () => {
      // Arrange
      const mockDto: MailParseDto = {
        method: MailParseMethod.URL,
        source: EXAMPLE_EMAIL_URL,
      };

      // Act
      const result = await service.extractEmailAttachment(mockDto);

      // Assert
      expect(result).toBeInstanceOf(StreamableFile);
    });

    it('should throw BadRequestException when no attachments found', async () => {
      // Arrange
      const mockDto: MailParseDto = {
        method: MailParseMethod.FILE_PATH,
        source: 'src/mail-parse/fixture/email-example.eml',
      };

      jest.spyOn(service as any, 'parseEmail').mockResolvedValue({
        attachments: [],
      });

      // Act & Assert
      await expect(service.extractEmailAttachment(mockDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when email is not found', async () => {
      // Arrange
      const mockDto: MailParseDto = {
        method: MailParseMethod.FILE_PATH,
        source: 'invalid-file-path',
      };

      // Act & Assert
      await expect(service.extractEmailAttachment(mockDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
