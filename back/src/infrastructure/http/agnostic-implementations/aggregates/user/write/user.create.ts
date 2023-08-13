import { CommandBus } from '@application/commandBus';
import {
  SAVE_USER_COMMAND_KIND,
  saveUserCommandSchema,
} from '@application/user/write/saveUser/saveUserCommand';
import { createUserId } from '@domain/user/aggregate/id';
import {
  CreateUserMetadata,
  CreateUserRequest,
  CreateUserResponse,
  CreateUserRoute,
} from '@infrastructure/http/contracts/aggregates/user/write/user.create';
import {
  HTTP_2xx_CREATED,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';

export const CREATE_USER_MODULE = 'create-user';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  logger: Logger;
  commandBus: CommandBus;
};

export function buildCreateUserRoute(dependencies: Dependencies): CreateUserRoute {
  const { uuidGenerator, logger, commandBus } = dependencies;

  return async function createUserRoute(
    payload: CreateUserRequest,
    _metadata: CreateUserMetadata,
  ): CreateUserResponse {
    logger.info(CREATE_USER_MODULE, 'CREATE_USER_ROUTE', { payload, _metadata });
    const commandId = uuidGenerator.generate(`command-${CREATE_USER_MODULE}`);

    const userId = createUserId(payload.id ?? uuidGenerator.generate(CREATE_USER_MODULE));

    const commandPayload = {
      id: userId,
      name: payload.name,
      email: payload.email,
    };

    const commandKind = SAVE_USER_COMMAND_KIND;

    const rawSaveUserCommand = {
      kind: commandKind,
      commandId,
      aggregateId: userId,
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
        status: HTTP_2xx_CREATED,
        body: {
          kind: 'userCreated',
          userId: saveUserResult.value.userId,
        },
      };
    }

    logger.error(CREATE_USER_MODULE, 'Error saving user', {
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
