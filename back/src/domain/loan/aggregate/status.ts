import * as z from 'zod';

export const loanStatusSchema = z.enum(['ACCEPTED', 'PENDING', 'RETURNED', 'REJECTED']);
export type LoanStatus = z.infer<typeof loanStatusSchema>;
