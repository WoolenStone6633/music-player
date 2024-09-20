import { Lucia } from "lucia";
import { Spotify } from "arctic";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()
const adapter = new PrismaAdapter(client.session, client.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "development"
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

export const spotifyAuth = new Spotify(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!, process.env.REDIRECT_URI!)