import { Box } from '@chakra-ui/react';
import { client } from '../../services/api';
import { ItemForm, ItemInput } from './ItemForm/ItemForm';

export const ItemsPage = () => {
  const { mutate } = client.createItem.useMutation();

  const onCreateButtonClick = async (data: ItemInput) => {
    mutate(
      // @ts-ignore: TS2322
      { body: { name: data.name, ownerId: 'b9cf751f-8b2f-44fb-a5d1-a14756c0c0ac' } },
      { onSuccess: async (data) => console.log('success', data) },
    );
  };

  return (
    <Box>
      <ItemForm onSubmitItemForm={onCreateButtonClick} />
    </Box>
  );
};
