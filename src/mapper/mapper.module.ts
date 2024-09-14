import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MapperController } from './mapper.controller';

@Module({
  controllers: [MapperController],
  providers: [MapperService],
})
export class MapperModule {}
