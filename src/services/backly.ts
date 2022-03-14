import { app } from './feathers'
import feathers from '@feathersjs/feathers'
import { AuthorizedUser, BackError, User } from '@/types'

export interface BacklyAuth {
  ready: boolean
  state: boolean
  register: (
    data: Pick<User, 'email' | 'password'>,
  ) => Promise<User | BackError>
  login: (
    data: Pick<User, 'email' | 'password'>,
  ) => Promise<AuthorizedUser | Record<string, any>>
  reAuth: () => Promise<void>
  logout: () => Promise<boolean>
  getUser: () => User | undefined
}

class Backly {
  auth: BacklyAuth = {
    ready: false,
    state: false,
    register: async data =>
      app
        .service('users')
        .create(data)
        .catch((e: any) => {
          this.auth.state = false
          return e
        }),
    login: async data =>
      app
        .authenticate({
          strategy: 'local',
          email: data.email,
          password: data.password,
        })
        .then(r => {
          this.auth.state = true
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
          this.auth.state = false
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
          throw e
        }),
    reAuth: () =>
      app
        .reAuthenticate()
        .then(r => {
          this.auth.state = true
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
          this.auth.state = false
          return e
        }),
    logout: async () => {
      this.auth.state = false
      await app.logout()
      localStorage.removeItem('user')
      localStorage.removeItem('AuthToken')
      return true
    },
    getUser: () => {
      let user = undefined
      try {
        user = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user') || '{}')
          : {}
      } catch (e) {
        return undefined
      }
      return user
    },
  }
  app: feathers.Application

  constructor() {
    this.auth.ready = true
    this.app = app
  }
}

const backlyInstance = new Backly()

export default backlyInstance
