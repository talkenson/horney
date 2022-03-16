import { SelectOption } from '@/ui/Select'
import { Sociality } from '@/types'

export const lookingFor: SelectOption[] = [
  {
    id: 'NotStated',
    value: 'Не указан',
  },
  {
    id: 'Love',
    value: 'Любовь',
  },
  {
    id: 'Friend',
    value: 'Дружба',
  },
  {
    id: 'Work',
    value: 'Единомышленники',
  },
]

export const lookingForValues = Object.fromEntries(
  lookingFor.map(v => [v.id, v.value]),
) as Record<Sociality, string>
