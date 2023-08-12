import { z } from 'zod';
import { itemIdSchema } from '../aggregate/id';

export const itemCreatedSchema = z.object({
  kind: z.literal('ITEM_CREATED'),
  itemId: itemIdSchema,
});

export type UserCreatedEvent = z.infer<typeof itemCreatedSchema>;
