import { Result } from 'neverthrow';
import { z } from 'zod';

export const listAllUsersRowSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type ListAllUsersRow = z.infer<typeof listAllUsersRowSchema>;

export type ListAllUsersSuccess = ListAllUsersRow[];
export type ListAllUsersFailure = unknown;

export type ListAllUsers = () => Promise<Result<ListAllUsersSuccess, ListAllUsersFailure>>;
