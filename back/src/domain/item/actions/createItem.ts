import { UserId } from '@domain/user/aggregate/id';
import { Item } from '../aggregate';
import { ItemId } from '../aggregate/id';
import { ItemName } from '../aggregate/name';

type CreateItemInput = {
  id: ItemId;
  name: ItemName;
  ownerId: UserId;
};

export function createItem(input: CreateItemInput): Item {
  const { id, name, ownerId } = input;

  return {
    id,
    name,
    ownerId,
    lastEvent: {
      kind: 'ITEM_CREATED',
      itemId: id,
    },
  };
}
