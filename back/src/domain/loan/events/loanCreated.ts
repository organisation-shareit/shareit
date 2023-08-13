import { z } from 'zod';
import { loanIdSchema } from '../aggregate/id';

export const loanCreatedSchema = z.object({
  kind: z.literal('LOAN_CREATED'),
  loanId: loanIdSchema,
});

export type LoanCreatedEvent = z.infer<typeof loanCreatedSchema>;
