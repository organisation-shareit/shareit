import { Loan } from '../aggregate';

type Input = {
  loan: Loan;
};

export function returnLoan(input: Input): Loan {
  const { loan } = input;
  return {
    ...loan,
    status: 'RETURNED',
    lastEvent: {
      kind: 'LOAN_UPDATED',
      loanId: loan.id,
    },
  };
}
