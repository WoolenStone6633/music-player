import { Suspense } from "react";
import ArtGraphic from "../ui/artGraphic"
import SongCard from "../ui/songCard"
import { getSongs} from "../lib/apiCalls";
import SongPlayer from "../ui/songPlayer";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string}}) {
  const query = searchParams?.query
  const songList = query !== undefined ? await getSongs(query) : false

  console.log(songList)

  return (
    <main className="flex">
      <div className="max-w-fit">
        <Suspense>
          {songList ? songList.map((song: song) => (
            <SongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artist={song.artist} songUri={song.uri}/>
          )) : <></> }
        </Suspense>
      </div>
      <div>
        <ArtGraphic/>
        <p>This is the title of the song</p>
        <SongPlayer accessToken={undefined} trackUri="something for now"/>
      </div>
    </main>
  );
}

type song = {
  artist: string[] | string;
  title: string;
  uri: string;
  albumUrl: string;
}