import * as z from 'zod';
import { dateOrStringSchema } from '../../../utils/zod/date-or-string';

export const loanStartDateSchema = dateOrStringSchema;
export type LoanStartDate = z.infer<typeof loanStartDateSchema>;
