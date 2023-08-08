import { z } from 'zod';

export const invalidCommandSchema = z.object({
  kind: z.literal('invalidCommandSchema'),
  commandKind: z.string(),
  commandPayload: z.unknown(),
  errors: z.unknown(),
});

type InvalidCommand = z.infer<typeof invalidCommandSchema>;

export function toInvalidCommand(
  commandKind: string,
  commandPayload: unknown,
  errors: unknown,
): InvalidCommand {
  return {
    kind: 'invalidCommandSchema',
    commandKind,
    commandPayload,
    errors,
  };
}

export const invalidQuerySchema = z.object({
  kind: z.literal('invalidQuerySchema'),
  queryName: z.string().nonempty(),
  payload: z.unknown(),
  error: z.unknown(),
});

type InvalidQuery = z.infer<typeof invalidQuerySchema>;

export function toInvalidQuery(queryName: string, payload: unknown, error: unknown): InvalidQuery {
  return {
    kind: 'invalidQuerySchema',
    queryName,
    payload,
    error,
  };
}
