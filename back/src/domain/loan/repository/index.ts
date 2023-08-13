import { Result } from 'neverthrow';
import { Loan, LoanWithoutEvent } from '../aggregate';
import { CannotSaveLoanError, LoanNotFoundError } from './errors';
import { LoanId } from '../aggregate/id';

export type LoanRepository = {
  getLoanById(input: { loanId: LoanId }): Promise<Result<LoanWithoutEvent, LoanNotFoundError>>;
  saveLoan(input: { loan: Loan }): Promise<Result<void, CannotSaveLoanError>>;
};
