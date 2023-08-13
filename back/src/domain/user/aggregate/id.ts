import * as z from 'zod';

export const userIdSchema = z.string().uuid();
export type UserId = z.infer<typeof userIdSchema>;
