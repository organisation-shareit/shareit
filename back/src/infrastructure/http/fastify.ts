import initFastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'
import fastifySwaggerUi from '@fastify/swagger-ui';
import { CommandBus } from '@application/commandBus';
import { QueryBus } from '@application/queryBus';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';
import fastifySwagger from '@fastify/swagger';
import { buildTsRestApp } from './ts-rest';
import { AgnosticReads, AgnosticWrites } from './agnostic';

type ReadDependencies = {
  fastify: FastifyInstance;
  uuidGenerator: UuidGenerator;
  queryBus: QueryBus;
  logger: Logger;
  agnosticReads: AgnosticReads;
};

type WriteDependencies = {
  fastify: FastifyInstance;
  uuidGenerator: UuidGenerator;
  commandBus: CommandBus;
  logger: Logger;
  agnosticWrites: AgnosticWrites;
};

type Dependencies = Omit<ReadDependencies & WriteDependencies, 'fastify'>;

export function buildFastifyServer(dependencies: Dependencies): FastifyInstance {
  const fastify = initFastify({
    maxParamLength: 500,
  });

  const {
    router: tsRestRouter,
    tsRestServer,
    openapi,
  } = buildTsRestApp({
    ...dependencies,
    fastify,
  });

  fastify
    .register(cors, {
      origin: ['https://share-it-5c6eb.web.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Length', 'ETag'],
      credentials: true,
      preflightContinue: false,
    })
    .register(fastifySwagger, {
      swagger: openapi,
    })
    .register(fastifySwaggerUi, {
      routePrefix: '/documentation',
    })
    .register(tsRestServer.plugin(tsRestRouter));

  return fastify;
}
