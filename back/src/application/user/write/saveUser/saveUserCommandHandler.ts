import { Result, err, ok } from 'neverthrow';
import { type SaveUserCommand } from '@application/user/write/saveUser/saveUserCommand';
import { type UserId } from '@domain/user/aggregate/id';
import { type UserRepository } from '@domain/user/repository';
import * as UserActions from '@domain/user/actions';
import { type Logger } from '@utils/logger';
import { CannotGetUserError, CannotSaveUserError } from '@domain/user/repository/errors';
import { TypeGuardError } from '@utils/typeguard-error';

type Dependencies = {
  userRepository: UserRepository;
  logger: Logger;
};

export type SaveUserCommandHandlerResult = Promise<
  Result<
    {
      kind: 'userSaved';
      userId: UserId;
    },
    CannotSaveUserError | CannotGetUserError
  >
>;

export type SaveUserCommandHandler = (input: SaveUserCommand) => SaveUserCommandHandlerResult;

export function buildSaveUserCommandHandler(dependencies: Dependencies): SaveUserCommandHandler {
  const { userRepository, logger } = dependencies;

  return async function saveUserCommandHandler(
    command: SaveUserCommand,
  ): SaveUserCommandHandlerResult {
    const { payload } = command;

    const userResult = await userRepository.getUserById({ userId: payload.id });

    if (userResult.isErr()) {
      switch (userResult.error.kind) {
        case 'userNotFound': {
          const user = UserActions.createUser(payload);

          const saveUserResult = await userRepository.saveUser({ user });

          if (saveUserResult.isErr()) {
            logger.error('saveUserCommandHandler', 'cannot create user', {
              error: userResult,
            });
            return err(saveUserResult.error);
          }
          return ok({
            kind: 'userSaved' as const,
            userId: user.id,
          });
        }
        case 'databaseError':
        case 'rowNotMatchingSchema':
          logger.error('saveUserCommandHandler', 'unknown error while getting user', {
            error: userResult.error,
          });
          return err(userResult.error);
        default:
          throw new TypeGuardError(userResult.error, 'get user error not existing');
      }
    }

    const userUpdated = UserActions.updateUser({
      previousUser: userResult.value,
      newUser: {
        name: payload.name,
        email: payload.email,
        id: payload.id,
        authProviderId: payload.authProviderId,
      },
    });

    const saveUserResult = await userRepository.saveUser({ user: userUpdated });

    return saveUserResult
      .map(() => ({
        kind: 'userSaved' as const,
        userId: userUpdated.id,
      }))
      .mapErr((error) => error);
  };
}
