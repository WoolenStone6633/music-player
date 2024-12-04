import { getSongs } from "../lib/spotifyCalls"
import SpotifySongCard from "./spotifySongCard"

type props = {
  query: string
}

export default async function SpotifyTrackList({query}: props) {
  const songList = await getSongs(query)
 
  return (
    <>
      {songList ? songList.map((song: song) => (
        <SpotifySongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artistStr={song.artistStr} songUri={song.uri}/>
      )) : null }
   </>
  )
 }

 export type song = {
  artistStr: string
  title: string
  uri: string
  albumUrl: string
}