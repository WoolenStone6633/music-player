'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

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

  const clickHandler = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('id', songUri)
    router.replace(`${pathname}?${params}`)
  }

  return (
    <div className="flex mb-4 border-2 pr-2 rounded-2xl bg-gray-200" style={{ cursor: 'pointer' }} onClick={clickHandler}>
      <img src={imgUrl}></img>
      <div className="my-auto ml-2 text-left">
        <p>{title}</p>
        <p className="text-gray-500">{artistStr}</p>
      </div>
    </div>
  )
}