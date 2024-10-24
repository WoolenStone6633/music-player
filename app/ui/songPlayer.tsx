'use client'

import SpotifyPlayer from 'react-spotify-web-playback'

export default function SongPlayer ({ accessToken, trackUri}: { accessToken?: string, trackUri?: string}) {
  if (!accessToken) return null
  return <SpotifyPlayer
    token={accessToken}
    play={true}
    uris={trackUri ? [trackUri] : []}
  />
}