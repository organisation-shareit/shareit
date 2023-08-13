import * as z from 'zod';

export const userNameSchema = z.string();
export type UserName = z.infer<typeof userNameSchema>;
