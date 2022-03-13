import { CardContent } from './types/cardContent'

export const CardContentBuilder = ({
  id,
  title,
  subtitle,
  desc,
  coverURL,
}: CardContent) => {
  return (
    <div className='relative w-full h-full flex flex-col justify-between rounded-xl'>
      <div className='imagePlaceholder w-full h-full rounded-xl overflow-hidden'>
        <img
          src={coverURL + `?id=${id}`}
          className='select-none w-full h-full'
        />
      </div>
      <div className='absolute w-full bottom-0 left-0 p-2 bg-white/50 rounded-b-xl'>
        <span className='text-2xl'>{title}</span>
        <div>{subtitle}</div>
      </div>
    </div>
  )
}
