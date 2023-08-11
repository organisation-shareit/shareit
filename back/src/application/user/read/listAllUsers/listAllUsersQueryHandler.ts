import {
  ListAllUsers,
  ListAllUsersFailure,
  ListAllUsersSuccess,
} from '@domain/user/query/listAllUsers';
import { Result } from 'neverthrow';
import { ListAllUsersQuery } from './listAllUsersQuery';

type Dependencies = {
  listAllUsers: ListAllUsers;
};

type ListAllUsersQueryHandlerResult = Promise<
  Result<
    {
      kind: 'usersRetrieved';
      users: ListAllUsersSuccess;
    },
    {
      kind: 'errorWhileListingAllUsers';
      error: ListAllUsersFailure;
    }
  >
>;

export type ListAllUsersQueryHandler = (input: ListAllUsersQuery) => ListAllUsersQueryHandlerResult;

export function buildListAllUsersQueryHandler(
  dependencies: Dependencies,
): ListAllUsersQueryHandler {
  const { listAllUsers } = dependencies;

  return async function listAllUsersQueryHandler(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    input: ListAllUsersQuery,
  ): ReturnType<ListAllUsersQueryHandler> {
    const result = await listAllUsers();

    return result
      .map((users) => ({ kind: 'usersRetrieved' as const, users }))
      .mapErr((error) => ({ kind: 'errorWhileListingAllUsers' as const, error }));
  };
}
