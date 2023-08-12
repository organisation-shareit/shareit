import { CommandBus } from '@application/commandBus';
import {
  SAVE_ITEM_COMMAND_KIND,
  saveItemCommandSchema,
} from '@application/item/write/saveItem/saveItemCommand';
import {
  UpdateItemMetadata,
  UpdateItemRequest,
  UpdateItemResponse,
  UpdateItemRoute,
} from '@infrastructure/http/contracts/aggregates/item/write/item.update';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { TypeGuardError } from '@utils/typeguard-error';
import { UuidGenerator } from '@utils/uuid';

export const UPDATE_ITEM_MODULE = 'update-item';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  logger: Logger;
  commandBus: CommandBus;
};

export function buildUpdateItemRoute(dependencies: Dependencies): UpdateItemRoute {
  const { uuidGenerator, logger, commandBus } = dependencies;

  return async function createItemRoute(
    payload: UpdateItemRequest,
    _metadata: UpdateItemMetadata,
  ): UpdateItemResponse {
    logger.info(UPDATE_ITEM_MODULE, 'UPDATE_ITEM_ROUTE', { payload, _metadata });
    const commandId = uuidGenerator.generate(`command-${UPDATE_ITEM_MODULE}`);

    const commandPayload = {
      id: payload.id,
      name: payload.name,
      ownerId: payload.ownerId,
    };

    const commandKind = SAVE_ITEM_COMMAND_KIND;

    const rawSaveItemCommand = {
      kind: commandKind,
      commandId,
      aggregateId: payload.id,
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
        status: HTTP_2xx_OK,
        body: {
          kind: 'itemUpdated',
          itemId: saveItemResult.value.itemId,
        },
      };
    }

    logger.error(UPDATE_ITEM_MODULE, 'Error saving item', {
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
