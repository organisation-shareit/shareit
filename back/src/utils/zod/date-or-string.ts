import { z } from 'zod';

export const dateOrStringSchema = z.string().datetime({ offset: true }).pipe(z.coerce.date());
