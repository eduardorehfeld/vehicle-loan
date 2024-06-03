import { VehicleLoanDto } from 'src/vehicle-loans/dtos/vehicle-loan.dto';
import { VehicleLoan } from 'src/vehicle-loans/entities/vehicle-loan.entity';

export const createCustomVehicleLoanDto = (
  loanAmount: number,
  loanTerm: number,
  creditScore: number,
  vehicleYear: number,
  vehicleMileage: number,
): VehicleLoanDto => ({
  loanAmount,
  loanTerm,
  creditScore,
  vehicleYear,
  vehicleMileage,
});

export const createCustomVehicleLoan = (
  id: number,
  loanAmount: number,
  loanTerm: number,
  creditScore: number,
  vehicleYear: number,
  vehicleMileage: number,
  percentageRate: number,
  createdAt: Date,
): VehicleLoan => ({
  id,
  loanAmount,
  loanTerm,
  creditScore,
  vehicleYear,
  vehicleMileage,
  percentageRate,
  createdAt,
});
