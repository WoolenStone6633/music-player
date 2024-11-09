'use client'

import { useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import refreshAccessToken from '../lib/refreshAccessToken'

type props = {
  accessToken?: string, 
  trackUri?: string,
}

export default function SongPlayer ({ accessToken, trackUri}: props) {
  if (!accessToken) return null

  // refreshes the spotify access token
  useEffect(() => {
    const baseUrl = window.location.origin
    if (baseUrl) {
      refreshAccessToken(baseUrl)
    }
  }, [trackUri])

  return <SpotifyPlayer
    token={accessToken}
    play={true}
    uris={trackUri ? [trackUri] : []}
  />
}