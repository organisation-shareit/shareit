import { z } from 'zod';
import { userIdSchema } from '../../user/aggregate/id';
import { itemIdSchema } from './id';
import { itemNameSchema } from './name';
import { userEventsSchema } from '../events';

export const itemSchema = z.object({
  id: itemIdSchema,
  name: itemNameSchema,
  ownerId: userIdSchema,
  lastEvent: userEventsSchema,
});

export type Item = z.infer<typeof itemSchema>;

export type ItemWithoutEvent = Omit<Item, 'lastEvent'>;
