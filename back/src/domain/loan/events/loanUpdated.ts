import { z } from 'zod';
import { loanIdSchema } from '../aggregate/id';

export const loanUpdatedSchema = z.object({
  kind: z.literal('LOAN_UPDATED'),
  loanId: loanIdSchema,
});

export type LoanUpdatedEvent = z.infer<typeof loanUpdatedSchema>;
