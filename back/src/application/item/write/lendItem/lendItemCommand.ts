import { z } from 'zod';
import { aggregateIdSchema, commandIdSchema } from '@utils/command';
import { loanIdSchema } from '@domain/loan/aggregate/id';
import { itemIdSchema } from '@domain/item/aggregate/id';
import { userIdSchema } from '@domain/user/aggregate/id';

export const LEND_ITEM_COMMAND_KIND = 'LEND_ITEM_COMMAND' as const;

export const lendItemCommandPayloadSchema = z.object({
  id: loanIdSchema,
  itemId: itemIdSchema,
  sharedBy: userIdSchema,
  sharedTo: userIdSchema,
});

export const lendItemCommandSchema = z.object({
  kind: z.literal(LEND_ITEM_COMMAND_KIND),
  commandId: commandIdSchema,
  aggregateId: aggregateIdSchema,
  payload: lendItemCommandPayloadSchema,
});

export type LendItemCommand = z.infer<typeof lendItemCommandSchema>;
