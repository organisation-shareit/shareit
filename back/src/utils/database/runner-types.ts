import { z } from 'zod';
import { Result } from 'neverthrow';
import { type Sql } from 'sql-template-tag';

export const genericTransactionSchema = z
  .object({
    kind: z.string(),
    rdbmsSpecificTransaction: z.unknown(),
  })
  .passthrough();

export type GenericTransaction = z.infer<typeof genericTransactionSchema>;

export type TransactionnalResult<S, E> = Result<
  S,
  | { kind: 'databaseError'; operation: 'transaction'; error: unknown }
  | { kind: 'useCaseError'; operation: 'transaction'; error: E }
>;

export type SelectResult<S> = Result<
  S[],
  | {
      kind: 'validationError';
      operation: 'select';
      errors: z.ZodError;
    }
  | { kind: 'databaseError'; operation: 'select'; error: unknown }
>;

export type InsertedResult = Result<
  {
    kind: 'inserted';
    operation: 'insert';
    lastNumberedIdInserted: number;
    numberOfInsertedRows: number;
  },
  { kind: 'databaseError'; operation: 'insert'; error: unknown }
>;

export type UpdatedResult = Result<
  {
    kind: 'updated';
    operation: 'update';
    numberOfUpdatedRows: number;
  },
  { kind: 'databaseError'; operation: 'update'; error: unknown }
>;

export type ExecuteResult = Result<
  {
    kind: 'executed';
    operation: 'execute';
  },
  { kind: 'databaseError'; operation: 'execute'; error: unknown }
>;

export type DeletedResult = Result<
  {
    kind: 'deleted';
    operation: 'delete';
    numberOfDeletedRows: number;
  },
  { kind: 'databaseError'; operation: 'delete'; error: unknown }
>;

export interface SqlRunner {
  toGenericTransaction(rdbmsSpecificTransaction: unknown): GenericTransaction;

  performUnderTransaction<S, E>(
    useCase: (genericTransaction: GenericTransaction) => Promise<Result<S, E>>,
  ): Promise<TransactionnalResult<S, E>>;

  executeRaw(input: { sql: Sql; transaction?: GenericTransaction | null }): Promise<ExecuteResult>;

  executeSelect<DatabaseRow extends object>(input: {
    sql: Sql;
    rowSchema?: z.ZodType<DatabaseRow>;
    transaction?: GenericTransaction | null;
  }): Promise<SelectResult<DatabaseRow>>;

  executeInsert(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<InsertedResult>;

  executeUpdate(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<UpdatedResult>;

  executeDelete(input: {
    sql: Sql;
    transaction?: GenericTransaction | null;
  }): Promise<DeletedResult>;
}
