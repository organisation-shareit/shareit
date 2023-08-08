import { z } from 'zod';

export const invalidCommandSchema = z.object({
  kind: z.literal('invalidCommandSchema'),
  commandKind: z.string(),
  commandPayload: z.unknown(),
  errors: z.unknown(),
});

export const invalidQuerySchema = z.object({
  kind: z.literal('invalidQuerySchema'),
  queryName: z.string().nonempty(),
  payload: z.unknown(),
  error: z.unknown(),
});
