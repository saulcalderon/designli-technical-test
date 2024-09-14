import { Module } from '@nestjs/common';
import { MapperModule } from './mapper/mapper.module';

@Module({
  imports: [MapperModule],
})
export class AppModule {}
