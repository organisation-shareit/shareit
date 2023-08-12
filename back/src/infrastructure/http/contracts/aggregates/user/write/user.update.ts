import { userEmailSchema } from '../../../../../../domain/user/aggregate/email';
import { userIdSchema } from '../../../../../../domain/user/aggregate/id';
import { userNameSchema } from '../../../../../../domain/user/aggregate/name';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { Handler, unknownErrorForCommandSchema } from '../../../../../../utils/agnostic-server';
import { invalidCommandSchema } from '../../../errors';
import { z } from 'zod';

export const UPDATE_USER_METHOD = 'PUT';
export const UPDATE_USER_ROUTE = '/user.update';

export const updateUserRequestSchema = z.object({
  id: userIdSchema,
  name: userNameSchema,
  email: userEmailSchema,
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

export const updateUserMetadataSchema = z.object({});

export type UpdateUserMetadata = z.infer<typeof updateUserMetadataSchema>;

export const updateUserResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: invalidCommandSchema,
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForCommandSchema,
  [HTTP_2xx_OK]: z.object({
    kind: z.literal('userUpdated'),
    userId: z.string(),
  }),
};

export type UpdateUserRoute = Handler<
  typeof updateUserRequestSchema,
  typeof updateUserMetadataSchema,
  typeof updateUserResponseSchema
>;

export type UpdateUserResponse = ReturnType<UpdateUserRoute>;
