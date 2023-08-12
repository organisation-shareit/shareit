import { ListAllUsers, listAllUsersRowSchema } from '@domain/user/query/listAllUsers';
import { SqlRunner } from '@utils/database/runner-types';
import { sql } from '@utils/database/sql-template-tag';

type Dependencies = {
  sqlRunner: SqlRunner;
};

export function buildPostgresqlListAllUsers(dependencies: Dependencies): ListAllUsers {
  const { sqlRunner } = dependencies;

  return async function listAllUsers(): ReturnType<ListAllUsers> {
    const query = sql`
      SELECT
        id,
        name
      FROM public.user
    `;

    const selectResult = await sqlRunner.executeSelect({
      sql: query,
      rowSchema: listAllUsersRowSchema,
    });

    return selectResult;
  };
}
