import { z } from 'zod';
import { userIdSchema } from '../aggregate/id';

export const userUpdatedSchema = z.object({
  kind: z.literal('USER_UPDATED'),
  userId: userIdSchema,
});

export type UserUpdatedEvent = z.infer<typeof userUpdatedSchema>;
