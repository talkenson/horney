import { SelectOption } from '@/ui/Select'

export const relationStatus = (isMale?: boolean): SelectOption[] => [
  {
    id: 'NotStated',
    value: 'Не указан',
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
