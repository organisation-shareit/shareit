import { Brand, make } from 'ts-brand';
import * as z from 'zod';
import { dateOrStringSchema } from '../../../utils/zod/date-or-string';

export type LoanStartDate = Brand<Date, 'loanStartDate'>;

export const loanStartDateSchema: z.Schema<LoanStartDate> = z
  .any()
  .refine((value) => dateOrStringSchema.safeParse(value).success);

export const createLoanStartDate = make<LoanStartDate>();
