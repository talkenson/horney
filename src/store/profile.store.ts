import { atom } from 'recoil'
import { Credentials, Profile } from '@/types'

export const profileStore = atom<Partial<Profile>>({
  key: 'profile-store',
  default: {},
})

export const needSetupProfileStore = atom<boolean>({
  key: 'need-setup-profile-key',
  default: false,
})
