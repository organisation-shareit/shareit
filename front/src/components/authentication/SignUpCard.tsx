import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  VisuallyHidden,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleIcon } from '../provider-icons/ProviderIcons';

type SignUpCardProps = {
  onSignUp: (signUpData: SignUpFormInputs) => void;
  onSignInWithGoogle: () => void;
  onClickSignIn: () => void;
};

export type SignUpFormInputs = {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
};

export const SignUpCard = ({ onSignUp, onClickSignIn, onSignInWithGoogle }: SignUpCardProps) => {
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitForm: SubmitHandler<SignUpFormInputs> = (data: SignUpFormInputs) => {
    onSignUp(data);
  };

  return (
    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" {...register('firstname')} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" {...register('lastname')} />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register('email')} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} {...register('password')} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Sign up
            </Button>
          </Stack>
          <Stack spacing="6">
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <Button variant="outline" onClick={() => onSignInWithGoogle()}>
              <VisuallyHidden>Sign in with Google</VisuallyHidden>
              <GoogleIcon boxSize="5" />
            </Button>
          </Stack>
          <Stack>
            <Text align={'center'}>
              Already a user?{' '}
              <Link color={'blue.400'} onClick={() => onClickSignIn()}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
