import { Result } from 'neverthrow';
import { Item, ItemWithoutEvent } from '../aggregate';
import { CannotSaveItemError, ItemNotFoundError } from './errors';
import { ItemId } from '../aggregate/id';

export type ItemRepository = {
  getItemById(input: { itemId: ItemId }): Promise<Result<ItemWithoutEvent, ItemNotFoundError>>;
  saveItem(input: { item: Item }): Promise<Result<void, CannotSaveItemError>>;
};
