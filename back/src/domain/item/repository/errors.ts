import { DatabaseError, RowNotMatchingSchemaError } from '@utils/database';
import { Item } from '../aggregate';
import { ItemId } from '../aggregate/id';

export type CannotGetItemError = DatabaseError | RowNotMatchingSchemaError;

export type ItemNotFoundError =
  | CannotGetItemError
  | {
      kind: 'itemNotFound';
      itemId: ItemId;
    };

export type CannotSaveItemError = {
  kind: 'cannotSaveItem';
  item: Item;
  error: unknown;
};
