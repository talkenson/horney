import { CardContent } from './types/cardContent'
import Placeholder from '@/src/assets/img-placeholder.svg'
import { ImageGallery } from '@/components/inCard/ImageGallery'
import { useEffect, useState } from 'react'

export const CardContentBuilder = ({
  id,
  title,
  subtitle,
  desc,
  coverURL,
  photos,
}: CardContent) => {
  const [images] = useState<string[]>(
    photos ? photos?.map((v, i) => `${v}?id=${id}${i}`) : [],
  )

  /*useEffect(() => {
    images.forEach(image => {
      const newImage = new Image()
      newImage.src = image
    })
  }, [])*/

  return (
    <div className='relative w-full h-full flex flex-col justify-between rounded-xl'>
      <div className='w-full h-full rounded-xl overflow-hidden'>
        <ImageGallery images={images} />
      </div>
      <div className='absolute w-full bottom-0 left-0 py-3 px-3 rounded-b-xl flex flex-col space-y-1 select-none'>
        <span className='text-2xl text-white text-shadow-lg font-fancy'>
          {title}
        </span>
        <div className='text-sm text-white text-shadow-lg text-sha'>{desc}</div>
      </div>
    </div>
  )
}
