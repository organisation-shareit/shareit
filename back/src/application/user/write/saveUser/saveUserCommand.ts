import { z } from 'zod';
import { aggregateIdSchema, commandIdSchema } from '@utils/command';
import { userIdSchema } from '@domain/user/aggregate/id';
import { userNameSchema } from '@domain/user/aggregate/name';
import { userEmailSchema } from '@domain/user/aggregate/email';
import { userAuthProviderIdSchema } from '@domain/user/aggregate/authProviderId';

export const SAVE_USER_COMMAND_KIND = 'SAVE_USER_COMMAND' as const;

export const saveUserCommandPayloadSchema = z.object({
  id: userIdSchema,
  name: userNameSchema,
  email: userEmailSchema,
  authProviderId: userAuthProviderIdSchema,
});

export const saveUserCommandSchema = z.object({
  kind: z.literal(SAVE_USER_COMMAND_KIND),
  commandId: commandIdSchema,
  aggregateId: aggregateIdSchema,
  payload: saveUserCommandPayloadSchema,
});

export type SaveUserCommand = z.infer<typeof saveUserCommandSchema>;
