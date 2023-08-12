import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type ItemId = Brand<string, 'itemId'>;

export const itemIdSchema: z.Schema<ItemId> = z
  .any()
  .refine((value) => z.string().uuid().safeParse(value).success);

export const createItemId = make<ItemId>();
