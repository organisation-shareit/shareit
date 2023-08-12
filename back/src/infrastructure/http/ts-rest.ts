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
    createUser: async (params) => {
      const result = await dependencies.agnosticWrites.createUser(params.body, {});

      switch (result.status) {
        case 400:
          return {
            status: 400,
            body: result.body,
          };
        case 500: {
          return {
            status: 500,
            body: result.body,
          };
        }
        case 201:
          return {
            status: 201,
            body: result.body,
          };
        default:
          throw new TypeGuardError(result, 'Invalid status');
      }
    },
    updateUser: async (params) => {
      const result = await dependencies.agnosticWrites.updateUser(params.body, {});

      switch (result.status) {
        case 400:
          return {
            status: 400,
            body: result.body,
          };
        case 500: {
          return {
            status: 500,
            body: result.body,
          };
        }
        case 200:
          return {
            status: 200,
            body: result.body,
          };
        default:
          throw new TypeGuardError(result, 'Invalid status');
      }
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    listAllUsers: async (params) => {
      const result = await dependencies.agnosticReads.listAllUsers({}, {});

      switch (result.status) {
        case 200:
          return {
            status: 200,
            body: result.body,
          };
        case 400: {
          return {
            status: 400,
            body: result.body,
          };
        }
        case 500: {
          return {
            status: 500,
            body: result.body,
          };
        }
        default:
          throw new TypeGuardError(result, 'Invalid status');
      }
    },
    createItem: async (params) => {
      const result = await dependencies.agnosticWrites.createItem(params.body, {});

      switch (result.status) {
        case 400:
          return {
            status: 400,
            body: result.body,
          };
        case 500: {
          return {
            status: 500,
            body: result.body,
          };
        }
        case 201:
          return {
            status: 201,
            body: result.body,
          };
        default:
          throw new TypeGuardError(result, 'Invalid status');
      }
    },
    updateItem: async (params) => {
      const result = await dependencies.agnosticWrites.updateItem(params.body, {});

      switch (result.status) {
        case 400:
          return {
            status: 400,
            body: result.body,
          };
        case 500: {
          return {
            status: 500,
            body: result.body,
          };
        }
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
