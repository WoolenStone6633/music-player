import { Spotify } from "arctic";

export const spotifyAuth = new Spotify(
	process.env.SPOTIFY_CLIENT_ID!, 
	process.env.SPOTIFY_CLIENT_SECRET!, 
	process.env.REDIRECT_URI!
)