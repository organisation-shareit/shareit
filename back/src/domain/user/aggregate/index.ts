import { z } from 'zod';
import { userEmailSchema } from './email';
import { userIdSchema } from './id';
import { userNameSchema } from './name';
import { userEventsSchema } from '../events';

export const userSchema = z.object({
  id: userIdSchema,
  name: userNameSchema,
  email: userEmailSchema,
  lastEvent: userEventsSchema,
});

export type User = z.infer<typeof userSchema>;

export type UserWithoutEvent = Omit<User, 'lastEvent'>;
