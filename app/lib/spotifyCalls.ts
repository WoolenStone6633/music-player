"use server"

import { spotifyAuth } from "@/lib/oauth"
import { cookies } from "next/headers"
import { cache } from "react"
import { SpotifyTokens } from "arctic"

const SpotifyWebApi = require('spotify-web-api-node')


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID, 
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET, 
  redirectUri: process.env.REDIRECT_URI,
})

export const getSpotifyAccessToken = cache(
  async (): Promise<string | undefined > => {
    const token = cookies().get('jws')?.value.split(',')[0]
    if (!token) {
      return undefined
    }

    return token
  }
)

export const getSpotifyRefreshToken = cache(
  async (): Promise<string | null > => {
    const token = cookies().get('jws')?.value.split(',')[1]
    if (!token) {
      return null
    }

    return token
  }
)

export async function setSpotifyTokens (accessToken: string, refreshToken: string): Promise<void> {
  cookies().set('jws', `${accessToken},${refreshToken}`, {
    httpOnly: true,
    sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/"
  })
}

export async function refreshSpotifyAccessToken (refreshToken: string): Promise<SpotifyTokens> {
  return await spotifyAuth.refreshAccessToken(refreshToken)
}

// does not invalidate the token on spotify's end, only deletes it in the application
export async function deleteSpotifyToken (): Promise<void> {
  cookies().set('jws', '', {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
		path: "/"
	});
}

export async function setApiAccessToken (): Promise<void> {
  spotifyApi.setAccessToken(await getSpotifyAccessToken())
}

export async function setApiRefreshToken (): Promise<void> {
  spotifyApi.setRefreshToken(await getSpotifyRefreshToken())
}

// requests songs form the spotify api based on the query
export async function getSongs (query?: string[] | string): Promise<trackList | undefined> {
  try {
    await setApiAccessToken()
    const resTracks = await spotifyApi.searchTracks(`trask:${query}`, {limit: 13})
    const trackList = resTracks.body.tracks.items.map((track: track) => {
      return ({
        artistStr: track.artists.map((artist: artist, index: number) => {
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
    return undefined
  }
}

type trackList = {
  artistStr: string
  title: string
  uri: string
  albumUrl: string
}[]

type track = {
  artists: artist[]
  name: string
  uri: string
  album: {
    images: {
      url: string
    }[]
  }
}

type artist = {
  name: string
}