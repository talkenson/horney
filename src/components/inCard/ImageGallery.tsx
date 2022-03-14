import { ReactComponent as Placeholder } from '@/assets/img-placeholder.svg'
import { StoryProgress } from '@/components/inCard/StoryProgress'
import { useCallback, useMemo, useState } from 'react'
import { OneImagePresenter } from '@/components/inCard/OneImagePresenter'

export interface ImageGallery {
  images: string[]
  className?: string
}

export const ImageGallery = ({ images, className }: ImageGallery) => {
  const [current, setCurrent] = useState(0)

  const total = useMemo(() => images.length, [images])

  const prevImage = useCallback(
    () => setCurrent(c => (c > 0 ? c - 1 : total - 1)),
    [total],
  )
  const nextImage = useCallback(
    () => setCurrent(c => (c < total - 1 ? c + 1 : 0)),
    [total],
  )

  return (
    <div className={`${className || ''} w-full h-full aspect-[9/16]`}>
      <div className='relative h-full w-full shadow-vignette'>
        {total ? (
          <OneImagePresenter source={images[current]} />
        ) : (
          <Placeholder className='w-full h-full' />
        )}
      </div>

      {total > 1 ? (
        <div className='absolute w-full top-4 transform left-1/2 -translate-x-1/2 w-[90%]'>
          <StoryProgress length={total} current={current} />
        </div>
      ) : null}
      <div className='absolute w-full top-5 h-[calc(100%-2rem)] flex justify-between'>
        <div className='w-full h-full' onClick={prevImage} />
        <div className='w-full h-full' onClick={nextImage} />
      </div>
    </div>
  )
}
