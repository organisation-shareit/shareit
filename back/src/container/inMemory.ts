import { buildSignaleLogger } from '@utils/logger/signale';
import { uuidGenerator } from '@utils/uuid';
import { Adapters, Container } from './types';
import { buildUseCases } from './useCases';

export function loadInMemoryContainer(): Container {
  const logger = buildSignaleLogger();
  const adapters = {} as Adapters;
  const { commandBus, queryBus } = buildUseCases(adapters, logger);

  return {
    logger,
    commandBus,
    queryBus,
    uuidGenerator,
    disconnect: async () => {
      return undefined;
    },
  };
}
