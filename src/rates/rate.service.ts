import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanTerm } from './enums/loan-term.enum';
import { CreditScore } from './enums/credit-score.enum';
import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';
import { RateMessage } from './messages/rate.message';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private repository: Repository<Rate>,
  ) {}
  async getAnnualRateAsync(
    loanTermEnum: LoanTerm,
    creditScoreEnum: CreditScore,
  ) {
    const annualRate = await this.repository.findOne({
      where: {
        loanTerm: loanTermEnum,
        creditScore: creditScoreEnum,
      },
    });

    if (annualRate == null) {
      throw new NotFoundException(RateMessage.RateNotFound);
    }

    return annualRate;
  }

  findAll() {
    return this.repository.find();
  }
}
