import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleLoanService } from './vehicle-loan.service';
import { VehicleLoanDto } from './dtos/vehicle-loan.dto';

@Controller('vehicles-loan')
export class VehicleLoanController {
  constructor(private readonly vehicleLoanService: VehicleLoanService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAnnualPercentageRateAsync(
    @Body() vehicleLoanDto: VehicleLoanDto,
  ): Promise<string> {
    return this.vehicleLoanService.findAnnualPercentageRateAsync(
      vehicleLoanDto,
    );
  }

  @Get()
  findAll() {
    return this.vehicleLoanService.findAll();
  }
}
