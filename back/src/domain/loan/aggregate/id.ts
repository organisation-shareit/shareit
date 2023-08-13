import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type LoanId = Brand<string, 'loanId'>;

export const loanIdSchema: z.Schema<LoanId> = z
  .any()
  .refine((value) => z.string().uuid().safeParse(value).success);

export const createLoanId = make<LoanId>();

export type Michel = Brand<string, 'loanId'>;