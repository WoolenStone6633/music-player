import { NextRequest } from "next/server"
import { cookies } from "next/headers"

// sets the cookeis on the client side
export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    cookies().set('jws', `${body.accessToken},${body.refreshToken}`, {
      httpOnly: true,
      maxAge: 60 * 10,
    })
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