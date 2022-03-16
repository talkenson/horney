import { CardDeck } from '@/components/CardDeck'
import { useRecoilValue } from 'recoil'
import { needSetupProfileStore } from '@/store/profile.store'
import { NeedCreateProfile } from '@/components/NeedCreateProfile'

export const Investigate = () => {
  const needSetupProfile = useRecoilValue(needSetupProfileStore)

  return (
    <div className='w-full flex flex-col items-center'>
      {needSetupProfile ? <NeedCreateProfile /> : <CardDeck />}
    </div>
  )
}
