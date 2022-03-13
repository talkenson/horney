import {
  CollectionIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { SVGProps, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface NavbarOption {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  badgeKey: string
  link: string
}

const options: NavbarOption[] = [
  {
    icon: CollectionIcon,
    title: 'Explore',
    link: '/',
    badgeKey: 'explore',
  },
  {
    icon: HeartIcon,
    title: 'Likes',
    link: '/likes',
    badgeKey: 'likes',
  },
  {
    icon: UserCircleIcon,
    title: 'Me',
    link: '/me',
    badgeKey: 'me',
  },
]

const Option = ({
  icon: Icon,
  title,
  link,
  badgeKey,
  active,
}: NavbarOption & { active?: boolean }) => {
  const navigate = useNavigate()
  return (
    <div
      className='h-full aspect-square flex flex-col items-center justify-between space-y-1 px-1 py-1 cursor-pointer'
      onClick={() => {
        navigate(link)
      }}
    >
      <Icon
        className={`w-8 h-8 will-change-transform transition-transform  ${
          active
            ? 'stroke-[1.5px] text-violet-500 scale-110'
            : 'stroke-1 text-violet-400'
        }`}
      />
      <span
        className={`text-xs text-violet-500 ${active ? 'font-bold' : 'font'}`}
      >
        {title}
      </span>
    </div>
  )
}

export const Navbar = () => {
  const location = useLocation()

  const section = useMemo(
    () => '/' + location.pathname.split('/')[1],
    [location.pathname],
  )

  useEffect(() => {
    console.log(section)
  }, [section])

  return (
    <div className='fixed bottom-0 left-0 w-full h-[4rem] bg-white shadow-up px-1 py-1 flex justify-around items-center items-center'>
      {options.map(v => (
        <Option key={v.badgeKey} {...v} active={section === v.link} />
      ))}
    </div>
  )
}
