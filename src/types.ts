export type Contacts = {
  id: number
  userId: number
  instagram: string | null
  telegram: string | null
  phone: string | null
  vk: string | null
}

export type Profile = {
  id: number
  userId: number
  name: string
  age: number
  desc: string
  active: boolean
  photos: string[]
  relationStatus?: RelationStatus | null
  smoking?: Frequency | null
  drinking?: Frequency | null
  zodiac?: Zodiac | null
  sociality?: Sociality | null
  height?: number | null
  lookingFor: LookingFor
  sex: Sex
}

export enum Sex {
  Male = 'Male',
  Female = 'Female',
  Helicopter = 'Helicopter',
}

export type User = {
  id: number
  email: string
  password: string
  contacts?: Contacts
  profile?: Profile
}

export enum RelationStatus {
  Free = 'Free',
  Friendship = 'Friendship',
  Complicated = 'Complicated',
  Busy = 'Busy',
}

export enum Frequency {
  No = 'No',
  NotMuch = 'NotMuch',
  Sometimes = 'Sometimes',
  Often = 'Often',
  Usually = 'Usually',
}

export enum Zodiac {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export enum Sociality {
  Introvert = 'Introvert',
  Ambivert = 'Ambivert',
  Extravert = 'Extravert',
}

export enum LookingFor {
  Friend = 'Friend',
  Love = 'Love',
  Work = 'Work',
}

export type BackError = {
  name: string
  message: string
  code: number
  errors: Record<string, any>
}

export interface AuthorizedUser {
  accessToken: string
  user: User
}
