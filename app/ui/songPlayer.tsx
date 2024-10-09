'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function SongPlayer ({ accessToken, trackUri}: { accessToken: string, trackUri: string | undefined}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams.toString())
  params.delete('id')
  router.replace(`${pathname}?${params}`)

  if (!accessToken) return null
  return <SpotifyPlayer 
    token={accessToken}
    play={true}
    uris={trackUri ? [trackUri] : []}
  />
}