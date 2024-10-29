'use client'

import SpotifyPlayer from 'react-spotify-web-playback'

type props = {
  accessToken?: string, 
  trackUri?: string,
}

export default function SongPlayer ({ accessToken, trackUri}: props) {
  if (!accessToken) return null
  return <SpotifyPlayer
    token={accessToken}
    play={true}
    uris={trackUri ? [trackUri] : []}
  />
}