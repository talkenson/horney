import { animated, SpringValue } from '@react-spring/web'
import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { to as interpolate } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react'

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(8deg) rotateY(${
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
  styles: { height?: string; width?: string }
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
  styles,
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
          ...styles,
        }}
        className={`${
          className || ''
        } bg-white relative touch-none will-change-transform p-2 ring-1 ring-gray-200 min-w-[12rem] min-h-[21.5rem]`}
      >
        <>{children}</>
      </animated.div>
    </animated.div>
  )
}
