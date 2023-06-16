import React, { createContext, useContext, useEffect, useState } from "react";
import { useRioSdkContext } from "./RioSdkContext";
import { RetterCloudObject, RetterAuthStatus, RetterAuthChangedEvent } from '@retter/sdk'
import { ProjectClassEnums } from "../api/constants";

export interface IUserContext {
  instance?: RetterCloudObject
  detail?: any
}

export const UserContext = createContext<IUserContext>({
  instance: undefined,
  detail: undefined,
})

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { rioSDK } = useRioSdkContext()
  const [userInstance, setUserInstance] = useState<RetterCloudObject>()

  useEffect(() => {
    const authStatusSub = rioSDK.authStatus.subscribe(async (eventAuth: RetterAuthChangedEvent) => {
      switch (eventAuth.authStatus) {
        case RetterAuthStatus.SIGNED_OUT:
          setUserInstance(undefined);
          break;
        case RetterAuthStatus.SIGNED_IN:
          const getUserInstance = await rioSDK.getCloudObject({
            classId: ProjectClassEnums.User,
            instanceId: eventAuth.uid,
          });
          setUserInstance(getUserInstance);
          break;
      }
    });

    return () => {
      authStatusSub.unsubscribe();
    };
  }, []);

  const user = React.useMemo(
    () => ({
      instance: userInstance,
      detail: undefined
    }),[userInstance]
  )

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)