import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from '../messages/vehicle-loan.message';
import { VehicleLoanDto } from '../dtos/vehicle-loan.dto';

@ValidatorConstraint({ async: false })
@Injectable()
export class IsLoanAmountValid implements ValidatorConstraintInterface {
  validate(loanAmount: number) {
    if (loanAmount > 1000000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.invalidLoanAmount;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class IsLoanTermValid implements ValidatorConstraintInterface {
  validate(loanTerm: number) {
    if (loanTerm <= 0 || loanTerm > 60) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.invalidLoanTerm;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class IsCreditScoreValid implements ValidatorConstraintInterface {
  validate(creditScore: number) {
    if (creditScore < 0 || creditScore > 1000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.invalidCreditScore;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class IsVehicleYearValid implements ValidatorConstraintInterface {
  validate(vehicleYear: number) {
    if (vehicleYear < 1950 || vehicleYear > 2024) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.invalidVehicleYear;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class IsVehicleMileageValid implements ValidatorConstraintInterface {
  validate(vehicleMileage: number) {
    if (vehicleMileage > 1000000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.invalidVehicleMileage;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MinimumAmountFor36 implements ValidatorConstraintInterface {
  validate(loanTerm: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (
      loanTerm > 0 &&
      loanTerm <= 36 &&
      data.loanAmount > 0 &&
      data.loanAmount < 5000
    ) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.minimumAmountFor36;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MinimumAmountFor48 implements ValidatorConstraintInterface {
  validate(loanTerm: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (
      loanTerm > 36 &&
      loanTerm <= 48 &&
      data.loanAmount > 0 &&
      data.loanAmount < 10000
    ) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.minimumAmountFor48;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MinimumAmountFor60 implements ValidatorConstraintInterface {
  validate(loanTerm: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (loanTerm > 48 && data.loanAmount > 0 && data.loanAmount < 15000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.minimumAmountFor60;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MaxLoanCreditScoreAbove700
  implements ValidatorConstraintInterface
{
  validate(creditScore: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (creditScore >= 700 && data.loanAmount > 100000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.creditScoreAbove700MaxLoan;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MaxLoanCreditScoreUpTo700 implements ValidatorConstraintInterface {
  validate(creditScore: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (creditScore >= 600 && creditScore < 700 && data.loanAmount > 75000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.creditScoreUpTo700MaxLoan;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class MaxLoanCreditScoreUpTo600 implements ValidatorConstraintInterface {
  validate(creditScore: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (creditScore > 0 && creditScore < 600 && data.loanAmount > 50000) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.creditScoreUpTo600MaxLoan;
  }
}

@ValidatorConstraint({ async: false })
@Injectable()
export class UnavailablePercentage implements ValidatorConstraintInterface {
  validate(loanTerm: number, args: ValidationArguments) {
    const data = args.object as VehicleLoanDto;
    if (loanTerm > 48 && data.creditScore < 600) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return Message.unavailablePercentage;
  }
}
