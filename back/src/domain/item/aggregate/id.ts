import * as z from 'zod';

export const itemIdSchema = z.string().uuid();
export type ItemId = z.infer<typeof itemIdSchema>;
