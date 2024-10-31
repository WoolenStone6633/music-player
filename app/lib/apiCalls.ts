"use server"

import { spotifyAuth } from "@/lib/auth"
import { cookies } from "next/headers"

const SpotifyWebApi = require('spotify-web-api-node')


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID, 
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET, 
  redirectUri: process.env.REDIRECT_URI,
})

export async function getAccessToken () {
  return cookies().get('jws')?.value.split(',')[0]
}

export async function getRefreshToken () {
  return cookies().get('jws')?.value.split(',')[1]
}

export async function setApiAccessToken () {
  spotifyApi.setAccessToken(await getAccessToken())
}

export async function setApiRefreshToken () {
  spotifyApi.setRefreshToken(await getRefreshToken())
}

export async function refreshAccessToken () {
  const refreshToken = await getRefreshToken()
  try {
    if (refreshToken) {
      const tokens = await spotifyAuth.refreshAccessToken(refreshToken)
      if (tokens.refreshToken) {
        await fetch('https://localhost:3000/refreshToken', {
          method: 'POST',
          body: JSON.stringify({
            tokens: tokens,
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } else {
        await fetch('https://localhost:3000/refreshToken', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: tokens.accessToken,
            refreshToken: refreshToken,
            accessTokenExpiresAt: tokens.accessTokenExpiresAt
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
      }
    } else
      throw new Error('refresh Token is undefined')
  } catch (e) {
    if (e instanceof Error)
      console.log('There was an error while trying to refresh the access token: ' + e.message)
  }
}

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