import { Result, err, ok } from 'neverthrow';
import { type SaveItemCommand } from '@application/item/write/saveItem/saveItemCommand';
import { type ItemId } from '@domain/item/aggregate/id';
import { type ItemRepository } from '@domain/item/repository';
import * as ItemActions from '@domain/item/actions';
import { type Logger } from '@utils/logger';
import { CannotGetItemError, CannotSaveItemError } from '@domain/item/repository/errors';
import { TypeGuardError } from '@utils/typeguard-error';
import { UserRepository } from '@domain/user/repository';

type Dependencies = {
  itemRepository: ItemRepository;
  userRepository: UserRepository;
  logger: Logger;
};

export type SaveItemCommandHandlerResult = Promise<
  Result<
    {
      kind: 'itemSaved';
      itemId: ItemId;
    },
    CannotSaveItemError | CannotGetItemError | { kind: 'userDoesNotExist'; ownerId: string }
  >
>;

export type SaveItemCommandHandler = (input: SaveItemCommand) => SaveItemCommandHandlerResult;

export function buildSaveItemCommandHandler(dependencies: Dependencies): SaveItemCommandHandler {
  const { itemRepository, logger } = dependencies;

  return async function saveItemCommandHandler(
    command: SaveItemCommand,
  ): SaveItemCommandHandlerResult {
    const { payload } = command;

    const itemResult = await itemRepository.getItemById({ itemId: payload.id });

    const user = await dependencies.userRepository.getUserById({ userId: payload.ownerId });

    if (user.isErr()) {
      return err({ kind: 'userDoesNotExist', ownerId: payload.ownerId });
    }

    if (itemResult.isErr()) {
      switch (itemResult.error.kind) {
        case 'itemNotFound': {
          const item = ItemActions.createItem(payload);

          const saveItemResult = await itemRepository.saveItem({ item });

          if (saveItemResult.isErr()) {
            logger.error('saveItemCommandHandler', 'cannot create item', {
              error: itemResult,
            });
            return err(saveItemResult.error);
          }
          return ok({
            kind: 'itemSaved' as const,
            itemId: item.id,
          });
        }
        case 'databaseError':
        case 'rowNotMatchingSchema':
          logger.error('saveItemCommandHandler', 'unknown error while getting item', {
            error: itemResult.error,
          });
          return err(itemResult.error);
        default:
          throw new TypeGuardError(itemResult.error, 'get item error not existing');
      }
    }

    const itemUpdated = ItemActions.updateItem({
      previousItem: itemResult.value,
      newItem: {
        name: payload.name,
        ownerId: payload.ownerId,
        id: payload.id,
      },
    });

    const saveItemResult = await itemRepository.saveItem({ item: itemUpdated });

    return saveItemResult
      .map(() => ({
        kind: 'itemSaved' as const,
        itemId: itemUpdated.id,
      }))
      .mapErr((error) => error);
  };
}
