import { SelectOption } from '@/ui/Select'
import { Zodiac } from '@/types'

export const zodiacSigns: SelectOption[] = [
  {
    id: 'NotStated',
    value: 'Не указан',
  },
  {
    id: 'Aries',
    value: 'Овен',
  },
  {
    id: 'Taurus',
    value: 'Телец',
  },
  {
    id: 'Gemini',
    value: 'Близнецы',
  },
  {
    id: 'Cancer',
    value: 'Рак',
  },
  {
    id: 'Leo',
    value: 'Лев',
  },
  {
    id: 'Virgo',
    value: 'Дева',
  },
  {
    id: 'Libra',
    value: 'Весы',
  },
  {
    id: 'Scorpio',
    value: 'Скорпион',
  },
  {
    id: 'Sagittarius',
    value: 'Стрелец',
  },
  {
    id: 'Capricorn',
    value: 'Козерог',
  },
  {
    id: 'Aquarius',
    value: 'Водолей',
  },
  {
    id: 'Pisces',
    value: 'Рыбы',
  },
]

export const zodiacValues = Object.fromEntries(
  zodiacSigns.map(v => [v.id, v.value]),
) as Record<Zodiac, string>
