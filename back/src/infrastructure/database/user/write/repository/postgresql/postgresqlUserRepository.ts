import { User } from '@domain/user/aggregate';
import { createUserEmail } from '@domain/user/aggregate/email';
import { UserId, createUserId } from '@domain/user/aggregate/id';
import { createUserName } from '@domain/user/aggregate/name';
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
      id: createUserId(user.id),
      email: createUserEmail(user.email),
      name: createUserName(user.name),
    });
  }

  return {
    saveUser,
    getUserById,
  };
}
