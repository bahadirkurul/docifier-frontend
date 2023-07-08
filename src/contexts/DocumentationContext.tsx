import { createContext, useContext, useMemo } from 'react'
import { useUserContext } from './UserContext'
import { createDocumentationRequest, deleteDocumentationRequest, getDocumentationsRequest } from '../api/documentation'

export interface IDocumentationContext {
  createDocumentation: (alias: string) => Promise<any>
  deleteDocumentation: (documentationId: string) => Promise<any>
  getDocumentations: () => Promise<any>
}

export const DocumentationContext = createContext<IDocumentationContext>({
  createDocumentation: async () => {},
  deleteDocumentation: async () => {},
  getDocumentations: async () => {},
})

export const DocumentationContextProvider =  (props) => {
  const { children } = props
  const { idToken } = useUserContext()

  const documentation = useMemo(
    () => ({
      createDocumentation: async (alias: string) => {
        const response = await createDocumentationRequest({ alias, accessToken: idToken })

        if (response.success === false) {
          console.log('createDocumentation error')
          throw new Error(response.error)
        }

        return response.data
      },
      getDocumentations: async () => {
        const response = await getDocumentationsRequest({ accessToken: idToken })

        if (response.success === false) {
          console.log('getDocumentations error')
          throw new Error(response.error)
        }

        return response.data
      },
      deleteDocumentation: async (documentationId: string) => {
        const response = await deleteDocumentationRequest({ documentationId, accessToken: idToken })

        if (response.success === false) {
          console.log('deleteDocumentation error')
          throw new Error(response.error)
        }

        return response.data
      },
    }),
    [idToken],
  )

  return <DocumentationContext.Provider value={documentation}>{children}</DocumentationContext.Provider>
}

export const useDocumentationContext = () => useContext(DocumentationContext)
