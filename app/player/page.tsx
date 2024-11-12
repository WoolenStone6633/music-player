import { Suspense } from "react";
import StreamProcesser from "../ui/streamProcesser"
import SongCard from "../ui/songCard"
import { getSpotifyAccessToken, getSongs} from "../lib/spotifyCalls";
import SongPlayer from "../ui/songPlayer";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string, id?: string}}) {
  const { user } = await getCurrentSession()
  const accessToken = await getSpotifyAccessToken()
  // when if is triggered, let the user know that their current session has expired and to login again
	if (!user) {
    return redirect("/")
	} else if (!accessToken) {
		return redirect("/")
  }

  const query = searchParams?.query
  const songList = query !== undefined ? await getSongs(query) : undefined

  return (
    <main className="flex">
      <div className="max-w-fit">
        <Suspense>
          {songList ? songList.map((song: song) => (
            <SongCard key={`${song.albumUrl}${song.title}`} imgUrl={song.albumUrl} title={song.title} artistStr={song.artistStr} songUri={song.uri}/>
          )) : null }
        </Suspense>
      </div>
      <div>
        <StreamProcesser/>
        <Suspense>
          <SongPlayer accessToken={accessToken} trackUri={searchParams?.id}/>
        </Suspense>
      </div>
    </main>
  );
}

export type song = {
  artistStr: string
  title: string
  uri: string
  albumUrl: string
}