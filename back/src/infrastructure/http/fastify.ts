import initFastify, { FastifyInstance } from 'fastify';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
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

function loadFastifyReads(dependencies: ReadDependencies): void {
  dependencies.logger.info('FASTIFY', 'LOADING READS', {});
}

type WriteDependencies = {
  fastify: FastifyInstance;
  uuidGenerator: UuidGenerator;
  commandBus: CommandBus;
  logger: Logger;
  agnosticWrites: AgnosticWrites;
};

function loadFastifyWrites(dependencies: WriteDependencies): void {
  dependencies.logger.info('FASTIFY', 'LOADING WRITES', {});
}

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

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(fastifySwagger, {
    swagger: openapi,
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
  });

  fastify.after(() => {
    fastify.register(tsRestServer.plugin(tsRestRouter));
    loadFastifyReads({ ...dependencies, fastify });
    loadFastifyWrites({ ...dependencies, fastify });
  });

  return fastify;
}
