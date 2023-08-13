import { Item } from '@domain/item/aggregate';
import { ItemId } from '@domain/item/aggregate/id';
import { ItemRepository } from '@domain/item/repository';
import { PrismaClient } from '@prisma/client';
import { TypeGuardError } from '@utils/typeguard-error';
import { err, ok } from 'neverthrow';

type Dependencies = {
  prismaClient: PrismaClient;
};

export function buildPostgresqlItemRepository(dependencies: Dependencies): ItemRepository {
  const { prismaClient } = dependencies;

  async function saveItem(input: { item: Item }): ReturnType<ItemRepository['saveItem']> {
    try {
      const event = input.item.lastEvent;

      switch (event.kind) {
        case 'ITEM_CREATED': {
          await prismaClient.item.create({
            data: {
              id: input.item.id,
              owner_id: input.item.ownerId,
              name: input.item.name,
            },
          });
          return ok(undefined);
        }
        case 'ITEM_UPDATED': {
          await prismaClient.item.update({
            where: {
              id: input.item.id,
            },
            data: {
              owner_id: input.item.ownerId,
              name: input.item.name,
            },
          });
          return ok(undefined);
        }
        default:
          throw new TypeGuardError(event, 'event not existing');
      }
    } catch (error) {
      return err({
        kind: 'cannotSaveItem',
        item: input.item,
        error,
      });
    }
  }

  async function getItemById(input: { itemId: ItemId }): ReturnType<ItemRepository['getItemById']> {
    const item = await prismaClient.item.findUnique({
      where: {
        id: input.itemId,
      },
    });

    if (item === null) {
      return err({
        kind: 'itemNotFound',
        itemId: input.itemId,
      });
    }

    return ok({
      id: item.id,
      ownerId: item.owner_id,
      name: item.name,
    });
  }

  return {
    saveItem,
    getItemById,
  };
}
