import { NextRequest } from "next/server"
import { setSpotifyTokens } from "../lib/apiCalls"

// sets the cookeis on the client side
export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    setSpotifyTokens(body.accessToken, body.refreshToken)
  } catch (e) {
    if (e instanceof Error)
      console.log('Error setting the cookies after refreshing the token: ', e.message)
    return new Response(null, {
      status: 501,
    });
  }

	return new Response(null, {
    status: 302,
  });
}