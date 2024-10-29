import { spotifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export function getAccessToken () {
  try {
    return cookies().get('jws')?.value.split(',')[0]
  } catch (e) {
    console.log('there was an error when trying to get the access token related to: ' + e)
    return undefined
  }
}

export async function refreshAccessToken () {
  try {
    const refreshToken = cookies().get('jws')?.value.split(',')[1]
    if (refreshToken) {
      const tokens = await spotifyAuth.refreshAccessToken(refreshToken)
      cookies().set('jws', `${tokens.accessToken},${tokens.refreshToken}`)
    }
  } catch (e) {
    return new Response(null, {
      status: 500,
      statusText: 'unable to refresh token'
    });
  }
}