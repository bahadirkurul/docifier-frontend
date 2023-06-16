import { createContext, useContext, useMemo } from "react";
import { RetterCallResponse } from '@retter/sdk'
import { LoginResponse } from "./models";
import { isSuccess } from "../api/utils";
import { useRioSdkContext } from "./RioSdkContext";

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
  const { rioSDK } = useRioSdkContext()

  const auth = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        const methodResponse: RetterCallResponse<LoginResponse> = await rioSDK.makeStaticCall<any>({
          classId: 'EnduserAuthorizer',
          method: 'login',
          body: {
            email,
            password,
          },
        })
    
        if (!isSuccess(methodResponse.status)) {
          throw new Error('authenticate failed')
        }
        
        const authenticate = await rioSDK.authenticateWithCustomToken(methodResponse.data.token)
        if (authenticate.authStatus === 'AUTH_FAILED') {
          throw new Error('authenticate failed')
        }
      },
      signUp: async (name: string, surname: string, email: string, password: string, confirmPassword: string) => {
        const instanceResponse = await rioSDK.getCloudObject({
          classId: 'EnduserAuthorizer',
          body: {
            name,
            surname,
            email,
            password,
            confirmPassword,
          },
        })
        const response = instanceResponse.response as LoginResponse
    
        const authenticate = await rioSDK.authenticateWithCustomToken(response.token)
        if (authenticate.authStatus === 'AUTH_FAILED') {
          throw new Error('authenticate failed')
        }
      },
      signOut:  async () => {
        await rioSDK.signOut()
        const authStatusPromise = await rioSDK.authStatus.toPromise()
        if (authStatusPromise.authStatus === 'SIGNED_IN') {
          throw new Error('Signout Failed')
        }
      }
    }),[rioSDK]
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
