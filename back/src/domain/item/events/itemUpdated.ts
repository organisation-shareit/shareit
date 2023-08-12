import { z } from 'zod';
import { itemIdSchema } from '../aggregate/id';

export const itemUpdatedSchema = z.object({
  kind: z.literal('ITEM_UPDATED'),
  itemId: itemIdSchema,
});

export type UserUpdatedEvent = z.infer<typeof itemUpdatedSchema>;
