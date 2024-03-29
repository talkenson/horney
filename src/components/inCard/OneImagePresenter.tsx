import { useEffect, useLayoutEffect, useState } from 'react'
import { ImageUrl } from '@/components/types/cardContent'
import { Loader } from '@/ui/Loader'

export const OneImagePresenter = ({
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
      className={`w-full h-full ${
        className || ''
      } absolute select-none relative text-violet-300 fill-amber-400`}
      draggable={false}
    />
  ) : (
    <div
      className={`w-full h-full ${className} absolute select-none relative outline outline-dashed outline-black bg-white flex flex-col items-center justify-center`}
    >
      <Loader />
    </div>
  )
}
