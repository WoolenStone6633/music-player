import { Suspense } from "react";
import StreamProcessing from "../ui/streamProcessing"
import SongCard from "../ui/songCard"
import { getSongs} from "../lib/apiCalls";
import SongPlayer from "../ui/songPlayer";
import { getAccessToken } from "../lib/tokenCalls";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string, id?: string}}) {
  const query = searchParams?.query
  const songList = query !== undefined ? await getSongs(query) : false

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
        <StreamProcessing/>
        <SongPlayer accessToken={await getAccessToken()} trackUri={searchParams?.id}/>
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