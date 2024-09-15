import { Test, TestingModule } from '@nestjs/testing';
import { MailParseService } from './mail-parse.service';

describe('MailParseService', () => {
  let service: MailParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailParseService],
    }).compile();

    service = module.get<MailParseService>(MailParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
