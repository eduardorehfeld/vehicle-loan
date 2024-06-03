import { CreditScore } from '../enums/credit-score.enum';

export class CreditScoreHelper {
  numberToEnum(creditScore: number) {
    if (creditScore >= 700) {
      return CreditScore.GreaterThan700;
    } else if (creditScore >= 600) {
      return CreditScore.UpTo700;
    } else {
      return CreditScore.UpTo600;
    }
  }
}
