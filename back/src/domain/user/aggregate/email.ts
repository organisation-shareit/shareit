import * as z from 'zod';

export const userEmailSchema = z.string().email();
export type UserEmail = z.infer<typeof userEmailSchema>;
