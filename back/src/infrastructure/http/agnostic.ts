import { CommandBus } from '@application/commandBus';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';
import { QueryBus } from '@application/queryBus';
import {
  HealthcheckHandler,
  buildHealthcheckRoute,
} from './agnostic-implementations/misc/healthcheck.get';
import { CreateUserRoute } from './contracts/aggregates/user/write/user.create';
import { buildCreateUserRoute } from './agnostic-implementations/aggregates/user/write/user.create';
import { UpdateUserRoute } from './contracts/aggregates/user/write/user.update';
import { buildUpdateUserRoute } from './agnostic-implementations/aggregates/user/write/user.update';
import { ListAllUsersRoute } from './contracts/aggregates/user/read/user.listAll';
import { buildListAllUsersRoute } from './agnostic-implementations/aggregates/user/read/user.listAll';

export type AgnosticReads = {
  healthcheck: HealthcheckHandler;
  listAllUsers: ListAllUsersRoute;
};

export type ReadDependencies = {
  uuidGenerator: UuidGenerator;
  queryBus: QueryBus;
  logger: Logger;
};

export function buildAgnosticReads(dependencies: ReadDependencies): AgnosticReads {
  const healthcheck = buildHealthcheckRoute(dependencies);
  const listAllUsers = buildListAllUsersRoute(dependencies);

  return {
    healthcheck,
    listAllUsers,
  };
}

export type AgnosticWrites = {
  createUser: CreateUserRoute;
  updateUser: UpdateUserRoute;
};

type WriteDependencies = {
  commandBus: CommandBus;
  uuidGenerator: UuidGenerator;
  logger: Logger;
};

export function buildAgnosticWrites(dependencies: WriteDependencies): AgnosticWrites {
  dependencies.logger.info('AGNOSTIC', 'BUILDING WRITES', {});
  return {
    createUser: buildCreateUserRoute(dependencies),
    updateUser: buildUpdateUserRoute(dependencies),
  };
}
