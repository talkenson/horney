import { useMemo } from 'react'

interface StoryProgressProps {
  length?: number
  current?: number
}

export const StoryProgress = ({
  length = 1,
  current = 0,
}: StoryProgressProps) => {
  const mapped = useMemo(() => {
    return Array.from({ length: length }, (_, i) => i === current)
  }, [length, current])

  return (
    <div className='flex items-center h-1 space-x-1'>
      {mapped.map((v, i) => (
        <div
          key={i}
          className={`${
            v ? 'bg-white' : 'bg-white/40'
          } h-full w-full rounded-xl`}
        />
      ))}
    </div>
  )
}
