import { spotifyAuth, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("spotify_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await spotifyAuth.validateAuthorizationCode(code);
		cookies().set('RT', tokens.refreshToken, {
			httpOnly: true,
		})

		const spotifyUserResponse = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const spotifyUser: SpotifyUser = await spotifyUserResponse.json();

    const existingUser = await db.user.findUnique({
			where: {
				spotify_id: spotifyUser.id
			}
		})

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/player"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		await db.user.create({
			data: {
				id: userId, 
				spotify_id: spotifyUser.id,
				display_name: spotifyUser.display_name,
				href: spotifyUser.href,
				uri: spotifyUser.uri,
			}
		})

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/player"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

type SpotifyUser = {
	id: string;
	display_name: string;
	href: string;
	uri: string;
};