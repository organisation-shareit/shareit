import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Divider,
  Text,
  Button,
  VisuallyHidden,
  Link,
  useColorModeValue,
  Checkbox,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleIcon } from '../provider-icons/ProviderIcons';
import { useState } from 'react';
import { AuthResponse } from './AuthResponse';

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginProps = {
  onSignIn: (email: string, password: string) => Promise<AuthResponse>;
  onSignInWithGoogle: () => void;
  onClickSignUp: () => void;
};
export const LoginCard = ({ onSignIn, onClickSignUp, onSignInWithGoogle }: LoginProps) => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmitForm: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
    const authResponse = await onSignIn(data.email, data.password);
    if (!authResponse.isSuccessful) {
      setError(authResponse.error);
    }
  };

  return (
    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing="6">
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email')} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('password')} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Sign in
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
                Don't have an account?{' '}
                <Link color={'blue.400'} onClick={() => onClickSignUp()}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
