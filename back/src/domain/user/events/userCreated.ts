import { z } from 'zod';
import { userIdSchema } from '../aggregate/id';

export const userCreatedSchema = z.object({
  kind: z.literal('USER_CREATED'),
  userId: userIdSchema,
});

export type UserCreatedEvent = z.infer<typeof userCreatedSchema>;
