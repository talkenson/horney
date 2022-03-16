import { SelectOption } from '@/ui/Select'
import { Sociality } from '@/types'

export const sociality: SelectOption[] = [
  {
    id: 'NotStated',
    value: 'Не указан',
  },
  {
    id: 'Introvert',
    value: 'Интроверт',
  },
  {
    id: 'Ambivert',
    value: 'Амбиверт',
  },
  {
    id: 'Extravert',
    value: 'Экстраверт',
  },
]

export const socialityValues = Object.fromEntries(
  sociality.map(v => [v.id, v.value]),
) as Record<Sociality, string>
