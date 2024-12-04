'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import SongCard from "./songCard"

type props = {
  imgUrl: string,
  title: string,
  artistStr: string,
  songLink: string,
}

export default function DownloadedSongCard({imgUrl, title, artistStr, songLink}: props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const background = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('id', songLink)
    router.replace(`${pathname}?${params}`)
  }

  useEffect(() => {
    if (background.current) {
      if (searchParams.get('id') == songLink) {
        background.current.style.backgroundColor = '#cbd5e1'
        console.log('ran')
      } else {
        background.current.style.backgroundColor = 'transparent'
      }
    }
    
  }, [searchParams])

  return (
    <SongCard imgUrl={imgUrl} title={title} artistStr={artistStr} background={background} bar={bar} clickHandler={clickHandler}/>
  )
}