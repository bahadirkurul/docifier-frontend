import React, { createContext, useContext } from 'react'
import Rio from '@retter/sdk'

export interface ISdkContext {
  rioSDK: Rio
}

export const RioSdkContext = createContext<ISdkContext>({
  rioSDK: Rio.getInstance({
    projectId: '7cgkuj6cl',
    url: 'api.pinar.retter.io',
    platform: 'WEB'
  })
})

export const RioSdkContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sdk = React.useMemo(
    () => ({
      rioSDK: Rio.getInstance({
        projectId: '7cgkuj6cl',
        url: 'api.pinar.retter.io',
        platform: 'WEB'
      })
    }),
    [],
  )

  return (
    <RioSdkContext.Provider value={sdk}>
      {children}
    </RioSdkContext.Provider>
  )
}

export const useRioSdkContext = () => useContext(RioSdkContext)
