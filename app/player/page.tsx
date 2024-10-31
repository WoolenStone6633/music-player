import { Suspense } from "react";
import StreamProcesser from "../ui/streamProcesser"
import SongCard from "../ui/songCard"
import { getAccessToken, getSongs, refreshAccessToken} from "../lib/apiCalls";
import SongPlayer from "../ui/songPlayer";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string, id?: string}}) {
  const query = searchParams?.query
  const songList = query !== undefined ? await getSongs(query) : false

  return (
    <main className="flex">
      <div className="max-w-fit">
        <Suspense>
          {songList ? songList.map((song: song) => (
            <SongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artist={song.artist} songUri={song.uri}/>
          )) : null }
        </Suspense>
      </div>
      <div>
        <StreamProcesser/>
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