'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

type props = {
  imgUrl: string, 
  title: string, 
  artistStr: string, 
  songUri: string,
}

export default function SongCard( {imgUrl, title, artistStr, songUri}: props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const background = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    // starts the loading animation
    if (background.current && searchParams.get('id') != songUri) {
      background.current.classList.add('animate-pulse')
    }

    // sets the uri and the loading state to false
    const params = new URLSearchParams(searchParams.toString())
    params.set('id', songUri)
    params.set('lo', 'f')
    router.replace(`${pathname}?${params}`)
  }

  // stops the animatino when the song player sets the search param lo to a value of t (loading -> true)
  useEffect(() => {
    if (background.current && searchParams.get('lo') == 't' && searchParams.get('id') == songUri) {
      background.current.classList.remove('animate-pulse')
    }
  }, [searchParams])

  return (
    <div ref={background} className="flex mb-4 border-2 pr-2 rounded-2xl bg-gray-200 hover:bg-gray-300 hover:border-gray-300" style={{ cursor: 'pointer' }} onClick={clickHandler}>
      <img src={imgUrl}></img>
      <div className="my-auto ml-2 text-left">
        <p>{title}</p>
        <p className="text-gray-500">{artistStr}</p>
      </div>
    </div>
  )
}