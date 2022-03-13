import { OpinionBadgeBase } from '@/components/opinionBadges/OpinionBadgeBase'
import { ThumbUpIcon } from '@heroicons/react/outline'

export const Like = () => {
  return (
    <OpinionBadgeBase className='absolute bg-blue-400 -right-[12%]'>
      <ThumbUpIcon className='w-8 h-8 text-white' />
    </OpinionBadgeBase>
  )
}
