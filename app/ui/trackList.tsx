import { getSongs } from "../lib/spotifyCalls"
import SongCard from "./songCard"

type props = {
  query: string
}

export default async function TrackList({query}: props) {
  const songList = await getSongs(query)
 
  return (
    <>
      {songList ? songList.map((song: song) => (
        <SongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artistStr={song.artistStr} songUri={song.uri}/>
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