import { PrismaClient } from '@prisma/client';
import { buildSignaleLogger } from '@utils/logger/signale';
import { buildQueryBus } from '@application/queryBus';
import { uuidGenerator } from '@utils/uuid';
import { buildCommandBus } from '@application/commandBus';
import { Container } from './types';

export function loadServiceTestContainer(): Container {
  // UTILS //

  const logger = buildSignaleLogger();

  logger.info('container', 'Loading service container', {});

  const prismaClient = new PrismaClient();

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
      await prismaClient.$disconnect();
    },
  };
}
