import * as z from 'zod';
import { dateOrStringSchema } from '../../../utils/zod/date-or-string';

export const loanExpectedEndDateSchema = dateOrStringSchema;
export type LoanExpectedEndDate = z.infer<typeof loanExpectedEndDateSchema>;
