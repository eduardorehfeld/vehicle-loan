import { IsInt, IsNumber, IsPositive, Validate } from 'class-validator';
import {
  IsCreditScoreValid,
  IsLoanAmountValid,
  IsLoanTermValid,
  IsVehicleMileageValid,
  IsVehicleYearValid,
  MaxLoanCreditScoreAbove700,
  MaxLoanCreditScoreUpTo600,
  MaxLoanCreditScoreUpTo700,
  MinimumAmountFor36,
  MinimumAmountFor48,
  MinimumAmountFor60,
  UnavailablePercentage,
} from '../validators/vehicle-loan.validator';

export class VehicleLoanDto {
  @IsNumber()
  @IsPositive()
  @Validate(IsLoanAmountValid)
  loanAmount: number;

  @IsInt()
  @IsPositive()
  @Validate(IsLoanTermValid)
  @Validate(MinimumAmountFor36)
  @Validate(MinimumAmountFor48)
  @Validate(MinimumAmountFor60)
  @Validate(UnavailablePercentage)
  loanTerm: number;

  @IsInt()
  @IsPositive()
  @Validate(IsCreditScoreValid)
  @Validate(MaxLoanCreditScoreAbove700)
  @Validate(MaxLoanCreditScoreUpTo700)
  @Validate(MaxLoanCreditScoreUpTo600)
  creditScore: number;

  @IsInt()
  @IsPositive()
  @Validate(IsVehicleYearValid)
  vehicleYear: number;

  @IsInt()
  @IsPositive()
  @Validate(IsVehicleMileageValid)
  vehicleMileage: number;
}
