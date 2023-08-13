import { CommandBus } from '@application/commandBus';
import {
  LEND_ITEM_COMMAND_KIND,
  lendItemCommandSchema,
} from '@application/item/write/lendItem/lendItemCommand';
import {
  LendItemMetadata,
  LendItemRequest,
  LendItemResponse,
} from '@infrastructure/http/contracts/aggregates/item/write/item.lend';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { TypeGuardError } from '@utils/typeguard-error';
import { UuidGenerator } from '@utils/uuid';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  logger: Logger;
  commandBus: CommandBus;
};

const LEND_ITEM_MODULE = 'lend-item';

export function buildLendItemRoute(dependencies: Dependencies) {
  const { uuidGenerator, logger, commandBus } = dependencies;

  return async function lendItemRoute(
    payload: LendItemRequest,
    _metadata: LendItemMetadata,
  ): LendItemResponse {
    logger.info(LEND_ITEM_MODULE, 'CREATE_ITEM_ROUTE', { payload, _metadata });
    const commandId = uuidGenerator.generate(`command-${LEND_ITEM_MODULE}`);

    const loanId = uuidGenerator.generate(LEND_ITEM_MODULE);

    const commandPayload = {
      id: loanId,
      itemId: payload.itemId,
      sharedBy: payload.sharedBy,
      sharedTo: payload.sharedTo,
    };

    const commandKind = LEND_ITEM_COMMAND_KIND;

    const rawLendItemCommand = {
      kind: commandKind,
      commandId,
      aggregateId: loanId,
      payload: commandPayload,
    };

    const lendItemCommandParsedResult = lendItemCommandSchema.safeParse(rawLendItemCommand);

    if (!lendItemCommandParsedResult.success) {
      return {
        status: HTTP_4xx_BAD_REQUEST,
        body: {
          kind: 'invalidCommandSchema',
          commandKind,
          commandPayload,
          errors: lendItemCommandParsedResult.error,
        },
      };
    }

    const lendItemResult = await commandBus.lendItem(lendItemCommandParsedResult.data);

    if (lendItemResult.isOk()) {
      return {
        status: HTTP_2xx_CREATED,
        body: {
          kind: 'itemLent',
          loanId: lendItemResult.value.loanId,
        },
      };
    }

    logger.error(LEND_ITEM_MODULE, 'Error saving item', {
      error: lendItemResult.error,
    });

    const { error } = lendItemResult;

    switch (error.kind) {
      case 'itemDoesNotExist': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'itemDoesNotExist',
            itemId: error.itemId,
          },
        };
      }
      case 'ownerDoesNotExist': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'ownerDoesNotExist',
            ownerId: error.ownerId,
          },
        };
      }
      case 'sharedByIsNotTheOwner': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'sharedByIsNotTheOwner',
            ownerId: error.ownerId,
          },
        };
      }
      case 'cannotShareItemToYourself': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'cannotShareItemToYourself',
            ownerId: error.ownerId,
          },
        };
      }
      case 'borrowerDoesNotExist': {
        return {
          status: HTTP_4xx_BAD_REQUEST,
          body: {
            kind: 'borrowerDoesNotExist',
            borrowerId: error.borrowerId,
          },
        };
      }
      case 'cannotSaveLoan':
        return {
          status: HTTP_5xx_INTERNAL_SERVER_ERROR,
          body: {
            kind: 'unknownError',
            commandKind,
            commandPayload,
            errors: error,
          },
        };
      default:
        throw new TypeGuardError(error, 'save item error not existing');
    }
  };
}
