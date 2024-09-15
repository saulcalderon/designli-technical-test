import { Test, TestingModule } from '@nestjs/testing';
import { MapperService } from '../mapper.service';
import { sesEvent } from '../fixture/ses-sns-event';
import { cloneDeep } from 'lodash';

describe('MapperService', () => {
  let service: MapperService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapperService],
    }).compile();

    service = module.get<MapperService>(MapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('mapToResponse', () => {
    it('spam, virus, and dns should return false if all verdicts are not PASS', () => {
      // Arrange
      const value = cloneDeep(sesEvent.Records[0]);
      // modify value to make all verdicts not PASS
      value.ses.receipt.spamVerdict.status = 'FAIL';
      value.ses.receipt.virusVerdict.status = 'FAIL';
      value.ses.receipt.spfVerdict.status = 'FAIL';
      value.ses.receipt.dkimVerdict.status = 'FAIL';

      // Act
      const result = service.mapToResponse([value]);

      // Assert
      expect(result[0].spam).toEqual(false);
      expect(result[0].virus).toEqual(false);
      expect(result[0].dns).toEqual(false);
    });

    it('mes should return the month of the date as text', () => {
      // Arrange
      const value = cloneDeep(sesEvent.Records[0]);

      // Act
      const result = service.mapToResponse([value]);

      // Assert
      expect(result[0].mes).toEqual('septiembre');
    });

    it('retrasado should return true if processingTimeMillis is greater than 1000', () => {
      // Arrange
      const value = cloneDeep(sesEvent.Records[0]);
      value.ses.receipt.processingTimeMillis = 1001;

      // Act
      const result = service.mapToResponse([value]);

      // Assert
      expect(result[0].retrasado).toEqual(true);
    });

    it('emisor and receptor should return the username without domain', () => {
      // Arrange
      const value = cloneDeep(sesEvent.Records[0]);
      value.ses.mail.source = 'test@example.com';
      value.ses.mail.destination = ['random@example.com'];

      // Act
      const result = service.mapToResponse([value]);

      // Assert
      expect(result[0].emisor).toEqual('test');
      expect(result[0].receptor).toEqual(['random']);
    });
  });
});
