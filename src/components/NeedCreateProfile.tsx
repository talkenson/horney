import { SlideButton } from '@/ui/SlideButton'
import { ArrowRightIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

export const NeedCreateProfile = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full flex flex-col space-y-1 items-center justify-center py-20'>
      <span className='text-3xl font-fancy text-center'>Согласись,</span>
      <span className='text-xl font-fancy text-center '>
        будет нечестно, если тебя не смогут лайкнуть в ответ, так что создай
        профиль прямо сейчас!
      </span>
      <SlideButton
        label='Создать'
        icon={<DocumentTextIcon className='w-5 h-5 stroke-1 text-white' />}
        subIcon={<ArrowRightIcon className='w-5 h-5 stroke-1 text-white' />}
        onClick={() => navigate('/me/edit')}
        className='!mt-8 w-full'
      />
    </div>
  )
}
