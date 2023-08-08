import { CommandBus } from '@application/commandBus';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';
import { QueryBus } from '@application/queryBus';
import { HealthcheckHandler, buildHealthcheckRoute } from './misc/healthcheck.get';

export type AgnosticReads = {
  healthcheck: HealthcheckHandler;
};

export type ReadDependencies = {
  queryBus: QueryBus;
  logger: Logger;
};

export function buildAgnosticReads(dependencies: ReadDependencies): AgnosticReads {
  const healthcheck = buildHealthcheckRoute(dependencies);

  return {
    healthcheck,
  };
}

export type AgnosticWrites = {};

type WriteDependencies = {
  commandBus: CommandBus;
  uuidGenerator: UuidGenerator;
  logger: Logger;
};

export function buildAgnosticWrites(dependencies: WriteDependencies): AgnosticWrites {
  dependencies.logger.info('AGNOSTIC', 'BUILDING WRITES', {});
  return {};
}
