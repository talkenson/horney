import { SelectOption } from '@/ui/Select'
import { Sex } from '@/types'

export const sex: SelectOption[] = [
  {
    id: 'Male',
    value: 'Парень',
  },
  {
    id: 'Female',
    value: 'Девушка',
  },
  /* {
    id: 'Helicopter',
    value: 'Ебучий ветролёт',
  },*/
]

export const sexValues = Object.fromEntries(
  sex.map(v => [v.id, v.value]),
) as Record<Sex, string>
