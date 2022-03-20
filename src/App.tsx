import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@/ui/Navbar'
import { useRecoilValue } from 'recoil'
import { cardsStore } from '@/store/cards.store'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { ReactComponent as Logo } from '@/assets/aestet.svg'
import auth from '@feathersjs/authentication-client'

const App = () => {
  const value = useRecoilValue(cardsStore)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, authenticated } = useAuth(true)
  const { profile, neededSetup } = useProfile(true)

  useEffect(() => {
    console.log('auth', authenticated)
  }, [authenticated])

  useEffect(() => {
    if (!authenticated) {
      if (location.pathname.split('/')[1] !== 'auth') {
        navigate('/auth')
      }
    } else {
    }
  }, [location.pathname, authenticated])

  useEffect(() => {
    if (authenticated && neededSetup) {
      navigate('/me')
    }
  }, [authenticated, neededSetup])

  return (
    <div className='w-full h-full flex flex-col overflow-x-hidden'>
      <div className='w-full h-[calc(100%-env(safe-area-inset-bottom))] mx-auto flex flex-col space-y-2 p-3 max-w-lg'>
        <div className='w-full'>
          <Logo className='mx-auto text-violet-500 h-16' />
        </div>
        <Outlet />
      </div>
      <Navbar />
    </div>
  )
}

export default App
