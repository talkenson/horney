import { atom } from 'recoil'
import { Credentials } from '@/types'

export const credentialsStore = atom<Credentials>({
  key: 'credentials-store',
  default: {},
})

export const isLoggedStore = atom<boolean>({
  key: 'is-logged-store',
  default: false,
})
