import { z } from 'zod';
import { HTTP_2xx_OK, HTTP_4xx_BAD_REQUEST } from '../http-codes';
import { invalidQuerySchema } from '../others/command';

export const HEALTHCHEK_METHOD = 'GET';
export const HEALTHCHEK_ROUTE = '/healthcheck.get';

export const healthcheckRequestSchema = z.object({});
export type HealthcheckRequest = z.infer<typeof healthcheckRequestSchema>;

export const heatlhcheckMetadataSchema = z.object({});
export type HealthcheckMetadata = z.infer<typeof heatlhcheckMetadataSchema>;

export const healthcheckResponseSchema = {
  [HTTP_4xx_BAD_REQUEST]: invalidQuerySchema,
  [HTTP_2xx_OK]: z.object({
    status: z.string(),
  }),
};
