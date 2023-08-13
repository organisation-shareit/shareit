import * as z from 'zod';

export const userAuthProviderIdSchema = z.string();
export type UserAuthProviderId = z.infer<typeof userAuthProviderIdSchema>;
