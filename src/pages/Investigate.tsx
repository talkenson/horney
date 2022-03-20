import { CardDeck } from '@/components/CardDeck'
import { useRecoilValue } from 'recoil'
import { needSetupProfileStore } from '@/store/profile.store'
import { NeedCreateProfile } from '@/components/NeedCreateProfile'

export const Investigate = () => {
  const needSetupProfile = useRecoilValue(needSetupProfileStore)

  return (
    <div className='w-full h-fit grow flex flex-col items-center justify-start bg-red-200 overflow-y-hidden'>
      {needSetupProfile ? <NeedCreateProfile /> : <CardDeck />}
    </div>
  )
}
