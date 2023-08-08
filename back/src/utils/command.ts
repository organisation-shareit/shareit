import { z } from 'zod';

export const commandIdSchema = z.string().uuid().nonempty();
export const aggregateIdSchema = z.string().uuid().nonempty();
