import React, { createContext, useContext } from 'react'

export interface ILoadingContext {
  loading: boolean
  setLoadingStatus: (status: boolean) => void
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoadingStatus: () => {},
})

export const LoadingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const loadingMemo = React.useMemo(
    () => ({
      setLoadingStatus: (status: boolean) => {
        setLoading(status)
      },
      loading,
    }),
    [loading],
  )

  return <LoadingContext.Provider value={loadingMemo}>{children}</LoadingContext.Provider>
}

export const useLoadingContext = () => useContext(LoadingContext)
