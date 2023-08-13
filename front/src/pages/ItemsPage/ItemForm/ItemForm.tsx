import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type ItemFormProps = {
  itemId?: string;
  onSubmitItemForm: (item: ItemInput) => void;
};

export type ItemInput = {
  name: string;
  ownerId: number;
};

export const ItemForm = ({ onSubmitItemForm }: ItemFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemInput>();

  const onSubmitForm: SubmitHandler<ItemInput> = (data) => onSubmitItemForm(data);

  return (
    <Box bg={'whiteAlpha.700'} p={'1em'}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={6}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Item name</FormLabel>
            <Input
              id="name"
              placeholder="Nom de votre objet"
              {...register('name', {
                required: 'Ce champ est obligatoire',
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};
