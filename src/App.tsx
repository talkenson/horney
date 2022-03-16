import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@/ui/Navbar'
import { useRecoilValue } from 'recoil'
import { cardsStore } from '@/store/cards.store'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
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
    <div className='w-full h-[calc(100vh-env(safe-area-inset-bottom))] flex flex-col items-center overflow-x-hidden'>
      <div className='h-[calc(100%-4rem)] w-full mx-auto flex flex-col space-y-2 p-4 max-w-[56.25vh]'>
        <div className='w-full flex flex-col items-center'>
          <h1 className='font-display text-4xl text-violet-500'>Horney</h1>
        </div>
        <Outlet />
        <Navbar />
      </div>
    </div>
  )
}

export default App
