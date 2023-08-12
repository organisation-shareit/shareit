import { z } from 'zod';
import { userCreatedSchema } from './userCreated';
import { userUpdatedSchema } from './userUpdated';

export const userEventsSchema = z.discriminatedUnion('kind', [
  userCreatedSchema,
  userUpdatedSchema,
]);
