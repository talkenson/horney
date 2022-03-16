import { useRecoilState, useSetRecoilState } from 'recoil'
import { credentialsStore, isLoggedStore } from '@/store/auth.store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '@/services/feathers'
import { needSetupProfileStore, profileStore } from '@/store/profile.store'
import { Profile, User } from '@/types'

const prepare = (data: Partial<Profile>) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (['age', 'height'].includes(key)) {
        return [key, parseInt(value as string)]
      }
      return [key, value]
    }),
  )
}

export const useProfile = (isSingletonMaster: boolean = false) => {
  const [authCredentials, setAuthCredentials] = useRecoilState(credentialsStore)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedStore)
  const [profile, setProfile] = useRecoilState(profileStore)
  const [neededSetup, setNeededSetup] = useRecoilState(needSetupProfileStore)

  useEffect(() => {
    if (
      isSingletonMaster &&
      isLoggedIn &&
      !authCredentials.user?.profile?.id &&
      !profile.id
    ) {
      app
        .service('users')
        .get('me', {
          query: {
            $select: ['profile'],
          },
        })
        .then((r: Pick<User, 'id' | 'profile'>) => {
          console.log(r)
          if (r.profile) {
            setProfile(r.profile)
            setNeededSetup(false)
          } else {
            setNeededSetup(true)
          }
        })
    }
  }, [isLoggedIn, authCredentials.user?.profile])

  const update = useCallback(
    (data: Profile) => {
      const processedData = prepare(data)
      if (isLoggedIn) {
        if (neededSetup) {
          app
            .service('profiles')
            .create(processedData)
            .then((r: Profile) => {
              console.log(r)
              if (r) {
                setProfile(r)
                setNeededSetup(false)
              } else {
                setNeededSetup(true)
              }
            })
        } else {
          app
            .service('profiles')
            .patch(profile.id, processedData)
            .then((r: Profile) => {
              console.log(r)
              if (r) {
                setProfile(r)
                setNeededSetup(false)
              } else {
                setNeededSetup(true)
              }
            })
        }
      }
    },
    [isLoggedIn],
  )

  return {
    profile,
    neededSetup,
    update,
  }
}
