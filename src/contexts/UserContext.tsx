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
  detail: undefined
})

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { rioSDK } = useRioSdkContext()
  const [userInstance, setUserInstance] = useState<RetterCloudObject>()
  const [userDetail, setUserDetail] = useState<any>()

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
          const userSub = getUserInstance.state?.public?.subscribe((event: any) => {
            setUserDetail(event)
          })
          setUserInstance(getUserInstance);
          return () => {
            userSub?.unsubscribe()
          }
      }
    });


    return () => {
      authStatusSub.unsubscribe();
    };
  }, [rioSDK]);

  const user = React.useMemo(
    () => ({
      instance: userInstance,
      detail: userDetail,
    }),[userDetail, userInstance]
  )

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)