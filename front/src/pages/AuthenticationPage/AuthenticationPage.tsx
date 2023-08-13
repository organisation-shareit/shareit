import { Container, Stack } from '@chakra-ui/react';
import { LoginCard } from '../../components/authentication/LoginCard';
import { SignUpCard, SignUpFormInputs } from '../../components/authentication/SignUpCard';
import { useAuth } from '../../context/authProvider';
import { useState } from 'react';
import { FirebaseError } from '@firebase/util';
import { AuthResponse } from '../../components/authentication/AuthResponse';

export const AuthenticationPage = () => {
  const { signIn, signInWithGoogle, signUp } = useAuth();
  const [isSignInMode, setIsSignInMode] = useState(true);

  const handleSignIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const authResponse = await signIn(email, password);
      console.log('Login success', authResponse);
      return { isSuccessful: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            return {
              isSuccessful: false,
              error:
                'The email address entered is not registered. Please check your email address and try again.',
            };
          case 'auth/wrong-password':
            return {
              isSuccessful: false,
              error: 'The password entered is incorrect. Please check your password and try again.',
            };
          case 'auth/invalid-email':
            return {
              isSuccessful: false,
              error:
                'The email address entered is invalid. Please check your email address and try again.',
            };
          case 'auth/user-disabled':
            return {
              isSuccessful: false,
              error:
                'Your account has been disabled. Please contact support for further assistance.',
            };
          case 'auth/too-many-requests':
            return {
              isSuccessful: false,
              error:
                'You have exceeded the maximum number of login attempts. Please try again later.',
            };
          default:
            return {
              isSuccessful: false,
              error:
                'Login failed for an unknown reason. Please try again later or contact support for further assistance.',
            };
        }
      } else {
        return {
          isSuccessful: false,
          error:
            'Login failed for an unknown reason. Please try again later or contact support for further assistance.',
        };
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };

  const handleSignUp = async (signUpData: SignUpFormInputs) => {
    // handle signup logic here
    console.log('Username:', signUpData.email);
    try {
      const userCreated = await signUp(signUpData);
      console.log('Signup success', userCreated);
    } catch (error: unknown) {
      console.log('Signup failed', error);
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} height={'100vh'}>
      <Stack spacing="8">
        {isSignInMode ? (
          <LoginCard
            onSignIn={handleSignIn}
            onSignInWithGoogle={handleSignInWithGoogle}
            onClickSignUp={() => setIsSignInMode(false)}
          />
        ) : (
          <SignUpCard
            onSignUp={handleSignUp}
            onSignInWithGoogle={handleSignInWithGoogle}
            onClickSignIn={() => setIsSignInMode(true)}
          />
        )}
      </Stack>
    </Container>
  );
};
