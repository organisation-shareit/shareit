import { z } from 'zod';
import { type Sql } from 'sql-template-tag';
import { Oops } from '@utils/oops';
import { Result, err, ok } from 'neverthrow';
import {
  type SqlRunner,
  type TransactionnalResult,
  type SelectResult,
  type InsertedResult,
  type UpdatedResult,
  type GenericTransaction,
  type ExecuteResult,
  type DeletedResult,
} from './runner-types';

export type PrismaTransaction = Omit<PrismaClientWrapper, '$transaction'>;

export interface PrismaClientWrapper {
  $queryRaw<T>(sql: Sql): Promise<T>;
  $executeRaw(sql: Sql): Promise<number>;
  $transaction<T>(action: (transaction: PrismaTransaction) => Promise<T>): Promise<T>;
}

function toPrismaTransaction(
  transaction?: GenericTransaction | null,
): PrismaTransaction | undefined {
  if (!transaction) {
    return undefined;
  }

  if (transaction.kind !== 'prisma') {
    throw new Error('Invalid transaction, you need to pass a prisma one');
  }

  return transaction.rdbmsSpecificTransaction as unknown as PrismaTransaction;
}

type Dependencies = {
  prisma: PrismaClientWrapper;
};

export function buildPrismaSqlRunner(dependencies: Dependencies): SqlRunner {
  const { prisma } = dependencies;

  function toGenericTransaction(transaction: PrismaTransaction): GenericTransaction {
    return {
      kind: 'prisma',
      rdbmsSpecificTransaction:
        transaction as unknown as GenericTransaction['rdbmsSpecificTransaction'],
    };
  }

  async function performUnderTransaction<S, E>(
    useCase: (genericTransaction: GenericTransaction) => Promise<Result<S, E>>,
  ): Promise<TransactionnalResult<S, E>> {
    try {
      return await prisma.$transaction(async (transaction: PrismaTransaction) => {
        const genericTransaction = toGenericTransaction(transaction);
        const result = await useCase(genericTransaction);

        if (result.isErr()) {
          throw new Oops('Rollbacking', {
            rollbackedError: result,
          });
        }

        return ok(result.value);
      });
    } catch (error) {
      if (error instanceof Oops && error.message === 'Rollbacking') {
        return err({
          kind: 'useCaseError',
          operation: 'transaction',
          error: error.data.rollbackedError.error,
        });
      }

      return err({
        kind: 'databaseError',
        operation: 'transaction',
        error,
      });
    }
  }

  async function executeRaw(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<ExecuteResult> {
    const { sql, transaction } = input;

    const prismaTransaction = toPrismaTransaction(transaction);

    try {
      await (prismaTransaction ?? prisma).$executeRaw(sql);

      return ok({
        kind: 'executed',
        operation: 'execute',
      });
    } catch (error) {
      return err({
        kind: 'databaseError',
        operation: 'execute',
        error,
      });
    }
  }

  async function executeSelect<DatabaseRow extends object>(input: {
    sql: Sql;
    rowSchema?: z.ZodType<DatabaseRow>;
    transaction?: GenericTransaction | null;
  }): Promise<SelectResult<DatabaseRow>> {
    const { sql, rowSchema, transaction } = input;

    const prismaTransaction = toPrismaTransaction(transaction);

    try {
      const rows = await (prismaTransaction ?? prisma).$queryRaw(sql);

      if (!rowSchema) {
        return ok(rows as unknown as DatabaseRow[]);
      }

      const parseResult = z.array(rowSchema).safeParse(rows);

      if (parseResult.success) {
        return ok(parseResult.data);
      }
      return err({
        kind: 'validationError',
        operation: 'select',
        errors: parseResult.error,
      });
    } catch (error) {
      return err({
        kind: 'databaseError',
        operation: 'select',
        error,
      });
    }
  }

  async function executeInsert(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<InsertedResult> {
    const { sql, transaction } = input;

    const prismaTransaction = toPrismaTransaction(transaction);

    try {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/naming-convention */
      const numberOfInsertedRows = await (prismaTransaction ?? prisma).$executeRaw(sql);

      return ok({
        kind: 'inserted',
        operation: 'insert',
        lastNumberedIdInserted: 0, // Prisma does not support that
        numberOfInsertedRows,
      });
    } catch (error) {
      return err({
        kind: 'databaseError',
        operation: 'insert',
        error,
      });
    }
  }

  async function executeUpdate(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<UpdatedResult> {
    const { sql, transaction } = input;

    const prismaTransaction = toPrismaTransaction(transaction);

    try {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/naming-convention */
      const numberOfUpdatedRows = await (prismaTransaction ?? prisma).$executeRaw(sql);

      return ok({
        kind: 'updated',
        operation: 'update',
        numberOfUpdatedRows,
      });
    } catch (error) {
      return err({
        kind: 'databaseError',
        operation: 'update',
        error,
      });
    }
  }

  async function executeDelete(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<DeletedResult> {
    const { sql, transaction } = input;

    const prismaTransaction = toPrismaTransaction(transaction);

    try {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/naming-convention */
      const numberOfDeletedRows = await (prismaTransaction ?? prisma).$executeRaw(sql);

      return ok({
        kind: 'deleted',
        operation: 'delete',
        numberOfDeletedRows,
      });
    } catch (error) {
      return err({
        kind: 'databaseError',
        operation: 'delete',
        error,
      });
    }
  }

  return {
    performUnderTransaction,
    toGenericTransaction,
    executeRaw,
    executeSelect,
    executeInsert,
    executeUpdate,
    executeDelete,
  };
}
