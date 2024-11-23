import { spotifyAuth } from "@/lib/oauth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { PrismaClient } from "@prisma/client";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/lib/session";
import { setSpotifyTokens } from "@/app/lib/spotifyCalls";

const db = new PrismaClient

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")
	const storedState = cookies().get("spotify_oauth_state")?.value ?? null
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		})
	}

	try {
		const tokens = await spotifyAuth.validateAuthorizationCode(code)
		setSpotifyTokens(tokens.accessToken, tokens.refreshToken)
		
		const spotifyUserResponse = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})
		const spotifyUser: SpotifyUser = await spotifyUserResponse.json();
		const spotifyUserId = spotifyUser.id
		console.log('Spotify product: ', spotifyUser.product)

    const existingUser = await db.user.findUnique({
			where: {
				spotify_id: spotifyUser.id
			}
		})

		if (existingUser) {
			const sessionToken = generateSessionToken()
			const session = await createSession(sessionToken, existingUser.id)
			await setSessionTokenCookie(sessionToken, session.expiresAt)
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/player"
				}
			})
		}

		const user = await db.user.create({
			data: {
				id: spotifyUserId, 
				spotify_id: spotifyUser.id,
				display_name: spotifyUser.display_name,
			}
		})

		const sessionToken = generateSessionToken()
		const session = await createSession(sessionToken, user.id)
		await setSessionTokenCookie(sessionToken, session.expiresAt)
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/player"
			}
		})
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			console.log(e)
			return new Response(null, {
				status: 400
			})
		}
		console.log(e)
		return new Response(null, {
			status: 500
		})
	}
}

type SpotifyUser = {
	id: string
	display_name: string
	product: string
}