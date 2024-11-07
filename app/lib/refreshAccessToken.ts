'use client'

import { usePathname } from "next/navigation"
import { getRefreshToken, refreshApiAccessToken } from "./apiCalls"
import { SpotifyTokens } from "arctic"

export default function refreshAccessToken () {
  const urlBase = usePathname()
  getRefreshToken().then((refreshToken?: string) => {
    if (refreshToken) {
      refreshApiAccessToken(refreshToken).then((tokens: SpotifyTokens) => {
        if (tokens.refreshToken) {
          fetch(`${urlBase}/refreshToken`, {
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
          fetch(`${urlBase}/refreshToken`, {
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
      throw Error('refresh token is undefined')
  })
}