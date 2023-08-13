import { z } from 'zod';
import { userIdSchema } from '@domain/user/aggregate/id';
import { itemIdSchema } from '@domain/item/aggregate/id';
import { loanIdSchema } from './id';
import { loanEventsSchema } from '../events';
import { loanStatusSchema } from './status';
import { loanStartDateSchema } from './startDate';
import { loanExpectedEndDateSchema } from './expectedEndDate';

export const loan = z.object({
  id: loanIdSchema,
  itemId: itemIdSchema,
  sharedBy: userIdSchema,
  sharedTo: userIdSchema,
  status: loanStatusSchema,
  lastEvent: loanEventsSchema,
  startDate: loanStartDateSchema,
  expectedEndDate: loanExpectedEndDateSchema,
});

export type Loan = z.infer<typeof loan>;
export type LoanWithoutEvent = Omit<Loan, 'lastEvent'>;
