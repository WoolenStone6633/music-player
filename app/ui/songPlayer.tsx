'use client'

import { useEffect } from 'react'
import SpotifyWebPlayer, { CallbackState } from 'react-spotify-web-playback'
import refreshAccessToken from '../lib/refreshAccessToken'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type props = {
  accessToken?: string, 
  trackUri?: string,
}

export default function SongPlayer ({ accessToken, trackUri}: props) {
  if (!accessToken) return null
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleCallback = ({type}: CallbackState) => {
    // checks to see if track being played has changed
    if (type == 'track_update') {
      // sets loading parm to true, meaning player has loaded and playing the song
      const params = new URLSearchParams(searchParams.toString())
      params.set('lo', 't')
      router.replace(`${pathname}?${params}`)
    }
  }

  // refreshes the spotify access token
  useEffect(() => {
    const baseUrl = window.location.origin
    if (baseUrl) {
      refreshAccessToken(baseUrl)
    }
  }, [trackUri])

  return <SpotifyWebPlayer
    token={accessToken}
    play={true}
    uris={trackUri ? [trackUri] : []}
    // initialVolume={0.5}
    initialVolume={0.01}
    callback={handleCallback}
  />
}