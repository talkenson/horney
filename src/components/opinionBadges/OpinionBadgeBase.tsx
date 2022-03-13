import React, { FC } from 'react'

export const OpinionBadgeBase: FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`${
        className || ''
      } h-16 w-16 rounded-full shadow-xl ring-1 ring-gray-600/30 flex items-center justify-center animation-appear`}
    >
      {children}
    </div>
  )
}
