import { generateState } from "arctic";
import { spotifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await spotifyAuth.createAuthorizationURL(
    state, {
      scopes: ['streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']
    }
  )

  cookies().set('spotify_oauth_state', state, {
    path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
  })

	return Response.redirect(url);
}