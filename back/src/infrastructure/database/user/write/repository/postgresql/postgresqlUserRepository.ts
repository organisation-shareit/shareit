import { User } from '@domain/user/aggregate';
import { UserId } from '@domain/user/aggregate/id';
import { UserRepository } from '@domain/user/repository';
import { PrismaClient } from '@prisma/client';
import { TypeGuardError } from '@utils/typeguard-error';
import { err, ok } from 'neverthrow';

type Dependencies = {
  prismaClient: PrismaClient;
};

export function buildPostgresqlUserRepository(dependencies: Dependencies): UserRepository {
  const { prismaClient } = dependencies;

  async function saveUser(input: { user: User }): ReturnType<UserRepository['saveUser']> {
    try {
      const event = input.user.lastEvent;

      switch (event.kind) {
        case 'USER_CREATED': {
          await prismaClient.user.create({
            data: {
              id: input.user.id,
              email: input.user.email,
              name: input.user.name,
              auth_provider_id: input.user.authProviderId,
            },
          });
          return ok(undefined);
        }
        case 'USER_UPDATED': {
          await prismaClient.user.update({
            where: {
              id: input.user.id,
            },
            data: {
              email: input.user.email,
              name: input.user.name,
            },
          });
          return ok(undefined);
        }
        default:
          throw new TypeGuardError(event, 'event not existing');
      }
    } catch (error) {
      return err({
        kind: 'cannotSaveUser',
        user: input.user,
        error,
      });
    }
  }

  async function getUserById(input: { userId: UserId }): ReturnType<UserRepository['getUserById']> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: input.userId,
      },
    });

    if (user === null) {
      return err({
        kind: 'userNotFound',
        userId: input.userId,
      });
    }

    return ok({
      id: user.id,
      email: user.email,
      name: user.name,
      authProviderId: user.auth_provider_id,
    });
  }

  return {
    saveUser,
    getUserById,
  };
}
