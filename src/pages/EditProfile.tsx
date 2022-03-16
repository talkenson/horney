import { TextArea } from '@/ui/TextArea'
import { InputSpaced } from '@/ui/InputSpaced'
import { Button } from '@/ui/Button'
import { CheckIcon } from '@heroicons/react/outline'
import { Select } from '@/ui/Select'
import { zodiacSigns } from '@/domain/zodiacSigns'
import { useForm } from 'react-hook-form'
import { Profile, Sex, Sociality, User } from '@/types'
import { relationStatus } from '@/domain/relationStatus'
import { frequency } from '@/domain/frequency'
import { useCallback, useEffect, useState } from 'react'
import { sex } from '@/domain/sex'
import { sociality as socialityOptions } from '@/domain/sociality'
import { lookingFor } from '@/domain/lookingFor'
import { useProfile } from '@/hooks/useProfile'
import { profileStore } from '@/store/profile.store'

const defaultProfile: Partial<Profile> = {
  sex: Sex.Male,
}

export const EditProfile = () => {
  const { profile, update } = useProfile()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Profile, string>({
    defaultValues: {
      ...defaultProfile,
      ...profile,
    },
  })

  useEffect(() => {
    console.log(profile)
  }, [profile])

  const [gender, setGender] = useState<Sex>(Sex.Male) // change to current user info
  const [sociality, setSociality] = useState<Sociality>(Sociality.Ambivert) // change to current user info

  const changeGender = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.currentTarget.selectedOptions.item(0)?.value)
      setValue('sex', e.currentTarget.value as Sex)
      setGender(e.currentTarget.value as Sex)
    },
    [],
  )

  const changeSociality = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.currentTarget.selectedOptions.item(0)?.value)
      setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
      setSociality(e.currentTarget.value as Sociality)
    },
    [],
  )

  const onSubmit = useCallback(
    (data: Profile) => {
      console.log(data)
      update(data)
    },
    [update],
  )

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
          value={getValues('name')}
        />
        <InputSpaced
          label='Возраст'
          id='age'
          type={'number'}
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('age')}
        />
        <InputSpaced
          label='Рост'
          id='height'
          type={'number'}
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('height') ?? undefined}
        />
        <Select label='Пол' id='sex' options={sex} onChange={changeGender} />
        <Select
          label='Что вы ищете?'
          id='lookingFor'
          options={lookingFor}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('lookingFor')}
        />
        <Select
          label='Знак зодиака'
          id='zodiac'
          options={zodiacSigns}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('zodiac') ?? undefined}
        />
        <Select
          label='Семейное положение'
          id='relationStatus'
          options={relationStatus(gender === Sex.Male)}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('relationStatus') ?? undefined}
        />
        <Select
          label='Курение'
          id='smoking'
          options={frequency}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('smoking') ?? undefined}
        />
        <Select
          label='Алкоголь'
          id='drinking'
          options={frequency}
          onChange={e => {
            console.log(e.currentTarget.selectedOptions.item(0)?.value)
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('drinking') ?? undefined}
        />
        <Select
          label='Тип личности'
          id='sociality'
          options={socialityOptions}
          onChange={changeSociality}
          value={getValues('sociality') ?? undefined}
        />
        <TextArea
          label={`Расскажите о себе ${
            sociality === Sociality.Introvert
              ? 'хоть чуть-чуть...'
              : sociality === Sociality.Extravert
              ? 'как можно больше!'
              : ''
          }`}
          rows={8}
          id='desc'
          onChange={e => {
            setValue(e.currentTarget.id as keyof Profile, e.currentTarget.value)
          }}
          value={getValues('desc') ?? undefined}
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
name: string =
  age: number=
  desc: string =
  active: boolean
  photos: string[]
  relationStatus?: RelationStatus | null =
  smoking?: Frequency | null =
  drinking?: Frequency | null =
  zodiac?: Zodiac | null =
  sociality?: Sociality | null
  height?: number | null =
  lookingFor: LookingFor
 */
