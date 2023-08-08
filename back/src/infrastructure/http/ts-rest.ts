import { initServer } from '@ts-rest/fastify';
import { FastifyInstance } from 'fastify';
import { TypeGuardError } from '@utils/typeguard-error';
import { generateOpenApi } from '@ts-rest/open-api';
import { tsRestContract } from './contracts/ts-rest-contract';
import { AgnosticReads, AgnosticWrites } from './agnostic';

type Dependencies = {
  fastify: FastifyInstance;
  agnosticReads: AgnosticReads;
  agnosticWrites: AgnosticWrites;
};

export function buildTsRestApp(dependencies: Dependencies) {
  const tsRestServer = initServer();

  const router = tsRestServer.router(tsRestContract, {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    healthcheck: async (params) => {
      const result = await dependencies.agnosticReads.healthcheck({}, {});

      switch (result.status) {
        case 400:
          return {
            status: 400,
            body: result.body,
          };
        case 200:
          return {
            status: 200,
            body: result.body,
          };
        default:
          throw new TypeGuardError(result, 'Invalid status');
      }
    },
  });

  const openApiTsRest = generateOpenApi(
    tsRestContract,
    {
      info: {
        title: 'ShareIt API - TS-REST',
        version: '1.0.0',
      },
    },
    {
      setOperationId: true,
    },
  );

  return {
    router,
    tsRestServer,
    openapi: openApiTsRest,
  };
}
