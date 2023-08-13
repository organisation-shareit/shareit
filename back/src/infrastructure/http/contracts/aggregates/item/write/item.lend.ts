import { z } from 'zod';
import { loanIdSchema } from '../../../../../../domain/loan/aggregate/id';
import { Handler, unknownErrorForCommandSchema } from '../../../../../../utils/agnostic-server';
import { invalidCommandSchema } from '../../../errors';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '../../../http-codes';
import { userIdSchema } from '../../../../../../domain/user/aggregate/id';

export const LEND_ITEM_METHOD = 'POST';
export const LEND_ITEM_ROUTE = '/item.lend';

export const lendItemRequestSchema = z.object({
  itemId: loanIdSchema,
  sharedBy: userIdSchema,
  sharedTo: userIdSchema,
});

export type LendItemRequest = z.infer<typeof lendItemRequestSchema>;

export const lendItemMetadataSchema = z.object({});
export type LendItemMetadata = z.infer<typeof lendItemMetadataSchema>;

export const lendItemResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: z.union([
    invalidCommandSchema,
    z.object({
      kind: z.literal('ownerDoesNotExist'),
      ownerId: z.string(),
    }),
    z.object({
      kind: z.literal('sharedByIsNotTheOwner'),
      ownerId: z.string(),
    }),
    z.object({
      kind: z.literal('cannotShareItemToYourself'),
      ownerId: z.string(),
    }),
    z.object({
      kind: z.literal('borrowerDoesNotExist'),
      borrowerId: z.string(),
    }),
    z.object({
      kind: z.literal('itemDoesNotExist'),
      itemId: z.string(),
    }),
  ]),
  [HTTP_5xx_INTERNAL_SERVER_ERROR]: unknownErrorForCommandSchema,
  [HTTP_2xx_CREATED]: z.object({
    kind: z.literal('itemLent'),
    loanId: z.string(),
  }),
};

export type LendItemRoute = Handler<
  typeof lendItemRequestSchema,
  typeof lendItemMetadataSchema,
  typeof lendItemResponseSchema
>;

export type LendItemResponse = ReturnType<LendItemRoute>;
