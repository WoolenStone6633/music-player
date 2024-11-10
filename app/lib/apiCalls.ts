"use server"

import { spotifyAuth } from "@/lib/oauth"
import { cookies } from "next/headers"

const SpotifyWebApi = require('spotify-web-api-node')


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID, 
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET, 
  redirectUri: process.env.REDIRECT_URI,
})

export async function getSpotifyAccessToken () {
  return cookies().get('jws')?.value.split(',')[0]
}

export async function getSpotifyRefreshToken () {
  return cookies().get('jws')?.value.split(',')[1]
}

export async function setSpotifyTokens (accessToken: string, refreshToken: string) {
  cookies().set('jws', `${accessToken},${refreshToken}`, {
    httpOnly: true,
    maxAge: 60 * 10,
  })
}

export async function setApiAccessToken () {
  spotifyApi.setAccessToken(await getSpotifyAccessToken())
}

export async function setApiRefreshToken () {
  spotifyApi.setRefreshToken(await getSpotifyRefreshToken())
}

export async function refreshApiAccessToken (refreshToken: string) {
  return await spotifyAuth.refreshAccessToken(refreshToken)
}

// requests songs form the spotify api based on the query
export async function getSongs (query?: string[] | string) {
  try {
    await setApiAccessToken()
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
  } catch (e) {
    if (e instanceof Error)
      console.log('There was an error with getting the songs: ' + e.message)
    return false
  }
}