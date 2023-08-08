import { buildQueryBus } from '@application/queryBus';
import { buildCommandBus } from '@application/commandBus';
import { buildSignaleLogger } from '@utils/logger/signale';
import { uuidGenerator } from '@utils/uuid';
import { Container } from './types';

export function loadInMemoryContainer(): Container {
  // UTILS //

  const logger = buildSignaleLogger();
  // const inMemoryDatabase = getInMemoryDatabase();

  const commandBus = buildCommandBus({
    logger,
  });

  const queryBus = buildQueryBus({
    logger,
  });

  // END COMPANY //

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
