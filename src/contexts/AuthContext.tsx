import { createContext, useContext, useMemo, useState } from "react";
import { signInWithCustomToken, signOut } from 'firebase/auth'
import { useFirebaseContext } from "./FirebaseContext";
import { signInRequest, signUpRequest } from "../api/auth";

export interface IAuthContext {
  signIn: (email: string, password: string) => void;
  signUp: (
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const { firebaseAuth } = useFirebaseContext();

  const auth = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        const response = await signInRequest({email, password})
    
        if (response.success === false) {
          console.log("authenticate error");
          throw new Error(response.error)
        }

        await signInWithCustomToken(firebaseAuth, response.data.token)
      },
      signUp: async (name: string, surname: string, email: string, password: string, confirmPassword: string) => {
        const response = await signUpRequest({name, surname, email, password, confirmPassword})

        if (response.success === false) {
          console.log("authenticate error");
          throw new Error(response.error)
        }

        await signInWithCustomToken(firebaseAuth, response.data.token)
      },
      signOut: async () => {
        await signOut(firebaseAuth)
      },
    }),[firebaseAuth]
  )

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
