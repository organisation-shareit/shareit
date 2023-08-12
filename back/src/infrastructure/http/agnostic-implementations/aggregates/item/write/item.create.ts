import { CommandBus } from '@application/commandBus';
import {
  SAVE_ITEM_COMMAND_KIND,
  saveItemCommandSchema,
} from '@application/item/write/saveItem/saveItemCommand';
import { createItemId } from '@domain/item/aggregate/id';
import {
  CreateItemMetadata,
  CreateItemRequest,
  CreateItemResponse,
  CreateItemRoute,
} from '@infrastructure/http/contracts/aggregates/item/write/item.create';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { TypeGuardError } from '@utils/typeguard-error';
import { UuidGenerator } from '@utils/uuid';

export const CREATE_ITEM_MODULE = 'create-item';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  logger: Logger;
  commandBus: CommandBus;
};

export function buildCreateItemRoute(dependencies: Dependencies): CreateItemRoute {
  const { uuidGenerator, logger, commandBus } = dependencies;

  return async function createItemRoute(
    payload: CreateItemRequest,
    _metadata: CreateItemMetadata,
  ): CreateItemResponse {
    logger.info(CREATE_ITEM_MODULE, 'CREATE_ITEM_ROUTE', { payload, _metadata });
    const commandId = uuidGenerator.generate(`command-${CREATE_ITEM_MODULE}`);

    const itemId = createItemId(uuidGenerator.generate(CREATE_ITEM_MODULE));

    const commandPayload = {
      id: itemId,
      name: payload.name,
      ownerId: payload.ownerId,
    };

    const commandKind = SAVE_ITEM_COMMAND_KIND;

    const rawSaveItemCommand = {
      kind: commandKind,
      commandId,
      aggregateId: itemId,
      payload: commandPayload,
    };

    const saveItemCommandParsedResult = saveItemCommandSchema.safeParse(rawSaveItemCommand);

    if (!saveItemCommandParsedResult.success) {
      return {
        status: HTTP_4xx_BAD_REQUEST,
        body: {
          kind: 'invalidCommandSchema',
          commandKind,
          commandPayload,
          errors: saveItemCommandParsedResult.error,
        },
      };
    }

    const saveItemResult = await commandBus.saveItem(saveItemCommandParsedResult.data);

    if (saveItemResult.isOk()) {
      return {
        status: HTTP_2xx_CREATED,
        body: {
          kind: 'itemCreated',
          itemId: saveItemResult.value.itemId,
        },
      };
    }

    logger.error(CREATE_ITEM_MODULE, 'Error saving item', {
      error: saveItemResult.error,
    });

    const { error } = saveItemResult;

    switch (error.kind) {
      case 'userDoesNotExist': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'ownerNotFound',
            ownerId: error.ownerId,
          },
        };
      }
      case 'cannotSaveItem':
      case 'databaseError':
      case 'rowNotMatchingSchema': {
        return {
          status: HTTP_5xx_INTERNAL_SERVER_ERROR,
          body: {
            kind: 'unknownError',
            commandKind,
            commandPayload,
            errors: error,
          },
        };
      }
      default:
        throw new TypeGuardError(error, 'save item error not existing');
    }
  };
}
