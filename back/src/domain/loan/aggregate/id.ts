import * as z from 'zod';

export const loanIdSchema = z.string().uuid();
export type LoanId = z.infer<typeof loanIdSchema>;
