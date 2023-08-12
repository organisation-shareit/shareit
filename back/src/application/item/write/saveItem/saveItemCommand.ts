import { z } from 'zod';
import { aggregateIdSchema, commandIdSchema } from '@utils/command';
import { itemIdSchema } from '@domain/item/aggregate/id';
import { userIdSchema } from '@domain/user/aggregate/id';
import { itemNameSchema } from '@domain/item/aggregate/name';

export const SAVE_ITEM_COMMAND_KIND = 'SAVE_ITEM_COMMAND' as const;

export const saveItemCommandPayloadSchema = z.object({
  id: itemIdSchema,
  name: itemNameSchema,
  ownerId: userIdSchema,
});

export const saveItemCommandSchema = z.object({
  kind: z.literal(SAVE_ITEM_COMMAND_KIND),
  commandId: commandIdSchema,
  aggregateId: aggregateIdSchema,
  payload: saveItemCommandPayloadSchema,
});

export type SaveItemCommand = z.infer<typeof saveItemCommandSchema>;
