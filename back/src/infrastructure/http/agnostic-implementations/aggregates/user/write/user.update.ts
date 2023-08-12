import { CommandBus } from '@application/commandBus';
import {
  SAVE_USER_COMMAND_KIND,
  saveUserCommandSchema,
} from '@application/user/write/saveUser/saveUserCommand';
import {
  UpdateUserMetadata,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserRoute,
} from '@infrastructure/http/contracts/aggregates/user/write/user.update';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';

export const UPDATE_USER_MODULE = 'update-user';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  logger: Logger;
  commandBus: CommandBus;
};

export function buildUpdateUserRoute(dependencies: Dependencies): UpdateUserRoute {
  const { uuidGenerator, logger, commandBus } = dependencies;

  return async function createUserRoute(
    payload: UpdateUserRequest,
    _metadata: UpdateUserMetadata,
  ): UpdateUserResponse {
    logger.info(UPDATE_USER_MODULE, 'UPDATE_USER_ROUTE', { payload, _metadata });
    const commandId = uuidGenerator.generate(`command-${UPDATE_USER_MODULE}`);

    const commandPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };

    const commandKind = SAVE_USER_COMMAND_KIND;

    const rawSaveUserCommand = {
      kind: commandKind,
      commandId,
      aggregateId: payload.id,
      payload: commandPayload,
    };

    const saveUserCommandParsedResult = saveUserCommandSchema.safeParse(rawSaveUserCommand);

    if (!saveUserCommandParsedResult.success) {
      return {
        status: HTTP_4xx_BAD_REQUEST,
        body: {
          kind: 'invalidCommandSchema',
          commandKind,
          commandPayload,
          errors: saveUserCommandParsedResult.error,
        },
      };
    }

    const saveUserResult = await commandBus.saveUser(saveUserCommandParsedResult.data);

    if (saveUserResult.isOk()) {
      return {
        status: HTTP_2xx_OK,
        body: {
          kind: 'userUpdated',
          userId: saveUserResult.value.userId,
        },
      };
    }

    logger.error(UPDATE_USER_MODULE, 'Error saving user', {
      error: saveUserResult.error,
    });

    return {
      status: HTTP_5xx_INTERNAL_SERVER_ERROR,
      body: {
        kind: 'unknownError',
        commandKind,
        commandPayload,
      },
    };
  };
}
