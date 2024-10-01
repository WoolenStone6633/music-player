import { Suspense } from "react";
import ArtGraphic from "../ui/artGraphic"
import SongCard from "../ui/songCard"
import { getSongs} from "../lib/apiCalls";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string}}) {
  const query = searchParams?.query
  const songList = await getSongs(query)

  return (
    <main className="flex">
      <div className="max-w-fit">
        <Suspense>
          {songList ? songList.map((song: song) => (
            <SongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artist={song.artist} songUri={song.uri}/>
          )) : <p>Error loading songList</p> }
        </Suspense>
      </div>
      <div>
        <ArtGraphic/>
        <p>This is the title of the song</p>
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