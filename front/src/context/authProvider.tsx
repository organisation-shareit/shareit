import React, { ReactNode, useEffect, useState, useContext, createContext, useMemo } from 'react';
import { auth } from '../config/firebaseConfig';
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { SignUpFormInputs } from '../components/authentication/SignUpCard';
import { Box } from '@chakra-ui/react';
import { initUserAfterSignUp } from '../services/api';

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export const UserStateContext = createContext<UserContextState>({} as UserContextState);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (userDAta: SignUpFormInputs) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export function useAuth(): AuthContextModel {
  const authContext = useContext(AuthContext);
  return useMemo(() => authContext, [authContext]);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function signUp(userData: SignUpFormInputs): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, userData.email, userData.password).then(
      (userCredential) => {
        const userSign = userCredential.user;
        updateProfile(userSign, { displayName: userData.firstname });
        return initUserAfterSignUp(userSign.uid, userData.email, userData.firstname).then(
          () => userCredential,
        );
      },
    );
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  const logOut = () => {
    return signOut(auth);
  };

  const signInWithGoogle = (): Promise<void> => {
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        initUserAfterSignUp(user.uid, user.email, user.displayName);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };
  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [user, isLoading]);

  const values = useMemo(
    () => ({
      signUp,
      user,
      signIn,
      signInWithGoogle,
      isLoading,
      logOut,
      resetPassword,
      auth,
    }),
    [signUp, user, signIn, signInWithGoogle, isLoading, logOut, resetPassword, auth],
  );

  return (
    <AuthContext.Provider value={values}>
      <Box backgroundColor="red"></Box>
      {isLoading ? (
        <UserStateContext.Provider value={{ isAuthenticated: false, isLoading: true }}>
          {children}
        </UserStateContext.Provider>
      ) : (
        <>
          {user ? (
            <UserStateContext.Provider
              value={{ isAuthenticated: true, isLoading: false, id: user.uid }}
            >
              {children}
            </UserStateContext.Provider>
          ) : (
            <UserStateContext.Provider value={{ isAuthenticated: false, isLoading: false }}>
              {children}
            </UserStateContext.Provider>
          )}
        </>
      )}
    </AuthContext.Provider>
  );
};

export const useUserAuth = (): UserContextState => {
  const userStateContext = useContext(UserStateContext);
  return useMemo(() => userStateContext, [userStateContext, userStateContext.isLoading]);
};
