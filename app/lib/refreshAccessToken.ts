'use client'

import { getSpotifyRefreshToken, refreshSpotifyAccessToken } from "./spotifyCalls"
import { SpotifyTokens } from "arctic"

export default function refreshAccessToken (baseUrl: string) {
  getSpotifyRefreshToken().then((refreshToken?: string | null) => {
    if (refreshToken) {
      refreshSpotifyAccessToken(refreshToken).then((tokens: SpotifyTokens) => {
        if (tokens.refreshToken) {
          fetch(`${baseUrl}/refreshToken`, {
            method: 'POST',
            body: JSON.stringify({
              tokens: tokens,
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }).catch((e) => {
            console.log('Error posting refresh token to server')
          })
        } else {
          fetch(`${baseUrl}/refreshToken`, {
            method: 'POST',
            body: JSON.stringify({
              accessToken: tokens.accessToken,
              refreshToken: refreshToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }).catch((e) => {
            console.log('Error posting refresh token to server')
          })
        }
      }).catch ((e) => {
        if (e instanceof Error)
          console.log('There was an error while trying to refresh the access token: ' + e.message)
      })
    }
    else
      throw Error('Token has expired')
  })
}