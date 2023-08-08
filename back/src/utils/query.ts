import { z } from 'zod';

export const queryIdSchema = z.string().uuid().nonempty();
