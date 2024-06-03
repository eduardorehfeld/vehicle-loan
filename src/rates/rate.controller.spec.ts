import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';

describe('VehicleLoanController', () => {
  let controller: RateController;
  let service: RateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateController],
      providers: [
        RateService,
        {
          provide: getRepositoryToken(Rate),
          useClass: Repository<Rate>,
        },
      ],
    }).compile();

    controller = module.get<RateController>(RateController);
    service = module.get<RateService>(RateService);
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      // Arrange
      const expectedItems: Rate[] = [
        { id: 1, loanTerm: 1, creditScore: 1, percentage: 4.75 },
        { id: 1, loanTerm: 1, creditScore: 2, percentage: 5.75 },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedItems);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedItems);
      expect(result.length).toEqual(2);
    });
  });
});
