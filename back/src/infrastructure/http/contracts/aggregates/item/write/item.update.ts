import { z } from 'zod';
import { userIdSchema } from '../../../../../../domain/user/aggregate/id';
import { itemIdSchema } from '../../../../../../domain/item/aggregate/id';
import { itemNameSchema } from '../../../../../../domain/item/aggregate/name';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { Handler, unknownErrorForCommandSchema } from '../../../../../../utils/agnostic-server';
import { invalidCommandSchema } from '../../../errors';

export const UPDATE_ITEM_METHOD = 'PUT';
export const UPDATE_ITEM_ROUTE = '/item.update';

export const updateItemRequestSchema = z.object({
  id: itemIdSchema,
  name: itemNameSchema,
  ownerId: userIdSchema,
});

export type UpdateItemRequest = z.infer<typeof updateItemRequestSchema>;

export const updateItemMetadataSchema = z.object({});

export type UpdateItemMetadata = z.infer<typeof updateItemMetadataSchema>;

export const updateItemResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: z.union([
    invalidCommandSchema,
    z.object({
      kind: z.literal('ownerNotFound'),
      ownerId: z.string(),
    }),
  ]),
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForCommandSchema,
  [HTTP_2xx_OK]: z.object({
    kind: z.literal('itemUpdated'),
    itemId: z.string(),
  }),
};

export type UpdateItemRoute = Handler<
  typeof updateItemRequestSchema,
  typeof updateItemMetadataSchema,
  typeof updateItemResponseSchema
>;

export type UpdateItemResponse = ReturnType<UpdateItemRoute>;
