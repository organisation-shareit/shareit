import { z } from 'zod';
import { userIdSchema } from '../../user/aggregate/id';
import { itemIdSchema } from '../../item/aggregate/id';
import { loanIdSchema } from './id';
import { loanEventsSchema } from '../events';
import { loanStatusSchema } from './status';
import { loanStartDateSchema } from './startDate';
import { loanExpectedEndDateSchema } from './expectedEndDate';

export const loanSchema = z.object({
  id: loanIdSchema,
  itemId: itemIdSchema,
  sharedBy: userIdSchema,
  sharedTo: userIdSchema,
  status: loanStatusSchema,
  lastEvent: loanEventsSchema,
  startDate: loanStartDateSchema,
  expectedEndDate: loanExpectedEndDateSchema,
});

export type Loan = z.infer<typeof loanSchema>;
export type LoanWithoutEvent = Omit<Loan, 'lastEvent'>;
