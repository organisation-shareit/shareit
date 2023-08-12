import { userEmailSchema } from '../../../../../../domain/user/aggregate/email';
import { userNameSchema } from '../../../../../../domain/user/aggregate/name';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { Handler, unknownErrorForCommandSchema } from '../../../../../../utils/agnostic-server';
import { invalidCommandSchema } from '../../../errors';
import { z } from 'zod';

export const CREATE_USER_METHOD = 'POST';
export const CREATE_USER_ROUTE = '/user.create';

export const createUserRequestSchema = z.object({
  name: userNameSchema,
  email: userEmailSchema,
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;

export const createUserMetadataSchema = z.object({});

export type CreateUserMetadata = z.infer<typeof createUserMetadataSchema>;

export const createUserResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: invalidCommandSchema,
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForCommandSchema,
  [HTTP_2xx_CREATED]: z.object({
    kind: z.literal('userCreated'),
    userId: z.string(),
  }),
};

export type CreateUserRoute = Handler<
  typeof createUserRequestSchema,
  typeof createUserMetadataSchema,
  typeof createUserResponseSchema
>;

export type CreateUserResponse = ReturnType<CreateUserRoute>;
