import { Outlet } from 'react-router-dom'
import { Navbar } from '@/ui/Navbar'
import { useRecoilValue } from 'recoil'
import { cardsStore } from '@/store/cards.store'
import { useEffect } from 'react'

const App = () => {
  const value = useRecoilValue(cardsStore)

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <div className='w-full h-full flex flex-col items-center overflow-x-hidden'>
      <div className='h-screen w-full mx-auto flex flex-col space-y-2 p-4 max-w-[56.25vh]'>
        <div className='w-full flex flex-col items-center'>
          <h1 className='font-display text-4xl text-violet-400'>Horney</h1>
        </div>
        <Outlet />
        <Navbar />
      </div>
    </div>
  )
}

export default App
