import { type CommandBus } from '@application/commandBus';
import { type QueryBus } from '@application/queryBus';
import { ItemRepository } from '@domain/item/repository';
import { ListAllUsers } from '@domain/user/query/listAllUsers';
import { UserRepository } from '@domain/user/repository';
import { type Logger } from '@utils/logger';
import { type UuidGenerator } from '@utils/uuid';

export type Container = {
  logger: Logger;
  queryBus: QueryBus;
  commandBus: CommandBus;
  uuidGenerator: UuidGenerator;
  disconnect: () => Promise<void>;
};

export type Adapters = {
  database: {
    query: {
      listAllUsers: ListAllUsers;
    };
    repository: {
      userRepository: UserRepository;
      itemRepository: ItemRepository;
    };
  };
};
