import { Lucia } from "lucia";
import { Spotify } from "arctic";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "development"
		}
	}
});

export const spotifyAuth = new Spotify()

// export const spotifyAuth = spotify(auth, {
// 	clientId: '43a1d7599f664a14855823384d1eeb28',
// 	clientSecret: 'be1eb167c5de4702ada63990ae9e6538',
// 	redirectUri: 'http://localhost:3000/',
// 	scope: ['streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']
// })

// const authURL= 'https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
//   const client_id = '43a1d7599f664a14855823384d1eeb28'
//   const client_secret = 'be1eb167c5de4702ada63990ae9e6538'
//   const encodedIdSec = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
//   const authorization = `Basic ${encodedIdSec}`
//   const auth: Auth = `Basic ${encodedIdSec}`
//   const config = {
//     clientId: '43a1d7599f664a14855823384d1eeb28',
//     clientSecret: 'be1eb167c5de4702ada63990ae9e6538',
//     redirectUri: 'http://localhost:3000/',
//     scope: ['streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']
//   }

export type Auth = typeof auth;