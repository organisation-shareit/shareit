import { Logger } from '@utils/logger';
import { SaveUserCommandHandler } from './user/write/saveUser/saveUserCommandHandler';

export type CommandBus = {
  saveUser: SaveUserCommandHandler;
};

type CommandBusDependencies = {
  logger: Logger;
  saveUser: SaveUserCommandHandler;
};

export function buildCommandBus(dependencies: CommandBusDependencies): CommandBus {
  dependencies.logger.info('COMMAND_BUS', 'BUILD_COMMAND_BUS', {});
  return {
    saveUser: dependencies.saveUser,
  };
}
