'use server'

import { cookies } from "next/headers";
import { spotifyAuth } from "@/lib/auth";
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID, 
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET, 
  redirectUri: process.env.REDIRECT_URI,
})

export async function getSongs (query: string[] | string | undefined) {
  const refreshToken = cookies().get('RT')?.value
  const accessToken = refreshToken ? (await spotifyAuth.refreshAccessToken(refreshToken)).accessToken : 'error'

  if (accessToken !== 'error') {
    spotifyApi.setAccessToken(accessToken)
    
    const resTracks = await spotifyApi.searchTracks(`trask:${query}`, {limit: 13})
    const trackList = resTracks.body.tracks.items.map((track: any) => {
      return ({
        artist: track.artists.map((artist: any, index: number) => {
          return (index ? ', ' : '') + artist.name
        }),
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[track.album.images.length - 1].url
      })
    })

    return trackList
  } else {
    return false
  }
}

export async function getCurrentTrack(uri: string) {
  return uri
}