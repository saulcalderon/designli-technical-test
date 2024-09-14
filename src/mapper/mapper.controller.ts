import { Controller, Post, Body } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { SESNotificationRequestDto } from './dto/ses-notification-request.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';

@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @ApiOperation({ summary: 'Map SES Notification to Response' })
  @ApiBody({ type: SESNotificationRequestDto })
  @ApiResponse({ type: ResponseDto, description: 'SES Notification Response' })
  @Post()
  map(@Body() requestDto: SESNotificationRequestDto) {
    return this.mapperService.mapToResponse(requestDto.Records);
  }
}
