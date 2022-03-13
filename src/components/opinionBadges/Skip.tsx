import { OpinionBadgeBase } from '@/components/opinionBadges/OpinionBadgeBase'
import { ChevronDoubleLeftIcon, ThumbUpIcon } from '@heroicons/react/outline'

export const Skip = () => {
  return (
    <OpinionBadgeBase className='absolute bg-rose-400 -left-[12%]'>
      <ChevronDoubleLeftIcon className='w-8 h-8 text-white' />
    </OpinionBadgeBase>
  )
}
