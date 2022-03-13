import { animated, SpringValue } from '@react-spring/web'
import React, { FC } from 'react'
import { to as interpolate } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react'

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 20
  }deg) rotateZ(${r}deg) scale(${s})`

export interface CardProps {
  binded: ReactDOMAttributes
  x: SpringValue<number>
  y: SpringValue<number>
  rot: SpringValue<number>
  scale: SpringValue<number>
  opacity: SpringValue<number>
  className?: string
  id: number
  xDir: SpringValue<number>
}

export const Card: FC<CardProps> = ({
  className,
  id,
  binded,
  x,
  y,
  rot,
  opacity,
  scale,
  children,
  xDir,
}) => {
  return (
    <animated.div
      className='absolute w-full h-full will-change-transform flex items-center justify-center'
      style={{ x, y }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...binded}
        id={id.toString(10)}
        style={{
          transform: interpolate([rot, scale], trans),
          opacity: opacity,
        }}
        className={`${
          className || ''
        } bg-white relative touch-none will-change-transform p-2 ring-1 ring-gray-200`}
      >
        <>{children}</>
      </animated.div>
    </animated.div>
  )
}
