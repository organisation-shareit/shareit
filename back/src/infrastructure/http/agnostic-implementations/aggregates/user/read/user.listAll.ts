import { QueryBus } from '@application/queryBus';
import {
  LIST_ALL_USERS_QUERY_KIND,
  listAllUsersQuerySchema,
} from '@application/user/read/listAllUsers/listAllUsersQuery';
import {
  ListAllUsersMetadata,
  ListAllUsersRequest,
  ListAllUsersResponse,
  ListAllUsersRoute,
} from '@infrastructure/http/contracts/aggregates/user/read/user.listAll';
import {
  HTTP_2xx_OK,
  HTTP_4xx_BAD_REQUEST,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
} from '@infrastructure/http/contracts/http-codes';
import { Logger } from '@utils/logger';
import { UuidGenerator } from '@utils/uuid';

type Dependencies = {
  uuidGenerator: UuidGenerator;
  queryBus: QueryBus;
  logger: Logger;
};

export const LIST_ALL_USERS_MODULE = 'list-all-users';

export function buildListAllUsersRoute(dependencies: Dependencies): ListAllUsersRoute {
  const { uuidGenerator, queryBus, logger } = dependencies;

  return async function listAllUsersRoute(
    payload: ListAllUsersRequest,
    metadata: ListAllUsersMetadata,
  ): ListAllUsersResponse {
    logger.info(LIST_ALL_USERS_MODULE, 'LIST_ALL_USERS_ROUTE', { payload, metadata });
    const queryId = uuidGenerator.generate(`query-${LIST_ALL_USERS_MODULE}`);

    const queryPayload = {};

    const queryKind = LIST_ALL_USERS_QUERY_KIND;

    const rawListAllUsersQuery = {
      kind: queryKind,
      queryId,
      payload: queryPayload,
    };

    const listAllUsersQueryParsedResult = listAllUsersQuerySchema.safeParse(rawListAllUsersQuery);

    if (!listAllUsersQueryParsedResult.success) {
      return {
        status: HTTP_4xx_BAD_REQUEST,
        body: {
          kind: 'invalidQuerySchema',
          queryName: queryKind,
          error: listAllUsersQueryParsedResult.error.errors,
          payload: queryPayload,
        },
      };
    }

    const result = await queryBus.listAllUsers(listAllUsersQueryParsedResult.data);

    if (result.isOk()) {
      return {
        status: HTTP_2xx_OK,
        body: {
          kind: 'listAllUsersSuccess',
          users: result.value.users,
        },
      };
    }

    return {
      status: HTTP_5xx_INTERNAL_SERVER_ERROR,
      body: {
        queryKind,
        queryPayload,
        kind: 'unknownError',
        errors: result.error,
      },
    };
  };
}
