import { Logger } from '@utils/logger';
import { SaveUserCommandHandler } from './user/write/saveUser/saveUserCommandHandler';
import { SaveItemCommandHandler } from './item/write/saveItem/saveItemCommandHandler';

export type CommandBus = {
  saveUser: SaveUserCommandHandler;
  saveItem: SaveItemCommandHandler;
};

type CommandBusDependencies = {
  logger: Logger;
  saveUser: SaveUserCommandHandler;
  saveItem: SaveItemCommandHandler;
};

export function buildCommandBus(dependencies: CommandBusDependencies): CommandBus {
  dependencies.logger.info('COMMAND_BUS', 'BUILD_COMMAND_BUS', {});
  return {
    saveUser: dependencies.saveUser,
    saveItem: dependencies.saveItem,
  };
}
