import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type UserId = Brand<string, 'userId'>;

export const userIdSchema: z.Schema<UserId> = z
  .any()
  .refine((value) => z.string().uuid().safeParse(value).success);

export const createUserId = make<UserId>();
