import { ProfileImage } from '@/components/inProfile/ProfileImage'
import { Button } from '@/ui/Button'
import { SlideButton } from '@/ui/SlideButton'
import { PencilIcon } from '@heroicons/react/outline'
import { getRandomAge, getRandomName } from '@/utils/randomData'
import { useNavigate, Outlet } from 'react-router-dom'

export const Auth = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col space-y-4 p-2 pt-10'>
      <Outlet />
    </div>
  )
}
