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
import { CreateItemRoute } from './contracts/aggregates/item/write/item.create';
import { UpdateItemRoute } from './contracts/aggregates/item/write/item.update';
import { buildCreateItemRoute } from './agnostic-implementations/aggregates/item/write/item.create';
import { buildUpdateItemRoute } from './agnostic-implementations/aggregates/item/write/item.update';
import { LendItemRoute } from './contracts/aggregates/item/write/item.lend';
import { buildLendItemRoute } from './agnostic-implementations/aggregates/item/write/item.lend';

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
  createItem: CreateItemRoute;
  updateItem: UpdateItemRoute;
  lendItem: LendItemRoute;
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
    createItem: buildCreateItemRoute(dependencies),
    updateItem: buildUpdateItemRoute(dependencies),
    lendItem: buildLendItemRoute(dependencies),
  };
}
