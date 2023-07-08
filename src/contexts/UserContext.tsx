import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useFirebaseContext } from './FirebaseContext'
import { IdTokenResult, User } from 'firebase/auth'
import { changePasswordRequest } from '../api/user'

export interface IUserContext {
  firebaseUser?: User
  tokenClaims?: IdTokenResult
  idToken?: string
  changePassword: (oldPassword: string, newPassword: string, newPasswordConfirm: string) => Promise<any>
}

export const UserContext = createContext<IUserContext>({
  firebaseUser: undefined,
  tokenClaims: undefined,
  idToken: undefined,
  changePassword: async () => {},
})

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User>()
  const [tokenClaims, setTokenClaims] = useState<IdTokenResult>()
  const [idToken, setIdToken] = useState<string>()
  const { firebaseAuth } = useFirebaseContext()

  const documentation = useMemo(
    () => ({
      changePassword: async (oldPassword: string, newPassword: string, newPasswordConfirm: string) => {
        const response = await changePasswordRequest({ oldPassword, newPassword, newPasswordConfirm, accessToken: idToken })

        if (response.success === false) {
          console.log('createDocumentation error')
          throw new Error(response.error)
        }

        return response.data
      },
    }),
    [idToken],
  )

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setFirebaseUser(user)
        setIdToken(await user.getIdToken())
        setTokenClaims(await user.getIdTokenResult())
      } else {
        setFirebaseUser(undefined)
        setIdToken(undefined)
        setTokenClaims(undefined)
      }
    })
  }, [firebaseAuth])

  const user = React.useMemo(
    () => ({
      firebaseUser,
      tokenClaims,
      idToken,
      ...documentation,
    }),
    [documentation, firebaseUser, idToken, tokenClaims],
  )

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
