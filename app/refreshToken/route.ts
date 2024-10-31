import { spotifyAuth } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET(request: Request): Promise<Response> {
  try {
    const refreshToken = cookies().get('jws')?.value.split(',')[1]
    console.log('Refresh token is: ' + refreshToken)
    if (refreshToken) {
      const tokens = await spotifyAuth.refreshAccessToken(refreshToken)
      cookies().set('jws', `${tokens.accessToken},${tokens.refreshToken}`, {
        httpOnly: true,
      })
    } else
      throw new Error('refresh Token is undefined')
  } catch (e) {
    if (e instanceof Error)
      console.log('There was an error while trying to refresh the access token: ' + e.message)
  }

	return Response.redirect('https://localhost:3000/player');
}