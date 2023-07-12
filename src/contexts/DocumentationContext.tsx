import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useUserContext } from './UserContext'
import { createDocumentationRequest, deleteDocumentationRequest, getDocumentationsRequest } from '../api/documentation'
import { useAuthContext } from './AuthContext'
import { useFirebaseContext } from './FirebaseContext'

export interface IDocumentationContext {
  createDocumentation: (alias: string) => Promise<any>
  deleteDocumentation: (documentationId: string) => Promise<any>
  getDocumentations: () => Promise<any>
  userDocumentations: any[]
}

export const DocumentationContext = createContext<IDocumentationContext>({
  createDocumentation: async () => {},
  deleteDocumentation: async () => {},
  getDocumentations: async () => {},
  userDocumentations: [],
})

export const DocumentationContextProvider =  (props) => {
  const { children } = props
  const { idToken } = useUserContext()
  const { firebaseAuth } = useFirebaseContext()
  const [userDocumentations, setUserDocumentations] = useState<any[]>([])

  const documentation = useMemo(
    () => ({
      createDocumentation: async (alias: string) => {
        const response = await createDocumentationRequest({ alias, accessToken: idToken })

        if (response.success === false) {
          console.log('createDocumentation error')
          throw new Error(response.error)
        }

        await getUsersDocumentations()
        return response.data
      },
      getDocumentations: async () => {
        const response = await getDocumentationsRequest({ accessToken: idToken })

        if (response.success === false) {
          console.log('getDocumentations error')
          throw new Error(response.error)
        }

        console.log(response.data);
        
        return response.data
      },
      deleteDocumentation: async (documentationId: string) => {
        const response = await deleteDocumentationRequest({ documentationId, accessToken: idToken })

        if (response.success === false) {
          console.log('deleteDocumentation error')
          throw new Error(response.error)
        }

        await getUsersDocumentations()
        return response.data
      },
      userDocumentations,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idToken, userDocumentations],
  )

  const getUsersDocumentations = async () => {
    const docs = await documentation.getDocumentations()
    setUserDocumentations(docs)
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user && idToken) {
        await getUsersDocumentations()
      }
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken, firebaseAuth])

  return <DocumentationContext.Provider value={documentation}>{children}</DocumentationContext.Provider>
}

export const useDocumentationContext = () => useContext(DocumentationContext)
