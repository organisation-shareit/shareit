export type DatabaseError = {
  kind: 'databaseError';
  error: unknown;
};

export type RowNotMatchingSchemaError = {
  kind: 'rowNotMatchingSchema';
  entity: string;
  error: unknown;
  row: unknown;
};
