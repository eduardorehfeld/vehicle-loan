import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleLoanModule } from './vehicle-loans/vehicle-loan.module';
import { RateModule } from './rates/rate.module';
import {
  IsCreditScoreValid,
  IsLoanAmountValid,
  IsLoanTermValid,
  IsVehicleMileageValid,
  IsVehicleYearValid,
} from './vehicle-loans/validators/vehicle-loan.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rates/entities/rate.entity';
import { VehicleLoan } from './vehicle-loans/entities/vehicle-loan.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'vehicleLoanDatabase',
      entities: [VehicleLoan, Rate],
      synchronize: false,
    }),
    VehicleLoanModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsLoanAmountValid,
    IsLoanTermValid,
    IsCreditScoreValid,
    IsVehicleYearValid,
    IsVehicleMileageValid,
  ],
})
export class AppModule {}
