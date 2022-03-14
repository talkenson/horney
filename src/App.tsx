import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@/ui/Navbar'
import { useRecoilValue } from 'recoil'
import { cardsStore } from '@/store/cards.store'
import { useEffect } from 'react'
import backly from '@/services/backly'

const App = () => {
  const value = useRecoilValue(cardsStore)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(value)
  }, [value])

  useEffect(() => {
    if (!backly.auth.state && location.pathname.split('/')[1] !== 'auth') {
      navigate('/auth')
    }
  }, [location.pathname])

  return (
    <div className='w-full h-full flex flex-col items-center overflow-x-hidden'>
      <div className='h-[calc(100vh-4rem)] w-full mx-auto flex flex-col space-y-2 p-4 max-w-[56.25vh]'>
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
