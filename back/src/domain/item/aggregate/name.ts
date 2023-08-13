import * as z from 'zod';

export const itemNameSchema = z.string();
export type ItemName = z.infer<typeof itemNameSchema>;
