import { useProfile } from '@/hooks/useProfile'
import { useRecoilValue } from 'recoil'
import { needSetupProfileStore } from '@/store/profile.store'
import { NeedCreateProfile } from '@/components/NeedCreateProfile'

const Person = () => {
  return (
    <div className='flex space-x-3'>
      <img
        src='https://i.picsum.photos/id/904/200/300.jpg?hmac=t7FNdMa1LwaLz0quPrFzXgqADg_jjQ4t7PuZeig7mY8'
        className='w-12 h-12 rounded-full'
      />
      <div className='flex flex-col'>
        <h2 className='text-lg font-bold'>Annet, 21</h2>
        <span className='text-gray-500 text-sm'>Match from 02/29/2022</span>
      </div>
    </div>
  )
}

export const LikesPage = () => {
  const needSetupProfile = useRecoilValue(needSetupProfileStore)

  return (
    <div className='flex flex-col space-y-4 '>
      {needSetupProfile ? (
        <NeedCreateProfile />
      ) : (
        <>
          <div className='flex items-center justify-between space-x-3'>
            <h2 className='text-3xl text-gray-700'>Likes</h2>
            <span className='text-xl text-gray-400'>23</span>
          </div>
          <div className='flex flex-col space-y-2'>
            <Person />
          </div>
        </>
      )}
    </div>
  )
}
