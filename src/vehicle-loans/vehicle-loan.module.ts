import { Module } from '@nestjs/common';
import { VehicleLoanService } from './vehicle-loan.service';
import { VehicleLoanController } from './vehicle-loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleLoan } from './entities/vehicle-loan.entity';
import { CreditScoreHelper } from '../rates/helpers/credit-score.helper';
import { LoanTermHelper } from '../rates/helpers/loan-term.helper';
import { RateModule } from '../rates/rate.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleLoan]), RateModule],
  controllers: [VehicleLoanController],
  providers: [VehicleLoanService, CreditScoreHelper, LoanTermHelper],
})
export class VehicleLoanModule {}
