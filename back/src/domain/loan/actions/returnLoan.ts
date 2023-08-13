import { Loan } from '../aggregate';
import { createLoanStatus } from '../aggregate/status';

type Input = {
  loan: Loan;
};

export function returnLoan(input: Input): Loan {
  const { loan } = input;
  return {
    ...loan,
    status: createLoanStatus('RETURNED'),
    lastEvent: {
      kind: 'LOAN_UPDATED',
      loanId: loan.id,
    },
  };
}
