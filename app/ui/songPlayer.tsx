'use client'

import SpotifyPlayer from 'react-spotify-web-playback'

export default function SongPlayer ({ accessToken, trackUri }: { accessToken: string | undefined, trackUri: string }) {
  if (!accessToken) return null
  return <SpotifyPlayer 
    token={accessToken}
    uris={trackUri ? [trackUri] : []}
  />
}