import { Controller, Post, Body } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { SESNotificationRequestDto } from './dto/ses-notification-request.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @ApiOperation({ summary: 'Map SES Notification to Response' })
  @ApiBody({ type: SESNotificationRequestDto })
  @Post()
  map(@Body() requestDto: SESNotificationRequestDto) {
    return this.mapperService.mapToResponse(requestDto.Records);
  }
}
