import { initContract } from '@ts-rest/core';
import { HEALTHCHEK_METHOD, HEALTHCHEK_ROUTE } from '../misc/healthcheck.get';
import { healthcheckResponseSchema } from './misc/healthcheck.get';

const tsRest = initContract();

export const tsRestContract = tsRest.router({
  healthcheck: {
    method: HEALTHCHEK_METHOD,
    path: HEALTHCHEK_ROUTE,
    responses: healthcheckResponseSchema,
    summary: 'Healthcheck of the API',
  },
});
