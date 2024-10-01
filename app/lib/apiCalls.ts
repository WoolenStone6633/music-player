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
  const accessToken = (await spotifyAuth.refreshAccessToken(refreshToken)).accessToken;
  spotifyApi.setAccessToken(accessToken)

  var songsArr: any = []

  spotifyApi.searchTracks(`trask:${query}`)
    .then((data: any) => {
      data.body.tracks.items.map((track: any) => {
        songsArr.push({
          artist: track.artists.map((artist: any) => {
            return artist.name
          }),
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[track.album.images.length - 1].url
        })
      })
    }).then( () => {
      // console.log(songsArr)
      return songsArr
    })
}