import { atom } from 'recoil'
import { CardContent } from '@/components/types/cardContent'

export const cardsStore = atom<CardContent[]>({
  key: 'cards',
  default: [],
})
