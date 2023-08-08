import { Logger } from '@utils/logger';
import { Handler } from '@utils/agnostic-server';
import {
  HealthcheckMetadata,
  HealthcheckRequest,
  healthcheckRequestSchema,
  healthcheckResponseSchema,
  heatlhcheckMetadataSchema,
} from '../contracts/misc/healthcheck.get';
import { HTTP_2xx_OK } from '../contracts/http-codes';

export const HEALTHCHEK_METHOD = 'GET';
export const HEALTHCHEK_ROUTE = '/healthcheck.get';

export const HEALTHCHECK_MODULE = 'healthcheck';

type Dependencies = {
  logger: Logger;
};

export type HealthcheckHandler = Handler<
  typeof healthcheckRequestSchema,
  typeof heatlhcheckMetadataSchema,
  typeof healthcheckResponseSchema
>;

type HealthcheckResponse = ReturnType<HealthcheckHandler>;

export function buildHealthcheckRoute(dependencies: Dependencies): HealthcheckHandler {
  const { logger } = dependencies;

  return async function healthcheckRoute(
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _payload: HealthcheckRequest,
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _metadata: HealthcheckMetadata,
  ): HealthcheckResponse {
    logger.info(HEALTHCHECK_MODULE, 'HEALTHCHECK', {});

    return {
      status: HTTP_2xx_OK,
      body: {
        status: 'OK',
      },
    };
  };
}
