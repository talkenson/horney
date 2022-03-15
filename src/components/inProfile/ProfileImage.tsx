import { useEffect, useLayoutEffect, useState } from 'react'
import { ImageUrl } from '@/components/types/cardContent'
import { Loader } from '@/ui/Loader'

export const ProfileImage = ({
  source,
  className,
}: {
  source: ImageUrl
  className?: string
}) => {
  const [ready, setReady] = useState<boolean>(false)
  const [img] = useState(new Image())

  useEffect(() => {
    img.onload = () => {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    setReady(false)
    img.src = source // by setting an src, you trigger browser download
  }, [source])

  /*useEffect(() => {
    console.log('ready?', ready, 'source?', source)
  }, [ready, source])*/

  return ready ? (
    <img
      src={source}
      className={`${
        className || ''
      } rounded-full w-40 h-40 absolute select-none relative text-violet-300 fill-amber-400`}
      draggable={false}
    />
  ) : (
    <div
      className={`${className} rounded-full w-40 h-40 absolute select-none relative border-2 border-dashed border-gray-700 bg-white flex flex-col items-center justify-center`}
    >
      <Loader />
    </div>
  )
}
