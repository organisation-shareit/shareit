import { Logger } from '@utils/logger';

export type CommandBus = {};

type CommandBusDependencies = {
  logger: Logger;
};

export function buildCommandBus(dependencies: CommandBusDependencies): CommandBus {
  dependencies.logger.info('COMMAND_BUS', 'BUILD_COMMAND_BUS', {});
  return {};
}
