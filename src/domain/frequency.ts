import { SelectOption } from '@/ui/Select'
import { Frequency, RelationStatus } from '@/types'
import { relationStatus } from '@/domain/relationStatus'

export const frequency: SelectOption[] = [
  {
    id: 'NotStated',
    value: 'Не указано',
  },
  {
    id: 'No',
    value: 'Никогда',
  },
  {
    id: 'NotMuch',
    value: 'Чуть-чуть',
  },
  {
    id: 'Sometimes',
    value: 'Бывает',
  },
  {
    id: 'Often',
    value: 'Часто',
  },
  {
    id: 'Usually',
    value: 'Постоянно',
  },
]

export const frequencyValues = Object.fromEntries(
  frequency.map(v => [v.id, v.value]),
) as Record<Frequency, string>
