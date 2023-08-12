import { z } from 'zod';
import { itemCreatedSchema } from './itemCreated';
import { itemUpdatedSchema } from './itemUpdated';

export const userEventsSchema = z.discriminatedUnion('kind', [
  itemCreatedSchema,
  itemUpdatedSchema,
]);
