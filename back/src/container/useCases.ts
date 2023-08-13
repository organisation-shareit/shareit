import { CommandBus, buildCommandBus } from '@application/commandBus';
import { QueryBus, buildQueryBus } from '@application/queryBus';
import { buildListAllUsersQueryHandler } from '@application/user/read/listAllUsers/listAllUsersQueryHandler';
import { Logger } from '@utils/logger';
import { buildSaveUserCommandHandler } from '@application/user/write/saveUser/saveUserCommandHandler';
import { buildSaveItemCommandHandler } from '@application/item/write/saveItem/saveItemCommandHandler';
import { buildLendItemCommandHandler } from '@application/item/write/lendItem/lendItemCommandHandler';
import { Adapters } from './types';

export function buildUseCases(
  adapters: Adapters,
  logger: Logger,
): {
  commandBus: CommandBus;
  queryBus: QueryBus;
} {
  const listAllUsersQueryHandler = buildListAllUsersQueryHandler({
    listAllUsers: adapters.database.query.listAllUsers,
  });

  const saveUserCommandHandler = buildSaveUserCommandHandler({
    userRepository: adapters.database.repository.userRepository,
    logger,
  });

  const saveItemCommandHandler = buildSaveItemCommandHandler({
    itemRepository: adapters.database.repository.itemRepository,
    userRepository: adapters.database.repository.userRepository,
    logger,
  });

  const lendItemCommandHandler = buildLendItemCommandHandler({
    itemRepository: adapters.database.repository.itemRepository,
    userRepository: adapters.database.repository.userRepository,
    loanRepository: adapters.database.repository.loanRepository,
    dateUtils: adapters.utils.dateUtils,
    logger,
  });

  const commandBus = buildCommandBus({
    logger,
    saveUser: saveUserCommandHandler,
    saveItem: saveItemCommandHandler,
    lendItem: lendItemCommandHandler,
  });

  const queryBus = buildQueryBus({
    logger,
    listAllUsers: listAllUsersQueryHandler,
  });

  return {
    commandBus,
    queryBus,
  };
}
