import { Logger } from '@utils/logger';

export type QueryBus = {};

type QueryBusDependencies = {
  logger: Logger;
};

export function buildQueryBus(dependencies: QueryBusDependencies): QueryBus {
  dependencies.logger.info('QUERY_BUS', 'BUILD_QUERY_BUS', {});
  return {};
}
