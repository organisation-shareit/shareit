import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type LoanStatus = Brand<'ACCEPTED' | 'PENDING' | 'RETURNED' | 'REJECTED', 'loanStatus'>;

export const loanStatusSchema: z.Schema<LoanStatus> = z
  .any()
  .refine(
    (value) => z.enum(['ACCEPTED', 'PENDING', 'RETURNED', 'REJECTED']).safeParse(value).success,
  );

export const createLoanStatus = make<LoanStatus>();
