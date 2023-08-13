import { Brand, make } from 'ts-brand';
import * as z from 'zod';
import { dateOrStringSchema } from '../../../utils/zod/date-or-string';

export type LoanExpectedEndDate = Brand<Date, 'loanExpectedEndDate'>;

export const loanExpectedEndDateSchema: z.Schema<LoanExpectedEndDate> = z
  .any()
  .refine((value) => dateOrStringSchema.safeParse(value).success);

export const createLoanExpectedEndDate = make<LoanExpectedEndDate>();
