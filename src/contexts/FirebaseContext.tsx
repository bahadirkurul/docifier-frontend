import React, { createContext, useContext } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

export interface IFirebaseContext {
  firebaseApp: FirebaseApp
  firebaseAuth: Auth
}

const firebaseApp = initializeApp(firebaseConfig)

export const FirebaseContext = createContext<IFirebaseContext>({
  firebaseApp,
  firebaseAuth: getAuth(firebaseApp)
})

export const FirebaseContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const firebaseMemo = React.useMemo(
    () => ({
      firebaseApp,
      firebaseAuth: getAuth(firebaseApp)
    }),
    [],
  )

  return (
    <FirebaseContext.Provider value={firebaseMemo}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebaseContext = () => useContext(FirebaseContext)
