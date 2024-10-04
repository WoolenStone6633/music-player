import { spotifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export function getAccessToken () {
  try {
    return cookies().get('jws').value.split(',')[0]
  } catch (e) {
    return new Response(null, {
			status: 500,
      statusText: 'unable to get access token'
		});
  }
}

export async function refreshAccessToken () {
  try {
    const refreshToken = cookies().get('jws').value.split(',')[1]
    const tokens = await spotifyAuth.refreshAccessToken(refreshToken)
    cookies().set('jws', `${tokens.accessToken},${tokens.refreshToken}`)
  } catch (e) {
    return new Response(null, {
      status: 500,
      statusText: 'unable to refresh token'
    });
  }
}