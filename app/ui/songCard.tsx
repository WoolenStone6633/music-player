'use client'

import gsap from "gsap"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

type props = {
  imgUrl: string, 
  title: string, 
  artistStr: string, 
  songUri: string,
}

export default function SongCard({imgUrl, title, artistStr, songUri}: props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const background = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    // starts the loading animation for single card
    if (background.current && searchParams.get('id') != songUri && bar.current) {
      bar.current.classList.remove('hidden')
      gsap.fromTo(bar.current, {
        x: -(bar.current.clientWidth + 10),
      }, {
        duration: 1.2,
        x: (background.current.clientWidth + 10) /*- bar.current?.clientWidth*/,
        ease: 'none',
        repeat: 10,
      })
    }

    // sets the uri and the loading state to false
    const params = new URLSearchParams(searchParams.toString())
    params.set('id', songUri)
    params.set('lo', 'f')
    router.replace(`${pathname}?${params}`)
  }

  // stops all the loading animations when the song player sets the search param lo to a value of t (loading -> true)
  useEffect(() => {
    if (background.current && searchParams.get('lo') == 't' && bar.current) {
      if (!bar.current.classList.contains('hidden')) {
        bar.current.classList.add('animate-fade-out')
        setTimeout(() => {
          if (bar.current) {
            bar.current.classList.add('hidden')
            bar.current.classList.remove('animate-fade-out')
          }
        }, 120)
      }
    }
  }, [searchParams])

  return (
    <div ref={background} className="relative flex contain-paint mb-4 border-2 pr-2 rounded-2xl bg-gray-200 transition ease-out duration-100 hover:bg-gray-300 hover:border-gray-300" style={{ cursor: 'pointer' }} onClick={clickHandler}>
      <div ref={bar} className="hidden absolute h-full w-72 rounded-3x1 blur-md overflow- bg-gray-50 opacity-50"/>
      <img src={imgUrl}></img>
      <div className="my-auto ml-2 text-left">
        <p>{title}</p>
        <p className="text-gray-500">{artistStr}</p>
      </div>
    </div>
  )
}