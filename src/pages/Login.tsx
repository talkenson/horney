import { SlideButton } from '@/ui/SlideButton'
import { ArrowRightIcon, LoginIcon, PencilIcon } from '@heroicons/react/outline'
import { useNavigate, Outlet } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User } from '@/types'
import { useCallback } from 'react'
import { Input } from '@/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Pick<User, 'email' | 'password'>, string>()

  const { login } = useAuth()

  const onSubmit = useCallback((data: Pick<User, 'email' | 'password'>) => {
    login(data)
      .then(r => {
        console.log(r)
        navigate('/')
      })
      .catch(e => {
        console.log(e)
        setError('email', { message: 'Неправильный адрес' })
      })
  }, [])

  return (
    <>
      <div className='flex flex-col items-center space-y-2 p-2'>
        <h2 className='font-fancy text-3xl text-center'>Привет!</h2>
        <h4 className='font-fancy text-xl text-center'>
          Нужно войти, чтобы продолжить
        </h4>
        <span
          className='font-sans text-blue-500 media-hover:hover:text-blue-600 cursor-pointer select-none'
          onClick={() => navigate('register')}
        >
          Я еще не зарегистрирован
        </span>
      </div>
      <form
        className='flex flex-col space-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          value={getValues().email}
          onChange={e => setValue('email', e.currentTarget.value)}
          label='E-mail'
          className='!rounded-xl'
        />
        <Input
          value={getValues().password}
          onChange={e => setValue('password', e.currentTarget.value)}
          type={'password'}
          label='Пароль'
          className='!rounded-xl'
        />
        <SlideButton
          onClick={handleSubmit(onSubmit)}
          label='Войти'
          icon={<LoginIcon className='w-5 h-5 text-white stroke-1' />}
          subIcon={<ArrowRightIcon className='w-5 h-5 text-white stroke-1' />}
          className='rounded-xl !mt-6'
        />
      </form>
      {errors.email?.message ? (
        <span className='text-rose-400 w-full text-center'>
          Неправильные данные, попробуйте еще раз
        </span>
      ) : null}
    </>
  )
}
