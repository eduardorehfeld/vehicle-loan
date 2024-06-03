import { LoanTerm } from '../enums/loan-term.enum';

export class LoanTermHelper {
  numberToEnum(loanTerm: number) {
    if (loanTerm <= 36) {
      return LoanTerm.UpTo36;
    } else if (loanTerm <= 48) {
      return LoanTerm.UpTo48;
    } else {
      return LoanTerm.UpTo60;
    }
  }
}
