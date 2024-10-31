import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const body = await req.json()
  cookies().set('jws', `${body.accessToken},${body.refreshToken}`, {
    httpOnly: true,
  })

	return Response.redirect('https://localhost:3000/player');
}