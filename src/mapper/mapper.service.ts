import { Injectable } from '@nestjs/common';
import { ResponseDto } from './dto/response.dto';
import { plainToInstance } from 'class-transformer';
import { SESNotificationDto } from './dto/ses-notification.dto';

@Injectable()
export class MapperService {
  mapToResponse(rawSesNotification: SESNotificationDto[]): ResponseDto[] {
    return plainToInstance(ResponseDto, rawSesNotification, {
      excludeExtraneousValues: true,
    });
  }
}
