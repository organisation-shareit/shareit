import { DatabaseError, RowNotMatchingSchemaError } from '@utils/database';
import { Loan } from '../aggregate';
import { LoanId } from '../aggregate/id';

export type CannotGetLoanError = DatabaseError | RowNotMatchingSchemaError;

export type LoanNotFoundError =
  | CannotGetLoanError
  | {
      kind: 'loanNotFound';
      loanId: LoanId;
    };

export type CannotSaveLoanError = {
  kind: 'cannotSaveLoan';
  loan: Loan;
  error: unknown;
};
