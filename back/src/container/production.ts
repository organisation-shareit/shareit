import { buildSignaleLogger } from '@utils/logger/signale';
import { uuidGenerator } from '@utils/uuid';
import { PrismaClient } from '@prisma/client';
import { buildPostgresqlUserRepository } from '@infrastructure/database/user/write/repository/postgresql/postgresqlUserRepository';
import { buildPrismaSqlRunner } from '@utils/database/prisma-adapter';
import { Logger } from '@utils/logger';
import { buildPostgresqlListAllUsers } from '@infrastructure/database/user/read/posgresql/postgresqlListAllUsers';
import { buildPostgresqlItemRepository } from '@infrastructure/database/item/write/repository/postgresql/postgresqlItemRepository';
import { buildPostgresqlLoanRepository } from '@infrastructure/database/loan/write/postgresqlLoanRepository';
import { dateUtils } from '@utils/date';
import { Adapters, Container } from './types';
import { buildUseCases } from './useCases';

/* eslint-disable @typescript-eslint/no-unused-vars */
function buildDatabaseAdapters(dependencies: {
  logger: Logger;
}): Adapters & { prismaClient: PrismaClient } {
  const prismaClient = new PrismaClient();
  const sqlRunner = buildPrismaSqlRunner({ prisma: prismaClient });

  const userRepository = buildPostgresqlUserRepository({
    prismaClient,
  });

  const itemRepository = buildPostgresqlItemRepository({
    prismaClient,
  });

  const loanRepository = buildPostgresqlLoanRepository({ prismaClient });

  const listAllUsers = buildPostgresqlListAllUsers({ sqlRunner });

  return {
    utils: {
      dateUtils,
    },
    database: {
      query: {
        listAllUsers,
      },
      repository: {
        loanRepository,
        userRepository,
        itemRepository,
      },
    },
    prismaClient,
  };
}

export function loadProductionContainer(): Container {
  const logger = buildSignaleLogger();

  logger.info('container', 'Loading production container', {});

  const adapters = buildDatabaseAdapters({ logger });

  const { commandBus, queryBus } = buildUseCases(adapters, logger);

  return {
    logger,
    commandBus,
    queryBus,
    uuidGenerator,
    disconnect: async () => {
      await adapters.prismaClient.$disconnect();
    },
  };
}
