import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { Card, CardProps } from './Card'
import { CardContent } from './types/cardContent'
import { CardContentBuilder } from './CardContentBuilder'
import {
  getRandomAge,
  getRandomName,
  getRandomPhotos,
} from '@/utils/randomData'
import { cardsStore } from '@/store/cards.store'
import { useRecoilState } from 'recoil'
import { Like } from '@/components/opinionBadges/Like'
import { Skip } from '@/components/opinionBadges/Skip'

const createRandomCards = (count: number): CardContent[] => {
  return Array.from({ length: count }, () => ({
    id: Math.floor(Math.random() * 2000),
    title: getRandomName() + ', ' + getRandomAge(),
    coverURL: getRandomPhotos(1)[0],
    photos: getRandomPhotos(Math.round(Math.random() * 8)),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  }))
}

type Sizes = Pick<DOMRect, 'height' | 'width'>

enum Opinion {
  Like,
  Skip,
  NA,
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -2,
  scale: 1,
  rot: -1 + Math.random() * 2,
  delay: i * 100,
  xDir: 0,
  opacity: 1,
})
const from = (_i: number) => ({
  x: 0,
  rot: 0,
  scale: 0.5,
  y: -1000,
  opacity: 0,
  xDir: 0,
})
// This is being used down there in the view, it interpolates rotation and scale into a css transform

export const CardDeck = () => {
  const [cards, setCards] = useRecoilState(cardsStore)
  const [loading, setLoading] = useState<boolean>(true)
  const [opinion, setOpinion] = useState<Opinion>(Opinion.NA)

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  //const [gone, setGone] = useState<number[]>([])
  const [props, api] = useSprings(cards.length, (i, v) => {
    return {
      ...to(i),
      from: from(i),
      cardId: cards[i].id,
    }
  }) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args,
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
      target,
    }) => {
      const index = args[0]
      //console.log((target as HTMLDivElement).id, args, mx, 'gone', gone)
      const trigger =
        vx > 2 ||
        (vx > 0.15 && Math.abs(mx) > 100 && xDir === Math.sign(mx)) ||
        (vx > 0.1 && Math.abs(mx) > 230 && xDir === Math.sign(mx)) // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) {
        //setGone(a => [...a.filter(v => v !== index), index])
        gone.add(index)
        setTimeout(() => {
          setCards(v => v.filter(c => c.id !== index))
        }, 1000)
        setTimeout(() => {
          setOpinion(Opinion.NA)
        }, 100)
      } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i, ctrl) => {
        if (index !== cards[i].id) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        if (isGone) {
          api.delete(ctrl)
          setOpinion(Opinion.NA)
        }
        //const isGone = gone.includes(index)
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero

        setOpinion(
          Math.abs(x) > 30
            ? x > 30
              ? Opinion.Like
              : Opinion.Skip
            : Opinion.NA,
        )
        const rot = 0 //mx / 100 + (isGone ? xDir * 5 * Math.max(vx, 0.1) : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.05 : 1 // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
          xDir: xDir,
          opacity: 1,
        }
      })
    },
  )

  useEffect(() => {
    if (!cards.length) {
      setLoading(true)
      setCards(v => [...createRandomCards(3), ...v])
      gone.clear()
      setLoading(false)
    }
    //setTimeout(() => setCards(v => v.filter((_, i) => i !== index)), 1000)
  }, [cards])

  useEffect(() => {
    return () => {
      gone.clear()
    }
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  const [sizes, setSizes] = useState<{ [k in keyof Sizes]: string }>({
    height: '0px',
    width: '0px',
  })
  const [containerSizes, setContainerSizes] = useState<{
    [k in keyof Sizes]: string
  }>({
    height: '0px',
    width: '0px',
  })

  const calcRatio = useCallback(() => {
    const rect: Sizes = ref.current?.getBoundingClientRect() || {
      height: 0,
      width: window.innerWidth,
    }
    const normalWidth = Math.min(rect.width, (rect.height / 16) * 9) * 0.95
    console.log(
      rect.width,
      rect.height,
      'reduced hw',
      (rect.height / 16) * 9,
      normalWidth,
    )
    setSizes({
      height: `${(normalWidth / 9) * 16}px`,
      width: `${normalWidth}px`,
    })
    setContainerSizes({
      height: `${(normalWidth / 9) * 16}px`,
      width: `${normalWidth}px`,
    })
  }, [])

  useLayoutEffect(() => {
    calcRatio()
    window.addEventListener('resize', calcRatio)
    return () => {
      window.removeEventListener('resize', calcRatio)
    }
  }, [calcRatio])

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className='relative h-full w-full' ref={ref}>
      <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full text-center animate-pulse text-gray-700 font-fancy'>
        {loading ? 'Ищем ещё...' : 'Скоро найдем ещё'}
      </span>
      <div
        className='relative mx-auto w-fit h-full my-safe'
        style={containerSizes}
      >
        {props.map((spring, i) => (
          <Card
            key={cards[i].id}
            id={cards[i].id}
            {...spring}
            binded={bind(cards[i].id)}
            className='shadow-xl rounded-2xl'
            styles={sizes}
          >
            <CardContentBuilder {...cards[i]} />
          </Card>
        ))}
      </div>
      <div className='absolute top-1/2 w-full h-30'>
        {opinion === Opinion.Like ? (
          <Like />
        ) : opinion === Opinion.Skip ? (
          <Skip />
        ) : null}
      </div>
    </div>
  )
}
