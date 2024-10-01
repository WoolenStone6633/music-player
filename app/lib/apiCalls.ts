'use server'

import { cookies } from "next/headers";
import { spotifyAuth } from "@/lib/auth";

export async function getSongs (query: string[] | string | undefined) {
  const refreshToken = cookies().get('RT')?.value
  const accessToken = (await spotifyAuth.refreshAccessToken(refreshToken)).accessToken;

  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  console.log('This is the result of tracks', response.json())
  
  return response.json()
}