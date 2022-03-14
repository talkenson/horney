import { ProfileImage } from '@/components/inProfile/ProfileImage'
import { Button } from '@/ui/Button'
import { SlideButton } from '@/ui/SlideButton'
import {
  ArrowRightIcon,
  LoginIcon,
  PencilIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import { getRandomAge, getRandomName } from '@/utils/randomData'
import { useNavigate, Outlet } from 'react-router-dom'
import { Input } from 'rsuite'
import { useForm } from 'react-hook-form'
import { User } from '@/types'
import { useCallback } from 'react'
import backlyInstance from '@/services/backly'

export const Register = () => {
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

  const onSubmit = useCallback((data: Pick<User, 'email' | 'password'>) => {
    backlyInstance.auth
      .register(data)
      .then(r => {
        backlyInstance.auth
          .login(data)
          .then(r => {
            navigate('/')
          })
          .catch(e => {
            throw e
          })
      })
      .catch(e => {
        console.log(e)
        setError('email', { message: 'Неправильный адрес' })
      })
  }, [])

  return (
    <>
      <div className='flex flex-col items-center space-y-2 p-2'>
        <h2 className='font-fancy text-3xl'>Привет!</h2>
        <h4 className='font-fancy text-xl'>Давай знакомиться!</h4>
        <span
          className='font-sans text-blue-500 media-hover:hover:text-blue-600 cursor-pointer select-none'
          onClick={() => navigate('/auth')}
        >
          У меня есть аккаунт
        </span>
      </div>
      <form
        className='flex flex-col space-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          value={getValues('email')}
          onChange={s => setValue('email', s)}
          placeholder='E-mail'
          className='!rounded-xl'
          size='lg'
        />
        <Input
          value={getValues('password')}
          onChange={s => setValue('password', s)}
          type={'password'}
          placeholder='Пароль'
          className='!rounded-xl'
          size='lg'
        />
      </form>
      <SlideButton
        onClick={handleSubmit(onSubmit)}
        label='Присоединиться'
        icon={<PlusIcon className='w-5 h-5 text-white' />}
        subIcon={<ArrowRightIcon className='w-5 h-5 text-white' />}
        className='rounded-xl'
      />
      {errors.email?.message ? (
        <span className='text-rose-400 w-full text-center'>
          Произошла ошибочка, проверьте Ваш пароль, он должен быть надежным, а
          почта - только Вашей
        </span>
      ) : null}
    </>
  )
}
