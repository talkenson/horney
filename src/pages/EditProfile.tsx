import { TextArea } from '@/ui/TextArea'
import { Input } from '@/ui/Input'
import { InputSpaced } from '@/ui/InputSpaced'
import { Button } from '@/ui/Button'
import { CheckIcon, SaveIcon } from '@heroicons/react/outline'
import { Select } from '@/ui/Select'
import { zodiacSigns } from '@/domain/zodiacSigns'
import { useForm } from 'react-hook-form'
import { Profile, Sex, User } from '@/types'
import { relationStatus } from '@/domain/relationStatus'
import { frequency } from '@/domain/frequency'
import { useCallback } from 'react'

export const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Profile, string>()

  const onSubmit = useCallback((data: Partial<Profile>) => {
    console.log(data)
  }, [])

  return (
    <div className='flex flex-col space-y-4 p-2 pt-8 pb-[5rem]'>
      <h2 className='text-2xl w-full text-center text-gray-700 font-fancy'>
        Ваша анкета
      </h2>
      <form
        className='flex flex-col space-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputSpaced
          label='Ваше имя'
          id='name'
          required={true}
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <InputSpaced
          label='Возраст'
          id='age'
          type={'number'}
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <Select
          label='Знак зодиака'
          id='zodiac'
          options={zodiacSigns}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <Select
          label='Семейное положение'
          id='relationStatus'
          options={relationStatus(getValues('sex') === Sex.Male)}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <Select
          label='Курение'
          id='smoking'
          options={frequency}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <Select
          label='Алкоголь'
          id='drinking'
          options={frequency}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <TextArea
          label='Расскажите о себе'
          rows={8}
          id='desc'
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
        />
        <Button
          label='Сохранить'
          icon={<CheckIcon className='w-5 h-5 text-white stroke-1' />}
          className='!mt-5'
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  )
}

/*
name: string
  age: number
  desc: string
  active: boolean
  photos: string[]
  relationStatus?: RelationStatus | null
  smoking?: Frequency | null
  drinking?: Frequency | null
  zodiac?: Zodiac | null
  sociality?: Sociality | null
  height?: number | null
  lookingFor: LookingFor
 */
