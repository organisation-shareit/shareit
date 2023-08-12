import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type UserName = Brand<string, 'username'>;

export const userNameSchema: z.Schema<UserName> = z
  .any()
  .refine((value) => z.string().safeParse(value).success);

export const createUserName = make<UserName>();
