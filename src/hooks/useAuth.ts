import { useRecoilState } from 'recoil'
import { credentialsStore, isLoggedStore } from '@/store/auth.store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthorizedUser, Credentials, User } from '@/types'
import { app } from '@/services/feathers'
export let globalAuthCredentials: Credentials | undefined = undefined
export let globalIsLoggedIn = false

const TOKEN_CHECK_INTERVAL = 60000

export const useAuth = (isSingletonMaster: boolean = false) => {
  const [authCredentials, setAuthCredentials] = useRecoilState(credentialsStore)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedStore)
  //const [verifyPending, setVerifyPending] = useState(false)

  useEffect(() => {
    if (isSingletonMaster) {
      globalAuthCredentials = { ...authCredentials }
      globalIsLoggedIn = isLoggedIn
    }
  }, [authCredentials, isLoggedIn])

  useEffect(() => {
    if (isSingletonMaster) {
      const token = localStorage.getItem('AuthToken')
      const user = JSON.parse(localStorage.getItem('user') || 'false')
      if (token && user) {
        setAuthCredentials({ accessToken: token, user: user })
      }
    }
  }, [])

  /*useInterval(() => {
    if (isSingletonMaster) {
      verifyToken();
    }
  }, TOKEN_CHECK_INTERVAL);*/

  const register = useCallback(
    (data: Pick<User, 'email' | 'password'>) =>
      app
        .service('users')
        .create(data)
        .catch((e: any) => {
          setIsLoggedIn(false)
          throw e
        }),
    [],
  )

  const login = useCallback(
    (data: Pick<User, 'email' | 'password'>) =>
      app
        .authenticate({
          strategy: 'local',
          email: data.email,
          password: data.password,
        })
        .then(r => {
          localStorage.setItem(
            'AuthToken',
            JSON.stringify((r as AuthorizedUser).accessToken),
          )
          localStorage.setItem(
            'user',
            JSON.stringify((r as AuthorizedUser).user),
          )
          setIsLoggedIn(true)
          return r
        })
        .catch(e => {
          setIsLoggedIn(false)
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
          throw e
        }),
    [],
  )
  const reAuth = useCallback(
    () =>
      app
        .reAuthenticate()
        .then(r => {
          setIsLoggedIn(true)
          localStorage.setItem(
            'AuthToken',
            JSON.stringify((r as AuthorizedUser).accessToken),
          )
          localStorage.setItem(
            'user',
            JSON.stringify((r as AuthorizedUser).user),
          )
          return r
        })
        .catch(e => {
          localStorage.removeItem('user')
          localStorage.removeItem('AuthToken')
          setIsLoggedIn(false)
          throw e
        }),
    [],
  )

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    app.logout()
    localStorage.removeItem('user')
    localStorage.removeItem('AuthToken')
    setAuthCredentials((prev: Credentials) => ({
      ...prev,
      tokenString: '',
    }))
    return true
  }, [])

  const user = useMemo(() => authCredentials.user, [authCredentials])

  return {
    register,
    login,
    reAuth,
    logout,
    user,
    authenticated: isLoggedIn,
  }
}
