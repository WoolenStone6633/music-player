'use client'

import gsap from "gsap"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import SongCard from "./songCard"

type props = {
  imgUrl: string, 
  title: string, 
  artistStr: string, 
  songUri: string,
}

export default function SpotifySongCard({imgUrl, title, artistStr, songUri}: props) {
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
    } else if (searchParams.get('lo') == 'f' && bar.current) {
      if (searchParams.get('id') == songUri && bar.current.classList.contains('hidden')) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('lo', 't')
        router.replace(`${pathname}?${params}`)
      }
    }
  }, [searchParams])

  return (
    <SongCard imgUrl={imgUrl} title={title} artistStr={artistStr} background={background} bar={bar} clickHandler={clickHandler}/>
  )
}