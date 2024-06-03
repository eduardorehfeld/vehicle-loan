import { Injectable } from '@nestjs/common';
import { VehicleLoanDto } from './dtos/vehicle-loan.dto';
import { LoanTermHelper } from '../rates/helpers/loan-term.helper';
import { CreditScoreHelper } from '../rates/helpers/credit-score.helper';
import { RateService } from '../rates/rate.service';
import { Repository } from 'typeorm';
import { VehicleLoan } from './entities/vehicle-loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';

@Injectable()
export class VehicleLoanService {
  constructor(
    private creditScoreHelper: CreditScoreHelper,
    private loanTermHelper: LoanTermHelper,
    private rateService: RateService,
    @InjectRepository(VehicleLoan)
    private repository: Repository<VehicleLoan>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findAnnualPercentageRateAsync(
    vehicleLoanDto: VehicleLoanDto,
  ): Promise<string> {
    const { loanTerm, creditScore, vehicleYear, vehicleMileage } =
      vehicleLoanDto;

    const loanTermEnum = this.loanTermHelper.numberToEnum(loanTerm);
    const creditScoreEnum = this.creditScoreHelper.numberToEnum(creditScore);

    const rate = await this.rateService.getAnnualRateAsync(
      loanTermEnum,
      creditScoreEnum,
    );

    let annualPercentageRate = new Decimal(rate.percentage);
    if (vehicleYear < 2015) {
      annualPercentageRate = annualPercentageRate.plus(1);
    }

    if (vehicleMileage > 100000) {
      annualPercentageRate = annualPercentageRate.plus(2);
    }

    this.createVehicleLoan(vehicleLoanDto, Number(annualPercentageRate));
    return annualPercentageRate + '%';
  }

  private createVehicleLoan(vehicleLoan: VehicleLoanDto, percentage: number) {
    const vehicleLoanEntity = new VehicleLoan(vehicleLoan, percentage);
    this.repository.save(vehicleLoanEntity);
  }
}
