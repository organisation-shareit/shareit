import { Logger } from '@utils/logger';
import { ListAllUsersQueryHandler } from './user/read/listAllUsers/listAllUsersQueryHandler';

export type QueryBus = {
  listAllUsers: ListAllUsersQueryHandler;
};

type QueryBusDependencies = {
  logger: Logger;
  listAllUsers: ListAllUsersQueryHandler;
};

export function buildQueryBus(dependencies: QueryBusDependencies): QueryBus {
  dependencies.logger.info('QUERY_BUS', 'BUILD_QUERY_BUS', {});
  return {
    listAllUsers: dependencies.listAllUsers,
  };
}
