import { type CommandBus } from '@application/commandBus';
import { type QueryBus } from '@application/queryBus';
import { type Logger } from '@utils/logger';
import { type UuidGenerator } from '@utils/uuid';

export type Container = {
  logger: Logger;
  queryBus: QueryBus;
  commandBus: CommandBus;
  uuidGenerator: UuidGenerator;
  disconnect: () => Promise<void>;
};
