import { z } from 'zod';
import { loanCreatedSchema } from './loanCreated';
import { loanUpdatedSchema } from './loanUpdated';

export const loanEventsSchema = z.discriminatedUnion('kind', [
  loanCreatedSchema,
  loanUpdatedSchema,
]);
