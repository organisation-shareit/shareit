import { z } from 'zod';
import { itemNameSchema } from '../../../../../../domain/item/aggregate/name';
import { userIdSchema } from '../../../../../../domain/user/aggregate/id';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { Handler, unknownErrorForCommandSchema } from '../../../../../../utils/agnostic-server';
import { invalidCommandSchema } from '../../../errors';

export const CREATE_ITEM_METHOD = 'POST';
export const CREATE_ITEM_ROUTE = '/item.create';

export const createItemRequestSchema = z.object({
  name: itemNameSchema,
  ownerId: userIdSchema,
});

export type CreateItemRequest = z.infer<typeof createItemRequestSchema>;

export const createItemMetadataSchema = z.object({});

export type CreateItemMetadata = z.infer<typeof createItemMetadataSchema>;

export const createItemResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: z.union([
    invalidCommandSchema,
    z.object({
      kind: z.literal('ownerNotFound'),
      ownerId: z.string(),
    }),
  ]),
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForCommandSchema,
  [HTTP_2xx_CREATED]: z.object({
    kind: z.literal('itemCreated'),
    itemId: z.string(),
  }),
};

export type CreateItemRoute = Handler<
  typeof createItemRequestSchema,
  typeof createItemMetadataSchema,
  typeof createItemResponseSchema
>;

export type CreateItemResponse = ReturnType<CreateItemRoute>;
