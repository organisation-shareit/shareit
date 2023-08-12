import { Item, ItemWithoutEvent } from '../aggregate';

type UpdateItemInput = {
  previousItem: ItemWithoutEvent;
  newItem: ItemWithoutEvent;
};

export function updateItem(input: UpdateItemInput): Item {
  const { previousItem, newItem } = input;

  return {
    ...previousItem,
    ...newItem,
    lastEvent: {
      kind: 'ITEM_UPDATED',
      itemId: previousItem.id,
    },
  };
}
