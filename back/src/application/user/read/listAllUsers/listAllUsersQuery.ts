import { queryIdSchema } from '@utils/query';
import { z } from 'zod';

export const LIST_ALL_USERS_QUERY_KIND = 'LIST_ALL_USERS_QUERY' as const;

export const listAllUsersQueryPayloadSchema = z.object({});

export const listAllUsersQuerySchema = z.object({
  kind: z.literal(LIST_ALL_USERS_QUERY_KIND),
  queryId: queryIdSchema,
  payload: listAllUsersQueryPayloadSchema,
});

export type ListAllUsersQuery = z.infer<typeof listAllUsersQuerySchema>;
