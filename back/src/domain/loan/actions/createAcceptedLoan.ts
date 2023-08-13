import { UserId } from '@domain/user/aggregate/id';
import { ItemId } from '@domain/item/aggregate/id';
import { LoanId } from '../aggregate/id';
import { Loan } from '../aggregate';
import { LoanStartDate } from '../aggregate/startDate';
import { LoanExpectedEndDate } from '../aggregate/expectedEndDate';
import { createLoanStatus } from '../aggregate/status';

type Input = {
  id: LoanId;
  itemId: ItemId;
  sharedBy: UserId;
  sharedTo: UserId;
  startDate: LoanStartDate;
  expectedEndDate: LoanExpectedEndDate;
};

export function createAcceptedLoan(input: Input): Loan {
  const { id, itemId, sharedBy, sharedTo, startDate, expectedEndDate } = input;

  return {
    id,
    itemId,
    sharedBy,
    sharedTo,
    status: createLoanStatus('ACCEPTED'),
    startDate,
    expectedEndDate,
    lastEvent: {
      kind: 'LOAN_CREATED',
      loanId: id,
    },
  };
}
