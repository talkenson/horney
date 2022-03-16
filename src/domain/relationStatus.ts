import { SelectOption } from '@/ui/Select'
import { RelationStatus, Zodiac } from '@/types'
import { zodiacSigns } from '@/domain/zodiacSigns'

export const relationStatus = (isMale?: boolean): SelectOption[] => [
  {
    id: 'NotStated',
    value: 'Не указано',
  },
  {
    id: 'Free',
    value: isMale ? 'Свободен' : 'Свободна',
  },
  {
    id: 'Friendship',
    value: isMale ? 'Есть подруга' : 'Есть друг',
  },
  {
    id: 'Complicated',
    value: 'Все сложно',
  },
  {
    id: 'Busy',
    value: 'В отношениях',
  },
]

export const relationValues = (isMale?: boolean) =>
  Object.fromEntries(
    relationStatus(isMale).map(v => [v.id, v.value]),
  ) as Record<RelationStatus, string>
