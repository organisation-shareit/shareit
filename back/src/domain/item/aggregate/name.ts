import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type ItemName = Brand<string, 'itemName'>;

export const itemNameSchema: z.Schema<ItemName> = z
  .any()
  .refine((value) => z.string().safeParse(value).success);

export const createItemName = make<ItemName>();
