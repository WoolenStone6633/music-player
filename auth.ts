'use server'

import { Buffer } from "buffer";

export async function luciaAuth () {
  
}

fetch('/login/github', {

})

// const express = require('express')
// const SpotifyWebApi = require('spotify-web-api-node')

// const app = express()

// app.post('/login', (req: any, res: any) => {
//   const code = req.query.code
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: 'http://localhost:3000/',
//     clientId: '43a1d7599f664a14855823384d1eeb28',
//     clientSecret: 'be1eb167c5de4702ada63990ae9e6538'
//   })

//   spotifyApi.authorizationCodeGrant(code).then((data: any) => {
//     res.json({
//       accessToke: data.body.access_token,
//       refreshToken: data.body.refresh_token,
//       expiresIn: data.body.expires_in,
//     })
//   }).catfch((err) => {
//     console.log(err)
//     res.senddattus(400)
//   })
// })

export async function getTokens (code: string) {
  console.log("========================")
  const location = 'https://accounts.spotify.com/api/token';
  const redUri = 'http://localhost:3000/'
  const grantType = 'authorization_code'
  const client_id = '43a1d7599f664a14855823384d1eeb28'
  const client_secret = 'be1eb167c5de4702ada63990ae9e6538'
  const encodedIdSec = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  const settings = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedIdSec}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=${grantType}&code=${code}&redirect_uri=${redUri}`,
    json: true
  }
  try {
    const fetchResponse = await fetch(location, settings);
    // const fetchResponse = await fetch(location, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Basic ${encodedIdSec}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: `grant_type=${grantType}&code=${code}&redirect_uri=${redUri}`,
    //   // json: true,
    // });
    if (fetchResponse.ok) {
      const data = await fetchResponse.json();
      return data;
    } else {
       console.log(fetchResponse.statusText)
    }
  } catch (e) {
    console.log(`e: ${e}`)
    return e;
  }    
}