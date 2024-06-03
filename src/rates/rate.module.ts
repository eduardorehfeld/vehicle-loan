import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RateService],
  exports: [RateService],
  controllers: [RateController],
})
export class RateModule {}
