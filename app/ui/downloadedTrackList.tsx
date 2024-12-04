import DownloadedSongCard from "./downloadedSongCard"
import songList from "../resources/music/assetLoader"

export default async function DownloadedTrackList() {
 
  return (
    <>
      {songList ? songList.map((song: song) => (
        <DownloadedSongCard key={`${song.imgUrl}${song.title}`} imgUrl={song.imgUrl} title={song.title} artistStr={song.artist} songLink={song.songLink}/>
      )) : null }
   </>
  )
 }

 export type song = {
  title: string
  artist: string
  imgUrl: string
  songLink: any
}