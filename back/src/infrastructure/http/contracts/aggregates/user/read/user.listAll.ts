import { z } from 'zod';
import { listAllUsersRowSchema } from '../../../../../../domain/user/query/listAllUsers';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { Handler, unknownErrorForQuerySchema } from '../../../../../../utils/agnostic-server';
import { invalidQuerySchema } from '../../../errors';

export const LIST_ALL_USERS_METHOD = 'GET';
export const LIST_ALL_USERS_ROUTE = '/user.listAll';

export const listAllUsersRequestSchema = z.object({});
export type ListAllUsersRequest = z.infer<typeof listAllUsersRequestSchema>;

export const listAllUsersMetadataSchema = z.object({});
export type ListAllUsersMetadata = z.infer<typeof listAllUsersMetadataSchema>;

export const listAllUsersResponseSchema = {
  [HTTP_2xx_OK]: z.object({
    kind: z.literal('listAllUsersSuccess'),
    users: listAllUsersRowSchema.array(),
  }),
  [HTTP_4xx_BAD_REQUEST]: invalidQuerySchema,
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForQuerySchema,
};

export type ListAllUsersRoute = Handler<
  typeof listAllUsersRequestSchema,
  typeof listAllUsersMetadataSchema,
  typeof listAllUsersResponseSchema
>;

export type ListAllUsersResponse = ReturnType<ListAllUsersRoute>;
