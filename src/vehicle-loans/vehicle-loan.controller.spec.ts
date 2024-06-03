import { Test, TestingModule } from '@nestjs/testing';
import { VehicleLoanController } from './vehicle-loan.controller';
import { VehicleLoanService } from './vehicle-loan.service';
import {
  createCustomVehicleLoan,
  createCustomVehicleLoanDto,
} from '../../test/mocks/vehicle-loan.mocks';
import { VehicleLoan } from './entities/vehicle-loan.entity';
import { RateService } from '../rates/rate.service';
import { CreditScoreHelper } from '../rates/helpers/credit-score.helper';
import { LoanTermHelper } from '../rates/helpers/loan-term.helper';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { VehicleLoanDto } from './dtos/vehicle-loan.dto';

describe('VehicleLoanController', () => {
  let controller: VehicleLoanController;
  let service: VehicleLoanService;
  let repository: Repository<VehicleLoan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleLoanController],
      providers: [
        VehicleLoanService,
        {
          provide: RateService,
          useValue: { getAnnualRateAsync: () => null, findAll: () => null },
        },
        CreditScoreHelper,
        LoanTermHelper,
        {
          provide: getRepositoryToken(VehicleLoan),
          useValue: repository,
        },
      ],
    }).compile();

    controller = module.get<VehicleLoanController>(VehicleLoanController);
    service = module.get<VehicleLoanService>(VehicleLoanService);
  });

  describe('findAnnualPercentageRateAsync', () => {
    it('should return the expected annual percentage rate', async () => {
      // Arrange
      const expectedAnnualPercentageRate = '5%';
      const customDto = createCustomVehicleLoanDto(25000, 48, 720, 2018, 30000);
      jest
        .spyOn(controller, 'findAnnualPercentageRateAsync')
        .mockResolvedValue(expectedAnnualPercentageRate);

      // Act
      const result = await controller.findAnnualPercentageRateAsync(customDto);

      // Assert
      expect(result).toBe(expectedAnnualPercentageRate);
    });

    it('should call service method with correct parameters', async () => {
      // Arrange
      const expectedAnnualPercentageRate = '14.25%';
      const customDto = createCustomVehicleLoanDto(
        75000.5,
        42,
        550,
        1999,
        100000,
      );
      jest
        .spyOn(service, 'findAnnualPercentageRateAsync')
        .mockResolvedValue(expectedAnnualPercentageRate);

      // Act
      const result = await controller.findAnnualPercentageRateAsync(customDto);

      // Assert
      expect(result).toBe(expectedAnnualPercentageRate);
    });

    it('should fail if loanAmount is negative', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = -1000;
      dto.loanTerm = 12;
      dto.creditScore = 1000;
      dto.vehicleYear = 2000;
      dto.vehicleMileage = 5000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('loanAmount');
      expect(errors[0].constraints).toHaveProperty(
        'isPositive',
        'loanAmount must be a positive number',
      );
    });

    it('should fail if loanTerm is negative', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 1000;
      dto.loanTerm = -12;
      dto.creditScore = 1000;
      dto.vehicleYear = 2000;
      dto.vehicleMileage = 5000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('loanTerm');
      expect(errors[0].constraints).toHaveProperty(
        'isPositive',
        'loanTerm must be a positive number',
      );
    });

    it('should fail if loanAmount is bellow the minimum for up to 36 loanTerm', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 1000;
      dto.loanTerm = 12;
      dto.creditScore = 1000;
      dto.vehicleYear = 2000;
      dto.vehicleMileage = 5000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('loanTerm');
      expect(errors[0].constraints).toHaveProperty(
        'MinimumAmountFor36',
        'The minimum loan amount for loans up to 36 months is $ 5,000.',
      );
    });

    it('should fail if loanAmount is above the maximum for creditScore greaten than 700', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 150000;
      dto.loanTerm = 26;
      dto.creditScore = 1000;
      dto.vehicleYear = 2020;
      dto.vehicleMileage = 50000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('creditScore');
      expect(errors[0].constraints).toHaveProperty(
        'MaxLoanCreditScoreAbove700',
        'The maximum loan amount for a credit score equal to 700 or above is $ 100,000.',
      );
    });

    it('should fail if loanAmount is above the maximum for creditScore up to 700', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 90000;
      dto.loanTerm = 26;
      dto.creditScore = 650;
      dto.vehicleYear = 2020;
      dto.vehicleMileage = 50000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('creditScore');
      expect(errors[0].constraints).toHaveProperty(
        'MaxLoanCreditScoreUpTo700',
        'The maximum loan amount for a credit score between 600 and 699 is $ 75,000.',
      );
    });

    it('should fail if loanAmount is above the maximum for creditScore up to 600', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 60000;
      dto.loanTerm = 26;
      dto.creditScore = 450;
      dto.vehicleYear = 2020;
      dto.vehicleMileage = 50000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('creditScore');
      expect(errors[0].constraints).toHaveProperty(
        'MaxLoanCreditScoreUpTo600',
        'The maximum loan amount for a credit score below 600 is $ 50,000.',
      );
    });

    it('should fail if loanTerm is greater than 48 months and creditScore bellow than 600', async () => {
      const dto = new VehicleLoanDto();
      dto.loanAmount = 25000;
      dto.loanTerm = 50;
      dto.creditScore = 550;
      dto.vehicleYear = 2017;
      dto.vehicleMileage = 75000;

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('loanTerm');
      expect(errors[0].constraints).toHaveProperty(
        'UnavailablePercentage',
        'Theres no percentage available for this loanTerm and creditScore.',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      // Arrange
      const vehicleLoan1 = createCustomVehicleLoan(
        1,
        15000,
        24,
        750,
        2018,
        50000,
        4.75,
        new Date('2023-01-01T00:00:00.000Z'),
      );

      const vehicleLoan2 = createCustomVehicleLoan(
        2,
        49999.99,
        46,
        650,
        2012,
        99000,
        6,
        new Date('2023-01-01T00:00:00.000Z'),
      );

      const expectedItems: VehicleLoan[] = [vehicleLoan1, vehicleLoan2];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedItems);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedItems);
      expect(result.length).toEqual(2);
    });
  });
});
