import { Brand, make } from 'ts-brand';
import * as z from 'zod';

export type UserEmail = Brand<string, 'userEmail'>;

export const userEmailSchema: z.Schema<UserEmail> = z
  .any()
  .refine((value) => z.string().email().safeParse(value).success);

export const createUserEmail = make<UserEmail>();
